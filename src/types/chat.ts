import { LegalQueryResponse } from '@/lib/api'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  response?: LegalQueryResponse
  timestamp: string // Store as ISO string for easy serialization
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  lastModified: string
}
