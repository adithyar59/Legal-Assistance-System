/**
 * Legal Knowledge Base Dataset
 * Contains 50+ verified legal entries across 5 categories
 * Used for RAG-style retrieval in the AI pipeline
 */

export interface LegalEntry {
  id: string
  category: LegalCategory
  title: string
  law_reference: string
  description: string
  simplified_explanation: string
  documents_required: string[]
  authority: string
  procedure_steps: string[]
  keywords: string[]
}

export type LegalCategory =
  | 'Labour Law'
  | 'Consumer Rights'
  | 'Cybercrime'
  | 'Harassment'
  | 'Tenancy'
  | 'Marriage & Family Law'
  | 'Property & Inheritance'
  | 'Criminal Procedures'
  | 'RTI & Government Services'
  | 'Education & Student Rights'

export const LEGAL_CATEGORIES: LegalCategory[] = [
  'Labour Law',
  'Consumer Rights',
  'Cybercrime',
  'Harassment',
  'Tenancy',
  'Marriage & Family Law',
  'Property & Inheritance',
  'Criminal Procedures',
  'RTI & Government Services',
  'Education & Student Rights',
]

export const legalDataset: LegalEntry[] = [
  // ─── LABOUR LAW ───────────────────────────────────────────────
  {
    id: 'L001',
    category: 'Labour Law',
    title: 'Salary Delay or Non-Payment',
    law_reference: 'Payment of Wages Act, 1936',
    description:
      'Every employer must pay wages within the prescribed time limit. For establishments with less than 1000 workers, wages must be paid by the 7th of the following month. For larger establishments, by the 10th.',
    simplified_explanation:
      'Your employer MUST pay your salary on time every month. If they delay or refuse to pay, you have the legal right to file a complaint with the Labour Commissioner.',
    documents_required: [
      'Employment appointment letter',
      'Salary slips / pay stubs',
      'Bank account statements showing missing payments',
      'Identity proof (Aadhaar / PAN card)',
    ],
    authority: 'Labour Commissioner / Labour Court',
    procedure_steps: [
      'Send a written notice to your employer demanding payment',
      'File a written complaint with the local Labour Commissioner office',
      'Attach all proof of employment and unpaid salary',
      'Authority will issue a notice to employer',
      'If unresolved, case is referred to Labour Court',
    ],
    keywords: ['salary', 'wages', 'pay', 'payment', 'unpaid', 'employer', 'delay', 'money owed'],
  },
  {
    id: 'L002',
    category: 'Labour Law',
    title: 'Wrongful Termination / Illegal Dismissal',
    law_reference: 'Industrial Disputes Act, 1947',
    description:
      'An employee in a factory or industrial establishment with 100+ workers cannot be terminated without prior government permission (retrenchment). If an employer terminates without following due process, the employee can claim reinstatement and back wages.',
    simplified_explanation:
      'If you were fired without proper notice, without valid reason, or without severance pay, this may be illegal. You can challenge wrongful termination and demand your job back or compensation.',
    documents_required: [
      'Termination letter',
      'Employment contract',
      'Salary payment history',
      'Any show-cause notices received',
      'Identity proof',
    ],
    authority: 'Labour Commissioner / Industrial Tribunal',
    procedure_steps: [
      'Collect your termination letter and all employment documents',
      'File a complaint with the Labour Commissioner within 3 years',
      'State that termination was wrongful or without proper notice',
      'Conciliation proceedings will be initiated',
      'If unresolved, case goes to Industrial Tribunal',
    ],
    keywords: ['fired', 'terminated', 'dismissal', 'sacked', 'job loss', 'illegal termination', 'wrongful'],
  },
  {
    id: 'L003',
    category: 'Labour Law',
    title: 'Denial of Provident Fund (PF)',
    law_reference: 'Employees Provident Fund and Miscellaneous Provisions Act, 1952',
    description:
      'Employers with 20+ employees must contribute to the Employee Provident Fund (EPF). Both employer and employee contribute 12% of basic wages. Denial or deduction without depositing is a criminal offense.',
    simplified_explanation:
      'Your employer must deduct and deposit your PF every month. If they deduct money from your salary for PF but do not deposit it, you can file a complaint with EPFO.',
    documents_required: [
      'Salary slips showing PF deduction',
      'EPFO UAN number',
      'Employment proof',
      'Bank statements',
    ],
    authority: 'EPFO (Employees Provident Fund Organisation)',
    procedure_steps: [
      'Check your PF balance on EPFO portal using UAN',
      'If deposits are missing, file a complaint on EPFO grievance portal',
      'Attach salary slips as proof of deduction',
      'EPFO will issue notice to employer',
      'Criminal prosecution possible for non-deposit',
    ],
    keywords: ['pf', 'provident fund', 'epfo', 'employee fund', 'retirement fund', 'deduction'],
  },
  {
    id: 'L004',
    category: 'Labour Law',
    title: 'Maternity Leave Denial',
    law_reference: 'Maternity Benefit Act, 1961 (amended 2017)',
    description:
      'Female employees are entitled to 26 weeks of paid maternity leave for the first two children. Employers with 50+ employees must also provide creche facilities. Dismissal during maternity leave is prohibited.',
    simplified_explanation:
      'If you are a working woman, you have the legal right to 26 weeks of paid maternity leave. Your employer cannot fire you during this period.',
    documents_required: [
      'Medical certificate confirming pregnancy',
      'Written application for maternity leave',
      'Employment records',
    ],
    authority: 'Labour Commissioner / Inspector under Maternity Benefit Act',
    procedure_steps: [
      'Submit written application with medical certificate to employer',
      'If denied, file complaint with local Labour Commissioner',
      'Inspector will investigate and take action',
      'Employer can be fined and ordered to pay benefit',
    ],
    keywords: ['maternity', 'pregnancy', 'maternity leave', 'baby', 'childbirth', 'mother'],
  },
  {
    id: 'L005',
    category: 'Labour Law',
    title: 'Overtime Pay Denial',
    law_reference: 'Factories Act, 1948 / Minimum Wages Act, 1948',
    description:
      'Workers who work more than 9 hours a day or 48 hours a week are entitled to overtime pay at double the ordinary rate. Employers cannot make employees work excessive overtime without compensation.',
    simplified_explanation:
      'If you are made to work extra hours beyond your normal schedule, your employer must pay you double the normal rate for those extra hours.',
    documents_required: [
      'Attendance records',
      'Duty rosters or shift schedules',
      'Salary slips',
    ],
    authority: 'Labour Commissioner / Factory Inspector',
    procedure_steps: [
      'Document your overtime hours with attendance records',
      'Calculate the overtime amount owed',
      'Send written demand to employer',
      'File complaint with Labour Commissioner if ignored',
    ],
    keywords: ['overtime', 'extra hours', 'overwork', 'night shift', 'double pay'],
  },
  {
    id: 'L006',
    category: 'Labour Law',
    title: 'Minimum Wage Violation',
    law_reference: 'Minimum Wages Act, 1948',
    description:
      'Every employer must pay workers at least the minimum wage as notified by the State Government for their industry. Payment below minimum wage is a punishable offense.',
    simplified_explanation:
      'Every worker in India has the right to a minimum wage set by the government. If your employer is paying you less than this amount, they are breaking the law.',
    documents_required: [
      'Salary slips',
      'Employment contract',
      'State minimum wage notification (available online)',
    ],
    authority: 'Labour Commissioner / Minimum Wages Inspector',
    procedure_steps: [
      'Check current minimum wage for your state and category of work',
      'Compare with your actual payment',
      'File complaint with Labour Inspector if underpaid',
      'Inspector can issue orders for payment of difference',
    ],
    keywords: ['minimum wage', 'underpaid', 'low salary', 'wage violation', 'pay less'],
  },
  {
    id: 'L007',
    category: 'Labour Law',
    title: 'Child Labour',
    law_reference: 'Child Labour (Prohibition and Regulation) Amendment Act, 2016',
    description:
      'Employment of children below 14 years in any occupation or process is completely prohibited. Children between 14-18 years cannot work in hazardous industries. Employers face imprisonment up to 2 years and fines.',
    simplified_explanation:
      'Employing children below 14 years in any work is illegal in India. Children aged 14-18 cannot work in dangerous jobs. This is a serious criminal offense.',
    documents_required: [
      'Evidence of child employment (photos, witnesses)',
      'Age proof of the child',
    ],
    authority: 'District Collector / Labour Department / Police',
    procedure_steps: [
      'Report to local police station or Labour Department',
      'File FIR if child is in immediate danger',
      'Contact CHILDLINE (1098) for child rescue',
      'Employer will face criminal prosecution',
    ],
    keywords: ['child labour', 'child work', 'minor working', 'underage worker'],
  },

  // ─── CONSUMER RIGHTS ──────────────────────────────────────────
  {
    id: 'C001',
    category: 'Consumer Rights',
    title: 'Defective Product Received',
    law_reference: 'Consumer Protection Act, 2019',
    description:
      'A consumer has the right to seek replacement or refund for defective products. The seller, manufacturer, and service provider are jointly and severally liable for defects in goods sold.',
    simplified_explanation:
      'If you bought a product that is broken, faulty, or does not work as promised, you have the right to get a replacement, refund, or repair — free of charge.',
    documents_required: [
      'Purchase receipt or invoice',
      'Product photos showing defect',
      'Warranty card',
      'Written complaint to seller',
      'Communication proof (emails/messages)',
    ],
    authority: 'District Consumer Disputes Redressal Commission',
    procedure_steps: [
      'First complain to the seller/company in writing',
      'Keep all communication as evidence',
      'If no response in 30 days, file complaint with Consumer Commission',
      'For claims up to ₹1 crore: District Commission',
      'Commission will hear the case and order compensation',
    ],
    keywords: ['defective product', 'broken item', 'faulty goods', 'not working', 'refund', 'replacement'],
  },
  {
    id: 'C002',
    category: 'Consumer Rights',
    title: 'False Advertising / Misleading Claims',
    law_reference: 'Consumer Protection Act, 2019 – Section 2(28)',
    description:
      'Misleading advertisement that falsely describes a product, gives a false guarantee, or falsely claims benefit is prohibited. Penalties include fines up to ₹10 lakh for first offense and ₹50 lakh for repeat offenses.',
    simplified_explanation:
      'If a company advertised a product claiming features or benefits that turned out to be completely false, you can file a complaint and claim compensation for being misled.',
    documents_required: [
      'Copy/screenshot of the advertisement',
      'Purchased product/receipt',
      'Evidence showing difference between ad claim and reality',
    ],
    authority: 'District Consumer Commission / Central Consumer Protection Authority (CCPA)',
    procedure_steps: [
      'Collect the advertisement and evidence of false claim',
      'File complaint with Consumer Commission or CCPA',
      'CCPA can order withdrawal of advertisement',
      'Company can be fined and ordered to compensate you',
    ],
    keywords: ['false advertisement', 'misleading', 'false claims', 'cheating', 'fraud', 'scam'],
  },
  {
    id: 'C003',
    category: 'Consumer Rights',
    title: 'Online Shopping – Delivery Not Received',
    law_reference: 'Consumer Protection (E-Commerce) Rules, 2020',
    description:
      'E-commerce platforms are responsible for ensuring delivery of goods ordered. They must provide a grievance officer and respond to complaints within 48 hours. Platform must resolve within one month.',
    simplified_explanation:
      'If you ordered something online and never received it, or received the wrong item, the e-commerce platform must resolve your complaint. You can escalate to Consumer Forum if they do not.',
    documents_required: [
      'Order confirmation email/SMS',
      'Screenshots of order and tracking',
      'Payment receipt',
      'Complaint raised with platform (ticket number)',
    ],
    authority: 'Consumer Commission / CCPA / National Consumer Helpline (1915)',
    procedure_steps: [
      'Raise complaint on e-commerce platform and note ticket number',
      'If unresolved in 30 days, call National Consumer Helpline 1915',
      'File case with District Consumer Commission',
      'Platform must refund or deliver with compensation',
    ],
    keywords: ['online shopping', 'not delivered', 'wrong item', 'ecommerce', 'amazon', 'flipkart', 'order'],
  },
  {
    id: 'C004',
    category: 'Consumer Rights',
    title: 'Bank / Financial Service Fraud',
    law_reference: 'Banking Ombudsman Scheme, 2006 / RBI Circular',
    description:
      'If a bank fails to resolve your complaint about unauthorized transactions, excessive charges, or poor service within 30 days, you can approach the Banking Ombudsman. Relief up to ₹20 lakh can be awarded.',
    simplified_explanation:
      'If money was fraudulently taken from your bank account, or the bank charged you wrongly and refuses to refund, you can complain to the Banking Ombudsman — a free dispute resolution service.',
    documents_required: [
      'Bank statements showing the issue',
      'Written complaint to bank with acknowledgment',
      'Bank\'s response (or proof they did not respond in 30 days)',
      'Identity proof',
    ],
    authority: 'Banking Ombudsman (RBI) / Consumer Commission',
    procedure_steps: [
      'Write formal complaint to bank branch manager',
      'Escalate to bank\'s grievance department if no resolution in 30 days',
      'File complaint with Banking Ombudsman at bankingombudsman.rbi.org.in',
      'No fee required; Ombudsman will investigate',
    ],
    keywords: ['bank fraud', 'unauthorized transaction', 'money stolen', 'bank charge', 'banking complaint'],
  },
  {
    id: 'C005',
    category: 'Consumer Rights',
    title: 'Service Not Delivered After Payment',
    law_reference: 'Consumer Protection Act, 2019 – Section 2(11)',
    description:
      'Deficiency in service means inadequate, imperfect, or shortcoming in quality. If a service provider takes payment and does not deliver the service, it is a deficiency under consumer law.',
    simplified_explanation:
      'If you paid for a service (like coaching classes, gym membership, hotel booking) and did not receive it, the provider must refund you or face a consumer case.',
    documents_required: [
      'Payment receipt',
      'Service agreement/contract',
      'Written complaint to service provider',
      'Proof of service not rendered',
    ],
    authority: 'District Consumer Commission',
    procedure_steps: [
      'Send written complaint to service provider demanding refund',
      'Wait 30 days for response',
      'File complaint with Consumer Commission',
      'Commission will award refund plus compensation',
    ],
    keywords: ['service not delivered', 'refund', 'payment taken', 'no service', 'gym', 'coaching', 'hotel'],
  },
  {
    id: 'C006',
    category: 'Consumer Rights',
    title: 'Medical Negligence',
    law_reference: 'Consumer Protection Act, 2019 / Indian Medical Council Act',
    description:
      'Doctors and hospitals providing medical services are included under the Consumer Protection Act. Patients can claim compensation for negligence, wrong diagnosis, unnecessary surgery, or poor standard of care.',
    simplified_explanation:
      'If a doctor or hospital was negligent in treating you — misdiagnosed, gave wrong medicine, or caused harm through carelessness — you can file a consumer complaint and claim compensation.',
    documents_required: [
      'Medical records and prescriptions',
      'Hospital bills and receipts',
      'Expert medical opinion if possible',
      'Written complaint to hospital',
    ],
    authority: 'State Medical Council / Consumer Commission / Civil Court',
    procedure_steps: [
      'Collect all medical documents as evidence',
      'File complaint with State Medical Council for disciplinary action',
      'File consumer complaint with District Consumer Commission',
      'Commission can award compensation for negligence',
    ],
    keywords: ['medical negligence', 'doctor mistake', 'hospital error', 'wrong treatment', 'misdiagnosis'],
  },
  {
    id: 'C007',
    category: 'Consumer Rights',
    title: 'Real Estate Builder Fraud',
    law_reference: 'Real Estate (Regulation and Development) Act (RERA), 2016',
    description:
      'RERA mandates that all real estate projects must be registered. Builders must deliver possession on promised date or face penalty. Homebuyers can claim refund with interest or compensation for delays.',
    simplified_explanation:
      'If a builder took your money for a flat or house but delayed possession or cheated you, RERA allows you to get a full refund with interest or force them to deliver on time.',
    documents_required: [
      'Builder-buyer agreement',
      'Payment receipts',
      'RERA registration number of project',
      'Proof of delay or fraud',
    ],
    authority: 'State RERA Authority / RERA Adjudicating Officer',
    procedure_steps: [
      'Check if project is registered on State RERA website',
      'File complaint on State RERA portal',
      'RERA authority will issue notices to builder',
      'Builder can be ordered to refund with 10-11% interest',
    ],
    keywords: ['builder fraud', 'flat', 'apartment', 'real estate', 'possession delay', 'home buyer', 'RERA'],
  },

  // ─── CYBERCRIME ───────────────────────────────────────────────
  {
    id: 'CY001',
    category: 'Cybercrime',
    title: 'Online Financial Fraud / UPI Scam',
    law_reference: 'Information Technology Act, 2000 / IPC Sections 419, 420',
    description:
      'Online fraud where a person is deceived into transferring money through UPI, fake calls, or fake websites is a criminal offense. The offense is punishable with imprisonment up to 3 years and fine.',
    simplified_explanation:
      'If someone tricked you into sending money online, through a fake call (KYC fraud), fake link, or UPI scam — report it immediately to the Cyber Crime helpline 1930. Quick action can help recover your money.',
    documents_required: [
      'Screenshots of fraudulent messages/calls',
      'Bank or UPI transaction proof',
      'Contact details of fraudster if available',
      'FIR copy',
    ],
    authority: 'Cyber Crime Cell / Police / National Cybercrime Reporting Portal',
    procedure_steps: [
      'Immediately call 1930 (Cyber Crime Helpline) to freeze transaction',
      'File complaint on cybercrime.gov.in',
      'Visit nearest police station with all evidence',
      'File FIR under IT Act and IPC sections',
      'Bank will investigate and may reverse the transaction',
    ],
    keywords: ['upi fraud', 'online fraud', 'money scam', 'kyc fraud', 'bank fraud', 'otp fraud', 'phone call fraud'],
  },
  {
    id: 'CY002',
    category: 'Cybercrime',
    title: 'Hacking / Unauthorized Account Access',
    law_reference: 'Information Technology Act, 2000 – Section 43, 66',
    description:
      'Hacking into someone\'s computer, email, social media, or any digital account without permission is a criminal offense punishable with up to 3 years imprisonment and fines up to ₹5 lakh.',
    simplified_explanation:
      'If someone hacked into your email, social media, or other online accounts without your permission, this is a serious crime. Report it to the Cyber Crime Cell immediately.',
    documents_required: [
      'Screenshots of unauthorized access',
      'Email/platform notifications of suspicious login',
      'Evidence of damage or misuse',
    ],
    authority: 'Cyber Crime Cell / Police Station',
    procedure_steps: [
      'Immediately change all passwords and enable 2FA',
      'Take screenshots of evidence',
      'File complaint on cybercrime.gov.in',
      'Visit police station with evidence',
      'File FIR under IT Act Section 66',
    ],
    keywords: ['hacked', 'account hacked', 'email hacked', 'password stolen', 'unauthorized access', 'hacking'],
  },
  {
    id: 'CY003',
    category: 'Cybercrime',
    title: 'Cyberbullying and Online Harassment',
    law_reference: 'Information Technology Act, 2000 – Section 66A (repealed) / IPC Section 507',
    description:
      'Sending threatening, abusive, or offensive messages through electronic means, creating fake profiles to harass someone, or posting false information about someone online is punishable under IPC and IT Act.',
    simplified_explanation:
      'If someone is harassing you online — sending abusive messages, making threats, creating fake profiles, or spreading false content — you can report this to the Cyber Crime Cell and police.',
    documents_required: [
      'Screenshots of harassing messages or posts',
      'Social media profile links',
      'Any identifying information about the harasser',
    ],
    authority: 'Cyber Crime Cell / Police Station',
    procedure_steps: [
      'Save and screenshot all harassing content',
      'Report the profile to the platform (Facebook, Instagram, etc.)',
      'File complaint on cybercrime.gov.in',
      'Visit police station and file FIR',
    ],
    keywords: ['cyberbullying', 'online harassment', 'abusive messages', 'fake profile', 'trolling', 'threatening online'],
  },
  {
    id: 'CY004',
    category: 'Cybercrime',
    title: 'Non-Consensual Intimate Image Sharing (Revenge Porn)',
    law_reference: 'IT Act Section 67, 67A / IPC Section 354C',
    description:
      'Sharing intimate or obscene images/videos of a person without their consent is a serious criminal offense. Punishment includes imprisonment up to 5 years and fine. Platform must also remove the content.',
    simplified_explanation:
      'If someone shared your private or intimate images or videos online without your consent, this is a serious crime called revenge porn. Police must act immediately, and the content must be removed.',
    documents_required: [
      'Link/screenshot of the offensive content',
      'Proof of identity',
      'Evidence connecting the accused if available',
    ],
    authority: 'Cyber Crime Cell / Women Helpline 181 / Police',
    procedure_steps: [
      'Report the link to National Cyber Crime Reporting Portal',
      'Report the content to the platform for immediate removal',
      'File FIR at police station',
      'Seek help from cyber crime women\'s helpline',
    ],
    keywords: ['intimate images', 'private photos', 'revenge porn', 'non-consensual', 'leaked photos'],
  },
  {
    id: 'CY005',
    category: 'Cybercrime',
    title: 'Phishing / Identity Theft',
    law_reference: 'IT Act Section 66C, 66D / IPC Section 419, 420',
    description:
      'Phishing involves using fake emails or websites to steal login credentials, banking information, or personal identity. Identity theft using stolen information is punishable with up to 3 years imprisonment.',
    simplified_explanation:
      'If someone used your personal details, identity documents, or login credentials to create fake accounts, take loans, or commit fraud in your name, this is identity theft — report it immediately.',
    documents_required: [
      'Evidence of phishing (fake email, SMS, website)',
      'Proof of identity misuse',
      'Bank statements showing fraudulent transactions',
    ],
    authority: 'Cyber Crime Cell / UIDAI (for Aadhaar misuse)',
    procedure_steps: [
      'File complaint on cybercrime.gov.in',
      'Report to your bank immediately to block transactions',
      'For Aadhaar misuse, report to UIDAI at 1947',
      'File FIR at police station',
    ],
    keywords: ['phishing', 'identity theft', 'fake email', 'account takeover', 'fraud identity'],
  },
  {
    id: 'CY006',
    category: 'Cybercrime',
    title: 'Data Privacy Violation',
    law_reference: 'Information Technology (Reasonable Security Practices) Rules, 2011',
    description:
      'Companies that collect personal data must protect it with reasonable security practices. Disclosure of personal data without consent is a punishable offense under IT Rules.',
    simplified_explanation:
      'If a company leaked or shared your personal data without your consent, you can file a complaint with CERT-In (the national cybersecurity agency) and seek compensation.',
    documents_required: [
      'Evidence of data leak (email, news report, notification)',
      'Proof you shared data with the company',
    ],
    authority: 'CERT-In / Cyber Crime Cell / Consumer Commission',
    procedure_steps: [
      'File complaint with CERT-In at incident@cert-in.org.in',
      'File consumer complaint for service deficiency',
      'File cyber crime complaint for criminal investigation',
    ],
    keywords: ['data leak', 'privacy violation', 'personal data', 'data theft', 'company data leak'],
  },
  {
    id: 'CY007',
    category: 'Cybercrime',
    title: 'Ransomware / Malware Attack',
    law_reference: 'Information Technology Act, 2000 – Section 43, 66',
    description:
      'Deploying malware or ransomware to corrupt, deny access, or extort money from victims is a criminal offense under the IT Act. Victims can file FIR and report to CERT-In.',
    simplified_explanation:
      'If your computer or phone was infected with malware that locked your files and demanded money, this is ransomware — a serious cybercrime. Do not pay. Report to police and CERT-In.',
    documents_required: [
      'Screenshots of ransomware demands',
      'System logs if available',
      'Proof of damage',
    ],
    authority: 'CERT-In / Cyber Crime Cell',
    procedure_steps: [
      'Disconnect affected devices from internet immediately',
      'Take screenshots of all demands as evidence',
      'Report to CERT-In at incident@cert-in.org.in',
      'File FIR at police station',
      'Do NOT pay the ransom',
    ],
    keywords: ['ransomware', 'malware', 'virus', 'computer attack', 'locked files', 'extortion'],
  },

  // ─── HARASSMENT ───────────────────────────────────────────────
  {
    id: 'H001',
    category: 'Harassment',
    title: 'Sexual Harassment at Workplace (POSH)',
    law_reference: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
    description:
      'Every organization with 10+ employees must have an Internal Complaints Committee (ICC). Women can file complaints about sexual harassment within 3 months of the incident. Employers must complete inquiry within 90 days.',
    simplified_explanation:
      'If you face sexual harassment at your workplace — including unwanted touching, sexual comments, or demands for sexual favors — you can file a complaint with your company\'s Internal Complaints Committee (ICC) or Local Complaints Committee.',
    documents_required: [
      'Written complaint describing the incident',
      'Date, time, and location details',
      'Names of witnesses if any',
      'Evidence (screenshots of messages if applicable)',
    ],
    authority: 'Internal Complaints Committee (ICC) / Local Complaints Committee / Labour Department',
    procedure_steps: [
      'File written complaint with company ICC within 3 months of incident',
      'If no ICC exists, file with Local Complaints Committee at District level',
      'ICC must complete inquiry within 90 days',
      'Can also file criminal FIR at police station',
      'Right to transfer to another department during inquiry',
    ],
    keywords: ['sexual harassment', 'posh', 'workplace harassment', 'inappropriate behavior', 'icc', 'unwanted touch'],
  },
  {
    id: 'H002',
    category: 'Harassment',
    title: 'Domestic Violence',
    law_reference: 'Protection of Women from Domestic Violence Act, 2005',
    description:
      'Domestic violence includes physical, emotional, sexual, and economic abuse by family members. Women can seek protection orders, residence orders, maintenance, and custody of children through Magistrate.',
    simplified_explanation:
      'If you are being beaten, abused emotionally, or controlled financially by your husband or family members, you have the right to protection under law. You can get a Protection Order from the court.',
    documents_required: [
      'Written complaint / IR (Incident Report)',
      'Medical reports if physically injured',
      'Photos of injuries if any',
      'Identity documents',
    ],
    authority: 'Protection Officer (under DV Act) / Magistrate / Police / Women Helpline 181',
    procedure_steps: [
      'Call Women Helpline 181 for immediate assistance',
      'Contact Protection Officer at District Women & Child Department',
      'File complaint with Magistrate through Protection Officer',
      'Also file FIR at police station for physical assault',
      'Court can issue Protection Order within 3 days in emergency',
    ],
    keywords: ['domestic violence', 'husband abuse', 'wife beating', 'family abuse', 'physical abuse', 'emotional abuse'],
  },
  {
    id: 'H003',
    category: 'Harassment',
    title: 'Stalking',
    law_reference: 'IPC Section 354D',
    description:
      'Stalking means following a woman or contacting her repeatedly when she has shown disinterest, or monitoring a woman\'s use of internet or electronic communications. Punishment: Up to 3 years for first conviction, 5 years for repeat.',
    simplified_explanation:
      'If someone is following you around, repeatedly calling you against your will, or monitoring your online activities without your consent, they are stalking you. This is a criminal offense — file an FIR.',
    documents_required: [
      'Call records showing repeated calls',
      'Screenshots of messages or online monitoring',
      'Witness statements if available',
      'CCTV footage if available',
    ],
    authority: 'Police Station / Women Helpline 181',
    procedure_steps: [
      'Document all instances of stalking with dates and times',
      'Save call records and messages as evidence',
      'File FIR at nearest police station under IPC 354D',
      'Can also apply for restraining order from Magistrate',
    ],
    keywords: ['stalking', 'stalker', 'following', 'monitoring', 'repeated calls', 'unwanted contact'],
  },
  {
    id: 'H004',
    category: 'Harassment',
    title: 'Dowry Harassment',
    law_reference: 'Dowry Prohibition Act, 1961 / IPC Section 498A',
    description:
      'Demanding, giving, or taking dowry is illegal. Cruelty by husband or his family towards wife for dowry is punishable with up to 3 years imprisonment under IPC 498A. In dowry death cases, punishment is 7-14 years.',
    simplified_explanation:
      'If your in-laws or husband are harassing you for more dowry or valuables after marriage, this is a serious criminal offense. You can file an FIR immediately.',
    documents_required: [
      'Written complaint describing harassment',
      'Medical reports if physically harmed',
      'Evidence of demands (messages, witnesses)',
      'Marriage certificate',
    ],
    authority: 'Police Station / Women Helpline 181 / Mahila Thana',
    procedure_steps: [
      'File FIR at police station under IPC 498A and Dowry Prohibition Act',
      'Contact Women Helpline 181 for support',
      'Seek help from State Women Commission',
      'Police must arrest accused under 498A',
    ],
    keywords: ['dowry', 'dowry harassment', '498a', 'in-laws harassment', 'marriage harassment'],
  },
  {
    id: 'H005',
    category: 'Harassment',
    title: 'Caste-Based Discrimination and Atrocities',
    law_reference: 'Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989',
    description:
      'The SC/ST Prevention of Atrocities Act prohibits serious crimes against SC/ST communities including verbal abuse, forced labour, social boycott, and violence. Investigation must be completed within 60 days.',
    simplified_explanation:
      'If you face discrimination, verbal abuse, or violence because of your caste, the SC/ST Atrocities Act provides strong protection. Police must register FIR immediately — this is a serious offense.',
    documents_required: [
      'Caste certificate',
      'Written complaint of the incident',
      'Witness statements',
      'Medical report if injured',
    ],
    authority: 'Police Station / SP-level Special Cell / SC/ST Commission',
    procedure_steps: [
      'File FIR at police station — they MUST register it',
      'File complaint with SP of the district if police refuse',
      'Contact National/State SC/ST Commission',
      'Case must be filed in Special Court under the Act',
    ],
    keywords: ['caste discrimination', 'sc st atrocities', 'dalit rights', 'untouchability', 'caste abuse'],
  },
  {
    id: 'H006',
    category: 'Harassment',
    title: 'Ragging in Educational Institutions',
    law_reference: 'UGC Regulations on Curbing the Menace of Ragging, 2009',
    description:
      'Ragging in colleges and universities is prohibited. Students who are ragged can file complaints with the institution anti-ragging committee and UGC. The institution can expel the accused.',
    simplified_explanation:
      'If you are ragged or bullied in your college or university, you have the right to complain. The institution must act immediately, and serious cases can lead to expulsion of the accused.',
    documents_required: [
      'Written complaint describing the incident',
      'Names/details of accused students',
      'Witness names',
    ],
    authority: 'Anti-Ragging Committee of Institution / UGC / Police',
    procedure_steps: [
      'Call Anti-Ragging Helpline: 1800-180-5522',
      'File written complaint with institution anti-ragging committee',
      'File complaint on UGC anti-ragging portal',
      'File FIR at police station for criminal cases',
    ],
    keywords: ['ragging', 'bullying', 'college bullying', 'senior harassment', 'campus harassment'],
  },
  {
    id: 'H007',
    category: 'Harassment',
    title: 'Police Harassment / Custodial Abuse',
    law_reference: 'IPC Section 330, 331 / Article 21 Indian Constitution',
    description:
      'Every arrested person has rights including right to know reasons for arrest, right to legal counsel, right to inform family. Custodial torture is a criminal offense. Police cannot hold you beyond 24 hours without magistrate order.',
    simplified_explanation:
      'If police are harassing you, beating you in custody, or refusing to show arrest memo — these are violations of your fundamental rights. You have the right to a lawyer immediately upon arrest.',
    documents_required: [
      'Arrest memo copy',
      'Medical certificate if tortured',
      'Written complaint',
    ],
    authority: 'Magistrate / State Human Rights Commission / National Human Rights Commission',
    procedure_steps: [
      'Demand arrest memo immediately upon arrest',
      'Request to call a lawyer — this is your right',
      'Apply for bail through magistrate within 24 hours',
      'File complaint with NHRC or SHRC for custodial abuse',
      'File Writ of Habeas Corpus in High Court if illegally detained',
    ],
    keywords: ['police harassment', 'custodial abuse', 'illegal detention', 'police torture', 'false arrest'],
  },

  // ─── TENANCY ──────────────────────────────────────────────────
  {
    id: 'T001',
    category: 'Tenancy',
    title: 'Illegal Eviction / Forced Removal from Rented Property',
    law_reference: 'Rent Control Act (State-specific) / Transfer of Property Act, 1882',
    description:
      'A landlord cannot evict a tenant without a valid court order. Forcible eviction, changing locks without court order, or removing tenant\'s belongings is illegal. Tenant must receive proper notice as per state rent control laws.',
    simplified_explanation:
      'Your landlord cannot throw you out of your rented home without going to court first. If a landlord tries to forcibly evict you by changing locks or removing your things, this is illegal.',
    documents_required: [
      'Rent agreement',
      'Rent receipts',
      'Written eviction notice from landlord',
      'Identity proof',
    ],
    authority: 'Rent Control Tribunal / Civil Court / Police',
    procedure_steps: [
      'If being forcibly evicted, call police immediately',
      'File complaint under Rent Control Act with Rent Controller',
      'Seek stay order from Rent Control Court',
      'If landlord changed locks illegally, police must intervene',
    ],
    keywords: ['eviction', 'forced out', 'locked out', 'illegal eviction', 'landlord throwing out'],
  },
  {
    id: 'T002',
    category: 'Tenancy',
    title: 'Security Deposit Withheld by Landlord',
    law_reference: 'Transfer of Property Act, 1882 / State Rent Control Acts',
    description:
      'After a tenancy ends, the landlord must return the security deposit after deducting actual repair costs. Withholding security deposit without valid reason and refusing to return it is actionable.',
    simplified_explanation:
      'If your landlord is refusing to return your security deposit after you vacated the property, you can file a case in Rent Court or Small Causes Court to get it back.',
    documents_required: [
      'Rent agreement showing deposit amount',
      'Receipt for deposit payment',
      'Proof of vacating (written notice given)',
      'Condition report of property at exit',
    ],
    authority: 'Rent Control Tribunal / Consumer Commission / Civil Court',
    procedure_steps: [
      'Send written legal notice to landlord demanding return of deposit',
      'Wait 30 days for response',
      'File complaint in Rent Control Tribunal or Small Causes Court',
      'Consumer Commission is also an option for service deficiency',
    ],
    keywords: ['security deposit', 'deposit not returned', 'landlord deposit', 'advance not returned'],
  },
  {
    id: 'T003',
    category: 'Tenancy',
    title: 'Landlord Refusing Maintenance / Repairs',
    law_reference: 'Transfer of Property Act, 1882 – Section 108',
    description:
      'The landlord has a duty to keep the rented property in habitable condition and carry out major repairs. Failure to do so is a breach of the tenancy agreement.',
    simplified_explanation:
      'Your landlord is legally responsible for keeping your rented home in good condition. If they refuse to fix major problems (leaking roof, broken plumbing, electricity issues), you can take legal action.',
    documents_required: [
      'Rent agreement',
      'Written requests to landlord for repairs',
      'Photos of the damage/problem',
    ],
    authority: 'Rent Control Tribunal / Civil Court',
    procedure_steps: [
      'Send written notice to landlord listing repairs needed',
      'Give 15-30 days to carry out repairs',
      'File application with Rent Controller if ignored',
      'Court can order landlord to carry out repairs',
    ],
    keywords: ['repairs', 'maintenance', 'landlord not repairing', 'broken plumbing', 'leaking roof', 'property condition'],
  },
  {
    id: 'T004',
    category: 'Tenancy',
    title: 'Unlawful Rent Increase',
    law_reference: 'State Rent Control Acts',
    description:
      'Rent can only be increased as per the terms in the rent agreement or as permitted by state rent control legislation. Sudden or excessive rent hikes outside the agreement terms are not permitted.',
    simplified_explanation:
      'Your landlord cannot increase your rent arbitrarily or outside the terms agreed in your rent agreement. Any unlawful rent increase can be challenged before the Rent Controller.',
    documents_required: [
      'Original rent agreement',
      'Current rent receipts',
      'Written notice of rent increase from landlord',
    ],
    authority: 'Rent Controller / Rent Control Tribunal',
    procedure_steps: [
      'Review rent agreement for rent increase clause',
      'If increase violates agreement, send written objection to landlord',
      'File application with Rent Controller to fix standard rent',
      'Continue paying original rent till order of Rent Controller',
    ],
    keywords: ['rent increase', 'rent hike', 'landlord raising rent', 'increased rent', 'unfair rent'],
  },
  {
    id: 'T005',
    category: 'Tenancy',
    title: 'Denial of Basic Utilities by Landlord',
    law_reference: 'State Rent Control Acts / Human Rights Law',
    description:
      'A landlord cannot deliberately cut off electricity, water, or other essential services to force a tenant to vacate. Such action is harassment and is punishable.',
    simplified_explanation:
      'If your landlord cuts off electricity or water to harass you or force you to leave, this is illegal. You have a right to essential services in your rented home.',
    documents_required: [
      'Rent agreement',
      'Proof of utility cutoff (photos, dates)',
      'Written complaints to landlord',
    ],
    authority: 'Rent Control Tribunal / Police / Civil Court',
    procedure_steps: [
      'Document the utility cutoff with photos and dates',
      'Send written notice to landlord demanding restoration',
      'File complaint with police for harassment',
      'File application with Rent Controller for immediate relief',
    ],
    keywords: ['no electricity', 'water cut', 'utilities cut', 'landlord harassment', 'tenant rights'],
  },
  {
    id: 'T006',
    category: 'Tenancy',
    title: 'Unregistered Rent Agreement',
    law_reference: 'Registration Act, 1908 / State Tenancy Act',
    description:
      'Rent agreements for more than 11 months must be compulsorily registered. Unregistered agreements cannot be used as evidence in court for tenancy beyond 11 months.',
    simplified_explanation:
      'If your rent agreement is for more than 11 months, it must be registered with the sub-registrar. An unregistered agreement has limited legal value. You have the right to ask your landlord to register it.',
    documents_required: [
      'Original rent agreement',
      'Identity proof of both parties',
      'Property documents',
      'Stamp duty receipt',
    ],
    authority: 'Sub-Registrar Office',
    procedure_steps: [
      'Get rent agreement drafted by a lawyer',
      'Buy appropriate stamp paper',
      'Both landlord and tenant must visit sub-registrar office',
      'Pay registration fee and get registered agreement',
    ],
    keywords: ['rent agreement', 'unregistered', 'lease agreement', 'rental contract', 'rent deed'],
  },

  // ─── Additional entries for completeness ─────────────────────
  {
    id: 'L008',
    category: 'Labour Law',
    title: 'Denial of Annual Leave / Casual Leave',
    law_reference: 'Shops and Establishments Act (State-specific) / Factories Act, 1948',
    description:
      'Workers are entitled to annual leave (earned leave) and casual leave as per their state\'s Shops and Establishments Act or Factories Act. Denial of leave entitlement or lapsing of legally earned leave is not permitted.',
    simplified_explanation:
      'Every employee has the right to annual paid leave. Your employer cannot arbitrarily deny your leave or cancel your legally earned leave without compensation.',
    documents_required: ['Employment contract', 'Leave records', 'Correspondence with HR'],
    authority: 'Labour Commissioner',
    procedure_steps: [
      'Check your leave entitlement in your appointment letter and state laws',
      'If denied, send written representation to HR/management',
      'File complaint with Labour Commissioner if still denied',
    ],
    keywords: ['leave', 'annual leave', 'vacation', 'earned leave', 'casual leave'],
  },
  {
    id: 'C008',
    category: 'Consumer Rights',
    title: 'Telecom / Internet Service Issues',
    law_reference: 'Telecom Regulatory Authority of India (TRAI) Act, 1997',
    description:
      'Telecom operators must provide services as per plans offered. If internet speed is lower than promised or services are interrupted frequently, consumers can file complaints with TRAI.',
    simplified_explanation:
      'If your mobile or broadband provider is not delivering the speed or service they promised, or overcharging you, you can file a complaint with TRAI — the telecom regulator.',
    documents_required: ['Bill copies', 'Speed test screenshots', 'Written complaint to ISP'],
    authority: 'TRAI Complaint Portal / Consumer Commission',
    procedure_steps: [
      'First complain to the service provider',
      'If unresolved, file complaint on TRAI Complaint Portal',
      'Approach Consumer Commission if still unresolved',
    ],
    keywords: ['internet slow', 'telecom complaint', 'jio airtel', 'mobile data', 'broadband', 'billing error'],
  },
  {
    id: 'H008',
    category: 'Harassment',
    title: 'Acid Attack',
    law_reference: 'IPC Section 326A, 326B',
    description:
      'Throwing acid or attempting to throw acid on a person is a specific criminal offense. Mandatory minimum 10 years imprisonment for acid attack, up to life. Hospitals must treat acid attack victims without prepayment.',
    simplified_explanation:
      'Acid attack is one of the most serious violent crimes. Hospitals are legally required to treat acid attack victims without asking for money upfront. Attackers face mandatory minimum 10 years in prison.',
    documents_required: ['Medical reports', 'FIR', 'Identity proof'],
    authority: 'Police / Hospital / National Acid Attack Victim Assistance Program',
    procedure_steps: [
      'Immediate medical treatment — hospital CANNOT refuse',
      'File FIR immediately at police station',
      'Contact Crime Against Women Cell',
      'Apply for compensation under Victim Compensation Scheme',
    ],
    keywords: ['acid attack', 'acid throw', 'burn', 'disfigurement', 'violence'],
  },
  {
    id: 'CY008',
    category: 'Cybercrime',
    title: 'Social Media Account Impersonation',
    law_reference: 'IPC Section 419, 465, 468 / IT Act Section 66D',
    description:
      'Creating a fake social media profile impersonating another person to defame them or commit fraud is a punishable offense under IPC and IT Act.',
    simplified_explanation:
      'If someone created a fake account using your name and photos to harass or defame you, this is a crime called impersonation. You can file a cybercrime complaint and get the account removed.',
    documents_required: ['Screenshot of fake profile', 'Link to fake account', 'Proof of your real identity'],
    authority: 'Cyber Crime Cell / Police',
    procedure_steps: [
      'Report fake profile to the social media platform immediately',
      'File complaint on cybercrime.gov.in',
      'File FIR at police station under IT Act Section 66D',
    ],
    keywords: ['fake account', 'impersonation', 'fake profile', 'identity fake', 'fake id'],
  },
  {
    id: 'T007',
    category: 'Tenancy',
    title: 'Landlord Entering Without Notice',
    law_reference: 'Transfer of Property Act, 1882 – Section 108',
    description:
      'A landlord cannot enter the rented premises without giving the tenant prior notice (usually 24-48 hours) except in genuine emergencies. Unauthorized entry violates the tenant\'s right to peaceful possession.',
    simplified_explanation:
      'Your landlord does not have the right to enter your rented home whenever they want without giving you prior notice. You have the right to peaceful enjoyment of your rented space.',
    documents_required: ['Rent agreement', 'Records of unauthorized entries'],
    authority: 'Rent Control Tribunal / Police',
    procedure_steps: [
      'Inform landlord in writing that prior notice is required',
      'Document any unauthorized entries',
      'File complaint with police if landlord persists',
      'Approach Rent Controller for protection',
    ],
    keywords: ['landlord entering', 'privacy', 'unauthorized entry', 'landlord trespassing', 'no notice'],
  },

  // ─── ADDITIONAL LABOUR LAW ──────────────────────────────────────
  {
    id: 'L011',
    category: 'Labour Law',
    title: 'Gratuity Rights',
    law_reference: 'Payment of Gratuity Act, 1972',
    description: 'Employees who complete 5 years of continuous service are entitled to gratuity. Gratuity = Last drawn salary × 15/26 × years of service. Applies to establishments with 10+ employees.',
    simplified_explanation: 'If you worked somewhere for 5+ years, you are entitled to gratuity money when you leave. The employer must pay it within 30 days of your last day.',
    documents_required: ['Form I (Gratuity application)', 'Employment proof', 'Last drawn salary slip', 'Service records'],
    authority: 'Controlling Authority under Gratuity Act / Labour Commissioner',
    procedure_steps: ['Apply to employer in Form I', 'Employer must pay within 30 days', 'If refused, file with Controlling Authority', 'Authority issues notice to employer', 'Order passed within 3 months'],
    keywords: ['gratuity', 'gratuity payment', '5 years service', 'retirement benefit', 'gratuity not paid'],
  },
  {
    id: 'L012',
    category: 'Labour Law',
    title: 'Workplace Safety and Accidents',
    law_reference: 'Factories Act, 1948 / Occupational Safety, Health and Working Conditions Code, 2020',
    description: 'Employers must ensure safe working conditions. Workers injured on duty are entitled to compensation. Dangerous operations require safety equipment, training, and medical facilities.',
    simplified_explanation: 'Your employer must provide a safe workplace. If you are injured at work, you are entitled to compensation including medical treatment and paid leave.',
    documents_required: ['Medical reports', 'Accident report', 'Employment proof', 'Witness statements'],
    authority: 'Factory Inspector / Labour Commissioner / ESI',
    procedure_steps: ['Report accident to supervisor immediately', 'Get medical treatment (covered by ESI)', 'File report with Factory Inspector', 'Claim compensation under Workmen\'s Compensation Act', 'If denied, approach Labour Court'],
    keywords: ['workplace injury', 'factory accident', 'safety at work', 'work injury', 'occupational safety'],
  },
  {
    id: 'L013',
    category: 'Labour Law',
    title: 'ESI (Employee State Insurance) Benefits',
    law_reference: 'Employees State Insurance Act, 1948',
    description: 'ESI provides medical, disability, maternity, and unemployment benefits to workers earning up to ₹21,000/month. Employer contributes 3.25% and employee 0.75% of wages.',
    simplified_explanation: 'If you earn up to ₹21,000/month, you are entitled to ESI benefits including free medical care, sick leave pay, and maternity benefits. Both you and your employer contribute.',
    documents_required: ['ESI card', 'Salary slip showing ESI deduction', 'Medical certificate'],
    authority: 'ESIC (Employee State Insurance Corporation)',
    procedure_steps: ['Register on ESIC portal with employer', 'Get ESI card', 'Visit ESI hospital or empanelled hospital for treatment', 'Claim cash benefits through employer', 'File grievance on ESIC portal if denied'],
    keywords: ['ESI', 'ESIC', 'employee insurance', 'medical benefits', 'sick leave', 'employee health'],
  },
  {
    id: 'L014',
    category: 'Labour Law',
    title: 'Equal Pay for Equal Work',
    law_reference: 'Equal Remuneration Act, 1976 / Code on Wages, 2019',
    description: 'Employees performing the same or similar work must receive equal pay regardless of gender. Gender-based wage discrimination is illegal.',
    simplified_explanation: 'Women must be paid the same as men for the same work. If you are paid less because of your gender, file a complaint with the Labour Commissioner.',
    documents_required: ['Salary slips', 'Job description', 'Proof of comparable work by colleagues', 'Employment letter'],
    authority: 'Labour Commissioner / Labour Court',
    procedure_steps: ['Document the pay disparity with evidence', 'File complaint with Labour Commissioner', 'Authority investigates and compares wages', 'Employer can be fined for discrimination'],
    keywords: ['equal pay', 'gender pay gap', 'wage discrimination', 'unequal salary', 'women pay'],
  },
  {
    id: 'L015',
    category: 'Labour Law',
    title: 'Working Hours and Overtime',
    law_reference: 'Factories Act, 1948 / Shops and Establishments Act',
    description: 'Maximum working hours are 9 hours per day and 48 hours per week. Overtime must be paid at double the normal rate. Weekly rest day is mandatory.',
    simplified_explanation: 'You cannot be made to work more than 9 hours a day without overtime pay. Overtime is paid at DOUBLE your normal rate. You are entitled to at least one day off per week.',
    documents_required: ['Attendance records', 'Salary slips', 'Work schedule'],
    authority: 'Labour Inspector / Labour Commissioner',
    procedure_steps: ['Document your actual working hours', 'Send written complaint to employer', 'File complaint with Labour Inspector', 'Inspector will inspect and verify', 'Employer ordered to pay overtime dues'],
    keywords: ['overtime', 'working hours', 'extra hours', 'no day off', 'overtime pay', 'long hours'],
  },
  {
    id: 'L016',
    category: 'Labour Law',
    title: 'Bonus Payment Rights',
    law_reference: 'Payment of Bonus Act, 1965',
    description: 'Employees earning up to ₹21,000/month are entitled to annual bonus — minimum 8.33% to maximum 20% of salary. Applies to establishments with 20+ employees.',
    simplified_explanation: 'If you earn up to ₹21,000/month and your company has 20+ employees, you are entitled to a yearly bonus of at least 8.33% of your salary.',
    documents_required: ['Salary slips', 'Employment letter', 'Previous bonus payment records'],
    authority: 'Labour Commissioner / Industrial Tribunal',
    procedure_steps: ['Check if you are eligible (salary and establishment size)', 'Send written demand to employer', 'File complaint with Labour Commissioner if not paid', 'Commissioner orders employer to pay'],
    keywords: ['bonus', 'annual bonus', 'festival bonus', 'bonus not paid', 'minimum bonus'],
  },

  // ─── ADDITIONAL CONSUMER RIGHTS ──────────────────────────────────
  {
    id: 'C005',
    category: 'Consumer Rights',
    title: 'Medical Negligence',
    law_reference: 'Consumer Protection Act, 2019 / Indian Medical Council Regulations',
    description: 'Hospitals and doctors can be held liable for medical negligence. Compensation claims can be filed with Consumer Commission. Medical records must be provided to patients.',
    simplified_explanation: 'If a doctor or hospital treated you negligently and it caused harm, you can claim compensation through Consumer Commission. Hospitals must give you your medical records.',
    documents_required: ['Medical records and prescriptions', 'Hospital bills', 'Expert medical opinion', 'Discharge summary'],
    authority: 'Consumer Commission / Medical Council / Civil Court',
    procedure_steps: ['Get complete medical records from hospital', 'Get second opinion from another doctor', 'Send legal notice to hospital', 'File complaint with State Medical Council', 'File case with Consumer Commission for compensation'],
    keywords: ['medical negligence', 'hospital error', 'wrong treatment', 'doctor negligence', 'medical malpractice'],
  },
  {
    id: 'C006',
    category: 'Consumer Rights',
    title: 'Insurance Claim Rejection',
    law_reference: 'Insurance Regulatory and Development Authority (IRDA) Act, 1999',
    description: 'Insurance companies cannot reject claims without valid reason. IRDA Grievance Redressal platform is available. Insurance Ombudsman handles disputes up to ₹30 lakh.',
    simplified_explanation: 'If your insurance claim is rejected unfairly, complain to IRDA or Insurance Ombudsman. You have the right to know the exact reason for rejection.',
    documents_required: ['Policy document', 'Claim form submitted', 'Rejection letter with reasons', 'Medical records (for health insurance)'],
    authority: 'Insurance Ombudsman / IRDA / Consumer Commission',
    procedure_steps: ['Get rejection reason in writing', 'Appeal to insurance company\'s grievance cell', 'If unsatisfied, file with Insurance Ombudsman (free)', 'Can also file with Consumer Commission', 'Approach IRDA portal for regulatory complaint'],
    keywords: ['insurance claim rejected', 'insurance denied', 'health insurance', 'life insurance', 'claim rejection'],
  },
  {
    id: 'C007',
    category: 'Consumer Rights',
    title: 'Misleading Advertisements',
    law_reference: 'Consumer Protection Act, 2019 – Section 2(28) / ASCI Code',
    description: 'Advertisements must not mislead consumers. CCPA (Central Consumer Protection Authority) can impose penalties up to ₹50 lakh for false ads. Endorsers can also be held liable.',
    simplified_explanation: 'If you bought something based on a false or misleading advertisement, you can file a complaint. The manufacturer AND the celebrity endorsing it can be held responsible.',
    documents_required: ['Copy of advertisement (screenshot, print)', 'Proof of purchase', 'Evidence of misleading claims'],
    authority: 'CCPA / ASCI / Consumer Commission',
    procedure_steps: ['Save evidence of the misleading ad', 'Complain to ASCI (Advertising Standards Council)', 'File complaint with CCPA', 'File case with Consumer Commission for personal loss'],
    keywords: ['fake advertisement', 'misleading ad', 'false claims', 'product not as advertised', 'false advertising'],
  },
  {
    id: 'C008',
    category: 'Consumer Rights',
    title: 'Excessive Billing by Hospital',
    law_reference: 'Consumer Protection Act, 2019 / CGHS Rates / State Clinical Establishment Acts',
    description: 'Hospitals cannot charge exorbitant rates for treatment. Many states have Clinical Establishment Acts regulating charges. Patients can challenge excessive bills.',
    simplified_explanation: 'If a hospital charged you an unreasonably high amount that doesn\'t match standard rates, you can challenge it. File complaint with health authority or Consumer Commission.',
    documents_required: ['Itemized hospital bill', 'Treatment records', 'CGHS/government approved rate charts', 'Insurance coverage details if any'],
    authority: 'State Health Authority / Consumer Commission',
    procedure_steps: ['Request itemized bill from hospital', 'Compare with government approved rates', 'File complaint with hospital management', 'File with District Consumer Commission', 'Can also complain to state health department'],
    keywords: ['hospital bill', 'excessive charges', 'hospital overcharging', 'medical bills', 'expensive hospital'],
  },
  {
    id: 'C009',
    category: 'Consumer Rights',
    title: 'Unfair Trade Practices',
    law_reference: 'Consumer Protection Act, 2019 – Section 2(47)',
    description: 'Practices like false representation, hidden charges, bait-and-switch, and not honoring warranties are unfair trade practices actionable under consumer law.',
    simplified_explanation: 'If a seller used deceptive practices like hidden charges, false promises, or bait-and-switch tactics, you can file a consumer complaint for compensation.',
    documents_required: ['Purchase receipt', 'Communication with seller', 'Evidence of unfair practice', 'Warranty documents'],
    authority: 'Consumer Commission / CCPA',
    procedure_steps: ['Document the unfair practice with evidence', 'Send legal notice to seller', 'File complaint with Consumer Forum', 'CCPA can also take suo motu action'],
    keywords: ['unfair trade', 'hidden charges', 'bait and switch', 'false promise', 'cheated by seller'],
  },
  {
    id: 'C010',
    category: 'Consumer Rights',
    title: 'Telecom Service Complaints',
    law_reference: 'TRAI Act, 1997 / Telecom Consumer Complaint Redressal Regulations, 2012',
    description: 'Telecom companies must resolve complaints within 3 days. Unresolved complaints can be escalated to Appellate Authority. TRAI regulates call drops, spam, and service quality.',
    simplified_explanation: 'If your telecom provider is giving poor service, overcharging, or not resolving complaints, escalate to the company\'s Appellate Authority or TRAI.',
    documents_required: ['Phone/broadband bill', 'Complaint number from provider', 'Service agreement'],
    authority: 'Telecom Provider / TRAI / Consumer Commission',
    procedure_steps: ['Log complaint with telecom provider', 'If not resolved in 3 days, escalate to Appellate Authority', 'If still unresolved, complain to TRAI', 'Can also file with Consumer Commission'],
    keywords: ['telecom complaint', 'mobile network', 'phone bill', 'internet problem', 'call drops', 'SIM blocked'],
  },

  // ─── ADDITIONAL CYBERCRIME ──────────────────────────────────────
  {
    id: 'CY004',
    category: 'Cybercrime',
    title: 'Social Media Impersonation',
    law_reference: 'IT Act, 2000 – Section 66D / IPC Section 419',
    description: 'Creating a fake social media profile of someone else is a criminal offense. Imprisonment up to 3 years and fine. Also violates privacy rights.',
    simplified_explanation: 'If someone created a fake profile using your name, photos, or identity on social media, report it immediately. This is a crime and you can file an FIR.',
    documents_required: ['Screenshots of fake profile', 'Your real profile/ID proof', 'URL of fake profile', 'Any harassing messages from the fake profile'],
    authority: 'Cyber Crime Cell / Police Station / Social Media Platform',
    procedure_steps: ['Screenshot the fake profile before it gets deleted', 'Report the profile to the social media platform', 'File complaint on cybercrime.gov.in', 'File FIR at nearest police station', 'Platform must take down the profile'],
    keywords: ['fake profile', 'impersonation', 'identity theft social media', 'fake account', 'someone using my name'],
  },
  {
    id: 'CY005',
    category: 'Cybercrime',
    title: 'Data Privacy Violation',
    law_reference: 'IT Act, 2000 – Section 43A / Digital Personal Data Protection Act, 2023',
    description: 'Companies must protect personal data. Unauthorized disclosure, selling, or misuse of personal data is punishable. Data breach must be reported.',
    simplified_explanation: 'If a company leaked your personal data or shared it without your consent, they can be held liable. You have the right to know what data they have about you.',
    documents_required: ['Proof of data leak or misuse', 'Communications showing data sharing without consent', 'Screenshots of exposed data'],
    authority: 'Data Protection Board / Cyber Crime Cell / Consumer Commission',
    procedure_steps: ['Document the data breach or misuse', 'File complaint with the company\'s data protection officer', 'Report on cybercrime.gov.in', 'File complaint with Data Protection Board', 'Can also file with Consumer Commission for damages'],
    keywords: ['data leak', 'privacy violation', 'personal data misuse', 'data breach', 'information leaked'],
  },
  {
    id: 'CY006',
    category: 'Cybercrime',
    title: 'Ransomware Attack',
    law_reference: 'IT Act, 2000 – Sections 43, 66 / IPC Section 384',
    description: 'Ransomware attacks that lock your computer and demand payment are serious cybercrimes. Report immediately. Do NOT pay the ransom.',
    simplified_explanation: 'If your computer is locked and someone is demanding money to unlock it, DO NOT PAY. Report to cybercrime.gov.in and disconnect from internet immediately.',
    documents_required: ['Screenshots of ransom message', 'IP address logs if available', 'Any email correspondence with attacker'],
    authority: 'Indian Computer Emergency Response Team (CERT-In) / Cyber Crime Cell',
    procedure_steps: ['Do NOT pay the ransom', 'Disconnect device from internet', 'Report to cybercrime.gov.in', 'Report to CERT-In (cert-in.org.in)', 'File FIR at police station'],
    keywords: ['ransomware', 'computer locked', 'ransom demand', 'virus attack', 'files encrypted'],
  },
  {
    id: 'CY007',
    category: 'Cybercrime',
    title: 'Non-Consensual Intimate Images',
    law_reference: 'IT Act, 2000 – Section 66E / IPC Section 354C',
    description: 'Publishing, sharing, or threatening to share intimate images without consent is a criminal offense. Victims can seek immediate takedown and criminal prosecution.',
    simplified_explanation: 'If someone is sharing or threatening to share your private/intimate photos without your consent, this is a CRIME. Report immediately for swift action.',
    documents_required: ['Screenshots showing the shared content or threats', 'Communication proof (messages, emails)', 'Your identity proof'],
    authority: 'Cyber Crime Cell / Police / Women Helpline 181',
    procedure_steps: ['Save all evidence (screenshots) immediately', 'Call Women Helpline 181 (for women)', 'Report on cybercrime.gov.in', 'File FIR at police station', 'Request takedown from platform/website'],
    keywords: ['revenge porn', 'intimate images shared', 'private photos', 'blackmail photos', 'morphed images'],
  },

  // ─── ADDITIONAL HARASSMENT ──────────────────────────────────────
  {
    id: 'H005',
    category: 'Harassment',
    title: 'Acid Attack',
    law_reference: 'IPC Sections 326A, 326B / Compensation Scheme',
    description: 'Acid attack is punishable with minimum 10 years to life imprisonment and fine. Victim entitled to free medical treatment and compensation of at least ₹3 lakh from state government.',
    simplified_explanation: 'Acid attacks carry extremely severe punishment. Victims get free medical treatment and government compensation of at least ₹3 lakh. Sale of acid is restricted.',
    documents_required: ['FIR copy', 'Medical reports', 'Photographs of injuries', 'Witness statements'],
    authority: 'Police / State Health Department / District Legal Services Authority',
    procedure_steps: ['Get medical treatment immediately (free at all hospitals)', 'File FIR (police must register)', 'Apply for victim compensation from DLSA', 'Get disability certificate if applicable', 'Government provides rehabilitation support'],
    keywords: ['acid attack', 'acid thrown', 'acid victim rights', 'acid burn', 'acid sale'],
  },
  {
    id: 'H006',
    category: 'Harassment',
    title: 'Caste-Based Discrimination',
    law_reference: 'SC/ST (Prevention of Atrocities) Act, 1989 (Amended 2015)',
    description: 'Any act of discrimination, humiliation, or violence against SC/ST persons is severely punishable. No anticipatory bail available. Special courts handle these cases.',
    simplified_explanation: 'If you belong to SC/ST community and face discrimination, abuse, or denial of service based on caste, this is a serious crime with strict punishment. File FIR immediately.',
    documents_required: ['Caste certificate', 'Written complaint', 'Witness statements', 'Evidence of discrimination (audio, video, messages)'],
    authority: 'Police (special officer for SC/ST cases) / Special Court',
    procedure_steps: ['File FIR at police station — police cannot refuse', 'Investigation is done by officer of DSP rank or above', 'Case heard by Special Court', 'Victim gets compensation from state government', 'No anticipatory bail for the accused'],
    keywords: ['caste discrimination', 'untouchability', 'SC ST atrocity', 'caste abuse', 'dalit harassment'],
  },
  {
    id: 'H007',
    category: 'Harassment',
    title: 'Street Harassment / Eve Teasing',
    law_reference: 'IPC Sections 354, 354A-D / State anti-eve teasing laws',
    description: 'Eve teasing, catcalling, stalking, and any form of street harassment is a criminal offense. Women can call 112 (emergency) or 181 (women helpline) for immediate help.',
    simplified_explanation: 'If someone harasses you in public — whistling, passing comments, following, or touching — this is a CRIME. Call 112 for immediate police help or 181 for women helpline.',
    documents_required: ['Written complaint', 'Description of offender', 'Witness statements', 'CCTV footage if available'],
    authority: 'Police Station / Women Helpline 181 / Emergency 112',
    procedure_steps: ['Call 112 for emergency or 181 for women helpline', 'Note the offender\'s description and location', 'File FIR at nearest police station', 'If witnesses are present, get their statements', 'Request CCTV footage from nearby shops/cameras'],
    keywords: ['eve teasing', 'street harassment', 'catcalling', 'molestation', 'public harassment', 'groping'],
  },
  {
    id: 'H008',
    category: 'Harassment',
    title: 'Child Abuse / POCSO Act',
    law_reference: 'Protection of Children from Sexual Offences Act, 2012 (POCSO)',
    description: 'All forms of sexual abuse against children below 18 are severely punishable under POCSO. Mandatory reporting — anyone who knows about such abuse MUST report it. Special courts ensure speedy trial.',
    simplified_explanation: 'Any sexual abuse of a child is a very serious crime under POCSO Act. If you know about it, you MUST report it — not reporting is also an offense. Call CHILDLINE 1098.',
    documents_required: ['Written complaint', 'Child\'s birth certificate/age proof', 'Medical examination report', 'Counselor\'s assessment'],
    authority: 'Police / Special POCSO Court / CHILDLINE 1098',
    procedure_steps: ['Call CHILDLINE 1098 immediately', 'File FIR at police station — must be registered', 'Medical examination within 24 hours', 'Child Welfare Committee notified', 'Trial in Special Court with child-friendly procedures'],
    keywords: ['child abuse', 'POCSO', 'child sexual abuse', 'child molestation', 'child protection', 'minor abuse'],
  },

  // ─── ADDITIONAL TENANCY ──────────────────────────────────────
  {
    id: 'T004',
    category: 'Tenancy',
    title: 'Tenant Rights During Sale of Property',
    law_reference: 'Transfer of Property Act, 1882 – Section 108 / State Rent Control Acts',
    description: 'When a rented property is sold, existing tenancy continues. New owner cannot evict existing tenant without following legal eviction process. Tenant gets right of first refusal in some states.',
    simplified_explanation: 'If your landlord sells the property, the new owner cannot just throw you out. Your tenancy agreement continues with the new owner until it expires or is legally terminated.',
    documents_required: ['Existing rent agreement', 'Rent payment receipts', 'Notice from new owner', 'Sale deed or notice of sale'],
    authority: 'Rent Controller / Civil Court',
    procedure_steps: ['Continue paying rent to new owner', 'Get new owner\'s details in writing', 'If new owner tries to evict, seek legal help', 'File before Rent Controller if threatened', 'Your lease terms continue unchanged'],
    keywords: ['property sold', 'new landlord', 'tenant rights sale', 'landlord selling house', 'tenancy continues'],
  },
  {
    id: 'T005',
    category: 'Tenancy',
    title: 'Essential Services Cut-Off by Landlord',
    law_reference: 'State Rent Control Acts / Specific Relief Act, 1963',
    description: 'Landlord cannot cut off electricity, water, or other essential services to force tenant to vacate. This is illegal and tenant can seek legal remedies.',
    simplified_explanation: 'If your landlord cuts your electricity, water, or locks you out to force you to leave — this is ILLEGAL. Call the police and file a case with Rent Controller.',
    documents_required: ['Rent agreement', 'Proof of service cut-off (photos, bills)', 'Rent payment receipts', 'Complaint to police'],
    authority: 'Rent Controller / Police / Civil Court',
    procedure_steps: ['Document the cut-off with photos and timestamps', 'File police complaint immediately', 'File application before Rent Controller', 'Seek temporary injunction from Civil Court', 'Landlord can be penalized'],
    keywords: ['electricity cut', 'water cut', 'services cut', 'landlord harassment', 'locked out by landlord'],
  },
  {
    id: 'T006',
    category: 'Tenancy',
    title: 'Rental Agreement Essentials',
    law_reference: 'Indian Registration Act, 1908 / Transfer of Property Act, 1882',
    description: 'Rental agreements exceeding 11 months must be registered. Agreement should include rent amount, duration, security deposit terms, maintenance responsibilities, and notice period.',
    simplified_explanation: 'Always sign a written rental agreement. If it\'s for more than 11 months, it must be registered at the Sub-Registrar office. Include all terms clearly in writing.',
    documents_required: ['Draft rental agreement', 'ID proof of tenant and landlord', 'Property ownership proof of landlord', 'Stamp paper of appropriate value'],
    authority: 'Sub-Registrar Office',
    procedure_steps: ['Draft comprehensive rental agreement', 'Buy stamp paper of appropriate value (varies by state)', 'Both parties sign the agreement', 'Get it registered at Sub-Registrar if 11+ months', 'Keep original copy with each party'],
    keywords: ['rental agreement', 'lease agreement', 'rent agreement', 'how to make rental agreement', 'lease deed'],
  },

  // ─── MARRIAGE & FAMILY LAW ──────────────────────────────────────
  {
    id: 'MF001',
    category: 'Marriage & Family Law',
    title: 'Divorce by Mutual Consent',
    law_reference: 'Hindu Marriage Act, 1955 – Section 13B / Special Marriage Act, 1954 – Section 28',
    description: 'Both husband and wife can jointly file for divorce if they have been living separately for at least one year and mutually agree to dissolve the marriage. A 6-month cooling-off period is mandatory.',
    simplified_explanation: 'If both you and your spouse agree to divorce, you can file a joint petition. The court gives you 6 months to reconsider. After that, the divorce is granted.',
    documents_required: ['Marriage certificate', 'Joint petition signed by both', 'Address proof of both parties', 'Proof of separation period'],
    authority: 'Family Court / District Court',
    procedure_steps: ['File joint petition in Family Court', 'Court records statements of both parties', '6-month cooling off period begins', 'After 6 months, both must appear again to confirm', 'Court grants divorce decree'],
    keywords: ['divorce', 'mutual consent divorce', 'separation', 'marriage dissolution', 'end marriage'],
  },
  {
    id: 'MF002',
    category: 'Marriage & Family Law',
    title: 'Contested Divorce',
    law_reference: 'Hindu Marriage Act, 1955 – Section 13 / Indian Divorce Act, 1869',
    description: 'When one spouse files for divorce without the other party\'s consent. Grounds include cruelty, adultery, desertion for 2+ years, mental disorder, conversion to another religion, or presumption of death.',
    simplified_explanation: 'If your spouse refuses to agree to divorce, you can still file for divorce on specific legal grounds like cruelty, desertion, or adultery. The process takes longer but the court can grant it.',
    documents_required: ['Marriage certificate', 'Evidence supporting grounds for divorce', 'Address proof', 'Income proof for maintenance claims'],
    authority: 'Family Court / District Court',
    procedure_steps: ['File divorce petition stating grounds', 'Court issues notice to other party', 'Both parties present evidence', 'Court hears arguments', 'Judgment is delivered'],
    keywords: ['contested divorce', 'divorce without consent', 'cruelty divorce', 'desertion', 'adultery divorce'],
  },
  {
    id: 'MF003',
    category: 'Marriage & Family Law',
    title: 'Child Custody Rights',
    law_reference: 'Guardians and Wards Act, 1890 / Hindu Minority and Guardianship Act, 1956',
    description: 'In custody disputes, the welfare of the child is paramount. Generally, mother gets custody of children below 5 years. Both parents have the right to seek custody or visitation.',
    simplified_explanation: 'In a divorce, both parents can seek custody of children. Courts decide based on the child\'s best interests. Mothers usually get custody of very young children, but fathers have equal rights to apply.',
    documents_required: ['Divorce petition or separation proof', 'Child\'s birth certificate', 'Evidence of financial capability', 'Character references'],
    authority: 'Family Court / Guardian Court',
    procedure_steps: ['File custody petition in Family Court', 'Court may appoint a guardian ad litem', 'Both parents present their case', 'Court considers child\'s welfare as top priority', 'Custody and visitation order passed'],
    keywords: ['child custody', 'custody rights', 'visitation rights', 'children divorce', 'guardianship'],
  },
  {
    id: 'MF004',
    category: 'Marriage & Family Law',
    title: 'Maintenance / Alimony Rights',
    law_reference: 'Hindu Adoptions and Maintenance Act, 1956 / CrPC Section 125',
    description: 'A wife (or husband with insufficient means) can claim maintenance from the spouse during and after marriage. Under CrPC 125, even divorced wives can claim maintenance if they have not remarried.',
    simplified_explanation: 'If your spouse is not supporting you financially, you have the legal right to claim maintenance (monthly financial support). This applies during marriage, separation, and even after divorce.',
    documents_required: ['Marriage certificate', 'Proof of spouse\'s income', 'Proof of your expenses', 'Bank statements'],
    authority: 'Family Court / Magistrate Court (under CrPC 125)',
    procedure_steps: ['File maintenance petition under CrPC 125 or personal law', 'Court issues notice to spouse', 'Both parties disclose income details', 'Court fixes maintenance amount based on need and capacity', 'Maintenance is enforceable as court order'],
    keywords: ['maintenance', 'alimony', 'spousal support', 'wife maintenance', 'financial support marriage'],
  },
  {
    id: 'MF005',
    category: 'Marriage & Family Law',
    title: 'Domestic Violence Protection for Women',
    law_reference: 'Protection of Women from Domestic Violence Act, 2005',
    description: 'Women in domestic relationships can seek protection orders, residence orders, monetary relief, and custody orders. Covers physical, sexual, verbal, emotional, and economic abuse.',
    simplified_explanation: 'If you face any kind of abuse from your husband or in-laws — physical, emotional, or financial — you can get a Protection Order from the court that legally stops the abuse.',
    documents_required: ['Written complaint', 'Medical reports if injured', 'Witness statements', 'Marriage certificate'],
    authority: 'Magistrate / Protection Officer / Women Helpline 181',
    procedure_steps: ['Call Women Helpline 181', 'File complaint with Protection Officer', 'Protection Officer helps file case before Magistrate', 'Court can issue Protection Order within 3 days in emergencies', 'Violation of Protection Order is criminal offense'],
    keywords: ['domestic violence protection', 'abuse protection order', 'matrimonial abuse', 'wife protection', 'marriage abuse'],
  },
  {
    id: 'MF006',
    category: 'Marriage & Family Law',
    title: 'Registration of Marriage',
    law_reference: 'Hindu Marriage Act, 1955 / Special Marriage Act, 1954 / Compulsory Registration of Marriages',
    description: 'Marriage registration is compulsory in most states. It serves as legally valid proof of marriage. Required for passport, visa, bank accounts, and other official purposes.',
    simplified_explanation: 'Getting your marriage registered is extremely important. It\'s proof of your marriage and is needed for passports, visas, and legal matters. You can register at the Sub-Registrar office.',
    documents_required: ['Marriage invitation card or photos', 'Age and address proof of both', 'Two witnesses with ID proof', 'Marriage certificate from religious authority if any'],
    authority: 'Sub-Registrar of Marriages / Municipal Authority',
    procedure_steps: ['Apply online or visit Sub-Registrar office', 'Submit required documents', 'Both parties and witnesses must be present', 'Pay the prescribed fee', 'Marriage certificate issued usually within 7-15 days'],
    keywords: ['marriage registration', 'marriage certificate', 'register marriage', 'proof of marriage', 'marriage document'],
  },
  {
    id: 'MF007',
    category: 'Marriage & Family Law',
    title: 'Live-in Relationship Rights',
    law_reference: 'Protection of Women from Domestic Violence Act, 2005 / Supreme Court Guidelines',
    description: 'Live-in relationships are not illegal in India (Supreme Court in Khushboo v. Kanniammal, 2010). Women in long-term live-in relationships have domestic violence protection and can claim maintenance.',
    simplified_explanation: 'Living together without marriage is legal in India. Women in live-in relationships have legal protection against domestic violence and can claim maintenance if the relationship resembles marriage.',
    documents_required: ['Proof of cohabitation (rent agreement, utility bills)', 'Duration of relationship evidence', 'Any shared financial records'],
    authority: 'Magistrate Court / Family Court',
    procedure_steps: ['File complaint under DV Act if facing abuse', 'Apply for maintenance under CrPC 125 if applicable', 'Provide evidence of long-term domestic relationship', 'Court will assess based on duration and nature of relationship'],
    keywords: ['live-in', 'living together', 'cohabitation', 'live-in relationship rights', 'unmarried couple'],
  },
  {
    id: 'MF008',
    category: 'Marriage & Family Law',
    title: 'Inter-Caste / Inter-Religion Marriage Protection',
    law_reference: 'Special Marriage Act, 1954 / Article 21 Constitution of India',
    description: 'Inter-caste and inter-religion marriages are legal under the Special Marriage Act. Couples facing threats from families can seek police protection. Honor killing is a criminal offense.',
    simplified_explanation: 'You have the constitutional right to marry anyone regardless of caste or religion. If your family is threatening you, seek police protection. Courts routinely grant protection to inter-caste and inter-religion couples.',
    documents_required: ['Identity proof of both parties', 'Age proof (both must be of legal age)', 'Application under Special Marriage Act', 'Address proof'],
    authority: 'Marriage Registrar / Police / High Court (for protection)',
    procedure_steps: ['File notice with Marriage Registrar under Special Marriage Act', '30-day notice period', 'If family threatens, file complaint with police for protection', 'Seek protection from High Court if needed', 'Marriage solemnized after 30 days'],
    keywords: ['inter-caste marriage', 'inter-religion marriage', 'love marriage', 'honor killing', 'family threats marriage', 'special marriage act'],
  },
  {
    id: 'MF009',
    category: 'Marriage & Family Law',
    title: 'Child Marriage Prevention',
    law_reference: 'Prohibition of Child Marriage Act, 2006',
    description: 'Marriage below 18 for girls and 21 for boys is illegal. Child marriages are voidable at the option of the minor. Anyone promoting or conducting child marriage faces imprisonment up to 2 years.',
    simplified_explanation: 'If a girl below 18 or boy below 21 is being forced into marriage, this is a crime. Report it to the police or Child Marriage Prohibition Officer. The marriage can be annulled.',
    documents_required: ['Age proof of the minor', 'Evidence of planned/conducted child marriage', 'Complaint in writing'],
    authority: 'Child Marriage Prohibition Officer / Police / District Magistrate',
    procedure_steps: ['Report to police or CMPO immediately', 'Call CHILDLINE 1098', 'District Magistrate can issue injunction to prevent the marriage', 'FIR filed against those arranging the marriage', 'Court can annul the child marriage'],
    keywords: ['child marriage', 'underage marriage', 'minor marriage', 'forced marriage minor', 'prevent child marriage'],
  },
  {
    id: 'MF010',
    category: 'Marriage & Family Law',
    title: 'Adoption Procedure in India',
    law_reference: 'Juvenile Justice (Care and Protection of Children) Act, 2015 / CARA Guidelines',
    description: 'Adoption in India is regulated by CARA (Central Adoption Resource Authority). Prospective adoptive parents must register on the CARA portal. Single parents can also adopt.',
    simplified_explanation: 'If you want to adopt a child in India, you must register on the CARA website. The process includes home study, child referral, and court order. Both married couples and single persons can adopt.',
    documents_required: ['Identity and address proof', 'Income proof', 'Marriage certificate (for couples)', 'Medical fitness certificate', 'No criminal record declaration'],
    authority: 'CARA (Central Adoption Resource Authority) / District Court',
    procedure_steps: ['Register on CARA portal (cara.nic.in)', 'Complete home study assessment', 'Receive child referral', 'Accept referral and complete pre-adoption foster care', 'File adoption petition in court', 'Court grants adoption order'],
    keywords: ['adoption', 'adopt child', 'child adoption India', 'CARA adoption', 'orphan adoption'],
  },

  // ─── PROPERTY & INHERITANCE ──────────────────────────────────────
  {
    id: 'PI001',
    category: 'Property & Inheritance',
    title: 'Writing a Valid Will (Testament)',
    law_reference: 'Indian Succession Act, 1925',
    description: 'Any person of sound mind aged 18+ can write a will. A will must be signed by the testator and attested by at least 2 witnesses. Registration is not mandatory but recommended.',
    simplified_explanation: 'You can write a will to decide how your property should be distributed after your death. The will must be signed by you and two witnesses. Getting it registered at the Sub-Registrar office makes it stronger.',
    documents_required: ['Will document on stamp paper (recommended)', 'Testator\'s ID proof', 'Two witnesses with ID proof', 'Property documents referenced in the will'],
    authority: 'Sub-Registrar Office (for registration) / Probate Court (for enforcement)',
    procedure_steps: ['Draft the will clearly listing all assets and beneficiaries', 'Sign in presence of 2 witnesses who also sign', 'Register at Sub-Registrar office (recommended)', 'Keep original safe and inform executor/family', 'After death, executor applies for probate in court'],
    keywords: ['will', 'testament', 'write a will', 'property after death', 'inheritance document', 'last will'],
  },
  {
    id: 'PI002',
    category: 'Property & Inheritance',
    title: 'Succession Rights Without a Will (Intestate)',
    law_reference: 'Hindu Succession Act, 1956 / Indian Succession Act, 1925',
    description: 'When a person dies without a will, property is distributed among legal heirs as per personal law. Under Hindu law, Class I heirs (wife, sons, daughters, mother) inherit equally.',
    simplified_explanation: 'If someone dies without writing a will, their property goes to legal heirs as per law. For Hindus, the wife, sons, and daughters all get equal shares. For others, the Indian Succession Act applies.',
    documents_required: ['Death certificate', 'Legal heir certificate from Tehsildar/Revenue Department', 'Property documents', 'Family tree document'],
    authority: 'Civil Court / Revenue Department / Tehsildar',
    procedure_steps: ['Obtain death certificate', 'Apply for legal heir certificate from Tehsildar', 'If all heirs agree, execute family settlement deed', 'If disputed, file succession case in Civil Court', 'Court determines shares as per applicable personal law'],
    keywords: ['inheritance', 'property after death', 'legal heir', 'intestate succession', 'heir certificate', 'who inherits'],
  },
  {
    id: 'PI003',
    category: 'Property & Inheritance',
    title: 'Daughter\'s Right to Property',
    law_reference: 'Hindu Succession (Amendment) Act, 2005',
    description: 'After the 2005 amendment, daughters have equal coparcenary rights in Hindu ancestral property — the same as sons. This applies to all daughters regardless of when they were born.',
    simplified_explanation: 'Daughters have the SAME right as sons in their father\'s ancestral property. This is the law since 2005. If someone denies your share, you can file a partition suit in court.',
    documents_required: ['Proof of relationship (birth certificate, family records)', 'Property documents', 'Any partition deed if executed'],
    authority: 'Civil Court',
    procedure_steps: ['Send legal notice to family claiming your share', 'If denied, file a suit for partition in Civil Court', 'Court will determine shares and order partition', 'Can also seek mediation through Lok Adalat'],
    keywords: ['daughter property rights', 'girl property', 'women property rights', 'ancestral property daughter', 'equal share daughter'],
  },
  {
    id: 'PI004',
    category: 'Property & Inheritance',
    title: 'Property Dispute Between Family Members',
    law_reference: 'Transfer of Property Act, 1882 / Partition Act, 1893',
    description: 'Family property disputes can be resolved through partition suits in civil court, family settlement deeds, or mediation through Lok Adalat. Partition can be by metes and bounds or by sale.',
    simplified_explanation: 'If family members are fighting over property, you can file a partition suit in court. The court will divide the property fairly among all legal heirs. Lok Adalat can also help settle disputes faster.',
    documents_required: ['Property documents (title deed, sale deed)', 'Family tree / genealogy', 'Previous partition deeds if any', 'Revenue records (7/12 extract, khata)'],
    authority: 'Civil Court / Lok Adalat / Mediation Centre',
    procedure_steps: ['Try amicable settlement through family meeting', 'If failed, send legal notice', 'File partition suit in Civil Court', 'Court may refer to mediation first', 'If unresolved, court orders partition'],
    keywords: ['property dispute', 'family property fight', 'partition suit', 'property division', 'land dispute family'],
  },
  {
    id: 'PI005',
    category: 'Property & Inheritance',
    title: 'Land Encroachment',
    law_reference: 'Indian Penal Code Section 441, 447 / Specific Relief Act, 1963',
    description: 'Encroachment on someone else\'s land is both a civil wrong and criminal trespass. The landowner can file a civil suit for injunction and also an FIR for criminal trespass.',
    simplified_explanation: 'If someone has illegally occupied or encroached on your land, you can file a complaint with the police and also a civil case in court to get your land back and remove the encroacher.',
    documents_required: ['Property ownership documents (title deed, sale deed)', 'Survey/khasra number records', 'Photos of encroachment', 'Revenue records'],
    authority: 'Civil Court / Revenue Department / Police',
    procedure_steps: ['File complaint with Revenue Department / Tehsildar', 'File FIR at police station for criminal trespass', 'File civil suit for injunction and recovery of possession', 'Seek temporary injunction to prevent further encroachment', 'Court orders removal of encroachment'],
    keywords: ['encroachment', 'land grabbed', 'illegal occupation', 'trespass', 'property encroached', 'land dispute'],
  },
  {
    id: 'PI006',
    category: 'Property & Inheritance',
    title: 'Property Registration Process',
    law_reference: 'Registration Act, 1908 / Transfer of Property Act, 1882',
    description: 'All property transactions (sale, gift, mortgage) for immovable property must be registered at the Sub-Registrar office. Unregistered documents cannot be used as evidence of title.',
    simplified_explanation: 'When buying or selling property, the sale deed MUST be registered at the Sub-Registrar office. Without registration, the transaction has no legal value. Both buyer and seller must be present.',
    documents_required: ['Sale deed / gift deed / transfer document', 'Property title documents', 'Encumbrance certificate', 'ID proof of all parties', 'Stamp duty payment receipt', 'Two witnesses'],
    authority: 'Sub-Registrar of Assurances',
    procedure_steps: ['Get the property document drafted by a lawyer', 'Pay stamp duty as per state rates', 'Book appointment at Sub-Registrar office', 'Both parties and witnesses appear before Sub-Registrar', 'Document is registered and returned'],
    keywords: ['property registration', 'register property', 'sale deed registration', 'stamp duty', 'sub-registrar', 'property transfer'],
  },
  {
    id: 'PI007',
    category: 'Property & Inheritance',
    title: 'Tenant Claiming Ownership',
    law_reference: 'Limitation Act, 1963 – Section 27 / Adverse Possession',
    description: 'Under adverse possession, if a person openly occupies someone else\'s property for 12 years (private property) or 30 years (government property) without interruption, they may claim ownership through court.',
    simplified_explanation: 'If a tenant or someone else has been living on your property for 12+ years without your objection, they might claim ownership through "adverse possession." Protect your property rights early.',
    documents_required: ['Property ownership documents', 'Revenue records', 'Proof of continuous possession', 'Tax payment records'],
    authority: 'Civil Court',
    procedure_steps: ['As owner: send legal notice asserting ownership', 'File suit for declaration and injunction', 'As occupant claiming adverse possession: file declaratory suit after 12 years', 'Court examines evidence of continuous, open, peaceful possession', 'Court declares title based on evidence'],
    keywords: ['adverse possession', 'tenant ownership claim', 'squatter rights', 'property occupation', 'land claiming'],
  },
  {
    id: 'PI008',
    category: 'Property & Inheritance',
    title: 'Mutation / Name Change in Property Records',
    law_reference: 'State Revenue Laws / Land Revenue Acts',
    description: 'After purchasing property or inheriting it, you must get the mutation (name change) done in revenue records. This is done at the Tehsildar / Revenue office and is separate from registration.',
    simplified_explanation: 'After buying or inheriting property, you must update your name in government land records (mutation). This is done at the Tehsildar office and is necessary for paying property tax in your name.',
    documents_required: ['Registered sale deed / succession certificate', 'Previous owner\'s records', 'Death certificate (if inherited)', 'Application for mutation'],
    authority: 'Tehsildar / Revenue Department / Municipal Corporation',
    procedure_steps: ['Apply for mutation at Tehsildar office', 'Submit registered property documents', 'Revenue inspector verifies on spot', 'Public notice issued for objections', 'Mutation entry made in revenue records'],
    keywords: ['mutation', 'property name change', 'land records update', 'tehsildar', 'revenue records', 'khata transfer'],
  },

  // ─── CRIMINAL PROCEDURES ──────────────────────────────────────
  {
    id: 'CP001',
    category: 'Criminal Procedures',
    title: 'Filing an FIR (First Information Report)',
    law_reference: 'Code of Criminal Procedure, 1973 – Section 154',
    description: 'An FIR must be registered for cognizable offenses. Police CANNOT refuse to register an FIR. Zero FIR can be filed at any police station regardless of jurisdiction. E-FIR is available in many states.',
    simplified_explanation: 'If a crime happens, you have the RIGHT to file an FIR. The police cannot refuse. You can file FIR at ANY police station (Zero FIR). If police refuse, approach the SP or Magistrate directly.',
    documents_required: ['Written complaint describing the incident', 'Identity proof', 'Evidence if available (photos, documents)', 'Details of accused if known'],
    authority: 'Police Station / Superintendent of Police / Magistrate',
    procedure_steps: ['Go to nearest police station and give written complaint', 'Police MUST register FIR for cognizable offenses', 'Get a copy of FIR — this is your right', 'If police refuse, send complaint to SP by registered post', 'File complaint before Magistrate under CrPC Section 156(3)'],
    keywords: ['FIR', 'file FIR', 'police complaint', 'first information report', 'police report', 'lodge complaint'],
  },
  {
    id: 'CP002',
    category: 'Criminal Procedures',
    title: 'Rights of an Arrested Person',
    law_reference: 'Article 22 Constitution / CrPC Sections 41-60 / DK Basu v. State of West Bengal Guidelines',
    description: 'Every arrested person has fundamental rights: right to know reason for arrest, right to inform family, right to consult a lawyer, right not to be tortured, must be produced before magistrate within 24 hours.',
    simplified_explanation: 'If you are arrested, you have important rights: know WHY you are arrested, call your family, get a lawyer, and be taken to court within 24 hours. Police CANNOT torture or beat you.',
    documents_required: ['Arrest memo (police must provide)', 'Identity proof', 'Lawyer\'s contact details'],
    authority: 'Magistrate / Legal Aid Services / NHRC',
    procedure_steps: ['Demand to know the reason for arrest', 'Ask for arrest memo — it is mandatory', 'Inform your family or friend immediately', 'Request a lawyer — free legal aid is your right', 'You must be produced before Magistrate within 24 hours', 'Apply for bail before Magistrate'],
    keywords: ['arrested', 'arrest rights', 'police arrest', 'detention rights', 'arrested what to do', 'jail rights'],
  },
  {
    id: 'CP003',
    category: 'Criminal Procedures',
    title: 'Bail Application Process',
    law_reference: 'CrPC Sections 436-439 / Article 21 Constitution',
    description: 'Bail is a right in bailable offenses and discretionary in non-bailable offenses. Bail can be applied for at the police station (for bailable offenses), before Magistrate, Sessions Court, or High Court.',
    simplified_explanation: 'If you or someone you know is arrested, bail is the way to get released during trial. For minor offenses, bail is a right. For serious offenses, you need to apply to the court.',
    documents_required: ['Copy of FIR', 'Bail application', 'Surety bond', 'Identity proof of surety', 'Proof of permanent address'],
    authority: 'Police Station (bailable) / Magistrate / Sessions Court / High Court',
    procedure_steps: ['For bailable offenses: demand bail at police station as a right', 'For non-bailable: file bail application before Magistrate', 'If Magistrate refuses, apply to Sessions Court', 'If Sessions Court refuses, apply to High Court', 'Furnish bail bond and surety as directed by court'],
    keywords: ['bail', 'bail application', 'get bail', 'release from jail', 'bail bond', 'anticipatory bail'],
  },
  {
    id: 'CP004',
    category: 'Criminal Procedures',
    title: 'Anticipatory Bail',
    law_reference: 'CrPC Section 438',
    description: 'A person who apprehends arrest in a non-bailable case can apply for anticipatory bail before the High Court or Sessions Court. If granted, the person is not arrested upon FIR.',
    simplified_explanation: 'If you fear being arrested in a false case, you can apply for anticipatory bail BEFORE arrest. If the court grants it, police cannot arrest you and must release you on bail immediately.',
    documents_required: ['Application for anticipatory bail', 'Grounds for apprehension of arrest', 'Copy of FIR or complaint if filed', 'Identity and address proof'],
    authority: 'Sessions Court / High Court',
    procedure_steps: ['Engage a criminal lawyer immediately', 'File anticipatory bail application in Sessions Court or High Court', 'Court hears arguments and may grant conditional bail', 'If granted, carry the court order at all times', 'Cooperate with investigation as per bail conditions'],
    keywords: ['anticipatory bail', 'pre-arrest bail', 'fear of arrest', 'false case', 'bail before arrest'],
  },
  {
    id: 'CP005',
    category: 'Criminal Procedures',
    title: 'Free Legal Aid',
    law_reference: 'Legal Services Authorities Act, 1987 / Article 39A Constitution',
    description: 'Free legal aid is a fundamental right for women, SC/ST persons, persons with disabilities, industrial workers, persons below poverty line, and victims of human trafficking. Available through NALSA and State Legal Services Authorities.',
    simplified_explanation: 'If you cannot afford a lawyer, you have the RIGHT to free legal help. Women, poor persons, SC/ST, and disabled persons can get free lawyers from Legal Services Authority. Call NALSA helpline 15100.',
    documents_required: ['Application for legal aid', 'Income certificate or BPL card', 'Category certificate (SC/ST/disability) if applicable', 'Case details'],
    authority: 'NALSA / State Legal Services Authority / District Legal Services Authority',
    procedure_steps: ['Visit District Legal Services Authority office', 'Fill application for free legal aid', 'Submit income proof or category certificate', 'Authority assigns a panel lawyer for free', 'Lawyer represents you in court at no cost'],
    keywords: ['free lawyer', 'free legal aid', 'legal help', 'cannot afford lawyer', 'NALSA', 'legal services', 'legal assistance'],
  },
  {
    id: 'CP006',
    category: 'Criminal Procedures',
    title: 'Filing a Private Criminal Complaint',
    law_reference: 'CrPC Section 190, 200 / Magistrate\'s Powers',
    description: 'If police refuse to register FIR or take action, a private criminal complaint can be filed directly before the Magistrate under CrPC Section 200. The Magistrate can order investigation.',
    simplified_explanation: 'If the police are not helping you or refusing to register your FIR, you can directly approach the Magistrate and file a private criminal complaint. The Magistrate has the power to order the police to investigate.',
    documents_required: ['Written complaint with facts', 'Evidence supporting the complaint', 'Proof of police inaction (copy of complaint to police, registered post receipt)'],
    authority: 'Judicial Magistrate First Class (JMFC)',
    procedure_steps: ['Draft complaint with all facts and evidence', 'File before JMFC under Section 200', 'Magistrate records your statement on oath', 'Magistrate may order investigation under Section 156(3)', 'Or take cognizance and issue summons to accused'],
    keywords: ['private complaint', 'police not helping', 'direct complaint magistrate', 'FIR refused', 'police inaction'],
  },
  {
    id: 'CP007',
    category: 'Criminal Procedures',
    title: 'Victim Compensation Scheme',
    law_reference: 'CrPC Section 357A / State Victim Compensation Schemes',
    description: 'Victims of crime — especially violent crime, sexual assault, acid attack, and human trafficking — can claim compensation from the State under various victim compensation schemes.',
    simplified_explanation: 'If you are a victim of a serious crime like assault, sexual offense, or acid attack, you can get financial compensation from the government even if the criminal is not caught.',
    documents_required: ['FIR copy', 'Medical reports', 'Identity proof', 'Application for compensation'],
    authority: 'District Legal Services Authority / State Legal Services Authority',
    procedure_steps: ['File application with District Legal Services Authority', 'Attach FIR, medical reports, and ID proof', 'Authority verifies your claim', 'Interim compensation can be given within 2 months', 'Final compensation based on nature of crime and injury'],
    keywords: ['victim compensation', 'crime victim', 'assault compensation', 'rape victim compensation', 'government compensation crime'],
  },
  {
    id: 'CP008',
    category: 'Criminal Procedures',
    title: 'Quashing of FIR',
    law_reference: 'CrPC Section 482 / High Court Inherent Powers',
    description: 'If an FIR is filed based on false allegations, the accused can approach the High Court under Section 482 CrPC to quash the FIR. The High Court can quash FIR if no offense is made out from the complaint.',
    simplified_explanation: 'If a false FIR has been filed against you, you can ask the High Court to cancel (quash) it. The High Court has the power to quash FIRs that are frivolous, false, or do not disclose any crime.',
    documents_required: ['Copy of FIR', 'Application under Section 482 CrPC', 'Evidence proving false allegations', 'Any settlement between parties if applicable'],
    authority: 'High Court',
    procedure_steps: ['Engage a criminal lawyer', 'File petition under Section 482 CrPC in High Court', 'High Court examines the FIR and evidence', 'If no offense is made out, FIR is quashed', 'Can also be quashed if parties have settled the dispute'],
    keywords: ['quash FIR', 'false FIR', 'cancel FIR', 'fake case', 'false complaint quashing'],
  },

  // ─── RTI & GOVERNMENT SERVICES ──────────────────────────────────
  {
    id: 'RTI001',
    category: 'RTI & Government Services',
    title: 'Filing RTI Application',
    law_reference: 'Right to Information Act, 2005',
    description: 'Every citizen can request information from any public authority. Application fee is ₹10 (central) or state-prescribed. Information must be provided within 30 days. BPL applicants are exempt from fees.',
    simplified_explanation: 'You have the RIGHT to ask any government department for information. Pay ₹10, write what you want to know, and send it. They MUST reply within 30 days.',
    documents_required: ['RTI application in writing or online', 'Application fee (₹10 for central, varies for state)', 'BPL card if seeking fee exemption'],
    authority: 'Public Information Officer (PIO) of the concerned department',
    procedure_steps: ['Write application addressed to PIO of the concerned department', 'Pay ₹10 fee (by IPO, DD, or cash)', 'Send by post or submit in person or file online at rtionline.gov.in', 'PIO must reply within 30 days', 'If no reply or unsatisfied, file First Appeal with Appellate Authority within 30 days'],
    keywords: ['RTI', 'right to information', 'government information', 'RTI application', 'public information', 'RTI act'],
  },
  {
    id: 'RTI002',
    category: 'RTI & Government Services',
    title: 'RTI Appeal Process',
    law_reference: 'Right to Information Act, 2005 – Sections 19-20',
    description: 'If PIO refuses information or does not reply within 30 days, First Appeal can be filed within 30 days. If First Appeal is also unsatisfactory, Second Appeal goes to Central/State Information Commission.',
    simplified_explanation: 'If the government office ignores your RTI or gives wrong answer, you can appeal. First appeal goes to senior officer. If that fails too, second appeal goes to the Information Commission which can impose penalties.',
    documents_required: ['Copy of original RTI application', 'PIO\'s reply (or proof of no reply)', 'Appeal application', 'Any additional grounds'],
    authority: 'First Appellate Authority / Central Information Commission / State Information Commission',
    procedure_steps: ['File First Appeal within 30 days of PIO reply deadline', 'First Appellate Authority must decide within 30-45 days', 'If unsatisfied, file Second Appeal within 90 days to Information Commission', 'Information Commission can impose ₹25,000 penalty on PIO', 'Commission can also order disciplinary action against PIO'],
    keywords: ['RTI appeal', 'information commission', 'RTI complaint', 'RTI no reply', 'RTI penalty', 'appeal RTI'],
  },
  {
    id: 'RTI003',
    category: 'RTI & Government Services',
    title: 'Public Grievance Redressal (CPGRAMS)',
    law_reference: 'Administrative Reforms / DARPG Guidelines',
    description: 'Citizens can file grievances about any central government service on the CPGRAMS portal. Departments must respond within 60 days. State governments have similar portals.',
    simplified_explanation: 'If you have a problem with any government service — delayed passport, pension not received, PDS card issues — you can file a complaint on the government grievance portal. They must respond within 60 days.',
    documents_required: ['Written complaint describing the issue', 'Supporting documents', 'Previous correspondence with the department if any'],
    authority: 'Department of Administrative Reforms and Public Grievances (DARPG)',
    procedure_steps: ['Visit pgportal.gov.in (CPGRAMS)', 'Register and file your grievance online', 'Get grievance registration number', 'Department must respond within 60 days', 'If unsatisfied, file reminder or escalation on the portal'],
    keywords: ['government complaint', 'CPGRAMS', 'public grievance', 'government service delayed', 'passport delayed', 'pension problem'],
  },
  {
    id: 'RTI004',
    category: 'RTI & Government Services',
    title: 'Aadhaar Related Issues',
    law_reference: 'Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act, 2016',
    description: 'Aadhaar is not mandatory for all services. Issues like wrong details, biometric failure, and misuse can be addressed through UIDAI. Aadhaar cannot be demanded for bank accounts or SIM cards as sole ID.',
    simplified_explanation: 'If there are errors in your Aadhaar, biometric issues, or someone is misusing your Aadhaar number, visit the UIDAI website or Aadhaar centre to fix it. You can also lock your biometrics for safety.',
    documents_required: ['Aadhaar number or enrolment ID', 'Supporting documents for correction', 'Complaint details if misused'],
    authority: 'UIDAI / Aadhaar Seva Kendra / UIDAI Helpline 1947',
    procedure_steps: ['For corrections: visit Aadhaar centre or apply online at uidai.gov.in', 'For biometric lock: lock through mAadhaar app or UIDAI website', 'For misuse: file complaint at UIDAI and cybercrime.gov.in', 'Call UIDAI helpline 1947 for assistance', 'Check Aadhaar authentication history online'],
    keywords: ['aadhaar', 'aadhaar correction', 'aadhaar update', 'biometric lock', 'aadhaar misuse', 'UIDAI'],
  },
  {
    id: 'RTI005',
    category: 'RTI & Government Services',
    title: 'Passport Application Issues',
    law_reference: 'Passports Act, 1967',
    description: 'Indian citizens have the right to a passport. Applications can be filed online at passportindia.gov.in. Processing time is 30 days for normal and 7 days for tatkal. Refusal must be communicated with reasons.',
    simplified_explanation: 'If your passport application is being delayed or refused without reason, you have the right to know why. Passport offices must process applications within 30 days. You can file a grievance if delayed.',
    documents_required: ['Online application form', 'Address and identity proof', 'Birth certificate or age proof', 'Previous passport if renewal'],
    authority: 'Regional Passport Office / MEA Grievance Portal',
    procedure_steps: ['Apply online at passportindia.gov.in', 'Visit Passport Seva Kendra for appointment', 'If delayed beyond 30 days, file grievance on the portal', 'Can also file RTI to know status', 'Approach MEA (Ministry of External Affairs) for escalation'],
    keywords: ['passport', 'passport delayed', 'passport application', 'passport issue', 'passport refused', 'passport renewal'],
  },
  {
    id: 'RTI006',
    category: 'RTI & Government Services',
    title: 'PDS / Ration Card Issues',
    law_reference: 'National Food Security Act, 2013',
    description: 'Under NFSA, eligible households get subsidized food grains through PDS. If your ration card is cancelled wrongly or you are denied your entitlement, you can file a grievance.',
    simplified_explanation: 'If you have a ration card but are being denied food grains, or if your card was wrongly cancelled, you can complain to the District Supply Officer. Eligible families have the RIGHT to subsidized food.',
    documents_required: ['Ration card or application receipt', 'Identity proof', 'Written complaint'],
    authority: 'District Supply Officer / State Food Commission / Consumer Forum',
    procedure_steps: ['Complain to the Fair Price Shop dealer in writing', 'If unresolved, complain to District Supply Officer', 'File complaint with State Food Commission', 'Can also file RTI to know status of your application'],
    keywords: ['ration card', 'PDS', 'food grains', 'ration denied', 'ration card cancelled', 'fair price shop', 'BPL card'],
  },
  {
    id: 'RTI007',
    category: 'RTI & Government Services',
    title: 'Lok Adalat — Free Dispute Resolution',
    law_reference: 'Legal Services Authorities Act, 1987',
    description: 'Lok Adalats are alternative dispute resolution forums that can settle cases amicably. No court fees. Decisions are final and binding. Can settle motor accident claims, labour disputes, consumer complaints, and more.',
    simplified_explanation: 'Lok Adalat is like a free fast-track court where disputes can be settled without long court procedures. No fees, no lawyers needed, and the decision is final. Great for settling disputes quickly.',
    documents_required: ['Application for Lok Adalat', 'Relevant case documents', 'Identity proof'],
    authority: 'District Legal Services Authority / Taluk Legal Services Committee',
    procedure_steps: ['Apply to District Legal Services Authority for Lok Adalat', 'Both parties must agree to participate', 'Lok Adalat held on designated dates', 'Conciliators help reach a settlement', 'Award is deemed a decree of civil court — final and binding'],
    keywords: ['lok adalat', 'free court', 'quick settlement', 'dispute resolution', 'mediation', 'free justice'],
  },

  // ─── EDUCATION & STUDENT RIGHTS ──────────────────────────────────
  {
    id: 'ED001',
    category: 'Education & Student Rights',
    title: 'Right to Education (RTE)',
    law_reference: 'Right of Children to Free and Compulsory Education Act, 2009 / Article 21A Constitution',
    description: 'Every child aged 6-14 has the fundamental right to free and compulsory education. Schools must reserve 25% seats for economically weaker sections. No child can be expelled until class 8.',
    simplified_explanation: 'Every child between 6-14 years has the RIGHT to free education. Private schools must reserve 25% seats for poor children. No fees, no screening tests, and no child can be held back or expelled until class 8.',
    documents_required: ['Age proof of child', 'Income certificate / BPL card', 'Address proof', 'Aadhaar card of child'],
    authority: 'District Education Officer / School Management Committee / NCPCR',
    procedure_steps: ['Apply to nearby school for admission (no screening test allowed)', 'If school refuses, complain to District Education Officer', 'Apply for 25% quota in private schools with income proof', 'Contact NCPCR (National Commission for Protection of Child Rights) if rights violated', 'File complaint on NCPCR online portal'],
    keywords: ['RTE', 'right to education', 'free education', 'school admission', 'child education', '25 percent quota', 'school refused admission'],
  },
  {
    id: 'ED002',
    category: 'Education & Student Rights',
    title: 'Anti-Ragging Protection in Colleges',
    law_reference: 'UGC Regulations on Curbing the Menace of Ragging, 2009 / Supreme Court Order in Vishwa Jagriti Mission v. Central Government',
    description: 'Ragging is a criminal offense. Every educational institution must have an Anti-Ragging Committee. Students must sign anti-ragging affidavits. Punishment includes expulsion, suspension, and criminal prosecution.',
    simplified_explanation: 'If you are being ragged in college — physically, mentally, or through forced acts — this is a CRIME. Call the Anti-Ragging Helpline 1800-180-5522 immediately. Your identity will be kept confidential.',
    documents_required: ['Written complaint describing the ragging', 'Names of students involved', 'Witness names if any', 'Evidence (messages, photos) if available'],
    authority: 'Anti-Ragging Committee / UGC / Police',
    procedure_steps: ['Call Anti-Ragging Helpline: 1800-180-5522 (24/7)', 'File complaint with college Anti-Ragging Committee', 'File online complaint on UGC website', 'File FIR at police station if physical harm involved', 'College must act within 7 days'],
    keywords: ['ragging', 'college ragging', 'anti ragging', 'bullying college', 'freshers harassment', 'ragging complaint'],
  },
  {
    id: 'ED003',
    category: 'Education & Student Rights',
    title: 'Scholarship and Fee Reimbursement Issues',
    law_reference: 'Post-Matric Scholarship Scheme / State Scholarship Schemes',
    description: 'Government scholarships for SC/ST/OBC/minority/disabled students are entitlements. If scholarships are not disbursed or wrongly denied, students can file complaints and RTI applications.',
    simplified_explanation: 'If your government scholarship money has not been received or your application was wrongly rejected, you can file a complaint with the Education Department and also file RTI to know the status.',
    documents_required: ['Scholarship application receipt', 'Caste/category certificate', 'Income certificate', 'Bank account details', 'Enrollment proof'],
    authority: 'State Education Department / District Welfare Officer / National Scholarship Portal',
    procedure_steps: ['Check status on National Scholarship Portal (scholarships.gov.in)', 'If delayed, contact District Welfare / Education Officer', 'File RTI to know reason for delay', 'File complaint on CPGRAMS if central scholarship', 'Contact your college administration for verification status'],
    keywords: ['scholarship', 'scholarship not received', 'fee reimbursement', 'government scholarship', 'SC ST scholarship', 'education grant'],
  },
  {
    id: 'ED004',
    category: 'Education & Student Rights',
    title: 'Exam Malpractice and Result Disputes',
    law_reference: 'University Grants Commission (UGC) Regulations / State University Acts',
    description: 'Students can challenge exam results through re-evaluation or recount. If there is mass exam malpractice, students can file PIL. Paper leak cases are criminal offenses under various state laws.',
    simplified_explanation: 'If you believe your exam result is wrong, you can apply for re-evaluation or recount. If the exam paper was leaked or there was cheating, you can file a complaint with the university and police.',
    documents_required: ['Exam hall ticket', 'Mark sheet showing disputed marks', 'Application for re-evaluation', 'Evidence of malpractice if any'],
    authority: 'University Examination Board / UGC / Education Department / Police (for paper leak)',
    procedure_steps: ['Apply for re-evaluation/recounting within the prescribed time', 'Pay the re-evaluation fee', 'University must re-evaluate and communicate result', 'If denied, file RTI for copy of answer sheet', 'For malpractice, file complaint with university and police'],
    keywords: ['exam result wrong', 're-evaluation', 'exam paper leak', 'cheating exam', 'result dispute', 'answer sheet'],
  },
  {
    id: 'ED005',
    category: 'Education & Student Rights',
    title: 'College/University Admission Disputes',
    law_reference: 'UGC Guidelines / State Higher Education Regulations / AICTE Approval Process',
    description: 'Colleges cannot charge capitation fees. Admission must follow merit-based criteria. Reservation quotas must be followed. Students can challenge illegal admission practices in court.',
    simplified_explanation: 'If a college is demanding capitation fees, refusing admission despite merit, or not following reservation rules, you can file a complaint with UGC, AICTE, or the state education department.',
    documents_required: ['Admission application and acknowledgment', 'Merit list / rank', 'Receipt of any extra payment demanded', 'Category/caste certificate if applicable'],
    authority: 'UGC / AICTE / State Education Department / High Court',
    procedure_steps: ['File complaint with UGC (for universities) or AICTE (for technical colleges)', 'File complaint with state Fee Regulatory Authority', 'File RTI to get admission criteria and merit list', 'Approach High Court for urgent relief if needed', 'File case with Consumer Commission if education is treated as service'],
    keywords: ['college admission', 'capitation fee', 'admission denied', 'reservation seat', 'college fraud', 'management quota'],
  },
  {
    id: 'ED006',
    category: 'Education & Student Rights',
    title: 'Student Loan and Education Loan Issues',
    law_reference: 'RBI Guidelines on Education Loans / Banking Ombudsman Scheme',
    description: 'Banks must follow RBI guidelines on education loans. Loans up to ₹4 lakh require no collateral. Processing fees must be reasonable. Loan rejection must be communicated with reasons.',
    simplified_explanation: 'If a bank is refusing your education loan without reason, charging excessive fees, or harassing you for repayment, you can complain to the Banking Ombudsman. Banks must give loans up to ₹4 lakh without collateral.',
    documents_required: ['Loan application', 'Admission letter', 'Income documents', 'Bank\'s rejection letter if applicable'],
    authority: 'Banking Ombudsman / RBI / Consumer Commission',
    procedure_steps: ['Apply for education loan at your bank', 'If refused, ask for written reason', 'File complaint with bank\'s internal grievance cell', 'If unresolved in 30 days, file with Banking Ombudsman', 'Can also approach other banks or government loan schemes'],
    keywords: ['education loan', 'student loan', 'bank education loan', 'loan refused', 'study loan', 'college loan'],
  },
  {
    id: 'ED007',
    category: 'Education & Student Rights',
    title: 'Teacher Misconduct / Corporal Punishment',
    law_reference: 'Right of Children to Free and Compulsory Education Act, 2009 – Section 17',
    description: 'Physical punishment and mental harassment of children in schools is banned under RTE Act. Teachers cannot hit, beaten, or humiliate students. Violation is disciplinary offense and can lead to criminal prosecution.',
    simplified_explanation: 'Teachers are NOT allowed to beat or physically punish students. They also cannot mentally harass or humiliate children. If a teacher hits your child, file a complaint with the school and education department.',
    documents_required: ['Written complaint', 'Medical report if child is injured', 'Witness statements', 'Photos of injuries if any'],
    authority: 'School Management Committee / District Education Officer / NCPCR / Police',
    procedure_steps: ['File written complaint with school principal/management', 'If no action, complain to District Education Officer', 'File complaint on NCPCR portal', 'File FIR at police station if physical injury', 'Contact CHILDLINE 1098 for child protection'],
    keywords: ['corporal punishment', 'teacher beating', 'school punishment', 'child beaten school', 'teacher harassment', 'school abuse'],
  },
]

/**
 * Simple keyword-based retrieval function (simulates semantic search)
 * In production, this would use vector embeddings and cosine similarity
 */
export function retrieveRelevantEntries(query: string, topK = 3): LegalEntry[] {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/)

  const scored = legalDataset.map((entry) => {
    let score = 0
    const searchText = [
      entry.title,
      entry.description,
      entry.simplified_explanation,
      ...entry.keywords,
      entry.category,
    ]
      .join(' ')
      .toLowerCase()

    // Keyword matching
    for (const word of queryWords) {
      if (word.length < 3) continue
      if (entry.keywords.some((k) => k.includes(word) || word.includes(k))) score += 3
      if (entry.title.toLowerCase().includes(word)) score += 2
      if (entry.category.toLowerCase().includes(word)) score += 2
      if (searchText.includes(word)) score += 1
    }

    // Exact phrase matching in keywords
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

/**
 * Classify query into legal category
 */
export function classifyQuery(query: string): LegalCategory | null {
  const queryLower = query.toLowerCase()

  const categoryKeywords: Record<LegalCategory, string[]> = {
    'Labour Law': ['salary', 'wages', 'employer', 'employee', 'job', 'work', 'fired', 'terminated', 'leave', 'pf', 'overtime', 'minimum wage', 'provident', 'maternity'],
    'Consumer Rights': ['product', 'refund', 'defective', 'consumer', 'purchase', 'bought', 'delivery', 'online shopping', 'bank', 'service', 'hospital', 'builder', 'rera', 'advertisement'],
    'Cybercrime': ['hack', 'online fraud', 'upi', 'scam', 'internet', 'cyber', 'phishing', 'ransomware', 'account hacked', 'data', 'privacy', 'social media'],
    'Harassment': ['harass', 'sexual', 'stalking', 'domestic violence', 'dowry', 'bully', 'abuse', 'threatening', 'caste', 'ragging', 'acid'],
    'Tenancy': ['rent', 'landlord', 'tenant', 'evict', 'deposit', 'house', 'flat', 'lease', 'tenancy', 'rented'],
    'Marriage & Family Law': ['marriage', 'divorce', 'custody', 'alimony', 'maintenance', 'spouse', 'husband', 'wife', 'wedding', 'separation', 'live-in', 'adoption', 'child marriage', 'inter-caste', 'family court'],
    'Property & Inheritance': ['property', 'land', 'will', 'inheritance', 'succession', 'deed', 'encroachment', 'mutation', 'registration', 'ancestral', 'partition', 'daughter property'],
    'Criminal Procedures': ['fir', 'arrest', 'bail', 'police', 'criminal', 'court', 'magistrate', 'detained', 'prison', 'legal aid', 'victim', 'quash'],
    'RTI & Government Services': ['rti', 'right to information', 'government', 'passport', 'aadhaar', 'ration', 'pds', 'grievance', 'lok adalat', 'pension', 'cpgrams'],
    'Education & Student Rights': ['school', 'college', 'university', 'student', 'education', 'admission', 'scholarship', 'exam', 'teacher', 'ragging', 'rte', 'loan', 'capitation'],
  }

  const scores: Record<string, number> = {}
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    scores[cat] = 0
    for (const kw of keywords) {
      if (queryLower.includes(kw)) scores[cat] += 1
    }
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  return best[1] > 0 ? (best[0] as LegalCategory) : null
}

/**
 * Get analytics data for the NGO dashboard
 */
export function getAnalyticsData() {
  const categoryCounts = LEGAL_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = legalDataset.filter((e) => e.category === cat).length
      return acc
    },
    {} as Record<string, number>
  )

  return {
    totalEntries: legalDataset.length,
    categoryCounts,
    topCategories: Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({ category, count })),
  }
}
