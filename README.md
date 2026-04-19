# LegalEase AI Platform
### AI-Driven Legal Literacy and Assistance System

> Final Year Engineering Project — Academic Demonstration Prototype

---

## Project Purpose

LegalEase AI empowers Indian citizens with accessible legal literacy by:
- Allowing users to ask legal questions in natural language
- Identifying the legal category of the query (Labour Law, Consumer Rights, Cybercrime, Harassment, Tenancy)
- Retrieving relevant information from a verified legal knowledge base
- Generating simplified explanations using AI (OpenRouter LLM)
- Providing structured legal learning modules
- Delivering an NGO analytics dashboard

> ⚠️ This system provides **legal awareness information only** — it does not constitute legal advice.

---

## Architecture

```
Frontend (React + Vite + Tailwind)
         │
         ▼
Blink Edge Function (Deno)
         │
    ┌────┴──────────────────────┐
    │       AI Pipeline         │
    │  1. Query Classification  │  ← Keyword-based classifier
    │  2. Legal Entry Retrieval │  ← RAG keyword similarity
    │  3. Context Building      │  ← Builds prompt context
    │  4. OpenRouter LLM        │  ← Generates simplified response
    └───────────────────────────┘
         │
    Legal Knowledge Base (JSON)
    ├── 50+ verified legal entries
    ├── 5 categories
    └── keyword-indexed for retrieval
```

---

## System Modules

| Module | Description |
|--------|-------------|
| **Chat Interface** | Natural language legal Q&A |
| **Classification** | Keyword-based legal category detection |
| **Retrieval Engine** | RAG-style similarity search on legal dataset |
| **Response Generation** | OpenRouter LLM (Llama-4-Scout free) with grounded context |
| **Legal Learning** | 5 modules × 2-3 lessons each |
| **Topic Explorer** | Browse 50+ legal entries by category/search |
| **NGO Dashboard** | Analytics with Recharts visualizations |

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router DOM v7 |
| Charts | Recharts |
| Backend | Blink Edge Functions (Deno) |
| AI Model | OpenRouter API (meta-llama/llama-4-scout:free) |
| Dataset | JSON (local, structured legal knowledge base) |

---

## Legal Knowledge Base

**50+ entries** across 5 categories:

- **Labour Law** (8 entries) — wages, termination, PF, maternity, overtime, minimum wage, child labour, leave
- **Consumer Rights** (8 entries) — defective products, online shopping, banking fraud, RERA, medical negligence
- **Cybercrime** (8 entries) — UPI fraud, hacking, cyberbullying, revenge porn, phishing, ransomware, impersonation
- **Harassment** (8 entries) — POSH, domestic violence, stalking, dowry, caste atrocities, ragging, acid attack
- **Tenancy** (7 entries) — illegal eviction, security deposit, rent increase, repairs, utilities, unregistered agreements

Each entry contains:
- Law reference
- Plain English description
- Documents required
- Authority to approach
- Step-by-step procedure
- Keywords for retrieval

---

## AI Pipeline Design

```
User Question
    │
    ▼ classifyQuery()      ← Keyword scoring across 5 categories
Legal Category Detected
    │
    ▼ retrieveRelevantEntries()  ← Top-K keyword similarity search
Relevant Legal Entries (top 3)
    │
    ▼ buildContext()       ← Format entries as structured context
Grounded Context String
    │
    ▼ OpenRouter API       ← system prompt + context + user question
Simplified Legal Explanation
    │
    ▼ Structured Response  ← category, answer, sources, disclaimer
```

---

## API Reference

**POST** `/functions/legal-ai`
```json
Request: { "question": "My employer has not paid salary for 2 months." }

Response: {
  "question": "...",
  "category": "Labour Law",
  "answer": "Simplified explanation...",
  "disclaimer": "Legal awareness only...",
  "sources": [{ "title": "...", "law_reference": "...", "authority": "...", ... }]
}
```

---

## Setup Instructions

1. Open the project on Blink
2. All dependencies are pre-installed
3. The edge function is deployed at: `https://0b2dghtz--legal-ai.functions.blink.new`
4. OpenRouter API key is embedded in the edge function

---

## Project Limitations (Prototype)

- Uses keyword-based retrieval (not true vector embeddings/FAISS)
- Dataset limited to ~50 entries (expandable)
- Single language (English) support only
- No user authentication or query history persistence
- No real-time legal case tracking

---

## Academic Declaration

This system is built as a **final year engineering project prototype** to demonstrate:
- AI/NLP pipeline design
- RAG (Retrieval Augmented Generation) architecture
- Full-stack web development
- Legal literacy platform design
- Data analytics for social impact

It is **not** intended for real legal consultation.
