import { motion as Motion } from "framer-motion";
import { Shield, Heart, Leaf, Lock } from "lucide-react";

const pilliers = [
  {
    icon: Shield,
    label: "Souverain",
    emoji: "🇪🇺",
    title: "Vos données, votre choix d'hébergement",
    description:
      "Hébergement local, cloud privé ou cloud européen selon votre besoin. Nous privilégions des outils auto-hébergeables (n8n, modèles ouverts) et nous vous indiquons clairement quand un service externe intervient.",
    color: "#00C896",
  },
  {
    icon: Lock,
    label: "Sécurisé",
    emoji: "🔒",
    title: "Sécurité des données dès la conception",
    description:
      "Accès limités au strict nécessaire, clés et mots de passe jamais exposés, sauvegardes et journal des automatisations. Aucune donnée sensible n'est envoyée à un service d'IA sans votre accord.",
    color: "#F59E0B",
  },
  {
    icon: Heart,
    label: "Responsable",
    emoji: "🤝",
    title: "Une IA encadrée et transparente",
    description:
      "Conformité RGPD, validation humaine avant toute publication, règles d'usage et sensibilisation de vos équipes. Vous pouvez expliquer à vos clients comment l'IA est utilisée.",
    color: "#0EA5E9",
  },
  {
    icon: Leaf,
    label: "Durable",
    emoji: "🌱",
    title: "Une IA sobre",
    description:
      "Un modèle adapté à chaque tâche plutôt que toujours le plus gros, des automatisations qui évitent les appels inutiles, un hébergement européen quand c'est possible.",
    color: "#22C55E",
  },
];

export default function PilliersSection() {
  return (
    <section
      id="pilliers"
      className="py-16 sm:py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #111827 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span
            className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 px-4 py-1 rounded-full"
            style={{ color: "#00C896", background: "rgba(0,200,150,0.12)", border: "1px solid rgba(0,200,150,0.3)" }}
          >
            Notre ADN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            L&apos;IA souveraine,{" "}
            <span style={{ color: "#00C896" }}>responsable</span> et durable.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Souverain, sécurisé, responsable, durable : quatre engagements concrets pour que l&apos;IA reste au service de votre entreprise.
          </p>
        </Motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pilliers.map((p, i) => (
            <Motion.div
              key={p.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-6 sm:p-7 flex flex-col gap-4 group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${p.color}33`,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              whileHover={{
                borderColor: p.color,
                boxShadow: `0 0 32px ${p.color}33`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-2"
                style={{ background: `${p.color}1A`, color: p.color }}
              >
                <p.icon size={28} strokeWidth={1.8} />
              </div>

              {/* Badge */}
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: p.color }}
              >
                {p.emoji} {p.label}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-snug">{p.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
            </Motion.div>
          ))}
        </div>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact/?objet=audit#formulaire"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #00C896, #00A87A)",
                boxShadow: "0 4px 24px rgba(0,200,150,0.35)",
              }}
            >
              Réserver mon audit gratuit →
            </a>
            <a
              href="/services/ia-souveraine/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white border border-white/30 hover:bg-white/10 transition"
            >
              Notre approche de l&apos;IA souveraine
            </a>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
