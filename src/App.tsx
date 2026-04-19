/**
 * LegalEase AI Platform
 * Main application router and layout
 *
 * Architecture:
 * - Chat Interface → AI-powered legal Q&A
 * - Learn Page → Legal education modules
 * - Topics Page → Legal topic explorer
 * - Dashboard Page → NGO analytics
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { LearnPage } from '@/pages/LearnPage'
import { TopicsPage } from '@/pages/TopicsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { AISettingsPage } from '@/pages/AISettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
        {/* Ambient Background Blobs */}
        <div className="fixed top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.15),transparent)] blur-[100px] pointer-events-none z-[-1]" />
        <div className="fixed bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(30,58,95,0.15),transparent)] blur-[100px] pointer-events-none z-[-1]" />
        <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.05),transparent)] blur-[100px] pointer-events-none z-[-1]" />

        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<AISettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}