/**
 * Chat Interface Component
 * Main legal Q&A interface with AI-powered responses
 * Implements the chatbot frontend as per system architecture
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Scale, AlertCircle, ChevronDown, ChevronUp, FileText, Building2, ArrowRight, Sparkles, Star, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { askLegalQuestion, type LegalQueryResponse } from '@/lib/api'
import { HistorySidebar } from './HistorySidebar'
import { Message, Conversation } from '@/types/chat'

const CATEGORY_COLORS: Record<string, string> = {
  'Labour Law': 'bg-blue-100 text-blue-700 border-blue-200',
  'Consumer Rights': 'bg-orange-100 text-orange-700 border-orange-200',
  'Cybercrime': 'bg-red-100 text-red-700 border-red-200',
  'Harassment': 'bg-purple-100 text-purple-700 border-purple-200',
  'Tenancy': 'bg-green-100 text-green-700 border-green-200',
  'General Legal Query': 'bg-gray-100 text-gray-700 border-gray-200',
}

const SUGGESTED_QUESTIONS = [
  { text: "My employer has not paid my salary for two months. What can I do?", icon: Star },
  { text: "I received a defective product from an online store and they refuse to refund.", icon: Sparkles },
  { text: "My landlord is refusing to return my security deposit after I moved out.", icon: Scale },
  { text: "I was harassed online. What legal action can I take under IT Act?", icon: AlertCircle },
]

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  )
}

function SourceCard({ source }: { source: LegalQueryResponse['sources'][0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden glass mt-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#c9a96e]" />
          <span className="text-[13px] font-semibold text-[#f0ece3]">{source.title}</span>
        </div>
        {expanded ? <ChevronUp className="w-3.5 h-3.5 text-[#f0ece3]/40" /> : <ChevronDown className="w-3.5 h-3.5 text-[#f0ece3]/40" />}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 text-[13px] animate-msg-in border-t border-white/10">
          <div>
            <span className="font-medium text-[#f0ece3]/60">Law Reference: </span>
            <span className="text-[#f0ece3]">{source.law_reference}</span>
          </div>
          <div className="flex items-start gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#c9a96e] mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-[#f0ece3]/60">Authority: </span>
              <span className="text-[#f0ece3]">{source.authority}</span>
            </div>
          </div>
          {source.documents_required.length > 0 && (
            <div>
              <span className="font-medium text-[#f0ece3]/60 block mb-1.5">Documents Required:</span>
              <ul className="space-y-1">
                {source.documents_required.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#f0ece3]/90">
                    <span className="text-[#c9a96e] mt-1 shrink-0">•</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AssistantMessage({ message }: { message: Message }) {
  const { response } = message
  const paragraphs = message.content.split('\n').filter((p) => p.trim())

  return (
    <div className="animate-msg-in space-y-4">
      {/* Answer */}
      <div className="bg-white/5 border border-white/10 rounded-[20px] rounded-tl-[6px] p-5 backdrop-blur-xl shadow-sm max-w-2xl text-[#f0ece3]">
        <div className="space-y-3">
          {paragraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <p key={i} className="font-semibold text-[#f0ece3] mt-4 mb-1 first:mt-0">{para.replace(/\*\*/g, '')}</p>
            }
            return <p key={i} className="text-[14px] leading-[1.7] text-[#f0ece3]/90 mb-3 last:mb-0">{para.replace(/\*\*/g, '')}</p>
          })}
        </div>

        {/* Citation Tag */}
        {response && response.sources.length > 0 && (
          <div className="inline-flex items-center gap-2 bg-[#c9a96e]/12 border border-[#c9a96e]/25 rounded-full px-3 py-1 mt-4">
            <FileText className="w-3 h-3 text-[#c9a96e]" />
            <span className="text-[11px] font-semibold text-[#c9a96e]">{response.sources[0].law_reference}</span>
          </div>
        )}
      </div>

      {/* Sources Grid */}
      {response && response.sources.length > 0 && (
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold text-[#f0ece3]/40 uppercase tracking-[2px] mb-2 px-1">Case References</p>
          {response.sources.map((source, i) => (
            <SourceCard key={i} source={source} />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      {response && (
        <div className="max-w-2xl flex gap-3 bg-[#c9a96e]/8 border border-[#c9a96e]/20 rounded-[16px] px-4 py-3 text-[11.5px] text-[#e8c99a]/80 leading-relaxed">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#c9a96e]" />
          {response.disclaimer}
        </div>
      )}
    </div>
  )
}

export function ChatInterface() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Handle window resize to auto-hide sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('legalease_history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setConversations(parsed)
      } catch (e) {
        console.error('Failed to parse history', e)
      }
    }
  }, [])

  // Save conversations to localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('legalease_history', JSON.stringify(conversations))
    }
  }, [conversations])

  const activeConversation = conversations.find(c => c.id === activeId) || null
  const messages = activeConversation?.messages || []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleNewChat = useCallback(() => {
    setActiveId(null)
    setInput('')
    setError(null)
  }, [])

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    setError(null)
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeId === id) setActiveId(null)
  }

  const handleSubmit = async (question: string) => {
    if (!question.trim() || isLoading) return
    setError(null)

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: question.trim(),
      timestamp: new Date().toISOString(),
    }

    let currentConvId = activeId
    let updatedConvs = [...conversations]

    if (!currentConvId) {
      // Create new conversation
      currentConvId = `c-${Date.now()}`
      const newConv: Conversation = {
        id: currentConvId,
        title: question.trim().substring(0, 40) + (question.length > 40 ? '...' : ''),
        messages: [userMsg],
        lastModified: new Date().toISOString(),
      }
      updatedConvs = [newConv, ...updatedConvs]
      setConversations(updatedConvs)
      setActiveId(currentConvId)
    } else {
      // Update existing
      updatedConvs = updatedConvs.map(c => {
        if (c.id === currentConvId) {
          return {
            ...c,
            messages: [...c.messages, userMsg],
            lastModified: new Date().toISOString()
          }
        }
        return c
      })
      setConversations(updatedConvs)
    }

    setInput('')
    setIsLoading(true)

    try {
      const response = await askLegalQuestion(question.trim())
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        response,
        timestamp: new Date().toISOString(),
      }

      setConversations(prev => prev.map(c => {
        if (c.id === currentConvId) {
          return {
            ...c,
            messages: [...c.messages, assistantMsg],
            lastModified: new Date().toISOString()
          }
        }
        return c
      }))
    } catch (err: any) {
      const msg = err?.message || 'Unknown error'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(input)
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Sidebar - Desktop & Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 lg:relative lg:inset-auto z-40 transition-all duration-300 ease-in-out bg-[#0d1f3c] border-r border-white/5 h-full overflow-hidden flex flex-col shrink-0",
          isSidebarOpen ? "w-80 translate-x-0 opacity-100" : "w-0 -translate-x-full lg:translate-x-0 lg:opacity-0"
        )}
      >
        <div className="w-80 h-full shrink-0">
          <HistorySidebar
            conversations={conversations}
            activeId={activeId}
            onSelect={(id) => {
              handleSelectConversation(id)
              if (window.innerWidth < 1024) setIsSidebarOpen(false)
            }}
            onNewChat={handleNewChat}
            onDelete={handleDeleteConversation}
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0d1f3c] relative">
        {/* Toggle Button (Modern Floating) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            "absolute top-6 z-50 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#f0ece3]/60 hover:text-[#c9a96e] transition-all duration-300 backdrop-blur-md shadow-lg",
            isSidebarOpen ? "left-6" : "left-6"
          )}
          style={{
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(0)',
            opacity: 1
          }}
          title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center pt-16 px-4 text-center">
              <div className="inline-flex items-center gap-2 bg-[#c9a96e]/12 border border-[#c9a96e]/25 rounded-full px-3 py-1.5 mb-6">
                <Star className="w-3 h-3 text-[#c9a96e] fill-current" />
                <span className="text-[11px] font-bold text-[#c9a96e] uppercase tracking-[0.5px]">Powered by Indian Law</span>
              </div>

              <h1 className="text-[clamp(36px,6vw,52px)] font-serif text-[#f0ece3] max-w-[600px] leading-[1.1] tracking-[-1.5px] mb-5">
                Your <em className="italic text-[#c9a96e] not-italic">Legal Guide,</em> in Plain Language
              </h1>

              <p className="text-[15px] font-light text-[#f0ece3]/60 max-w-[440px] leading-[1.7] mb-6">
                Simplifying complex laws into clear, actionable awareness for every citizen.
              </p>

              <div className="inline-flex items-center gap-2 bg-[#c9a96e]/8 border border-[#c9a96e]/2 rounded-full px-4 py-2 text-[11.5px] text-[#e8c99a]/80 mb-12">
                <AlertCircle className="w-4 h-4" />
                Legal awareness only — not legal advice
              </div>

              <div className="w-full max-w-[680px] space-y-3">
                <p className="text-[10px] font-semibold text-[#f0ece3]/35 uppercase tracking-[2px] mb-4">Try Asking</p>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(q.text)}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-[28px] glass group"
                  >
                    <div className="w-9 h-9 rounded-[10px] bg-[#c9a96e]/15 flex items-center justify-center text-[#c9a96e] shrink-0">
                      <q.icon className="w-[18px] h-[18px] stroke-[1.6]" />
                    </div>
                    <span className="text-[13.5px] text-[#f0ece3]/60 group-hover:text-[#f0ece3] transition-colors flex-1">{q.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f0ece3]/35 group-hover:text-[#c9a96e] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-[760px] mx-auto px-6 py-10 space-y-8">
              {messages.map((msg) => (
                <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'user' ? (
                    <div className="flex flex-col items-end gap-2 max-w-[85%] animate-msg-in">
                      <div className="bg-gradient-to-br from-[#c9a96e]/25 to-[#c9a96e]/12 border border-[#c9a96e]/25 px-5 py-4 rounded-[20px] rounded-br-[6px] text-[14px] text-[#f0ece3] leading-[1.7] backdrop-blur-xl">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4 max-w-full">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] flex items-center justify-center shrink-0 shadow-md">
                        <Scale className="w-4 h-4 text-[#0d1f3c] stroke-[2.5]" />
                      </div>
                      <AssistantMessage message={msg} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] flex items-center justify-center shrink-0 shadow-md">
                    <Scale className="w-4 h-4 text-[#0d1f3c] stroke-[2.5]" />
                  </div>
                  <div className="glass px-4 py-2 rounded-[20px] rounded-bl-[6px]">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {error && (
                <div className="glass px-5 py-4 rounded-2xl text-red-400 text-[13px] border-red-400/20">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="relative bg-gradient-to-t from-[#0d1f3c] via-[#0d1f3c] to-transparent pt-10 pb-8 px-6">
          <div className="max-w-[760px] mx-auto">
            <div className="flex items-end gap-3 glass p-2 rounded-[28px] focus-within:border-[#c9a96e] focus-within:shadow-[0_0_0_3px_rgba(201,169,110,0.08)] transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your legal situation..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none text-[#f0ece3] text-[14px] px-4 py-2.5 resize-none max-h-32 placeholder:text-[#f0ece3]/35"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSubmit(input)}
                disabled={!input.trim() || isLoading}
                className={cn(
                  'w-10 h-10 rounded-[12px] flex items-center justify-center transition-all',
                  input.trim() && !isLoading
                    ? 'bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] shadow-md hover:scale-105 active:scale-95'
                    : 'bg-white/5 text-[#f0ece3]/20 cursor-not-allowed'
                )}
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            <p className="text-center text-[11px] text-[#f0ece3]/35 mt-4">
              LegalEase provides legal awareness only. Always consult a qualified lawyer for your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
