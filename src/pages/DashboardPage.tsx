/**
 * NGO Analytics Dashboard
 * Shows legal awareness statistics and query analytics
 * Designed for NGOs and administrators to understand community legal needs
 */

import { useState, useEffect } from 'react'
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { TrendingUp, Users, MessageSquare, Scale, BookOpen, Layers, Zap, Info, ShieldCheck } from 'lucide-react'
import { legalDataset, getAnalyticsData } from '@/data/legalDataset'
import { learningModules } from '@/data/learningModules'

// ── Mock query analytics (simulated session data) ──────────────────────────
// In a real deployment, these would come from the backend analytics API
function generateAnalyticsData() {
  // Category query distribution (simulated based on typical legal aid center data)
  const categoryQueryData = [
    { category: 'Labour Law', queries: 42, percentage: 28, color: '#4fa3cf' },
    { category: 'Consumer Rights', queries: 35, percentage: 23, color: '#c9a96e' },
    { category: 'Harassment', queries: 28, percentage: 19, color: '#8b5cf6' },
    { category: 'Cybercrime', queries: 24, percentage: 16, color: '#e07d3c' },
    { category: 'Tenancy', queries: 21, percentage: 14, color: '#10b981' },
  ]

  // Monthly trend data
  const monthlyData = [
    { month: 'Oct', queries: 45, users: 38 },
    { month: 'Nov', queries: 62, users: 51 },
    { month: 'Dec', queries: 58, users: 47 },
    { month: 'Jan', queries: 78, users: 63 },
    { month: 'Feb', queries: 91, users: 74 },
    { month: 'Mar', queries: 107, users: 89 },
  ]

  return { categoryQueryData, monthlyData }
}

const CAMPAIGNS = [
  { location: 'Tamil Nadu', name: 'Rural Women\'s Rights', beneficiaries: '3,400', progress: 68, color: '#c9a96e' },
  { location: 'Maharashtra', name: 'Tenant Protection Drive', beneficiaries: '1,850', progress: 42, color: '#4fa3cf' },
  { location: 'Delhi', name: 'Gig Worker Awareness', beneficiaries: '2,100', progress: 55, color: '#10b981' },
]

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, subtext }: {
  icon: any; label: string; value: string | number; subtext?: string
}) {
  return (
    <div className="glass rounded-[28px] p-8 animate-msg-in">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-[#f0ece3]/40 uppercase tracking-[2px]">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/15 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e]">
          <Icon className="w-5 h-5 stroke-[1.6]" />
        </div>
      </div>
      <div className="text-[40px] font-serif text-[#f0ece3] leading-none mb-2">{value}</div>
      {subtext && <div className="text-[13px] font-light text-[#f0ece3]/40">{subtext}</div>}
    </div>
  )
}

export function DashboardPage() {
  const [sessionQueries, setSessionQueries] = useState(0)
  const { categoryQueryData, monthlyData } = generateAnalyticsData()

  // Simulate live query counter
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSessionQueries((prev) => prev + 1)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[3px] mb-4 block">NGO Dashboard</span>
        <h1 className="text-[clamp(32px,5vw,46px)] font-serif text-[#f0ece3] mb-5 tracking-[-1px] leading-tight">Impact <em>Overview</em></h1>
        <p className="text-[15px] font-light text-[#f0ece3]/60 max-w-[520px] mx-auto leading-[1.7]">
          Real-time data on citizen engagement, legal query resolution, and active awareness campaigns across the country.
        </p>
      </header>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <StatCard icon={MessageSquare} label="Total Queries" value="6,204" subtext="All time queries" />
        <StatCard icon={Users} label="Session Active" value={sessionQueries} subtext="Live users" />
        <StatCard icon={Scale} label="Knowledge base" value={legalDataset.length} subtext="Legal entries" />
        <StatCard icon={BookOpen} label="Modules" value={learningModules.length} subtext="Education" />
      </div>

      {/* Impact Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Citizens Reached Card */}
        <div className="glass rounded-[32px] p-8 flex flex-col">
          <span className="text-[10px] font-bold text-[#f0ece3]/40 uppercase tracking-[2px] mb-4 block">Citizens Reached</span>
          <div className="text-[48px] font-serif text-[#f0ece3] mb-1">24,831</div>
          <p className="text-[15px] font-light text-[#f0ece3]/60 mb-8">individuals served this month</p>
          <div className="flex items-end gap-2 h-20 mt-auto">
            {[45, 60, 35, 80, 100, 70, 55, 90, 65, 85].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 rounded-t-[6px] bg-gradient-to-t from-[#c9a96e]/50 to-[#c9a96e]/15 hover:from-[#c9a96e] hover:to-[#e8c99a] transition-all cursor-pointer" 
                style={{ height: `${h}%` }} 
              />
            ))}
          </div>
        </div>

        {/* Queries Resolved List */}
        <div className="glass rounded-[32px] p-8">
          <span className="text-[10px] font-bold text-[#f0ece3]/40 uppercase tracking-[2px] mb-4 block">Queries Resolved</span>
          <div className="text-[48px] font-serif text-[#c9a96e] mb-1">6,204</div>
          <p className="text-[15px] font-light text-[#f0ece3]/60 mb-8">legal queries answered via AI</p>
          
          <div className="space-y-5">
            {categoryQueryData.map((item) => (
              <div key={item.category} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-[13px] font-medium text-[#f0ece3]/80 flex-1">{item.category}</span>
                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden mx-2">
                  <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                </div>
                <span className="text-[12px] font-bold text-[#f0ece3] min-w-[32px] text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaigns Card */}
      <div className="glass rounded-[32px] p-8 mb-6">
        <span className="text-[10px] font-bold text-[#f0ece3]/40 uppercase tracking-[2px] mb-6 block">Active Legal Aid Campaigns</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAMPAIGNS.map((c) => (
            <div key={c.name} className="bg-white/5 border border-white/10 rounded-[20px] p-6 hover:border-[#c9a96e]/30 transition-all group">
              <div className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[2px] mb-1">{c.location}</div>
              <div className="text-[16px] font-serif text-[#f0ece3] mb-4 leading-tight group-hover:text-[#c9a96e] transition-colors">{c.name}</div>
              <span className="text-[11px] font-light text-[#f0ece3]/40 mb-3 block">{c.beneficiaries} beneficiaries</span>
              <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${c.progress}%`, backgroundColor: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awareness Gap Insights */}
      <div className="glass rounded-[32px] p-10 bg-gradient-to-br from-white/[0.03] to-transparent">
        <h3 className="font-serif text-[20px] text-[#f0ece3] mb-8">Community Awareness Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Zap className="w-6 h-6 text-[#c9a96e] stroke-[1.6]" />
            <div className="font-semibold text-[14px] text-[#f0ece3]">Rising Engagement</div>
            <p className="text-[12px] font-light text-[#f0ece3]/60 leading-[1.7]">Interaction volume increased by 140% this quarter, particularly in Tier-2 and Tier-3 cities.</p>
          </div>
          <div className="space-y-4">
            <Info className="w-6 h-6 text-[#c9a96e] stroke-[1.6]" />
            <div className="font-semibold text-[14px] text-[#f0ece3]">Knowledge Gaps</div>
            <p className="text-[12px] font-light text-[#f0ece3]/60 leading-[1.7]">Digital privacy and UPI fraud protection are identified as the primary areas needing immediate focus.</p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="w-6 h-6 text-[#c9a96e] stroke-[1.6]" />
            <div className="font-semibold text-[14px] text-[#f0ece3]">Resolution Speed</div>
            <p className="text-[12px] font-light text-[#f0ece3]/60 leading-[1.7]">Average time to clarify legal concepts has dropped from 4 hours to 2 seconds via AI assistant.</p>
          </div>
        </div>
      </div>
    </div>
  )
}