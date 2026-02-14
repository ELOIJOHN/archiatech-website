import React, { useEffect, useState } from "react";

interface HistoryItem {
  ["Date/Heure"]: string;
  Service: string;
  ["Ancienne version"]: string;
  ["Nouvelle version"]: string;
  Serveur: string;
  Statut: string;
  ["Validé par"]: string;
}

const AgentMaintenanceDashboard: React.FC = () => {
  const [status, setStatus] = useState("⏳ Vérification en cours...");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE = "https://mcp.archiatech.com";

  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      const data = await res.json();
      setStatus(
        data.status === "ok" || data.status === "healthy"
          ? "🟢 MCP opérationnel"
          : "🔴 MCP inactif"
      );
    } catch {
      setStatus("🔴 Impossible de joindre le MCP");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/agents/maintenance/history`);
      const data = await res.json();
      setHistory(data.history || []);
    } catch {
      setMessage("⚠️ Erreur lors du chargement de l’historique");
    }
  };

  const runMaintenance = async () => {
    setLoading(true);
    setMessage("⏳ Lancement du cycle de maintenance...");
    try {
      const res = await fetch(`${API_BASE}/api/agents/maintenance/run`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.result) {
        setMessage("✅ Cycle de maintenance exécuté avec succès !");
        fetchHistory();
      } else {
        setMessage("❌ Échec du cycle de maintenance");
      }
    } catch {
      setMessage("🚨 Erreur de connexion au MCP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchHistory();
    const interval = setInterval(() => {
      checkHealth();
      fetchHistory();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-400">
        🧠 Agent Maintenance ArchiaTech
      </h1>

      <div className="mb-6 text-center">
        <p className="text-lg font-medium">{status}</p>
        <button
          onClick={runMaintenance}
          disabled={loading}
          className={`mt-4 px-6 py-2 rounded-lg ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } transition duration-300`}
        >
          {loading ? "Maintenance en cours..." : "🚀 Lancer la Maintenance"}
        </button>
        <p className="mt-3 text-sm text-blue-300">{message}</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-yellow-400">
          📜 Historique des opérations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-3 py-2">Date / Heure</th>
                <th className="px-3 py-2">Service</th>
                <th className="px-3 py-2">Ancienne</th>
                <th className="px-3 py-2">Nouvelle</th>
                <th className="px-3 py-2">Serveur</th>
                <th className="px-3 py-2">Statut</th>
                <th className="px-3 py-2">Validé par</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-gray-700/40"
                  >
                    <td className="px-3 py-2">{item["Date/Heure"]}</td>
                    <td className="px-3 py-2">{item.Service}</td>
                    <td className="px-3 py-2">{item["Ancienne version"]}</td>
                    <td className="px-3 py-2">{item["Nouvelle version"]}</td>
                    <td className="px-3 py-2">{item.Serveur}</td>
                    <td className="px-3 py-2">{item.Statut}</td>
                    <td className="px-3 py-2">{item["Validé par"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">
                    Aucun historique disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentMaintenanceDashboard;
