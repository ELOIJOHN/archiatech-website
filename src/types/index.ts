export interface User {
  id: string
  email: string
  full_name?: string
  created_at: string
  last_sign_in_at?: string
  role?: string
}

export interface Agent {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive' | 'error'
  created_at: string
  last_activity?: string
  tasks_completed?: number
}

export interface Log {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  message: string
  source: string
  user_id?: string
}

export interface Stats {
  totalUsers: number
  activeAgents: number
  totalLogs: number
  errorRate: number
  userGrowth: number
  agentActivity: number
}
