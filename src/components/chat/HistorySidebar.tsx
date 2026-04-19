import { Message, Conversation } from '@/types/chat'
import { Plus, MessageSquare, History, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

interface HistorySidebarProps {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
  onDelete: (id: string) => void
}

export function HistorySidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
}: HistorySidebarProps) {
  return (
    <div className="w-full bg-[#071324] flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-white/10">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985d] text-[#0d1f3c] font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4 text-[#0d1f3c]" />
          <span>New Consultation</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        <div className="flex items-center gap-2 px-2 pb-2 text-[11px] font-bold text-[#f0ece3]/30 uppercase tracking-[2px]">
          <History className="w-3 h-3" />
          <span>Recent Sessions</span>
        </div>

        {conversations.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <p className="text-[13px] text-[#f0ece3]/20 italic">No history yet</p>
          </div>
        ) : (
          conversations.sort((a,b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()).map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border border-transparent hover:bg-white/5",
                activeId === conv.id ? "bg-white/8 border-white/10 shadow-inner" : ""
              )}
              onClick={() => onSelect(conv.id)}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                activeId === conv.id ? "bg-[#c9a96e]/20 text-[#c9a96e]" : "bg-white/5 text-[#f0ece3]/40"
              )}>
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <p className={cn(
                  "text-[13.5px] truncate leading-tight",
                  activeId === conv.id ? "text-[#f0ece3] font-medium" : "text-[#f0ece3]/60"
                )}>
                  {conv.title}
                </p>
                <p className="text-[11px] text-[#f0ece3]/30 mt-1">
                  {formatDistanceToNow(new Date(conv.lastModified), { addSuffix: true })}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(conv.id)
                }}
                className="absolute right-2.5 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-all text-[#f0ece3]/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-white/2">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e]/20 to-[#e8c99a]/10 border border-[#c9a96e]/20 flex items-center justify-center">
            <Scale className="w-3.5 h-3.5 text-[#c9a96e]" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#f0ece3]">LegalEase Pro</p>
            <p className="text-[10px] text-[#f0ece3]/40 font-medium">Academic Version 1.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Scale(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h18" />
    </svg>
  )
}
