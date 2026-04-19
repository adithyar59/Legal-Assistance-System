import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Scale, Menu, X, MessageSquare, BookOpen, Activity, LayoutGrid, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getActiveAi, getApiKeys } from '@/lib/aiKeyStore'

const navLinks = [
  { to: '/', label: 'Assistant', icon: MessageSquare },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/topics', label: 'Topics', icon: Activity },
  { to: '/dashboard', label: 'NGO', icon: LayoutGrid },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const [hasActiveKey, setHasActiveKey] = useState(false)

  // Check if a custom AI key is configured (for the indicator dot)
  useEffect(() => {
    const active = getActiveAi()
    const keys = getApiKeys()
    setHasActiveKey(!!(active?.activeKeyId && keys.some((k) => k.id === active.activeKeyId)))
  }, [location.pathname]) // re-check when navigating (e.g. after settings change)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d1f3c]/65 backdrop-blur-[32px] saturate-[180%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex h-[65px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-opacity hover:opacity-90">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] flex items-center justify-center shadow-[0_4px_16px_rgba(201,169,110,0.35)]">
              <Scale className="w-[18px] h-[18px] text-[#0d1f3c] stroke-[2.5]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-[22px] text-[#f0ece3] leading-none">LegalEase</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-medium transition-all duration-200',
                  location.pathname === to
                    ? 'bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] shadow-[0_4px_12px_rgba(201,169,110,0.25)]'
                    : 'text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/10'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </Link>
            ))}

            {/* Settings Link */}
            <Link
              to="/settings"
              title="AI Settings"
              className={cn(
                'relative flex items-center gap-2 px-3 py-2 rounded-full text-[13.5px] font-medium transition-all duration-200',
                location.pathname === '/settings'
                  ? 'bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] shadow-[0_4px_12px_rgba(201,169,110,0.25)]'
                  : 'text-[#f0ece3]/60 hover:text-[#f0ece3] hover:bg-white/10',
              )}
            >
              <Settings className="w-3.5 h-3.5" />
              {hasActiveKey && location.pathname !== '/settings' && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
              )}
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#f0ece3]/60 hover:text-[#f0ece3] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-1 animate-msg-in">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  location.pathname === to
                    ? 'bg-white/10 text-[#c9a96e]'
                    : 'text-[#f0ece3]/60'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}