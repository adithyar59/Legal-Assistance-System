/**
 * AI Key Store — localStorage-based storage layer
 *
 * Replaces backend APIs with client-side equivalents:
 *   getApiKeys()     → GET  /get_api_keys
 *   addApiKey()      → POST /add_api_key
 *   updateApiKey()   → PUT  /update_api_key
 *   deleteApiKey()   → DELETE /api_key/:id
 *   getActiveAi()    → GET  /get_active_ai
 *   setActiveAi()    → POST /set_active_ai
 */

import type { ApiKeyConfig, ActiveAiConfig, AiProvider } from '@/types/aiConfig'
import { PROVIDER_BASE_URLS } from '@/types/aiConfig'

const KEYS_STORAGE_KEY = 'legalease_api_keys'
const ACTIVE_AI_STORAGE_KEY = 'legalease_active_ai'

// ── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  return `key_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Masks an API key for display.
 * e.g. "sk-or-v1-abc123xyz" → "sk-or****xyz"
 */
export function maskApiKey(key: string): string {
  if (!key || key.length < 8) return '****'
  const prefix = key.slice(0, 6)
  const suffix = key.slice(-4)
  return `${prefix}****${suffix}`
}

// ── GET /get_api_keys ──────────────────────────────────────────────────────

export function getApiKeys(): ApiKeyConfig[] {
  try {
    const raw = localStorage.getItem(KEYS_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as ApiKeyConfig[]
  } catch {
    return []
  }
}

// ── POST /add_api_key ──────────────────────────────────────────────────────

export function addApiKey(
  name: string,
  provider: AiProvider,
  apiKey: string,
  model: string,
): ApiKeyConfig {
  const keys = getApiKeys()
  const newKey: ApiKeyConfig = {
    id: generateId(),
    name: name.trim(),
    provider,
    apiKey: apiKey.trim(),
    model: model.trim(),
    createdAt: new Date().toISOString(),
  }
  keys.push(newKey)
  localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys))

  // If this is the first key, auto-set it as active
  if (keys.length === 1) {
    setActiveAi(newKey.id)
  }

  return newKey
}

// ── PUT /update_api_key ────────────────────────────────────────────────────

export function updateApiKey(
  id: string,
  updates: Partial<Pick<ApiKeyConfig, 'name' | 'provider' | 'apiKey' | 'model'>>,
): boolean {
  const keys = getApiKeys()
  const index = keys.findIndex((k) => k.id === id)
  if (index === -1) return false

  keys[index] = { ...keys[index], ...updates }
  localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys))
  return true
}

// ── DELETE /api_key/:id ────────────────────────────────────────────────────

export function deleteApiKey(id: string): void {
  const keys = getApiKeys().filter((k) => k.id !== id)
  localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys))

  // If deleted key was active, clear active config
  const active = getActiveAi()
  if (active?.activeKeyId === id) {
    // Auto-select first remaining key, or clear
    if (keys.length > 0) {
      setActiveAi(keys[0].id)
    } else {
      localStorage.removeItem(ACTIVE_AI_STORAGE_KEY)
    }
  }
}

// ── GET /get_active_ai ─────────────────────────────────────────────────────

export function getActiveAi(): ActiveAiConfig | null {
  try {
    const raw = localStorage.getItem(ACTIVE_AI_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ActiveAiConfig
  } catch {
    return null
  }
}

// ── POST /set_active_ai ────────────────────────────────────────────────────

export function setActiveAi(keyId: string): void {
  const config: ActiveAiConfig = { activeKeyId: keyId }
  localStorage.setItem(ACTIVE_AI_STORAGE_KEY, JSON.stringify(config))
}

// ── Resolve active key config (used by api.ts) ─────────────────────────────

export interface ResolvedAiConfig {
  apiKey: string
  model: string
  baseUrl: string
  provider: AiProvider
  name: string
}

/**
 * Returns the fully resolved active AI configuration.
 * Falls back to the VITE_OPENROUTER_API_KEY env var if nothing is configured in the store.
 */
export function resolveActiveAiConfig(): ResolvedAiConfig | null {
  const active = getActiveAi()
  if (active?.activeKeyId) {
    const keys = getApiKeys()
    const key = keys.find((k) => k.id === active.activeKeyId)
    if (key) {
      // Safe URL lookup — falls back to OpenRouter if provider is unknown
      const baseUrl = PROVIDER_BASE_URLS[key.provider as AiProvider] ?? PROVIDER_BASE_URLS['openrouter']
      return {
        apiKey: key.apiKey,
        model: key.model,
        baseUrl,
        provider: key.provider as AiProvider,
        name: key.name,
      }
    }
  }
  return null
}

// ── Test API key ───────────────────────────────────────────────────────────

/**
 * Fires a minimal test call to verify a key is valid.
 * Returns true if successful.
 */
export async function testApiKey(
  apiKey: string,
  model: string,
  provider: AiProvider,
): Promise<{ success: boolean; error?: string }> {
  const baseUrl = PROVIDER_BASE_URLS[provider] ?? PROVIDER_BASE_URLS['openrouter']
  const isOpenRouterStyle = provider === 'openrouter' || provider === 'custom'
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // Only send OpenRouter-specific headers for OpenRouter provider
        ...(isOpenRouterStyle && {
          'HTTP-Referer': window.location.origin,
          'X-Title': 'LegalEase AI Platform',
        }),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Hello, respond with exactly one word: OK' }],
        max_tokens: 10,
        temperature: 0,
      }),
    })
    if (res.ok) return { success: true }
    const errText = await res.text()
    return { success: false, error: `HTTP ${res.status}: ${errText.slice(0, 120)}` }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Network error' }
  }
}

