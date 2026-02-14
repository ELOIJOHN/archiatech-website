import React, { useEffect, useState } from 'react'
import { Users, Bot, FileText, AlertCircle, Moon, Sun, RefreshCw } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { DataTable } from '../components/DataTable'
import { supabase } from '../lib/supabase'
import { User, Agent, Log, Stats } from '../types'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

export const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeAgents: 0,
    totalLogs: 0,
    errorRate: 0,
    userGrowth: 0,
    agentActivity: 0
  })
  const [users, setUsers] = useState<User[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch users
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      // Fetch agents
      const { data: agentsData } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      // Fetch logs
      const { data: logsData } = await supabase
        .from('logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100)

      setUsers(usersData || [])
      setAgents(agentsData || [])
      setLogs(logsData || [])

      // Calculate stats
      const activeAgentsCount = (agentsData || []).filter(a => a.status === 'active').length
      const errorLogs = (logsData || []).filter(l => l.level === 'error').length
      const errorRate = logsData && logsData.length > 0 ? (errorLogs / logsData.length) * 100 : 0

      setStats({
        totalUsers: usersData?.length || 0,
        activeAgents: activeAgentsCount,
        totalLogs: logsData?.length || 0,
        errorRate: Math.round(errorRate * 10) / 10,
        userGrowth: 12.5,
        agentActivity: 8.3
      })

      // Generate chart data
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return {
          date: format(date, 'dd/MM'),
          users: Math.floor(Math.random() * 50) + 20,
          agents: Math.floor(Math.random() * 30) + 10,
          logs: Math.floor(Math.random() * 100) + 50
        }
      })
      setChartData(last7Days)

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const userColumns = [
    { key: 'email', label: 'Email' },
    { key: 'full_name', label: 'Nom complet' },
    { key: 'role', label: 'Rôle' },
    {
      key: 'created_at',
      label: 'Date de création',
      render: (user: User) => format(new Date(user.created_at), 'dd/MM/yyyy HH:mm')
    }
  ]

  const agentColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'type', label: 'Type' },
    {
      key: 'status',
      label: 'Statut',
      render: (agent: Agent) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          agent.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {agent.status}
        </span>
      )
    },
    {
      key: 'created_at',
      label: 'Date de création',
      render: (agent: Agent) => format(new Date(agent.created_at), 'dd/MM/yyyy HH:mm')
    }
  ]

  const logColumns = [
    {
      key: 'level',
      label: 'Niveau',
      render: (log: Log) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          log.level === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          log.level === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          log.level === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {log.level}
        </span>
      )
    },
    { key: 'message', label: 'Message' },
    { key: 'source', label: 'Source' },
    {
      key: 'timestamp',
      label: 'Date',
      render: (log: Log) => format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard ArchiaTech</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vue d'ensemble de votre écosystème</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Utilisateurs"
            value={stats.totalUsers}
            icon={Users}
            trend={stats.userGrowth}
            trendLabel="ce mois"
            color="blue"
          />
          <StatCard
            title="Agents Actifs"
            value={stats.activeAgents}
            icon={Bot}
            trend={stats.agentActivity}
            trendLabel="cette semaine"
            color="green"
          />
          <StatCard
            title="Total Logs"
            value={stats.totalLogs}
            icon={FileText}
            color="purple"
          />
          <StatCard
            title="Taux d'Erreur"
            value={`${stats.errorRate}%`}
            icon={AlertCircle}
            trend={-2.4}
            trendLabel="ce mois"
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activité (7 derniers jours)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1F2937' : '#fff',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="logs" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Users & Agents Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Utilisateurs & Agents</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1F2937' : '#fff',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="agents" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Tables */}
        <div className="space-y-6">
          <DataTable
            data={users}
            columns={userColumns}
            title="Utilisateurs Récents"
            searchable
            exportable
          />

          <DataTable
            data={agents}
            columns={agentColumns}
            title="Agents"
            searchable
            exportable
          />

          <DataTable
            data={logs}
            columns={logColumns}
            title="Logs Récents"
            searchable
            exportable
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 ArchiaTech. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
