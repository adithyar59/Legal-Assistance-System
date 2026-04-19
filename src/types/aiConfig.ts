/**
 * AI API Key Management — Type Definitions
 */

export type AiProvider = 'openrouter' | 'openai' | 'anthropic' | 'groq' | 'together' | 'stepfun' | 'custom'

export interface ApiKeyConfig {
  id: string
  name: string
  provider: AiProvider
  apiKey: string
  model: string
  createdAt: string // ISO string
}

export interface ActiveAiConfig {
  activeKeyId: string | null
}

/**
 * Maps provider to its base URL for API calls
 */
export const PROVIDER_BASE_URLS: Record<AiProvider, string> = {
  // Direct (support CORS from browsers)
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  openai:     'https://api.openai.com/v1/chat/completions',
  // Proxied through Vite dev server to bypass CORS
  groq:       '/proxy/groq/openai/v1/chat/completions',
  together:   '/proxy/together/v1/chat/completions',
  stepfun:    '/proxy/stepfun/v1/chat/completions',
  anthropic:  '/proxy/anthropic/v1/messages',
  custom:     'https://openrouter.ai/api/v1/chat/completions',
}


/**
 * Human-readable provider names
 */
export const PROVIDER_LABELS: Record<AiProvider, string> = {
  openrouter: 'OpenRouter',
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  groq: 'Groq',
  together: 'Together AI',
  stepfun: 'StepFun',
  custom: 'Custom / Other',
}

/**
 * Suggested default models per provider
 */
export const PROVIDER_DEFAULT_MODELS: Record<AiProvider, string> = {
  openrouter: 'stepfun/step-3.5-flash:free',
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-haiku-20240307',
  groq: 'llama-3.3-70b-versatile',
  together: 'meta-llama/Llama-3-8b-chat-hf',
  stepfun: 'step-3.5-flash',
  custom: '',
}

/**
 * Example model names shown as placeholder hint per provider
 */
export const PROVIDER_MODEL_HINTS: Record<AiProvider, string> = {
  openrouter: 'e.g. stepfun/step-3.5-flash:free',
  openai: 'e.g. gpt-4o-mini',
  anthropic: 'e.g. claude-3-haiku-20240307',
  groq: 'e.g. llama-3.3-70b-versatile',
  together: 'e.g. meta-llama/Llama-3-8b-chat-hf',
  stepfun: 'e.g. step-3.5-flash',
  custom: 'Enter model name exactly as required by the API',
}
