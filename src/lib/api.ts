/**
 * LegalEase AI Pipeline — Client-side RAG with Dynamic AI Provider
 *
 * Contains:
 *   1. Legal knowledge base (50+ entries across 10 categories)
 *   2. Keyword-based query classifier
 *   3. Keyword similarity retrieval (RAG)
 *   4. Dynamic AI provider integration (key resolved from aiKeyStore)
 */

import { resolveActiveAiConfig } from '@/lib/aiKeyStore'

// ── Types ──────────────────────────────────────────────────────────────────

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

export interface LegalQueryResponse {
  question: string
  category: string
  answer: string
  disclaimer: string
  sources: {
    title: string
    law_reference: string
    authority: string
    documents_required: string[]
    procedure_steps: string[]
  }[]
  retrieved_count: number
}

// ── Config ─────────────────────────────────────────────────────────────────

// Fallback values used only when no key is configured in the AI Settings panel
const FALLBACK_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string
const FALLBACK_MODEL = 'stepfun/step-3.5-flash:free'
const FALLBACK_URL = 'https://openrouter.ai/api/v1/chat/completions'

// ── Legal Dataset ──────────────────────────────────────────────────────────

const LEGAL_CATEGORIES = [
  'Labour Law', 'Consumer Rights', 'Cybercrime', 'Harassment', 'Tenancy',
  'Marriage & Family Law', 'Property & Inheritance', 'Criminal Procedures',
  'RTI & Government Services', 'Education & Student Rights',
]

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
  'Marriage & Family Law': [
    'marriage', 'divorce', 'custody', 'alimony', 'maintenance', 'spouse',
    'husband', 'wife', 'wedding', 'separation', 'live-in', 'adoption',
    'child marriage', 'inter-caste', 'family court',
  ],
  'Property & Inheritance': [
    'property', 'land', 'will', 'inheritance', 'succession', 'deed',
    'encroachment', 'mutation', 'registration', 'ancestral', 'partition',
    'daughter property',
  ],
  'Criminal Procedures': [
    'fir', 'arrest', 'bail', 'police', 'criminal', 'court', 'magistrate',
    'detained', 'prison', 'legal aid', 'victim', 'quash',
  ],
  'RTI & Government Services': [
    'rti', 'right to information', 'government', 'passport', 'aadhaar',
    'ration', 'pds', 'grievance', 'lok adalat', 'pension', 'cpgrams',
  ],
  'Education & Student Rights': [
    'school', 'college', 'university', 'student', 'education', 'admission',
    'scholarship', 'exam', 'teacher', 'ragging', 'rte', 'loan', 'capitation',
  ],
}

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
    documents_required: ['Bank statements', 'Written complaint to bank', "Bank's response or proof of non-response"],
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
    description: "Hacking into someone's accounts without permission. Punishment up to 3 years and fines up to ₹5 lakh.",
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
    simplified_explanation: "If you face sexual harassment at workplace, file complaint with your company's Internal Complaints Committee (ICC) within 3 months.",
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
  // ─── MARRIAGE & FAMILY LAW ────────────────────────────────
  {
    id: 'MF001', category: 'Marriage & Family Law', title: 'Divorce by Mutual Consent',
    law_reference: 'Hindu Marriage Act, 1955 – Section 13B',
    description: 'Both spouses can jointly file for divorce if separated for 1+ year and mutually agree. 6-month cooling-off period mandatory.',
    simplified_explanation: 'If both you and your spouse agree to divorce, file a joint petition. Court gives 6 months to reconsider, then grants divorce.',
    documents_required: ['Marriage certificate', 'Joint petition', 'Address proof', 'Proof of separation'],
    authority: 'Family Court / District Court',
    procedure_steps: ['File joint petition in Family Court', 'Court records statements', '6-month cooling off', 'Both appear again to confirm', 'Court grants decree'],
    keywords: ['divorce', 'mutual consent divorce', 'separation', 'end marriage'],
  },
  {
    id: 'MF002', category: 'Marriage & Family Law', title: 'Child Custody Rights',
    law_reference: 'Guardians and Wards Act, 1890',
    description: 'In custody disputes, welfare of the child is paramount. Mother generally gets custody of children below 5.',
    simplified_explanation: 'Both parents can seek custody. Courts decide based on child\'s best interests. Mothers usually get custody of very young children.',
    documents_required: ['Divorce petition', 'Child\'s birth certificate', 'Financial capability evidence'],
    authority: 'Family Court / Guardian Court',
    procedure_steps: ['File custody petition', 'Court may appoint guardian ad litem', 'Both parents present case', 'Court decides based on child welfare'],
    keywords: ['child custody', 'custody rights', 'visitation rights', 'children divorce', 'guardianship'],
  },
  {
    id: 'MF003', category: 'Marriage & Family Law', title: 'Maintenance / Alimony',
    law_reference: 'CrPC Section 125 / Hindu Adoptions and Maintenance Act, 1956',
    description: 'Spouse with insufficient means can claim maintenance. Even divorced wives can claim maintenance if not remarried.',
    simplified_explanation: 'If your spouse is not supporting you financially, you can claim monthly maintenance through court during or after marriage.',
    documents_required: ['Marriage certificate', 'Spouse\'s income proof', 'Your expenses proof', 'Bank statements'],
    authority: 'Family Court / Magistrate Court',
    procedure_steps: ['File maintenance petition under CrPC 125', 'Court issues notice', 'Both disclose income', 'Court fixes maintenance amount'],
    keywords: ['maintenance', 'alimony', 'spousal support', 'wife maintenance'],
  },
  {
    id: 'MF004', category: 'Marriage & Family Law', title: 'Adoption in India',
    law_reference: 'Juvenile Justice Act, 2015 / CARA Guidelines',
    description: 'Adoption regulated by CARA. Married couples and single persons can adopt. Process includes home study and court order.',
    simplified_explanation: 'To adopt a child in India, register on CARA website. Process includes home study, referral, and court order.',
    documents_required: ['Identity proof', 'Income proof', 'Marriage certificate (for couples)', 'Medical fitness certificate'],
    authority: 'CARA / District Court',
    procedure_steps: ['Register on CARA portal', 'Complete home study', 'Receive child referral', 'File adoption petition in court'],
    keywords: ['adoption', 'adopt child', 'child adoption India', 'CARA'],
  },
  // ─── PROPERTY & INHERITANCE ─────────────────────────────────
  {
    id: 'PI001', category: 'Property & Inheritance', title: 'Writing a Valid Will',
    law_reference: 'Indian Succession Act, 1925',
    description: 'Person of sound mind aged 18+ can write a will. Must be signed by testator and attested by 2 witnesses.',
    simplified_explanation: 'Write a will to decide property distribution after death. Sign with 2 witnesses. Register at Sub-Registrar for stronger legal standing.',
    documents_required: ['Will document', 'Testator\'s ID proof', 'Two witnesses with ID', 'Property documents'],
    authority: 'Sub-Registrar Office / Probate Court',
    procedure_steps: ['Draft will listing assets and beneficiaries', 'Sign with 2 witnesses', 'Register at Sub-Registrar (recommended)', 'After death, executor applies for probate'],
    keywords: ['will', 'testament', 'property after death', 'inheritance document', 'last will'],
  },
  {
    id: 'PI002', category: 'Property & Inheritance', title: 'Daughter\'s Right to Property',
    law_reference: 'Hindu Succession (Amendment) Act, 2005',
    description: 'Daughters have equal coparcenary rights in ancestral property — same as sons since 2005 amendment.',
    simplified_explanation: 'Daughters have SAME right as sons in ancestral property since 2005. File partition suit if your share is denied.',
    documents_required: ['Proof of relationship', 'Property documents', 'Any partition deed'],
    authority: 'Civil Court',
    procedure_steps: ['Send legal notice claiming your share', 'File partition suit if denied', 'Court determines shares', 'Can also seek Lok Adalat mediation'],
    keywords: ['daughter property rights', 'women property rights', 'ancestral property daughter', 'equal share'],
  },
  {
    id: 'PI003', category: 'Property & Inheritance', title: 'Land Encroachment',
    law_reference: 'IPC Section 441, 447 / Specific Relief Act, 1963',
    description: 'Encroachment is both civil wrong and criminal trespass. Owner can file civil suit and FIR simultaneously.',
    simplified_explanation: 'If someone illegally occupied your land, file police complaint and civil case in court to get it back.',
    documents_required: ['Property ownership documents', 'Survey records', 'Photos of encroachment', 'Revenue records'],
    authority: 'Civil Court / Revenue Department / Police',
    procedure_steps: ['Complain to Revenue Department', 'File FIR for criminal trespass', 'File civil suit for injunction', 'Court orders removal'],
    keywords: ['encroachment', 'land grabbed', 'illegal occupation', 'trespass', 'property encroached'],
  },
  // ─── CRIMINAL PROCEDURES ───────────────────────────────────
  {
    id: 'CP001', category: 'Criminal Procedures', title: 'Filing an FIR',
    law_reference: 'CrPC Section 154',
    description: 'FIR must be registered for cognizable offenses. Police CANNOT refuse. Zero FIR can be filed at any station.',
    simplified_explanation: 'You have the RIGHT to file an FIR. Police cannot refuse. Can file at ANY police station (Zero FIR). Approach SP/Magistrate if refused.',
    documents_required: ['Written complaint', 'Identity proof', 'Evidence if available', 'Accused details if known'],
    authority: 'Police Station / SP / Magistrate',
    procedure_steps: ['Give written complaint at police station', 'Police MUST register FIR', 'Get FIR copy — your right', 'If refused, send to SP by post', 'File with Magistrate under Section 156(3)'],
    keywords: ['FIR', 'file FIR', 'police complaint', 'first information report', 'lodge complaint'],
  },
  {
    id: 'CP002', category: 'Criminal Procedures', title: 'Bail Application',
    law_reference: 'CrPC Sections 436-439',
    description: 'Bail is a right in bailable offenses and discretionary in non-bailable. Can apply at police station, Magistrate, Sessions, or High Court.',
    simplified_explanation: 'For minor offenses, bail is automatic. For serious offenses, apply to the court. You can appeal to higher courts if refused.',
    documents_required: ['Copy of FIR', 'Bail application', 'Surety bond', 'Identity proof of surety'],
    authority: 'Police Station / Magistrate / Sessions Court / High Court',
    procedure_steps: ['Bailable: demand bail at station', 'Non-bailable: apply to Magistrate', 'If refused, appeal to Sessions Court', 'If refused again, apply to High Court'],
    keywords: ['bail', 'bail application', 'get bail', 'release from jail', 'bail bond'],
  },
  {
    id: 'CP003', category: 'Criminal Procedures', title: 'Free Legal Aid',
    law_reference: 'Legal Services Authorities Act, 1987 / Article 39A',
    description: 'Free legal aid for women, SC/ST, disabled, poor, and industrial workers. Available through NALSA.',
    simplified_explanation: 'Cannot afford a lawyer? Women, poor, SC/ST, disabled persons get FREE lawyers through Legal Services Authority. Call 15100.',
    documents_required: ['Application for legal aid', 'Income certificate or BPL card', 'Category certificate if applicable'],
    authority: 'NALSA / State/District Legal Services Authority',
    procedure_steps: ['Visit District Legal Services Authority', 'Fill application', 'Submit income/category proof', 'Free lawyer assigned'],
    keywords: ['free lawyer', 'free legal aid', 'cannot afford lawyer', 'NALSA', 'legal services'],
  },
  {
    id: 'CP004', category: 'Criminal Procedures', title: 'Rights of Arrested Person',
    law_reference: 'Article 22 Constitution / DK Basu Guidelines',
    description: 'Arrested person has rights: know reason, inform family, consult lawyer, not be tortured, produced before magistrate within 24 hours.',
    simplified_explanation: 'If arrested: know WHY, call family, get lawyer, be taken to court within 24 hours. Police CANNOT torture you.',
    documents_required: ['Arrest memo (police must provide)', 'Identity proof'],
    authority: 'Magistrate / Legal Aid / NHRC',
    procedure_steps: ['Demand reason for arrest', 'Ask for arrest memo', 'Inform family', 'Request lawyer', 'Must be produced before Magistrate within 24 hours'],
    keywords: ['arrested', 'arrest rights', 'police arrest', 'detention rights', 'jail rights'],
  },
  // ─── RTI & GOVERNMENT SERVICES ────────────────────────────
  {
    id: 'RTI001', category: 'RTI & Government Services', title: 'Filing RTI Application',
    law_reference: 'Right to Information Act, 2005',
    description: 'Every citizen can request information from public authorities. Fee ₹10. Reply must come within 30 days.',
    simplified_explanation: 'You have the RIGHT to ask any government department for information. Pay ₹10 and they MUST reply within 30 days.',
    documents_required: ['RTI application', 'Fee ₹10', 'BPL card if fee exemption needed'],
    authority: 'Public Information Officer (PIO)',
    procedure_steps: ['Write application to PIO', 'Pay ₹10 fee', 'Send by post or use rtionline.gov.in', 'Reply within 30 days', 'Appeal if no reply'],
    keywords: ['RTI', 'right to information', 'government information', 'RTI application'],
  },
  {
    id: 'RTI002', category: 'RTI & Government Services', title: 'Aadhaar Related Issues',
    law_reference: 'Aadhaar Act, 2016',
    description: 'Wrong details, biometric failure, and misuse of Aadhaar can be addressed through UIDAI. Biometrics can be locked for safety.',
    simplified_explanation: 'Errors in Aadhaar? Visit UIDAI website or Aadhaar centre. Lock your biometrics for safety through mAadhaar app.',
    documents_required: ['Aadhaar number', 'Supporting documents for correction'],
    authority: 'UIDAI / Aadhaar Seva Kendra / Helpline 1947',
    procedure_steps: ['Visit uidai.gov.in or Aadhaar centre for corrections', 'Lock biometrics via mAadhaar app', 'Report misuse on cybercrime.gov.in', 'Call 1947 for help'],
    keywords: ['aadhaar', 'aadhaar correction', 'biometric lock', 'aadhaar misuse', 'UIDAI'],
  },
  {
    id: 'RTI003', category: 'RTI & Government Services', title: 'Lok Adalat — Free Dispute Resolution',
    law_reference: 'Legal Services Authorities Act, 1987',
    description: 'Free alternative dispute resolution. No court fees. Decisions are final and binding. Settles consumer, labour, and accident claims.',
    simplified_explanation: 'Lok Adalat is a free fast-track court for settling disputes. No fees, no lawyers needed, and the decision is final.',
    documents_required: ['Application', 'Case documents', 'Identity proof'],
    authority: 'District Legal Services Authority',
    procedure_steps: ['Apply to DLSA', 'Both parties agree to participate', 'Conciliators help settle', 'Award is final and binding'],
    keywords: ['lok adalat', 'free court', 'dispute resolution', 'mediation', 'free justice'],
  },
  // ─── EDUCATION & STUDENT RIGHTS ────────────────────────────
  {
    id: 'ED001', category: 'Education & Student Rights', title: 'Right to Education (RTE)',
    law_reference: 'RTE Act, 2009 / Article 21A Constitution',
    description: 'Every child aged 6-14 has right to free education. 25% seats reserved for EWS in private schools. No child expelled till class 8.',
    simplified_explanation: 'Every child 6-14 has FREE education right. Private schools must reserve 25% for poor children. No screening tests.',
    documents_required: ['Age proof', 'Income/BPL certificate', 'Address proof', 'Aadhaar card'],
    authority: 'District Education Officer / NCPCR',
    procedure_steps: ['Apply to nearby school', 'If refused, complain to DEO', 'Apply for 25% quota with income proof', 'Contact NCPCR if rights violated'],
    keywords: ['RTE', 'right to education', 'free education', 'school admission', '25 percent quota'],
  },
  {
    id: 'ED002', category: 'Education & Student Rights', title: 'Scholarship Issues',
    law_reference: 'Post-Matric Scholarship Scheme',
    description: 'Government scholarships for SC/ST/OBC/minority are entitlements. Can file complaint and RTI if not disbursed.',
    simplified_explanation: 'Government scholarship not received? File complaint with Education Department and RTI to know status.',
    documents_required: ['Scholarship application receipt', 'Category certificate', 'Income certificate', 'Bank details'],
    authority: 'State Education Department / National Scholarship Portal',
    procedure_steps: ['Check status on scholarships.gov.in', 'Contact District Welfare Officer', 'File RTI for delay reason', 'File CPGRAMS complaint'],
    keywords: ['scholarship', 'scholarship not received', 'fee reimbursement', 'education grant'],
  },
  {
    id: 'ED003', category: 'Education & Student Rights', title: 'Anti-Ragging in Colleges',
    law_reference: 'UGC Regulations, 2009',
    description: 'Ragging is criminal offense. Every institution must have Anti-Ragging Committee. Punishment includes expulsion and criminal prosecution.',
    simplified_explanation: 'Being ragged in college is a CRIME. Call Anti-Ragging Helpline 1800-180-5522 immediately. Your identity is kept confidential.',
    documents_required: ['Written complaint', 'Names of involved students', 'Evidence if available'],
    authority: 'Anti-Ragging Committee / UGC / Police',
    procedure_steps: ['Call 1800-180-5522', 'File with college Anti-Ragging Committee', 'File on UGC website', 'File FIR if physical harm'],
    keywords: ['ragging', 'college ragging', 'anti ragging', 'bullying college', 'freshers harassment'],
  },
]

// ── Classification ─────────────────────────────────────────────────────────

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

// ── Retrieval ──────────────────────────────────────────────────────────────

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

// ── System Prompt ──────────────────────────────────────────────────────────

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

// ── Public API ──────────────────────────────────────────────────────────────

export async function askLegalQuestion(question: string): Promise<LegalQueryResponse> {
  // Step 1: Classify the query
  const category = classifyQuery(question)

  // Step 2: Retrieve relevant legal entries (RAG)
  const relevantEntries = retrieveRelevantEntries(question)

  // Step 3: Build context from retrieved entries
  const context = buildContext(relevantEntries)

  // Step 4: Resolve AI config dynamically (from AI Settings panel, or fallback to env var)
  const systemPrompt = buildSystemPrompt(context)

  const activeConfig = resolveActiveAiConfig()
  const apiKey = activeConfig?.apiKey || FALLBACK_API_KEY
  const model = activeConfig?.model || FALLBACK_MODEL
  const baseUrl = activeConfig?.baseUrl || FALLBACK_URL

  if (!apiKey) {
    throw new Error('No API key configured. Please add one in AI Settings.')
  }

  const isOpenRouterStyle = !activeConfig || activeConfig.provider === 'openrouter' || activeConfig.provider === 'custom'

  const aiResponse = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      // Only send OpenRouter-specific headers when using OpenRouter
      ...(isOpenRouterStyle && {
        'HTTP-Referer': window.location.origin,
        'X-Title': 'LegalEase AI Platform',
      }),
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      max_tokens: 1200,
      temperature: 0.3,
    }),
  })

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text()
    let errorMsg = `AI API error (${aiResponse.status})`
    try {
      const errorJson = JSON.parse(errorText)
      const detail = errorJson?.error?.message || errorJson?.message || errorText
      errorMsg = `AI API error (${aiResponse.status}): ${detail.slice(0, 200)}`
    } catch {
      errorMsg = `AI API error (${aiResponse.status}): ${errorText.slice(0, 200)}`
    }
    console.error('[LegalEase] AI API error:', errorMsg)
    throw new Error(errorMsg)
  }

  const aiData = await aiResponse.json()
  const answer = aiData.choices?.[0]?.message?.content || 'Unable to generate response.'

  // Step 5: Build structured response
  return {
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
}
