/**
 * Legal Learning Module Page
 * Provides structured legal education with lessons and quizzes
 */

import { useState } from 'react'
import { BookOpen, ChevronRight, Clock, CheckCircle, XCircle, ArrowLeft, Award, ShoppingCart, Lock, Briefcase, Users, Home, Heart, Building2, Scale, FileText, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { learningModules, type LearningModule, type LearningLesson } from '@/data/learningModules'

const MODULE_ICONS: Record<string, any> = {
  'Know Your Consumer Rights': ShoppingCart,
  'Cyber Safety Awareness': Lock,
  'Labour Rights Overview': Briefcase,
  'Rights Against Harassment and Abuse': Users,
  'Tenant Rights and Rental Laws': Home,
  'Marriage, Divorce & Family Rights': Heart,
  'Property Rights & Inheritance Law': Building2,
  'Criminal Justice & Your Rights': Scale,
  'RTI & Government Services Guide': FileText,
  'Education & Student Rights': GraduationCap,
}

const MODULE_ACCENTS: Record<string, string> = {
  'Know Your Consumer Rights': '#c9a96e',
  'Cyber Safety Awareness': '#e07d3c',
  'Labour Rights Overview': '#4fa3cf',
  'Rights Against Harassment and Abuse': '#8b5cf6',
  'Tenant Rights and Rental Laws': '#10b981',
  'Marriage, Divorce & Family Rights': '#ec4899',
  'Property Rights & Inheritance Law': '#f59e0b',
  'Criminal Justice & Your Rights': '#64748b',
  'RTI & Government Services Guide': '#06b6d4',
  'Education & Student Rights': '#6366f1',
}

// ── Quiz Component ─────────────────────────────────────────────────────────
function QuizSection({ quiz }: { quiz: NonNullable<LearningLesson['quiz']> }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const question = quiz[0]
  if (!question) return null

  return (
    <div className="mt-8 border border-[#c9a96e]/20 rounded-2xl p-6 bg-[#c9a96e]/5 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-[#c9a96e]" />
        <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[2px]">Quick Check</span>
      </div>
      <p className="font-semibold text-base text-[#f0ece3] mb-4">{question.question}</p>
      <div className="space-y-2.5">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={submitted}
            onClick={() => setSelected(i)}
            className={cn(
              'w-full text-left text-sm px-4 py-3 rounded-xl border transition-all duration-200',
              !submitted && selected === i ? 'border-[#c9a96e]/60 bg-[#c9a96e]/10' : 'border-white/10 bg-white/5 hover:border-[#c9a96e]/30',
              submitted && i === question.answer ? 'border-green-500/50 bg-green-500/10 text-green-400 font-semibold' : '',
              submitted && selected === i && i !== question.answer ? 'border-red-500/50 bg-red-500/10 text-red-400' : '',
              submitted && i !== question.answer && i !== selected ? 'opacity-40' : ''
            )}
          >
            <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
          </button>
        ))}
      </div>
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
          className="mt-4 px-6 py-2.5 bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] text-sm font-semibold rounded-full disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Submit Answer
        </button>
      ) : (
        <div className={cn('mt-4 flex items-center gap-2 text-sm font-medium', selected === question.answer ? 'text-green-400' : 'text-red-400')}>
          {selected === question.answer ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {selected === question.answer ? 'Correct! Well done.' : `Incorrect. The right answer is: ${question.options[question.answer]}`}
        </div>
      )}
    </div>
  )
}

// ── Lesson View ───────────────────────────────────────────────────────────
function LessonView({ lesson, onBack }: { lesson: LearningLesson; onBack: () => void }) {
  const paragraphs = lesson.content.split('\n').filter((p) => p.trim())

  return (
    <div className="animate-msg-in">
      <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-[#f0ece3]/40 hover:text-[#f0ece3] mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to module
      </button>

      <h2 className="text-2xl font-serif text-[#f0ece3] mb-6 leading-tight">{lesson.title}</h2>

      <div className="space-y-4">
        {paragraphs.map((para, i) => {
          if (para.startsWith('**') && para.endsWith('**') && para.replace(/\*\*/g, '').length > 0) {
            return <h3 key={i} className="font-bold text-[#f0ece3] text-lg mt-8 mb-3 first:mt-0">{para.replace(/\*\*/g, '')}</h3>
          }
          if (para.startsWith('**') && para.includes('**')) {
            const parts = para.split(/\*\*(.*?)\*\*/)
            return (
              <p key={i} className="text-[15px] text-[#f0ece3]/80 leading-[1.8]">
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-[#f0ece3] font-semibold">{part}</strong> : part)}
              </p>
            )
          }
          return <p key={i} className="text-[15px] text-[#f0ece3]/80 leading-[1.8]">{para}</p>
        })}
      </div>

      {lesson.keyPoints.length > 0 && (
        <div className="mt-8 border border-[#c9a96e]/20 rounded-2xl p-6 bg-white/5 backdrop-blur-sm">
          <p className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[2px] mb-4">Key Takeaways</p>
          <ul className="space-y-3">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-[14px] text-[#f0ece3]/90 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-[#c9a96e] shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.quiz && <QuizSection quiz={lesson.quiz} />}
    </div>
  )
}

// ── Module View ───────────────────────────────────────────────────────────
function ModuleView({ module, onBack }: { module: LearningModule; onBack: () => void }) {
  const [activeLesson, setActiveLesson] = useState<LearningLesson | null>(null)
  const Icon = MODULE_ICONS[module.title] || BookOpen

  if (activeLesson) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-msg-in">
      <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-[#f0ece3]/40 hover:text-[#f0ece3] mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        All modules
      </button>

      <div className="glass rounded-[36px] p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[36px] opacity-[0.07] pointer-events-none" style={{ backgroundColor: MODULE_ACCENTS[module.title] }} />
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-semibold text-[#c9a96e] uppercase tracking-[2.5px]">{module.category}</span>
        </div>
        <div className="w-12 h-12 rounded-[14px] bg-[#c9a96e]/15 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] mb-5">
          <Icon className="w-6 h-6 stroke-[1.6]" />
        </div>
        <h2 className="text-2xl font-serif text-[#f0ece3] mb-2 leading-tight">{module.title}</h2>
        <p className="text-[14px] font-light text-[#f0ece3]/60 mb-4 leading-relaxed">{module.description}</p>
        <div className="flex items-center gap-4 text-[12px] text-[#f0ece3]/40">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {module.estimatedMinutes} min</span>
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {module.lessons.length} lessons</span>
        </div>
      </div>

      <div className="space-y-3">
        {module.lessons.map((lesson, i) => (
          <button
            key={lesson.id}
            onClick={() => setActiveLesson(lesson)}
            className="w-full flex items-center gap-4 p-5 glass rounded-[24px] hover:scale-[1.01] active:scale-[0.99] group text-left"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#c9a96e]/10 group-hover:border-[#c9a96e]/30 transition-all">
              <span className="text-sm font-bold text-[#f0ece3]/40 group-hover:text-[#c9a96e]">{i + 1}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[15px] text-[#f0ece3] group-hover:text-[#c9a96e] transition-colors">{lesson.title}</p>
              {lesson.quiz && <p className="text-[11px] text-[#f0ece3]/30 mt-0.5 uppercase tracking-wider font-semibold">Includes Quiz</p>}
            </div>
            <ChevronRight className="w-4 h-4 text-[#f0ece3]/20 group-hover:text-[#c9a96e] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────
export function LearnPage() {
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null)

  if (activeModule) {
    return <ModuleView module={activeModule} onBack={() => setActiveModule(null)} />
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-16">
      <header className="text-center mb-16">
        <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[3px] mb-4 block">Legal Education</span>
        <h1 className="text-[clamp(32px,5vw,46px)] font-serif text-[#f0ece3] mb-5 tracking-[-1px] leading-tight">Master Your <em>Legal Rights</em></h1>
        <p className="text-[15px] font-light text-[#f0ece3]/60 max-w-[520px] mx-auto leading-[1.7]">
          Structured modules designed to empower you with essential legal knowledge through simple, expert-verified lessons.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          { label: 'Total Modules', value: '10' },
          { label: 'Active Lessons', value: '30' },
          { label: 'Learners Today', value: '12k' },
        ].map(({ label, value }) => (
          <div key={label} className="glass rounded-[28px] p-8 text-center hover:scale-[1.02] transition-transform">
            <div className="text-[40px] font-serif text-[#c9a96e] mb-1">{value}</div>
            <div className="text-[11px] font-semibold text-[#f0ece3]/40 uppercase tracking-[1.5px]">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules.map((module) => {
          const Icon = MODULE_ICONS[module.title] || BookOpen
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module)}
              className="group text-left glass rounded-[36px] flex flex-col relative overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)] transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-[36px] opacity-[0.07] pointer-events-none group-hover:opacity-[0.12] transition-opacity" style={{ backgroundColor: MODULE_ACCENTS[module.title] }} />
              <div className="p-8 pb-6 flex-1">
                <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[2px] mb-5 block">{module.category}</span>
                <div className="w-12 h-12 rounded-[14px] bg-[#c9a96e]/15 border border-[#c9a96e]/25 flex items-center justify-center text-[#c9a96e] mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.6]" />
                </div>
                <h3 className="text-[20px] font-serif text-[#f0ece3] mb-3 leading-tight group-hover:text-[#c9a96e] transition-colors">{module.title}</h3>
                <p className="text-[13px] font-light text-[#f0ece3]/60 leading-relaxed line-clamp-2">{module.description}</p>
              </div>
              <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex gap-4 text-[12px] text-[#f0ece3]/30">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {module.estimatedMinutes} min</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {module.lessons.length}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] flex items-center justify-center text-[#0d1f3c] shadow-sm group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
