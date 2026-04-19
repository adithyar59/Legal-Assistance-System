import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatHistorySidebarProps {
  history: { id: string; title: string; messages: { role: string; content: string; timestamp: Date }[] }[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
}

export function ChatHistorySidebar({ history, onSelect, onDelete, selectedId }: ChatHistorySidebarProps) {
  return (
    <aside className="w-64 bg-[#162a4a] border-r border-white/10 h-full flex flex-col">
      <div className="p-4 border-b border-white/10 text-[#f0ece3] font-bold text-lg">Chat History</div>
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-4 text-[#f0ece3]/60 text-sm">No saved conversations.</div>
        ) : (
          <ul className="divide-y divide-white/10">
            {history.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#1e3a5f]/40 transition',
                  selectedId === item.id && 'bg-[#1e3a5f]/60'
                )}
                onClick={() => onSelect(item.id)}
              >
                <span className="truncate text-[#f0ece3] text-[15px]">{item.title}</span>
                <button
                  className="ml-2 text-[#c9a96e] hover:text-red-400 text-xs px-1"
                  onClick={e => { e.stopPropagation(); onDelete(item.id); }}
                  title="Delete conversation"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
