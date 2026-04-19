/**
 * AI Settings Page
 * Dynamic API Key Management System
 */

import { useState, useEffect, useCallback } from 'react'
import {
  Key, Plus, Trash2, Edit2, CheckCircle, XCircle, Zap,
  ChevronDown, Eye, EyeOff, Loader2, Shield, Star,
  Settings, RefreshCw, Download, AlertCircle, Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getApiKeys, addApiKey, updateApiKey, deleteApiKey,
  getActiveAi, setActiveAi, maskApiKey, testApiKey,
} from '@/lib/aiKeyStore'
import type { ApiKeyConfig } from '@/types/aiConfig'
import {
  PROVIDER_LABELS, PROVIDER_DEFAULT_MODELS,
  PROVIDER_MODEL_HINTS, AiProvider,
} from '@/types/aiConfig'

// ── Key format hints per provider ─────────────────────────────────────────

const PROVIDER_KEY_HINTS: Record<AiProvider, string> = {
  openrouter: 'Must start with sk-or-v1-... (get at openrouter.ai/keys)',
  openai:     'Must start with sk-... (get at platform.openai.com)',
  anthropic:  'Must start with sk-ant-... (get at console.anthropic.com)',
  groq:       'Must start with gsk_... (get at console.groq.com)',
  together:   'Get at api.together.xyz/settings/api-keys',
  stepfun:    'Get at platform.stepfun.ai/interface-key',
  custom:     'Enter the API key as required by your custom endpoint',
}

// ── Toast ──────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'info'
interface Toast { id: number; message: string; type: ToastType }

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className={cn(
            'pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl animate-msg-in text-[13.5px] font-medium cursor-pointer backdrop-blur-xl max-w-[400px]',
            t.type === 'success' && 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300',
            t.type === 'error'   && 'bg-red-500/20 border border-red-400/30 text-red-300',
            t.type === 'info'    && 'bg-[#c9a96e]/15 border border-[#c9a96e]/30 text-[#e8c99a]',
          )}
        >
          {t.type === 'success' && <CheckCircle className="w-4 h-4 shrink-0" />}
          {t.type === 'error'   && <XCircle className="w-4 h-4 shrink-0" />}
          {t.type === 'info'    && <Zap className="w-4 h-4 shrink-0" />}
          <span className="break-words">{t.message}</span>
        </div>
      ))}
    </div>
  )
}

// ── Add / Edit Form ────────────────────────────────────────────────────────

interface KeyFormData {
  name: string
  provider: AiProvider
  apiKey: string
  model: string
}

const EMPTY_FORM: KeyFormData = {
  name: '', provider: 'openrouter',
  apiKey: '', model: PROVIDER_DEFAULT_MODELS['openrouter'],
}

function KeyForm({
  initial, onSubmit, onCancel, submitLabel, isLoading, onTest, testState,
}: {
  initial: KeyFormData
  onSubmit: (data: KeyFormData) => void
  onCancel: () => void
  submitLabel: string
  isLoading: boolean
  onTest: (data: KeyFormData) => void
  testState: 'idle' | 'testing' | 'ok' | 'fail'
}) {
  const [form, setForm] = useState<KeyFormData>(initial)
  const [showKey, setShowKey] = useState(false)

  const set = (field: keyof KeyFormData, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'provider') {
        next.model = PROVIDER_DEFAULT_MODELS[value as AiProvider] || ''
      }
      return next
    })
  }

  const isValid = form.name.trim() && form.apiKey.trim() && form.model.trim()
  const providers = Object.entries(PROVIDER_LABELS) as [AiProvider, string][]

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-[11px] font-bold text-[#f0ece3]/50 uppercase tracking-[2px] mb-1.5">Key Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. My OpenRouter Key"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
        />
      </div>

      {/* Provider */}
      <div>
        <label className="block text-[11px] font-bold text-[#f0ece3]/50 uppercase tracking-[2px] mb-1.5">Provider</label>
        <div className="relative">
          <select
            value={form.provider}
            onChange={(e) => set('provider', e.target.value)}
            className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-[#f0ece3] focus:outline-none focus:border-[#c9a96e]/50 transition-colors cursor-pointer"
          >
            {providers.map(([val, label]) => (
              <option key={val} value={val} className="bg-[#0d1f3c]">{label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0ece3]/40 pointer-events-none" />
        </div>
      </div>

      {/* API Key */}
      <div>
        <label className="block text-[11px] font-bold text-[#f0ece3]/50 uppercase tracking-[2px] mb-1.5">API Key</label>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={form.apiKey}
            onChange={(e) => set('apiKey', e.target.value)}
            placeholder={form.provider === 'openrouter' ? 'sk-or-v1-...' : form.provider === 'groq' ? 'gsk_...' : 'Enter API key'}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-11 text-[14px] text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors font-mono"
          />
          <button
            type="button"
            onClick={() => setShowKey((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f0ece3]/30 hover:text-[#f0ece3]/60 transition-colors"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {/* Key format hint */}
        <p className="mt-1.5 text-[11px] text-[#c9a96e]/60 pl-1 flex items-center gap-1">
          <Info className="w-3 h-3 shrink-0" />
          {PROVIDER_KEY_HINTS[form.provider]}
        </p>
      </div>

      {/* Model */}
      <div>
        <label className="block text-[11px] font-bold text-[#f0ece3]/50 uppercase tracking-[2px] mb-1.5">Model Name</label>
        <input
          type="text"
          value={form.model}
          onChange={(e) => set('model', e.target.value)}
          placeholder={PROVIDER_MODEL_HINTS[form.provider]}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-[#f0ece3] placeholder:text-[#f0ece3]/25 focus:outline-none focus:border-[#c9a96e]/50 transition-colors font-mono"
        />
        <p className="mt-1.5 text-[11px] text-[#f0ece3]/35 pl-1">{PROVIDER_MODEL_HINTS[form.provider]}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          disabled={!isValid || testState === 'testing'}
          onClick={() => onTest(form)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all border',
            !isValid
              ? 'opacity-30 cursor-not-allowed border-white/10 text-[#f0ece3]/40'
              : testState === 'ok'
              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300'
              : testState === 'fail'
              ? 'border-red-400/40 bg-red-500/10 text-red-300'
              : 'border-white/10 bg-white/5 text-[#f0ece3]/60 hover:text-[#f0ece3] hover:border-white/20',
          )}
        >
          {testState === 'testing' ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : testState === 'ok'   ? <CheckCircle className="w-3.5 h-3.5" />
            : testState === 'fail' ? <XCircle className="w-3.5 h-3.5" />
            : <Zap className="w-3.5 h-3.5" />}
          {testState === 'testing' ? 'Testing...'
            : testState === 'ok'   ? 'Valid! ✅'
            : testState === 'fail' ? 'Invalid ❌'
            : 'Test Key'}
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-[13px] font-medium text-[#f0ece3]/50 hover:text-[#f0ece3] transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!isValid || isLoading}
          onClick={() => onSubmit(form)}
          className={cn(
            'flex items-center gap-2 px-5 py-2 rounded-xl text-[13px] font-semibold transition-all',
            isValid && !isLoading
              ? 'bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] shadow-md hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-white/5 text-[#f0ece3]/20 cursor-not-allowed',
          )}
        >
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </div>
  )
}

// ── Key Card ───────────────────────────────────────────────────────────────

function KeyCard({ config, isActive, onSetActive, onEdit, onDelete }: {
  config: ApiKeyConfig; isActive: boolean
  onSetActive: () => void; onEdit: () => void; onDelete: () => void
}) {
  const providerLabel = PROVIDER_LABELS[config.provider as AiProvider] ?? config.provider
  return (
    <div className={cn(
      'group flex items-center gap-4 p-4 rounded-2xl border transition-all',
      isActive
        ? 'border-[#c9a96e]/40 bg-[#c9a96e]/8 shadow-[0_0_24px_rgba(201,169,110,0.1)]'
        : 'border-white/8 bg-white/3 hover:border-white/15',
    )}>
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
        isActive ? 'bg-[#c9a96e]/20 text-[#c9a96e]' : 'bg-white/5 text-[#f0ece3]/40',
      )}>
        <Key className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[14px] font-semibold text-[#f0ece3] truncate">{config.name}</span>
          {isActive && (
            <span className="flex items-center gap-1 bg-[#c9a96e]/20 border border-[#c9a96e]/30 text-[#c9a96e] text-[10px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-full shrink-0">
              <Star className="w-2.5 h-2.5 fill-current" /> Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#f0ece3]/40 flex-wrap">
          <span className="font-medium text-[#c9a96e]/70">{providerLabel}</span>
          <span>·</span>
          <span className="font-mono truncate max-w-[180px]">{config.model}</span>
          <span>·</span>
          <span className="font-mono">{maskApiKey(config.apiKey)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {!isActive && (
          <button
            onClick={onSetActive}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#c9a96e]/70 hover:text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all border border-transparent hover:border-[#c9a96e]/20"
          >
            <CheckCircle className="w-3.5 h-3.5" /> Activate
          </button>
        )}
        <button onClick={onEdit} className="p-1.5 rounded-lg text-[#f0ece3]/30 hover:text-[#f0ece3]/70 hover:bg-white/8 transition-all">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button onClick={onDelete} className="p-1.5 rounded-lg text-[#f0ece3]/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────

const ENV_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined

export function AISettingsPage() {
  const [keys, setKeys] = useState<ApiKeyConfig[]>([])
  const [activeKeyId, setActiveKeyId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [toastCounter, setToastCounter] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [testState, setTestState] = useState<'idle' | 'testing' | 'ok' | 'fail'>('idle')
  const [selectorOpen, setSelectorOpen] = useState(false)

  const reload = useCallback(() => {
    setKeys(getApiKeys())
    const active = getActiveAi()
    setActiveKeyId(active?.activeKeyId ?? null)
  }, [])

  useEffect(() => { reload() }, [reload])

  const pushToast = (message: string, type: ToastType = 'success') => {
    const id = toastCounter + 1
    setToastCounter(id)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }
  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const handleAdd = async (data: KeyFormData) => {
    setFormLoading(true)
    addApiKey(data.name, data.provider, data.apiKey, data.model)
    reload()
    setShowAddForm(false)
    setTestState('idle')
    pushToast(`"${data.name}" added successfully!`, 'success')
    setFormLoading(false)
  }

  const handleUpdate = async (data: KeyFormData) => {
    if (!editingId) return
    setFormLoading(true)
    updateApiKey(editingId, { name: data.name, provider: data.provider, apiKey: data.apiKey, model: data.model })
    reload()
    setEditingId(null)
    setTestState('idle')
    pushToast(`"${data.name}" updated!`, 'success')
    setFormLoading(false)
  }

  const handleDelete = (key: ApiKeyConfig) => {
    deleteApiKey(key.id)
    reload()
    pushToast(`"${key.name}" deleted.`, 'info')
  }

  const handleSetActive = (keyId: string) => {
    setActiveAi(keyId)
    reload()
    const key = keys.find((k) => k.id === keyId)
    pushToast(`Switched to "${key?.name}"`, 'success')
    setSelectorOpen(false)
  }

  const handleTest = async (data: KeyFormData) => {
    setTestState('testing')
    const result = await testApiKey(data.apiKey, data.model, data.provider)
    setTestState(result.success ? 'ok' : 'fail')
    if (result.success) {
      pushToast('API key is valid! ✅', 'success')
    } else {
      pushToast(`Key test failed: ${result.error || 'Unknown error'}`, 'error')
    }
  }

  // One-click import of the .env.local key
  const handleImportEnvKey = () => {
    if (!ENV_KEY) return
    const alreadyImported = keys.some((k) => k.apiKey === ENV_KEY)
    if (alreadyImported) {
      pushToast('This key is already saved!', 'info')
      return
    }
    addApiKey('Default (from .env)', 'openrouter', ENV_KEY, 'stepfun/step-3.5-flash:free')
    reload()
    pushToast('Default key imported and set as active! ✅', 'success')
  }

  const activeKey = keys.find((k) => k.id === activeKeyId)
  const editingConfig = editingId ? keys.find((k) => k.id === editingId) : null
  const envKeyAlreadyImported = ENV_KEY ? keys.some((k) => k.apiKey === ENV_KEY) : true

  return (
    <div className="max-w-[780px] mx-auto px-6 py-14">

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a96e]/20 to-[#e8c99a]/10 border border-[#c9a96e]/25 flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#c9a96e] stroke-[1.6]" />
          </div>
          <div>
            <h1 className="text-[26px] font-serif text-[#f0ece3] leading-none">AI Settings</h1>
            <p className="text-[12px] text-[#f0ece3]/40 mt-1">Manage your API keys and active AI provider</p>
          </div>
        </div>

        {/* ── One-click .env import banner ─────────────────────────────── */}
        {ENV_KEY && !envKeyAlreadyImported && (
          <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-400/25 rounded-2xl px-5 py-4 mb-5 animate-msg-in">
            <Download className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-emerald-300 mb-0.5">Working key detected in .env.local</p>
              <p className="text-[11px] text-emerald-300/60 font-mono truncate">{maskApiKey(ENV_KEY)} · OpenRouter · stepfun/step-3.5-flash:free</p>
            </div>
            <button
              onClick={handleImportEnvKey}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Import & Activate
            </button>
          </div>
        )}

        {/* Active AI Banner */}
        <div
          className={cn(
            'relative flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer',
            activeKey
              ? 'border-[#c9a96e]/30 bg-[#c9a96e]/8 hover:border-[#c9a96e]/50'
              : 'border-white/8 bg-white/3 hover:border-white/15',
          )}
          onClick={() => setSelectorOpen((v) => !v)}
        >
          <div className="w-9 h-9 rounded-xl bg-[#c9a96e]/15 border border-[#c9a96e]/25 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-[#c9a96e]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-[#f0ece3]/40 uppercase tracking-[2px] mb-0.5">
              Active AI Provider
            </div>
            {activeKey ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14px] font-semibold text-[#f0ece3]">{activeKey.name}</span>
                <span className="text-[12px] text-[#f0ece3]/40">·</span>
                <span className="text-[12px] font-mono text-[#c9a96e]/80">{activeKey.model}</span>
              </div>
            ) : (
              <span className="text-[13px] text-[#f0ece3]/40 italic">Using fallback from .env.local</span>
            )}
          </div>
          <RefreshCw className={cn('w-4 h-4 text-[#f0ece3]/30 transition-transform shrink-0', selectorOpen && 'rotate-180')} />

          {/* Dropdown */}
          {selectorOpen && keys.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-[#0d1f3c]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-msg-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 space-y-1">
                {keys.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => handleSetActive(k.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all',
                      k.id === activeKeyId
                        ? 'bg-[#c9a96e]/15 text-[#c9a96e]'
                        : 'text-[#f0ece3]/70 hover:bg-white/5 hover:text-[#f0ece3]',
                    )}
                  >
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold truncate">{k.name}</div>
                      <div className="text-[11px] font-mono opacity-60 truncate">{k.model}</div>
                    </div>
                    {k.id === activeKeyId && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Key format guide ─────────────────────────────────────────── */}
      <div className="flex gap-3 bg-amber-500/8 border border-amber-400/20 rounded-2xl px-5 py-4 mb-8 text-[12px]">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400/70" />
        <div className="text-[#f0ece3]/60 leading-relaxed">
          <span className="text-amber-300/90 font-semibold">Important: </span>
          Each provider requires its own API key — they are NOT interchangeable.
          OpenRouter keys start with <code className="bg-white/10 px-1 rounded text-[11px]">sk-or-v1-</code>,
          Groq keys with <code className="bg-white/10 px-1 rounded text-[11px]">gsk_</code>,
          OpenAI keys with <code className="bg-white/10 px-1 rounded text-[11px]">sk-</code>.
          Using the wrong key format for a provider will cause a 401 error.
        </div>
      </div>

      {/* Saved Keys */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[14px] font-semibold text-[#f0ece3]/70 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#c9a96e]" />
            Saved API Keys
            <span className="text-[11px] font-normal text-[#f0ece3]/30 ml-1">({keys.length})</span>
          </h2>
          <button
            onClick={() => { setShowAddForm(true); setEditingId(null); setTestState('idle') }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold bg-gradient-to-br from-[#c9a96e] to-[#e8c99a] text-[#0d1f3c] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Key
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="glass rounded-2xl p-6 mb-4 animate-msg-in">
            <h3 className="text-[13px] font-bold text-[#f0ece3]/70 uppercase tracking-[1.5px] mb-5">New API Key</h3>
            <KeyForm
              initial={EMPTY_FORM}
              onSubmit={handleAdd}
              onCancel={() => { setShowAddForm(false); setTestState('idle') }}
              submitLabel="Add Key"
              isLoading={formLoading}
              onTest={handleTest}
              testState={testState}
            />
          </div>
        )}

        {/* Edit Form */}
        {editingConfig && (
          <div className="glass rounded-2xl p-6 mb-4 animate-msg-in">
            <h3 className="text-[13px] font-bold text-[#f0ece3]/70 uppercase tracking-[1.5px] mb-5">
              Edit Key — {editingConfig.name}
            </h3>
            <KeyForm
              initial={{
                name: editingConfig.name, provider: editingConfig.provider as AiProvider,
                apiKey: editingConfig.apiKey, model: editingConfig.model,
              }}
              onSubmit={handleUpdate}
              onCancel={() => { setEditingId(null); setTestState('idle') }}
              submitLabel="Save Changes"
              isLoading={formLoading}
              onTest={handleTest}
              testState={testState}
            />
          </div>
        )}

        {/* Keys List */}
        {keys.length === 0 && !showAddForm ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Key className="w-8 h-8 text-[#f0ece3]/15 mx-auto mb-3" />
            <p className="text-[14px] text-[#f0ece3]/30 mb-1">No API keys added yet</p>
            <p className="text-[12px] text-[#f0ece3]/20">
              Click "Import & Activate" above to use your existing key, or add a new one.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {keys.map((k) => (
              <KeyCard
                key={k.id}
                config={k}
                isActive={k.id === activeKeyId}
                onSetActive={() => handleSetActive(k.id)}
                onEdit={() => { setEditingId(k.id); setShowAddForm(false); setTestState('idle') }}
                onDelete={() => handleDelete(k)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Security Note */}
      <div className="flex gap-3 bg-white/3 border border-white/8 rounded-2xl px-5 py-4 text-[12px] text-[#f0ece3]/40 leading-relaxed">
        <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#c9a96e]/50" />
        <div>
          <span className="text-[#f0ece3]/60 font-medium">Security Note: </span>
          Keys are stored in your browser's localStorage and never sent anywhere except the AI provider's API endpoint. Keys are always masked in the UI (e.g., sk-****xxxx).
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
