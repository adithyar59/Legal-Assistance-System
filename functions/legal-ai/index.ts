/**
 * LegalEase AI Edge Function
 * Handles all AI query processing using OpenRouter API
 * Implements RAG (Retrieval Augmented Generation) with the legal dataset
 *
 * Architecture:
 * 1. Receive user query
 * 2. Classify legal category (keyword-based classifier)
 * 3. Retrieve relevant legal entries (keyword similarity search)
 * 4. Generate simplified response using OpenRouter LLM
 * 5. Return structured response
 */

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY') || ''
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'
// Free model on OpenRouter
const AI_MODEL = 'meta-llama/llama-4-scout:free'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// ── Legal Dataset (embedded in edge function for RAG) ─────────────────────

interface LegalEntry {
  id: string
  category: string
  title: string
  law_reference: string
  description: string
  simplified_explanation: string
  documents_required: string[]
  authority: string
  procedure_steps: string[]
  keywords: string[]
}

const LEGAL_CATEGORIES = ['Labour Law', 'Consumer Rights', 'Cybercrime', 'Harassment', 'Tenancy']

const categoryKeywords: Record<string, string[]> = {
  'Labour Law': [
    'salary', 'wages', 'employer', 'employee', 'job', 'work', 'fired',
    'terminated', 'leave', 'pf', 'overtime', 'minimum wage', 'provident',
    'maternity', 'gratuity', 'retrenchment', 'labour', 'worker', 'office',
  ],
  'Consumer Rights': [
    'product', 'refund', 'defective', 'consumer', 'purchase', 'bought',
    'delivery', 'online shopping', 'bank', 'service', 'hospital', 'builder',
    'rera', 'advertisement', 'billing', 'scam', 'cheated', 'shop',
  ],
  'Cybercrime': [
    'hack', 'online fraud', 'upi', 'scam', 'internet', 'cyber', 'phishing',
    'ransomware', 'account hacked', 'data', 'privacy', 'social media',
    'otp', 'password', 'email hacked', 'phone call',
  ],
  'Harassment': [
    'harass', 'sexual', 'stalking', 'domestic violence', 'dowry', 'bully',
    'abuse', 'threatening', 'caste', 'ragging', 'acid', 'beaten', 'hit',
    'assault', 'molest',
  ],
  'Tenancy': [
    'rent', 'landlord', 'tenant', 'evict', 'deposit', 'house', 'flat',
    'lease', 'tenancy', 'rented', 'room', 'property', 'eviction',
  ],
}

// Simplified dataset for edge function (key entries)
const legalDataset: LegalEntry[] = [
  {
    id: 'L001', category: 'Labour Law', title: 'Salary Delay or Non-Payment',
    law_reference: 'Payment of Wages Act, 1936',
    description: 'Employers must pay wages within the prescribed time limit (7th or 10th of following month).',
    simplified_explanation: 'Your employer MUST pay your salary on time. If they delay or refuse, you have the legal right to file a complaint with the Labour Commissioner.',
    documents_required: ['Employment appointment letter', 'Salary slips', 'Bank account statements', 'Identity proof'],
    authority: 'Labour Commissioner / Labour Court',
    procedure_steps: ['Send written notice to employer', 'File complaint with Labour Commissioner', 'Attach employment proof and unpaid salary evidence', 'Authority issues notice to employer', 'If unresolved, case referred to Labour Court'],
    keywords: ['salary', 'wages', 'pay', 'payment', 'unpaid', 'employer', 'delay'],
  },
  {
    id: 'L002', category: 'Labour Law', title: 'Wrongful Termination',
    law_reference: 'Industrial Disputes Act, 1947',
    description: 'An employee cannot be terminated without prior notice or valid reason. Retrenchment requires government permission for establishments with 100+ workers.',
    simplified_explanation: 'If you were fired without proper notice or valid reason, this may be illegal. You can challenge wrongful termination and demand reinstatement or compensation.',
    documents_required: ['Termination letter', 'Employment contract', 'Salary payment history', 'Identity proof'],
    authority: 'Labour Commissioner / Industrial Tribunal',
    procedure_steps: ['Collect termination letter', 'File complaint with Labour Commissioner', 'Conciliation proceedings initiated', 'If unresolved, case goes to Industrial Tribunal'],
    keywords: ['fired', 'terminated', 'dismissal', 'sacked', 'job loss', 'illegal termination'],
  },
  {
    id: 'L003', category: 'Labour Law', title: 'Denial of Provident Fund',
    law_reference: 'Employees Provident Fund Act, 1952',
    description: 'Employers with 20+ employees must contribute 12% of basic wages to EPF. Non-deposit is a criminal offense.',
    simplified_explanation: 'Your employer must deduct and deposit your PF every month. If they deduct but do not deposit, file a complaint with EPFO.',
    documents_required: ['Salary slips showing PF deduction', 'EPFO UAN number', 'Employment proof'],
    authority: 'EPFO (Employees Provident Fund Organisation)',
    procedure_steps: ['Check PF balance on EPFO portal', 'File grievance on EPFO portal if deposits missing', 'EPFO will issue notice to employer'],
    keywords: ['pf', 'provident fund', 'epfo', 'employee fund', 'retirement fund'],
  },
  {
    id: 'L004', category: 'Labour Law', title: 'Maternity Leave Denial',
    law_reference: 'Maternity Benefit Act, 1961 (amended 2017)',
    description: 'Female employees entitled to 26 weeks paid maternity leave. Dismissal during maternity leave is prohibited.',
    simplified_explanation: 'You have the legal right to 26 weeks of paid maternity leave. Your employer cannot fire you during this period.',
    documents_required: ['Medical certificate confirming pregnancy', 'Written application for maternity leave'],
    authority: 'Labour Commissioner / Inspector under Maternity Benefit Act',
    procedure_steps: ['Submit application with medical certificate', 'If denied, file complaint with Labour Commissioner'],
    keywords: ['maternity', 'pregnancy', 'maternity leave', 'baby', 'childbirth', 'mother'],
  },
  {
    id: 'C001', category: 'Consumer Rights', title: 'Defective Product',
    law_reference: 'Consumer Protection Act, 2019',
    description: 'Consumers have the right to seek replacement or refund for defective products. Seller and manufacturer are jointly liable.',
    simplified_explanation: 'If you bought a faulty product, you have the right to get a replacement, refund, or repair — free of charge.',
    documents_required: ['Purchase receipt', 'Product photos showing defect', 'Warranty card', 'Written complaint to seller'],
    authority: 'District Consumer Disputes Redressal Commission',
    procedure_steps: ['Complain to seller in writing', 'If no response in 30 days, file with Consumer Commission', 'Commission will order compensation'],
    keywords: ['defective product', 'broken item', 'faulty goods', 'refund', 'replacement'],
  },
  {
    id: 'C002', category: 'Consumer Rights', title: 'Online Shopping Fraud',
    law_reference: 'Consumer Protection (E-Commerce) Rules, 2020',
    description: 'E-commerce platforms must ensure delivery and resolve complaints within 1 month.',
    simplified_explanation: 'If you ordered something online and never received it or received wrong item, the platform must resolve. Escalate to Consumer Forum if needed.',
    documents_required: ['Order confirmation', 'Screenshots of order and tracking', 'Payment receipt'],
    authority: 'Consumer Commission / National Consumer Helpline 1915',
    procedure_steps: ['Raise complaint on platform', 'If unresolved in 30 days, call 1915', 'File case with Consumer Commission'],
    keywords: ['online shopping', 'not delivered', 'wrong item', 'ecommerce', 'order problem'],
  },
  {
    id: 'C003', category: 'Consumer Rights', title: 'Banking and Financial Fraud',
    law_reference: 'Banking Ombudsman Scheme, 2006',
    description: 'Consumers can approach Banking Ombudsman if bank fails to resolve complaint within 30 days. Relief up to ₹20 lakh.',
    simplified_explanation: 'If money was fraudulently taken from your account or bank refuses to refund wrong charges, complain to Banking Ombudsman — free service.',
    documents_required: ['Bank statements', 'Written complaint to bank', 'Bank\'s response or proof of non-response'],
    authority: 'Banking Ombudsman (RBI)',
    procedure_steps: ['Write formal complaint to bank', 'If no resolution in 30 days, file with Banking Ombudsman at bankingombudsman.rbi.org.in'],
    keywords: ['bank fraud', 'unauthorized transaction', 'money stolen', 'bank charge'],
  },
  {
    id: 'C004', category: 'Consumer Rights', title: 'Real Estate Builder Fraud (RERA)',
    law_reference: 'Real Estate (Regulation and Development) Act, 2016',
    description: 'RERA mandates builder registration and timely possession. Homebuyers can claim refund with interest for delays.',
    simplified_explanation: 'If a builder took your money and delayed possession or cheated you, RERA lets you get a full refund with interest.',
    documents_required: ['Builder-buyer agreement', 'Payment receipts', 'RERA registration number'],
    authority: 'State RERA Authority',
    procedure_steps: ['Check project registration on State RERA website', 'File complaint on State RERA portal', 'Builder ordered to refund with 10-11% interest'],
    keywords: ['builder fraud', 'flat', 'apartment', 'real estate', 'possession delay', 'RERA'],
  },
  {
    id: 'CY001', category: 'Cybercrime', title: 'Online Financial Fraud / UPI Scam',
    law_reference: 'IT Act, 2000 / IPC Sections 419, 420',
    description: 'Online fraud through UPI, fake calls, or websites is a criminal offense. Quick reporting can help recover money.',
    simplified_explanation: 'If someone tricked you into sending money online — report immediately to 1930. Quick action can help recover your money.',
    documents_required: ['Screenshots of fraudulent messages', 'Transaction proof', 'FIR copy'],
    authority: 'Cyber Crime Cell / National Cybercrime Reporting Portal',
    procedure_steps: ['Call 1930 immediately to freeze transaction', 'File complaint on cybercrime.gov.in', 'Visit police station with evidence', 'File FIR'],
    keywords: ['upi fraud', 'online fraud', 'money scam', 'kyc fraud', 'otp fraud', 'phone call fraud'],
  },
  {
    id: 'CY002', category: 'Cybercrime', title: 'Hacking / Unauthorized Account Access',
    law_reference: 'IT Act, 2000 – Section 43, 66',
    description: 'Hacking into someone\'s accounts without permission. Punishment up to 3 years and fines up to ₹5 lakh.',
    simplified_explanation: 'If someone hacked your email or social media accounts, report it immediately to the Cyber Crime Cell.',
    documents_required: ['Screenshots of unauthorized access', 'Email notifications of suspicious login'],
    authority: 'Cyber Crime Cell / Police Station',
    procedure_steps: ['Change all passwords and enable 2FA', 'File complaint on cybercrime.gov.in', 'Visit police with evidence'],
    keywords: ['hacked', 'account hacked', 'email hacked', 'password stolen', 'unauthorized access'],
  },
  {
    id: 'CY003', category: 'Cybercrime', title: 'Cyberbullying and Online Harassment',
    law_reference: 'IT Act, 2000 / IPC Section 507',
    description: 'Sending threatening or abusive messages online, creating fake profiles to harass is punishable.',
    simplified_explanation: 'If someone is harassing you online with abusive messages, fake profiles, or threats — report to Cyber Crime Cell.',
    documents_required: ['Screenshots of harassing messages', 'Social media profile links'],
    authority: 'Cyber Crime Cell / Police Station',
    procedure_steps: ['Save and screenshot all harassing content', 'Report profile to the platform', 'File complaint on cybercrime.gov.in'],
    keywords: ['cyberbullying', 'online harassment', 'abusive messages', 'fake profile', 'threatening online'],
  },
  {
    id: 'H001', category: 'Harassment', title: 'Sexual Harassment at Workplace (POSH)',
    law_reference: 'POSH Act, 2013',
    description: 'Organizations with 10+ employees must have ICC. Women can file complaints within 3 months. Inquiry must complete in 90 days.',
    simplified_explanation: 'If you face sexual harassment at workplace, file complaint with your company\'s Internal Complaints Committee (ICC) within 3 months.',
    documents_required: ['Written complaint describing incident', 'Date and location details', 'Names of witnesses'],
    authority: 'Internal Complaints Committee (ICC) / Local Complaints Committee',
    procedure_steps: ['File written complaint with ICC within 3 months', 'If no ICC, file with Local Complaints Committee', 'Can also file criminal FIR'],
    keywords: ['sexual harassment', 'posh', 'workplace harassment', 'inappropriate behavior', 'icc'],
  },
  {
    id: 'H002', category: 'Harassment', title: 'Domestic Violence',
    law_reference: 'Protection of Women from Domestic Violence Act, 2005',
    description: 'Covers physical, emotional, sexual, and economic abuse. Women can seek Protection Orders, Residence Orders, and Maintenance.',
    simplified_explanation: 'If you are being abused by family members, you have the right to protection. Call Women Helpline 181 immediately.',
    documents_required: ['Written complaint', 'Medical reports if injured', 'Identity documents'],
    authority: 'Protection Officer / Magistrate / Women Helpline 181',
    procedure_steps: ['Call Women Helpline 181', 'Contact Protection Officer at District Women & Child Dept', 'File complaint with Magistrate', 'File FIR at police station'],
    keywords: ['domestic violence', 'husband abuse', 'wife beating', 'family abuse', 'physical abuse'],
  },
  {
    id: 'H003', category: 'Harassment', title: 'Stalking',
    law_reference: 'IPC Section 354D',
    description: 'Following a woman repeatedly or monitoring her communications without consent. Up to 3 years imprisonment.',
    simplified_explanation: 'If someone is following you, calling repeatedly against your will, or monitoring your online activities — file an FIR for stalking.',
    documents_required: ['Call records', 'Screenshots of messages', 'Witness statements'],
    authority: 'Police Station / Women Helpline 181',
    procedure_steps: ['Document all instances with dates', 'Save call records as evidence', 'File FIR under IPC 354D'],
    keywords: ['stalking', 'stalker', 'following', 'repeated calls', 'unwanted contact'],
  },
  {
    id: 'H004', category: 'Harassment', title: 'Dowry Harassment',
    law_reference: 'Dowry Prohibition Act, 1961 / IPC Section 498A',
    description: 'Demanding, giving, or taking dowry is illegal. Cruelty for dowry is punishable with up to 3 years.',
    simplified_explanation: 'If your in-laws or husband are harassing you for dowry, file an FIR immediately under IPC 498A.',
    documents_required: ['Written complaint', 'Medical reports if harmed', 'Marriage certificate'],
    authority: 'Police Station / Women Helpline 181',
    procedure_steps: ['File FIR under IPC 498A and Dowry Prohibition Act', 'Contact Women Helpline 181'],
    keywords: ['dowry', 'dowry harassment', '498a', 'in-laws harassment'],
  },
  {
    id: 'T001', category: 'Tenancy', title: 'Illegal Eviction',
    law_reference: 'Rent Control Act / Transfer of Property Act, 1882',
    description: 'Landlord cannot evict tenant without court order. Forcible eviction is illegal.',
    simplified_explanation: 'Your landlord CANNOT throw you out without going to court first. Call police if landlord tries forcible eviction.',
    documents_required: ['Rent agreement', 'Rent receipts', 'Eviction notice from landlord'],
    authority: 'Rent Control Tribunal / Civil Court / Police',
    procedure_steps: ['Call police immediately if being forcibly evicted', 'File complaint with Rent Controller', 'Seek stay order from court'],
    keywords: ['eviction', 'forced out', 'locked out', 'illegal eviction', 'landlord throwing out'],
  },
  {
    id: 'T002', category: 'Tenancy', title: 'Security Deposit Not Returned',
    law_reference: 'Transfer of Property Act, 1882',
    description: 'Landlord must return security deposit after tenancy ends, minus legitimate deductions.',
    simplified_explanation: 'If landlord refuses to return your security deposit without valid reason, file a case in Rent Court.',
    documents_required: ['Rent agreement', 'Receipt for deposit', 'Proof of vacating'],
    authority: 'Rent Control Tribunal / Consumer Commission',
    procedure_steps: ['Send legal notice demanding return', 'Wait 30 days', 'File in Rent Control Tribunal'],
    keywords: ['security deposit', 'deposit not returned', 'landlord deposit', 'advance not returned'],
  },
  {
    id: 'T003', category: 'Tenancy', title: 'Unlawful Rent Increase',
    law_reference: 'State Rent Control Acts',
    description: 'Rent can only be increased as per agreement or state rent control legislation.',
    simplified_explanation: 'Landlord cannot increase rent arbitrarily. Challenge unlawful increase before the Rent Controller.',
    documents_required: ['Original rent agreement', 'Rent receipts', 'Notice of rent increase'],
    authority: 'Rent Controller / Rent Control Tribunal',
    procedure_steps: ['Review rent agreement', 'Send written objection to landlord', 'File application with Rent Controller'],
    keywords: ['rent increase', 'rent hike', 'landlord raising rent', 'unfair rent'],
  },
]

// ── Classification Function ───────────────────────────────────────────────

function classifyQuery(query: string): string {
  const queryLower = query.toLowerCase()
  const scores: Record<string, number> = {}

  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    scores[cat] = 0
    for (const kw of keywords) {
      if (queryLower.includes(kw)) scores[cat] += 1
    }
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  return best[1] > 0 ? best[0] : 'General Legal Query'
}

// ── Retrieval Function ────────────────────────────────────────────────────

function retrieveRelevantEntries(query: string, topK = 3): LegalEntry[] {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/)

  const scored = legalDataset.map((entry) => {
    let score = 0
    const searchText = [entry.title, entry.description, entry.simplified_explanation, ...entry.keywords, entry.category].join(' ').toLowerCase()

    for (const word of queryWords) {
      if (word.length < 3) continue
      if (entry.keywords.some((k) => k.includes(word) || word.includes(k))) score += 3
      if (entry.title.toLowerCase().includes(word)) score += 2
      if (entry.category.toLowerCase().includes(word)) score += 2
      if (searchText.includes(word)) score += 1
    }

    for (const kw of entry.keywords) {
      if (queryLower.includes(kw)) score += 5
    }

    return { entry, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.entry)
}

// ── Build RAG Context ──────────────────────────────────────────────────────

function buildContext(entries: LegalEntry[]): string {
  if (entries.length === 0) return 'No specific legal entries found for this query.'

  return entries
    .map(
      (e, i) => `
[Entry ${i + 1}] ${e.title} (${e.category})
Law Reference: ${e.law_reference}
Description: ${e.description}
Simple Explanation: ${e.simplified_explanation}
Documents Required: ${e.documents_required.join(', ')}
Authority to Approach: ${e.authority}
Procedure: ${e.procedure_steps.join(' → ')}
`.trim()
    )
    .join('\n\n---\n\n')
}

// ── System Prompt ─────────────────────────────────────────────────────────

function buildSystemPrompt(context: string): string {
  return `You are LegalEase AI, an expert legal literacy assistant for Indian citizens.

Your role is to help citizens understand their legal rights by providing SIMPLIFIED, CLEAR explanations of Indian law.

STRICT RULES:
1. ONLY use the legal information provided in the KNOWLEDGE BASE below
2. Do NOT provide legal advice or tell users what specific action they should take in their case
3. Always include the disclaimer at the end
4. Use simple, easy-to-understand language — avoid legal jargon
5. Be compassionate and empathetic — users may be in difficult situations
6. Structure your response clearly with sections

RESPONSE FORMAT:
- Start with a brief empathetic acknowledgment
- Explain the relevant law in simple terms
- List documents they may need
- Mention the authority to approach
- List the general procedure steps
- End with the disclaimer

KNOWLEDGE BASE:
${context}

If the question is outside the knowledge base, politely state that you can only answer questions based on your current legal dataset and suggest they consult a qualified lawyer.`
}

// ── Main Handler ──────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { question } = body

    if (!question || typeof question !== 'string') {
      return new Response(JSON.stringify({ error: 'question field is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Step 1: Classify the query
    const category = classifyQuery(question)

    // Step 2: Retrieve relevant legal entries (RAG)
    const relevantEntries = retrieveRelevantEntries(question)

    // Step 3: Build context from retrieved entries
    const context = buildContext(relevantEntries)

    // Step 4: Call OpenRouter AI for response generation
    const systemPrompt = buildSystemPrompt(context)

    const aiResponse = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://legalease-ai-system-0b2dghtz.sites.blink.new',
        'X-Title': 'LegalEase AI Platform',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        max_tokens: 1200,
        temperature: 0.3, // Low temperature for factual accuracy
      }),
    })

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text()
      console.error('OpenRouter error:', errorText)
      throw new Error(`OpenRouter API error: ${aiResponse.status}`)
    }

    const aiData = await aiResponse.json()
    const answer = aiData.choices?.[0]?.message?.content || 'Unable to generate response.'

    // Step 5: Build structured response
    const response = {
      question,
      category,
      answer,
      disclaimer:
        '⚠️ This system provides legal awareness information for educational purposes only and does not constitute legal advice. For your specific legal situation, please consult a qualified lawyer.',
      sources: relevantEntries.map((e) => ({
        title: e.title,
        law_reference: e.law_reference,
        authority: e.authority,
        documents_required: e.documents_required,
        procedure_steps: e.procedure_steps,
      })),
      retrieved_count: relevantEntries.length,
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
