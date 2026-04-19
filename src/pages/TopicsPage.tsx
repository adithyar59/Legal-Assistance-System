/**
 * Legal Topic Explorer Page
 * Browse all legal categories and their entries
 */

import { useState } from 'react'
import { Search, ChevronRight, ArrowLeft, Scale, FileText, Building2, CheckSquare, ShoppingCart, Shield, Briefcase, Home, Users, Activity, Info, AlertCircle, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { legalDataset, LEGAL_CATEGORIES, type LegalEntry, type LegalCategory } from '@/data/legalDataset'

const TOPIC_CONFIG: Record<string, { icon: any; articleCount: number }> = {
  'Consumer Protection': { icon: ShoppingCart, articleCount: 12 },
  'Cybercrime & IT Act': { icon: Shield, articleCount: 9 },
  'Labour & Employment': { icon: Briefcase, articleCount: 15 },
  'Property & Tenancy': { icon: Home, articleCount: 11 },
  'Family Law': { icon: Users, articleCount: 13 },
  'Constitutional Rights': { icon: Activity, articleCount: 8 },
  'RTI & Public Services': { icon: Info, articleCount: 7 },
  'Criminal Law Basics': { icon: AlertCircle, articleCount: 10 },
  'Women\'s Rights': { icon: Users, articleCount: 14 },
  'Banking & Finance': { icon: CreditCard, articleCount: 6 },
}

const CATEGORY_MAP: Record<LegalCategory, string> = {
  'Labour Law': 'Labour & Employment',
  'Consumer Rights': 'Consumer Protection',
  'Cybercrime': 'Cybercrime & IT Act',
  'Harassment': 'Women\'s Rights',
  'Tenancy': 'Property & Tenancy',
}

function EntryDetail({ entry, onBack }: { entry: LegalEntry; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-msg-in">
      <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-[#f0ece3]/40 hover:text-[#f0ece3] mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to topics
      </button>

      <div className="glass rounded-[28px] p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[2px]">{entry.category}</span>
        </div>
        <h1 className="text-2xl font-serif text-[#f0ece3] mb-2 leading-tight">{entry.title}</h1>
        <p className="text-[12px] font-medium text-[#f0ece3]/40 tracking-wide uppercase">Reference: {entry.law_reference}</p>
      </div>

      <div className="space-y-6">
        <div className="border border-[#c9a96e]/20 rounded-[20px] p-6 bg-[#c9a96e]/5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[2px]">In Simple Terms</span>
          </div>
          <p className="text-[15px] text-[#f0ece3] leading-[1.8]">{entry.simplified_explanation}</p>
        </div>

        <div className="glass rounded-[20px] p-6">
          <p className="text-[10px] font-semibold text-[#f0ece3]/40 uppercase tracking-[2px] mb-3">Legal Context</p>
          <p className="text-[14px] text-[#f0ece3]/80 leading-[1.7]">{entry.description}</p>
        </div>

        {entry.documents_required.length > 0 && (
          <div className="glass rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-[#c9a96e]" />
              <span className="text-[10px] font-bold text-[#f0ece3] uppercase tracking-[2px]">Required Documents</span>
            </div>
            <ul className="space-y-2">
              {entry.documents_required.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-[#f0ece3]/90">
                  <CheckSquare className="w-4 h-4 text-[#c9a96e] shrink-0 mt-0.5" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="glass rounded-[20px] p-6">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-[10px] font-bold text-[#f0ece3] uppercase tracking-[2px]">Authority to Approach</span>
          </div>
          <p className="text-[15px] font-medium text-[#f0ece3]">{entry.authority}</p>
        </div>

        {entry.procedure_steps.length > 0 && (
          <div className="glass rounded-[20px] p-6">
            <p className="text-[10px] font-bold text-[#f0ece3] uppercase tracking-[2px] mb-4">Step-by-Step Procedure</p>
            <ol className="space-y-3">
              {entry.procedure_steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {i + 1}
                  </div>
                  <p className="text-[14px] text-[#f0ece3]/90 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 text-[11px] text-[#f0ece3]/40 leading-relaxed">
          The information provided above is for awareness purposes based on generalized Indian legal frameworks. It is not a substitute for professional legal advice.
        </div>
      </div>
    </div>
  )
}

export function TopicsPage() {
  const [activeCategory, setActiveCategory] = useState<LegalCategory | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<LegalEntry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  if (selectedEntry) {
    return <EntryDetail entry={selectedEntry} onBack={() => setSelectedEntry(null)} />
  }

  const filteredEntries = activeCategory
    ? legalDataset.filter((e) => e.category === activeCategory)
    : legalDataset.filter((e) => {
        if (!searchQuery.trim()) return false
        const q = searchQuery.toLowerCase()
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.keywords.some((k) => k.includes(q))
        )
      })

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[3px] mb-4 block">Knowledge Directory</span>
        <h1 className="text-[clamp(32px,5vw,46px)] font-serif text-[#f0ece3] mb-5 tracking-[-1px] leading-tight">Explore <em>Legal Domains</em></h1>
        <p className="text-[15px] font-light text-[#f0ece3]/60 max-w-[520px] mx-auto leading-[1.7]">
          Browse through specialized categories to find articles, cases, and summaries related to specific legal interest areas.
        </p>
      </header>

      <div className="relative max-w-lg mx-auto mb-16">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0ece3]/20" />
        <input
          type="text"
          placeholder="Search legal topics..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory(null) }}
          className="w-full pl-11 pr-6 py-3.5 glass rounded-full text-sm outline-none focus:border-[#c9a96e] transition-all"
        />
      </div>

      {!searchQuery.trim() && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(TOPIC_CONFIG).map(([name, config]) => {
            const Icon = config.icon
            const isSelected = activeCategory && CATEGORY_MAP[activeCategory] === name
            return (
              <button
                key={name}
                onClick={() => {
                  const cat = Object.keys(CATEGORY_MAP).find(k => CATEGORY_MAP[k as LegalCategory] === name) as LegalCategory
                  setActiveCategory(isSelected ? null : cat)
                }}
                className={cn(
                  'flex flex-col items-center gap-4 p-7 glass rounded-[20px] text-center transition-all',
                  isSelected ? 'border-[#c9a96e] bg-white/10 scale-[1.05] shadow-lg' : 'hover:scale-[1.02] active:scale-[0.98]'
                )}
              >
                <div className="w-12 h-12 rounded-[16px] bg-[#c9a96e]/10 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e]">
                  <Icon className="w-6 h-6 stroke-[1.6]" />
                </div>
                <div className="space-y-1">
                  <div className="text-[14px] font-medium text-[#f0ece3] leading-tight">{name}</div>
                  <div className="text-[11px] text-[#f0ece3]/30 tracking-wide">{config.articleCount} articles</div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {(activeCategory || searchQuery.trim()) && (
        <div className="animate-msg-in mt-12">
          {activeCategory && (
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-[#f0ece3] text-xl">{CATEGORY_MAP[activeCategory]}</h2>
                <span className="text-[11px] text-[#f0ece3]/40 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">{filteredEntries.length} topics found</span>
              </div>
              <button onClick={() => setActiveCategory(null)} className="text-[12px] text-[#f0ece3]/40 hover:text-[#f0ece3] transition-colors">
                Show all categories
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="w-full text-left flex items-center gap-4 p-5 glass rounded-[24px] hover:scale-[1.01] active:scale-[0.99] group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] shrink-0 group-hover:scale-110 transition-transform">
                  <Scale className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px] text-[#f0ece3] group-hover:text-[#c9a96e] transition-colors truncate">{entry.title}</p>
                  <p className="text-[11px] text-[#f0ece3]/30 uppercase tracking-wider mt-0.5 truncate">{entry.law_reference}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#f0ece3]/20 group-hover:text-[#c9a96e] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}