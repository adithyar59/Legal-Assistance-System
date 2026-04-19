/**
 * Legal Learning Modules Dataset
 * Structured educational content for legal literacy
 */

export interface LearningLesson {
  id: string
  title: string
  content: string
  keyPoints: string[]
  quiz?: { question: string; options: string[]; answer: number }[]
}

export interface LearningModule {
  id: string
  category: string
  title: string
  description: string
  icon: string
  color: string
  estimatedMinutes: number
  lessons: LearningLesson[]
}

export const learningModules: LearningModule[] = [
  {
    id: 'M001',
    category: 'Consumer Rights',
    title: 'Know Your Consumer Rights',
    description:
      'Learn how the Consumer Protection Act, 2019 empowers you to seek redressal for defective products, poor services, and unfair trade practices.',
    icon: '🛒',
    color: 'bg-blue-50 border-blue-200',
    estimatedMinutes: 15,
    lessons: [
      {
        id: 'M001-L1',
        title: 'Your Six Core Consumer Rights',
        content: `Every Indian consumer has six fundamental rights under the Consumer Protection Act, 2019:

1. **Right to Safety** — Protection against goods and services that are hazardous to life or property.

2. **Right to Information** — The right to be informed about quality, quantity, purity, standard, and price of goods to protect against unfair trade practices.

3. **Right to Choose** — Access to a variety of goods and services at competitive prices.

4. **Right to Be Heard** — Your interests as a consumer will receive due consideration in consumer forums.

5. **Right to Redressal** — Seek redressal against unfair trade practices or unscrupulous exploitation.

6. **Right to Consumer Education** — The right to acquire knowledge and skills to be an informed consumer.`,
        keyPoints: [
          'Six fundamental rights protect every Indian consumer',
          'Right to safety protects against harmful products',
          'Right to information means companies must disclose product details',
          'Right to redressal means you can challenge unfair practices',
        ],
        quiz: [
          {
            question: 'How many fundamental consumer rights are recognized under the Consumer Protection Act, 2019?',
            options: ['Four', 'Five', 'Six', 'Eight'],
            answer: 2,
          },
        ],
      },
      {
        id: 'M001-L2',
        title: 'How to File a Consumer Complaint',
        content: `Filing a consumer complaint is simpler than you think. Here is the step-by-step process:

**Step 1: Try to Resolve Directly**
First, contact the seller, manufacturer, or service provider in writing. Give them a reasonable time (30 days) to resolve the issue.

**Step 2: Gather Your Evidence**
Keep all receipts, warranty cards, photos of defects, and written communications.

**Step 3: Identify the Right Forum**
- Claims up to ₹1 Crore → District Consumer Disputes Redressal Commission
- Claims ₹1 Crore to ₹10 Crore → State Consumer Disputes Redressal Commission
- Claims above ₹10 Crore → National Consumer Disputes Redressal Commission (NCDRC)

**Step 4: File Your Complaint**
You can file:
- In person at the Consumer Commission
- Online at https://consumerhelpline.gov.in
- Call National Consumer Helpline: 1915

**Step 5: Pay the Fee**
A small filing fee is required based on your claim amount.`,
        keyPoints: [
          'Always try to resolve directly with the company first',
          'Keep all purchase and communication records',
          'Three levels of Consumer Commission based on claim amount',
          'National Helpline 1915 is free for guidance',
          'Complaints can be filed online on consumerhelpline.gov.in',
        ],
      },
      {
        id: 'M001-L3',
        title: 'E-Commerce Consumer Rights',
        content: `Online shopping has specific legal protections under the Consumer Protection (E-Commerce) Rules, 2020:

**Your Rights When Shopping Online**
- Complete product information must be displayed before purchase
- Return and refund policy must be clearly stated
- No hidden charges allowed
- Grievance officer must be appointed by the platform
- Complaints must be acknowledged within 48 hours and resolved within 1 month

**What to Do When Your Order Has Problems**
1. Raise a complaint with the e-commerce platform first
2. If unresolved in 30 days, call 1915 or file complaint on consumerhelpline.gov.in
3. File a case with District Consumer Commission

**Important Rule**: E-commerce platforms cannot cancel your confirmed order without valid reason. If they do, they must refund you fully plus compensation.`,
        keyPoints: [
          'E-commerce platforms have legal obligations under 2020 Rules',
          'Complaints must be resolved within 1 month',
          'No hidden charges allowed',
          'Document all transactions for complaint filing',
        ],
      },
    ],
  },
  {
    id: 'M002',
    category: 'Cybercrime',
    title: 'Cyber Safety Awareness',
    description:
      'Understand common online threats, how to protect yourself digitally, and what to do if you become a victim of cybercrime in India.',
    icon: '🔐',
    color: 'bg-red-50 border-red-200',
    estimatedMinutes: 20,
    lessons: [
      {
        id: 'M002-L1',
        title: 'Common Cyber Threats in India',
        content: `India sees millions of cybercrime cases every year. The most common threats are:

**1. UPI & Banking Fraud**
Fraudsters pose as bank officials, TRAI officers, or delivery agents to get your OTP or UPI PIN. Remember: Banks NEVER ask for OTP, PIN, or password.

**2. Phishing**
Fake emails or websites that look like real banks or companies. They try to steal your login credentials.

**3. Ransomware**
Malicious software that locks your files and demands money. Never pay the ransom.

**4. Impersonation / Fake Profiles**
Someone creates a fake social media profile using your photos to defame or harass you.

**5. Online Job Scams**
Fake job offers that ask for registration fees or personal documents.

**Warning Signs:**
- Too-good-to-be-true offers
- Urgency and pressure to act immediately
- Requests for OTP, PIN, or password
- Links that look slightly different from real websites`,
        keyPoints: [
          'Banks NEVER ask for OTP, PIN, or passwords — hang up immediately',
          'Verify website URLs before entering login credentials',
          'Never pay ransomware demands',
          'Job offers asking for money are almost always scams',
        ],
        quiz: [
          {
            question: 'A person claiming to be from your bank calls and asks for your OTP. What should you do?',
            options: [
              'Give them the OTP — it\'s your bank',
              'Hang up immediately — banks never ask for OTP',
              'Ask them to verify their identity first, then give OTP',
              'Ask them to call back later',
            ],
            answer: 1,
          },
        ],
      },
      {
        id: 'M002-L2',
        title: 'Reporting Cybercrime in India',
        content: `If you are a victim of cybercrime, act fast — quick action can help recover your money or limit damage.

**National Cybercrime Reporting Portal**
Website: cybercrime.gov.in
This is the official government portal to report all types of cybercrime including financial fraud, hacking, and online harassment.

**Cyber Crime Helpline**
📞 1930 — For immediate financial fraud
Call immediately if you have sent money to fraudsters. Quick action can freeze the transaction.

**Women & Children-Specific Cybercrime**
Report morphed images, online trafficking, and cyber harassment through the cybercrime.gov.in women/child reporting section.

**What Information to Keep Ready:**
- Screenshots and evidence
- Transaction IDs and amounts
- Fraudster's phone number or account details
- URLs of fake websites

**Time is Critical**: Report financial fraud within minutes or hours. Banks can reverse transactions if reported quickly.`,
        keyPoints: [
          'Call 1930 IMMEDIATELY for financial fraud — time is critical',
          'File online report at cybercrime.gov.in for all cyber offences',
          'Visit police station for FIR if large amounts involved',
          'Save all screenshots and transaction IDs before reporting',
        ],
      },
      {
        id: 'M002-L3',
        title: 'Protecting Your Digital Identity',
        content: `Your digital identity includes everything linked to your online presence. Protecting it is your responsibility.

**Strong Password Practices**
- Use unique passwords for each account
- Passwords should be 12+ characters with numbers and symbols
- Use a password manager app to remember them
- Enable Two-Factor Authentication (2FA) on all accounts

**Protecting Your Aadhaar**
- Do not share your Aadhaar number randomly
- Use masked Aadhaar (only last 4 digits visible) for most purposes
- Lock your biometrics on UIDAI website: uidai.gov.in
- Check your Aadhaar history for unauthorized use

**Safe Online Practices**
- Never click unverified links in SMS or email
- Always check website URL begins with https://
- Log out of accounts when using shared devices
- Keep your phone's OS and apps updated

**What If Your Identity is Stolen?**
1. Report to cybercrime.gov.in immediately
2. Inform your bank and freeze accounts
3. Report to UIDAI (1947) if Aadhaar is misused
4. File FIR at police station`,
        keyPoints: [
          'Use strong, unique passwords and 2FA for all accounts',
          'Lock your Aadhaar biometrics when not in use',
          'Never click links in unsolicited SMS or emails',
          'Report identity theft immediately to bank and police',
        ],
      },
    ],
  },
  {
    id: 'M003',
    category: 'Labour Law',
    title: 'Labour Rights Overview',
    description:
      'Understand your rights as an employee in India — covering wages, leave, termination, workplace safety, and how to take action if your rights are violated.',
    icon: '⚖️',
    color: 'bg-green-50 border-green-200',
    estimatedMinutes: 18,
    lessons: [
      {
        id: 'M003-L1',
        title: 'Every Worker\'s Basic Rights',
        content: `Every person who works in India is entitled to several fundamental rights:

**1. Right to Minimum Wages**
The government sets minimum wages for each category of work. Your employer MUST pay at least this amount. Check your state's minimum wage notification online.

**2. Right to Timely Payment**
Wages must be paid by 7th or 10th of the following month (as per the Payment of Wages Act). Deductions from wages are tightly regulated.

**3. Right to Safe Working Conditions**
The Factories Act requires employers to maintain safe, clean, and hazard-free workplaces. Accidents due to employer negligence are compensable.

**4. Right to Leave**
Workers are entitled to:
- Earned/Annual Leave
- Sick Leave
- Casual Leave
- Maternity Leave (for women — 26 weeks for first 2 children)
- National Holidays

**5. Right to Provident Fund (EPF)**
If your employer has 20+ employees, both you and your employer must contribute 12% of basic wage to EPF. This is your retirement savings.

**6. Right to Gratuity**
After 5 years of continuous service, you are entitled to gratuity payment when you leave. Formula: 15 × Last Salary × Years of Service ÷ 26`,
        keyPoints: [
          'Minimum wage must be paid as notified by state government',
          'Salary must be paid by 7th or 10th of following month',
          'EPF applies to all organizations with 20+ employees',
          'Women get 26 weeks of fully paid maternity leave',
          'Gratuity is payable after 5 years of continuous service',
        ],
        quiz: [
          {
            question: 'After how many years of continuous service is an employee entitled to gratuity?',
            options: ['2 years', '3 years', '5 years', '7 years'],
            answer: 2,
          },
        ],
      },
      {
        id: 'M003-L2',
        title: 'Wrongful Termination and Your Rights',
        content: `Losing your job is stressful, but knowing your rights can help you fight back if termination was illegal.

**What is Wrongful Termination?**
Termination is wrongful if:
- No prior notice was given (or notice pay)
- No valid reason was provided
- Terminated for discriminatory reasons (gender, caste, religion, pregnancy)
- Terminated during protected periods (maternity leave, sick leave)

**Notice Period Rules**
Most employment contracts require 30-90 days notice before termination. If notice is not given, you must receive salary in lieu of notice.

**Industrial Workers Protection**
Under the Industrial Disputes Act, workers in establishments with 100+ employees cannot be retrenched without:
1. Government permission
2. 3 months notice or pay
3. Retrenchment compensation (15 days wages per year of service)

**What Can You Do?**
1. Collect your termination letter and all documents
2. File complaint with Labour Commissioner within 3 years
3. Seek reinstatement or compensation through Industrial Tribunal
4. Consult a Labour Law lawyer for complex cases`,
        keyPoints: [
          'Termination without notice or valid reason may be wrongful',
          'Industrial workers at large firms have strong protection',
          'File complaint with Labour Commissioner within 3 years',
          'You may be entitled to reinstatement plus back wages',
        ],
      },
      {
        id: 'M003-L3',
        title: 'How to File a Labour Complaint',
        content: `If your employer is violating your rights, here is how to take formal action:

**Step 1: Internal Grievance**
First raise the issue formally with your HR department in writing. Keep copies of all communications.

**Step 2: Labour Commissioner Office**
Visit your local Labour Commissioner Office with:
- Employment documents (appointment letter, salary slips)
- Proof of the violation (bank statements, attendance records)
- Written complaint describing the issue

**Step 3: Conciliation**
The Labour Commissioner will try to resolve the dispute through conciliation between you and your employer. This is free and faster than court.

**Step 4: Labour Court / Industrial Tribunal**
If conciliation fails, the case is referred to Labour Court or Industrial Tribunal. You can be represented by a lawyer.

**Important Contacts:**
- National Labour Helpline: 14567
- EPFO for PF issues: epfindia.gov.in
- ESIC for medical benefits: esic.in

**Time Limits:**
- Wage complaints: within 3 years
- Wrongful termination: within 3 years
- Sexual harassment: within 3 months to ICC`,
        keyPoints: [
          'Always raise grievance in writing to HR first',
          'Labour Commissioner provides free conciliation service',
          'Call 14567 for National Labour Helpline',
          'Time limit for wage complaints is 3 years',
        ],
      },
    ],
  },
  {
    id: 'M004',
    category: 'Harassment',
    title: 'Rights Against Harassment and Abuse',
    description:
      'Learn about your legal protections against various forms of harassment — including domestic violence, workplace harassment, stalking, and online abuse.',
    icon: '🛡️',
    color: 'bg-purple-50 border-purple-200',
    estimatedMinutes: 16,
    lessons: [
      {
        id: 'M004-L1',
        title: 'Understanding Domestic Violence Law',
        content: `The Protection of Women from Domestic Violence Act, 2005 provides comprehensive protection to women.

**Who is Protected?**
Any woman who is in a domestic relationship with the abuser — wife, live-in partner, mother, sister, daughter.

**What Constitutes Domestic Violence?**
1. **Physical Abuse** — hitting, slapping, kicking, choking, burning
2. **Sexual Abuse** — forced sexual acts, marital rape
3. **Verbal/Emotional Abuse** — name-calling, threats, humiliation, public insults
4. **Economic Abuse** — preventing from working, controlling money, denying basic needs, stealing property

**Reliefs Available Under the Act:**
- **Protection Order** — Court prohibits the abuser from committing violence or contacting you
- **Residence Order** — You cannot be thrown out of your shared home
- **Maintenance Order** — Abuser must provide financial support
- **Custody Order** — Temporary custody of children
- **Compensation Order** — Payment for injuries and suffering

**Who to Contact:**
- Women Helpline: 181
- Police Emergency: 112
- Protection Officer at your District Women & Child Development office`,
        keyPoints: [
          'Domestic violence includes physical, sexual, verbal, and economic abuse',
          'Women cannot be evicted from shared home under this law',
          'Protection Order can be issued within 3 days in emergencies',
          'Call 181 for free support and guidance',
        ],
        quiz: [
          {
            question: 'Which of these is NOT considered domestic violence under Indian law?',
            options: [
              'Physical hitting',
              'Withholding money for basic needs',
              'Verbal insults and humiliation',
              'Disagreeing on household decisions without abuse',
            ],
            answer: 3,
          },
        ],
      },
      {
        id: 'M004-L2',
        title: 'Workplace Sexual Harassment (POSH Law)',
        content: `The POSH Act (Prevention, Prohibition and Redressal of Sexual Harassment at Workplace) protects every woman at her workplace.

**What is Sexual Harassment at Workplace?**
- Physical contact or advances
- Demand or request for sexual favors
- Making sexually colored remarks
- Showing pornography against will
- Any other unwelcome physical, verbal, or non-verbal conduct of sexual nature

**Your Rights Under POSH:**
1. Right to file complaint with Internal Complaints Committee (ICC)
2. Right to transfer to another department during inquiry
3. Right to be protected from retaliation
4. Inquiry must complete in 90 days
5. Interim relief can be ordered immediately

**What if Your Company Has No ICC?**
Every employer with 10+ employees MUST have an ICC. If not, this itself is punishable. You can file complaint with Local Complaints Committee at your District level.

**Complaint Process:**
1. File written complaint with ICC within 3 months of incident
2. ICC will summon the accused
3. Inquiry conducted fairly with opportunity for both sides
4. Recommendations sent to employer for action
5. Can also file criminal FIR simultaneously`,
        keyPoints: [
          'POSH Act protects women from workplace sexual harassment',
          'Every company with 10+ employees must have an ICC',
          'File complaint within 3 months of the incident',
          'You can request transfer while inquiry is ongoing',
          'Retaliation against complainant is illegal',
        ],
      },
      {
        id: 'M004-L3',
        title: 'Helplines and Support Resources',
        content: `If you or someone you know is in danger or facing harassment, these resources are available 24/7:

**Emergency Numbers**
- Police Emergency: 112
- Women Helpline: 181
- Child Helpline: 1098
- Cyber Crime: 1930
- National Anti-Ragging: 1800-180-5522

**Online Portals**
- Cybercrime Complaints: cybercrime.gov.in
- National Women Commission: ncw.nic.in
- SC/ST Atrocities: ncrwc.nic.in

**Key Points About Seeking Help:**
- Police are LEGALLY required to register your FIR — they cannot refuse
- If police refuse, you can approach the SP or Magistrate directly
- Free legal aid is available from Legal Services Authorities (NALSA)
- NALSA Helpline: 15100

**Know Your Rights When Reporting:**
1. You can give complaint in any language
2. FIR must be given to you in writing free of charge
3. Women's complaints of sexual assault must be recorded by female officer
4. Your name is protected in published records for sensitive cases`,
        keyPoints: [
          'Police cannot refuse to register FIR — approach SP if they do',
          'Free legal aid available through NALSA (15100)',
          'Women helpline 181 provides 24/7 support',
          'You can file complaint in your own language',
        ],
      },
    ],
  },
  {
    id: 'M005',
    category: 'Tenancy',
    title: 'Tenant Rights and Rental Laws',
    description:
      'Understand your rights as a tenant in India — from rent agreements and security deposits to dealing with difficult landlords and illegal eviction.',
    icon: '🏠',
    color: 'bg-yellow-50 border-yellow-200',
    estimatedMinutes: 12,
    lessons: [
      {
        id: 'M005-L1',
        title: 'Understanding Your Rent Agreement',
        content: `A rent agreement is a legal contract between landlord and tenant. Understanding it protects you.

**Key Clauses to Look For:**
1. **Rent Amount** — The exact monthly rent agreed
2. **Security Deposit** — Usually 2-3 months rent; conditions for deduction must be specified
3. **Notice Period** — How much advance notice before vacating (typically 1-3 months)
4. **Rent Escalation** — Whether and by how much rent can be increased annually
5. **Maintenance Responsibility** — Who is responsible for repairs and maintenance
6. **Lock-in Period** — Minimum duration before either party can exit

**Registration Requirements:**
- Agreements for 11 months or less: Not compulsorily registerable (most common)
- Agreements for more than 11 months: MUST be registered at Sub-Registrar Office
- Unregistered agreements for longer periods cannot be used as evidence in court

**Why Registration Matters:**
- Registered agreement is legally binding and enforceable
- Protects both landlord and tenant
- Required for many official purposes (address proof, etc.)

**Stamp Duty:**
Stamp duty is payable on rent agreements as per state rates. For registered agreements, both parties must visit the Sub-Registrar office.`,
        keyPoints: [
          'Read all clauses carefully before signing',
          'Agreements over 11 months must be registered',
          'Registered agreements have full legal protection',
          'Security deposit conditions must be clearly stated in writing',
        ],
        quiz: [
          {
            question: 'A rental agreement for what duration requires compulsory registration?',
            options: [
              'Agreements for 6 months or more',
              'Agreements for 11 months or more',
              'All rental agreements regardless of duration',
              'Agreements for more than 11 months',
            ],
            answer: 3,
          },
        ],
      },
      {
        id: 'M005-L2',
        title: 'What to Do If Your Landlord Misbehaves',
        content: `Your rights as a tenant are protected by law. Here is what you can do in common problem situations:

**If Landlord Refuses to Return Security Deposit:**
1. Send written notice giving 15-30 days to return deposit
2. If ignored, file case in Rent Control Court or Small Causes Court
3. Consumer Commission is also available for refund claims

**If Landlord Tries to Evict You Illegally:**
1. Know this: Landlord CANNOT evict without a court order
2. If locks are changed, call police — this is illegal
3. File application with Rent Controller for protection
4. Court will issue stay order preventing eviction

**If Landlord Refuses Essential Repairs:**
1. Document the problem with photos and written requests
2. Send written notice giving 30 days to repair
3. File complaint with Rent Controller if ignored
4. Court can order landlord to repair

**If Landlord Raises Rent Unfairly:**
1. Check your rent agreement for escalation clause
2. If increase violates agreement, send written objection
3. File application with Rent Controller to fix standard rent
4. Continue paying original rent pending court order

**Key Number:**
Your state Rent Control Act governs all tenancy disputes — know which court handles it in your state.`,
        keyPoints: [
          'Landlord cannot evict without a court order — period',
          'If locks are changed illegally, police must intervene',
          'File with Rent Controller for all tenancy disputes',
          'Document everything in writing as evidence',
        ],
      },
    ],
  },
  {
    id: 'M006',
    category: 'Marriage & Family Law',
    title: 'Marriage, Divorce & Family Rights',
    description:
      'Understand your legal rights in marriage, divorce, custody, maintenance, adoption, and family disputes under Indian law.',
    icon: '💍',
    color: 'bg-pink-50 border-pink-200',
    estimatedMinutes: 18,
    lessons: [
      {
        id: 'M006-L1',
        title: 'Divorce Procedures in India',
        content: `Divorce in India can be obtained through two main procedures:

**1. Mutual Consent Divorce (Section 13B, Hindu Marriage Act)**
Both spouses agree to end the marriage. This is simpler and faster.
- Both must have lived separately for at least 1 year
- File joint petition in Family Court
- 6-month cooling-off period (can be waived in some cases)
- After cooling off, both must confirm their decision
- Court grants divorce decree

**2. Contested Divorce (Section 13, Hindu Marriage Act)**
One spouse files for divorce without the other's consent. Grounds include:
- Cruelty (physical or mental)
- Adultery
- Desertion for 2+ years
- Conversion to another religion
- Mental disorder
- Communicable disease
- Presumption of death (missing for 7+ years)

**For Muslims:** Triple talaq is banned. Divorce follows Dissolution of Muslim Marriages Act, 1939.

**For Christians:** Indian Divorce Act, 1869 applies.

**Special Marriage Act:** For inter-religion or civil marriages, divorce under Section 27-28.

**Important:** Either spouse can file for divorce. The process typically takes 6 months to 3 years depending on complexity.`,
        keyPoints: [
          'Mutual consent divorce requires 1 year separation and 6-month cooling off',
          'Contested divorce needs specific legal grounds like cruelty or desertion',
          'Triple talaq is banned — Muslim women have legal divorce rights',
          'Cases are heard in Family Court',
        ],
        quiz: [
          {
            question: 'What is the mandatory cooling-off period in a mutual consent divorce?',
            options: ['3 months', '6 months', '1 year', 'No cooling off required'],
            answer: 1,
          },
        ],
      },
      {
        id: 'M006-L2',
        title: 'Child Custody and Maintenance Rights',
        content: `When parents separate, children's welfare is the court's top priority.

**Custody Types:**
- **Physical Custody** — Who the child lives with
- **Legal Custody** — Who makes decisions about child's education, health, religion
- **Joint Custody** — Both parents share responsibilities (increasingly common)

**Who Gets Custody?**
Courts consider:
- Child's age (mother preferred for children under 5)
- Child's preference (if old enough to express)
- Parent's financial stability and character
- Continuity of child's environment (school, friends)

**Visitation Rights:**
The non-custodial parent has the right to regular visitation. Courts specify schedules for weekends, holidays, and vacations.

**Maintenance for Wife:**
Under CrPC Section 125, a wife can claim maintenance if:
- She has no independent income
- Husband has sufficient means
- Applies during marriage, separation, or after divorce (if not remarried)

**Maintenance for Children:**
- Both parents are responsible for child's maintenance
- Father is primarily responsible under Hindu law
- Continues until child is self-sufficient (or 18 years, whichever is later)
- Court determines amount based on father's income and child's needs

**How Much Maintenance?**
There's no fixed formula. Courts typically award 20-25% of spouse's income as maintenance, but this varies by case.`,
        keyPoints: [
          'Child welfare is the absolute priority in custody decisions',
          'Mothers generally preferred for custody of children below 5 years',
          'Both parents have visitation rights regardless of custody outcome',
          'Maintenance amount is usually 20-25% of spouse\'s income',
        ],
      },
      {
        id: 'M006-L3',
        title: 'Adoption, Live-In Rights & Marriage Registration',
        content: `Several important family law topics every citizen should know:

**Adoption in India:**
- Regulated by CARA (Central Adoption Resource Authority)
- Register on cara.nic.in
- Process: Registration → Home Study → Child Referral → Court Order
- Single persons can adopt (single male cannot adopt girl child)
- Hindu Adoption and Maintenance Act covers Hindu adoptions
- JJ Act, 2015 covers secular adoptions

**Live-In Relationship Rights:**
- Live-in relationships are NOT illegal (Supreme Court: Khushboo v. Kanniammal, 2010)
- Women in long-term live-in relationships get protection under DV Act, 2005
- Children born in live-in relationships are legitimate and have inheritance rights
- Maintenance can be claimed if relationship resembles marriage

**Marriage Registration:**
- Compulsory in most states
- Required for passport, visa, bank accounts
- Can register under Hindu Marriage Act or Special Marriage Act
- Documents: photos, age proof, address proof, 2 witnesses
- Available online in many states

**Inter-Caste/Inter-Religion Marriage:**
- Legal under Special Marriage Act, 1954
- 30-day notice period at Registrar office
- If family threatens, seek police protection
- High Court can grant protection orders
- Honor killing is MURDER under IPC`,
        keyPoints: [
          'CARA is the only legal route for adoption in India',
          'Live-in relationships are legal and women have DV Act protection',
          'Marriage registration is compulsory in most states',
          'Inter-caste/religion marriages are legally protected under Special Marriage Act',
        ],
        quiz: [
          {
            question: 'Which government body regulates child adoption in India?',
            options: ['NCPCR', 'CARA', 'NALSA', 'UIDAI'],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'M007',
    category: 'Property & Inheritance',
    title: 'Property Rights & Inheritance Law',
    description:
      'Learn about property ownership, wills, inheritance, land disputes, and your rights as a property owner or heir under Indian law.',
    icon: '🏗️',
    color: 'bg-amber-50 border-amber-200',
    estimatedMinutes: 16,
    lessons: [
      {
        id: 'M007-L1',
        title: 'Writing a Will & Succession Rights',
        content: `A will is the most important document for ensuring your property goes to the right people after your death.

**How to Write a Valid Will:**
1. Must be written by a person of sound mind, aged 18+
2. Clearly list ALL assets (property, bank accounts, investments, jewelry)
3. Name beneficiaries and their shares
4. Name an executor (person who will carry out the will)
5. Sign in presence of 2 witnesses who also sign
6. Registration at Sub-Registrar office is recommended (not mandatory)
7. Will can be changed or revoked anytime during life

**What If There Is No Will? (Intestate Succession)**
Property is distributed as per personal law:

**Hindu Succession Act, 1956:**
- Class I heirs: Wife, sons, daughters, mother — all inherit equally
- If no Class I heirs, Class II heirs inherit (father, siblings, etc.)
- After 2005 amendment, daughters have EQUAL rights in ancestral property

**Indian Succession Act, 1925:**
- Applies to Christians, Parsis, and inter-faith marriages
- Wife gets 1/3 if children survive; 1/2 if no children
- Remaining distributed among children equally

**Muslim Personal Law:**
- Will (wasiyat) can cover only 1/3 of property
- Remaining 2/3 distributed as per Sharia inheritance rules
- Daughters get half the share of sons

**Probate:**
After death, executor must obtain probate (court validation of will) to execute the will. Probate is mandatory in Mumbai, Kolkata, and Chennai.`,
        keyPoints: [
          'Will must be signed by testator and 2 witnesses to be valid',
          'Registration of will is recommended for stronger legal standing',
          'Without a will, Hindu Class I heirs inherit equally',
          'Daughters have equal rights in ancestral property since 2005',
        ],
        quiz: [
          {
            question: 'How many witnesses are required to make a will valid in India?',
            options: ['1 witness', '2 witnesses', '3 witnesses', 'No witnesses needed'],
            answer: 1,
          },
        ],
      },
      {
        id: 'M007-L2',
        title: 'Property Registration & Land Records',
        content: `Understanding property documentation is crucial for protecting your rights.

**Property Registration:**
- ALL property transactions MUST be registered at Sub-Registrar office
- Without registration, the document has NO legal value
- Both buyer and seller must be present
- Stamp duty must be paid (varies by state, usually 5-7% of property value)
- Registration charges: usually 1% of property value

**Important Property Documents:**
1. **Sale Deed** — Proof of ownership transfer
2. **Title Deed** — Shows chain of ownership
3. **Encumbrance Certificate (EC)** — Shows if property has any legal dues/mortgages
4. **Mutation Records** — Revenue records showing current owner
5. **Property Tax Receipts** — Proof of tax payment
6. **Completion/Occupancy Certificate** — For newly built properties
7. **Approved Building Plan** — For construction verification

**Mutation (Name Change in Records):**
After buying or inheriting property, you MUST update:
- Municipal records (for property tax)
- Revenue records (at Tehsildar office)
- Electricity, water connections in your name

**Verifying Property Before Purchase:**
1. Check title deed for last 30 years
2. Get Encumbrance Certificate for last 12-15 years
3. Verify boundaries with revenue survey records
4. Check if property is litigated (pending court case)
5. Verify RERA registration if new construction
6. Get property valued by approved valuer`,
        keyPoints: [
          'Property registration at Sub-Registrar is mandatory for ALL transactions',
          'Always verify title deed history for at least 30 years before buying',
          'Encumbrance Certificate shows if property has any legal burdens',
          'Mutation must be done at Tehsildar office after purchase or inheritance',
        ],
      },
      {
        id: 'M007-L3',
        title: 'Handling Property Disputes',
        content: `Property disputes are among the most common legal issues in India. Here's how to handle them:

**Family Property Disputes:**
1. Try amicable settlement through family meeting
2. If failed, try mediation through Lok Adalat (free!)
3. File partition suit in Civil Court
4. Court will divide property among legal heirs

**Land Encroachment:**
If someone illegally occupies your land:
1. File complaint with Revenue Department / Tehsildar
2. File FIR at police station for criminal trespass (IPC 441, 447)
3. File civil suit for injunction and recovery of possession
4. Court can order removal of encroachment

**Builder/Developer Fraud (RERA):**
If a builder cheated you:
1. Check if project is RERA registered
2. File complaint on State RERA portal
3. RERA can order refund with 10-11% interest
4. RERA can also order possession delivery

**Adverse Possession:**
- If someone occupies your land openly for 12+ years, they may claim ownership
- For government land, the period is 30 years
- PROTECT your property by regularly visiting and maintaining it
- Send legal notices to encroachers immediately

**Daughter's Property Rights:**
- Since 2005 amendment, daughters have EQUAL rights as sons in ancestral property
- This applies regardless of when the daughter was born
- If denied, file partition suit in Civil Court
- Lok Adalat can also help resolve family disputes`,
        keyPoints: [
          'Lok Adalat offers free and fast resolution of property disputes',
          'Report land encroachment immediately to prevent adverse possession claims',
          'RERA protects homebuyers from builder fraud — file complaint on state portal',
          'Daughters have equal rights in ancestral property since 2005 amendment',
        ],
        quiz: [
          {
            question: 'After how many years can someone claim adverse possession of private property?',
            options: ['5 years', '10 years', '12 years', '30 years'],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'M008',
    category: 'Criminal Procedures',
    title: 'Criminal Justice & Your Rights',
    description:
      'Know your rights when dealing with police, filing FIRs, understanding bail, and accessing free legal aid in India.',
    icon: '⚖️',
    color: 'bg-slate-100 border-slate-300',
    estimatedMinutes: 20,
    lessons: [
      {
        id: 'M008-L1',
        title: 'Filing FIR and Police Procedures',
        content: `Knowing how to deal with the police is one of the most important legal skills:

**What is an FIR?**
First Information Report — the first step in criminal proceedings. It sets the police investigation in motion.

**When to File FIR:**
- Theft, robbery, assault
- Fraud, cheating
- Missing person
- Domestic violence
- Any cognizable offense (serious crimes)

**Your Rights When Filing FIR:**
1. Police CANNOT refuse to register your FIR (Supreme Court: Lalita Kumari v. UP, 2014)
2. You can file FIR at ANY police station (Zero FIR)
3. You must receive a FREE copy of the FIR
4. FIR can be filed in any language you speak
5. Women's complaints of sexual nature must be recorded by female officer

**If Police Refuse:**
1. Send written complaint to Superintendent of Police (SP) by registered post
2. File complaint before Magistrate under CrPC Section 156(3)
3. Magistrate can ORDER police to register FIR and investigate
4. File complaint with State Human Rights Commission

**E-FIR:**
Many states now allow online FIR filing for certain offenses through their police website. Physical visit may still be required later.

**Important:** For non-cognizable offenses (minor issues), police file an NCR (Non-Cognizable Report) and you may need Magistrate's permission for investigation.`,
        keyPoints: [
          'Police CANNOT refuse to register FIR — Supreme Court has made this clear',
          'Zero FIR can be filed at any police station regardless of jurisdiction',
          'If police refuse, approach SP or file complaint before Magistrate',
          'Free copy of FIR is your legal right',
        ],
        quiz: [
          {
            question: 'If police refuse to register your FIR, what can you do?',
            options: [
              'Nothing — police have discretion',
              'File complaint before Magistrate under CrPC Section 156(3)',
              'Go to another police station only',
              'File a civil suit in court',
            ],
            answer: 1,
          },
        ],
      },
      {
        id: 'M008-L2',
        title: 'Understanding Bail',
        content: `Bail is the mechanism by which an arrested person can secure temporary release during the investigation or trial.

**Types of Bail:**

**1. Regular Bail (CrPC Section 437, 439)**
Applied for after arrest. Two types:
- **Bailable Offenses:** Bail is a RIGHT. Police MUST grant bail at the station. Example: simple assault, defamation.
- **Non-Bailable Offenses:** Bail is discretionary. Must apply to Magistrate/Sessions Court. Example: murder, robbery.

**2. Anticipatory Bail (CrPC Section 438)**
Applied for BEFORE arrest when you fear being arrested in a false case.
- Filed in Sessions Court or High Court
- If granted, police cannot arrest you
- Court may impose conditions (don't leave city, report to station, etc.)

**3. Interim Bail**
Temporary bail granted pending hearing of regular bail application. Usually for 7-14 days.

**Bail Hierarchy — If Refused:**
1. Police Station (bailable only)
2. Magistrate Court
3. Sessions Court
4. High Court
5. Supreme Court (in exceptional cases)

**Bail Conditions:**
Courts typically require:
- Personal bond (promise to appear in court)
- Surety bond (someone guarantees your appearance)
- Surrender of passport
- Regular attendance at police station

**Default Bail (Section 167(2)):**
If police fail to file chargesheet within 60 days (for offenses up to 10 years) or 90 days (for life imprisonment offenses), the accused gets AUTOMATIC right to bail.`,
        keyPoints: [
          'Bail is a RIGHT in bailable offenses — police must grant it',
          'Anticipatory bail protects you from arrest in false cases',
          'If one court refuses bail, you can apply to a higher court',
          'Default bail applies if chargesheet is not filed within 60/90 days',
        ],
      },
      {
        id: 'M008-L3',
        title: 'Free Legal Aid & Victim Rights',
        content: `Access to justice is a fundamental right in India. Here's how to get legal help:

**Who Gets Free Legal Aid?**
Under Legal Services Authorities Act, 1987:
1. Women — all women regardless of income
2. SC/ST communities
3. Persons with disabilities
4. Industrial workers
5. Persons below poverty line (BPL)
6. Victims of human trafficking
7. Persons in custody
8. Persons with annual income below ₹3 lakh (varies by state)

**How to Get Free Legal Aid:**
1. Visit District Legal Services Authority (DLSA) office
2. Fill application form
3. Submit income certificate or category proof
4. Authority assigns a qualified panel lawyer at NO cost
5. Lawyer represents you in court
6. Call NALSA Helpline: 15100

**Victim Compensation Scheme:**
Crime victims can get financial compensation:
- Sexual assault victims
- Acid attack victims
- Victims of violent crime
- Even if the criminal is not caught

**Apply:** File with District Legal Services Authority with FIR copy and medical reports.

**Lok Adalat — Free Quick Justice:**
- No court fees
- No formal procedures
- Decision in one day
- Settlement is final and binding
- Great for: Motor accident claims, consumer disputes, bank recovery, labour disputes
- Contact DLSA for next Lok Adalat date in your district`,
        keyPoints: [
          'All women get free legal aid regardless of income level',
          'NALSA Helpline 15100 connects you to free legal services',
          'Crime victims can get compensation even if criminal is not caught',
          'Lok Adalat settles disputes in one day with no court fees',
        ],
        quiz: [
          {
            question: 'Which of these persons is NOT automatically entitled to free legal aid?',
            options: [
              'Women of any income level',
              'SC/ST community members',
              'Private sector employees earning above ₹10 lakh',
              'Persons with disabilities',
            ],
            answer: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'M009',
    category: 'RTI & Government Services',
    title: 'RTI & Government Services Guide',
    description:
      'Learn how to use the Right to Information Act, file government grievances, resolve Aadhaar and passport issues, and access public services.',
    icon: '📋',
    color: 'bg-cyan-50 border-cyan-200',
    estimatedMinutes: 14,
    lessons: [
      {
        id: 'M009-L1',
        title: 'Mastering the Right to Information (RTI)',
        content: `The RTI Act, 2005 is one of the most powerful tools available to Indian citizens.

**What is RTI?**
The Right to Information Act gives every citizen the right to request information from any public authority (government office, PSU, etc.).

**How to File an RTI:**
1. Write a simple application (no legal format needed)
2. Address it to the Public Information Officer (PIO) of the department
3. Clearly state what information you need
4. Pay ₹10 fee (central). State fees vary (₹10-₹50)
5. Send by post, submit in person, or file online at rtionline.gov.in

**What Information Can You Seek?**
- Government spending records
- Status of your application/petition
- Reasons for decisions affecting you
- Contracts and agreements
- Inspection reports
- Any information held by public authority

**RTI Response Timeline:**
- Normal: 30 days
- Life or liberty related: 48 hours
- If information involves third party: 40 days

**What If No Reply or Wrong Reply?**
- **First Appeal:** To senior officer within 30 days — free
- **Second Appeal:** To Information Commission within 90 days
- Commission can impose ₹250/day penalty on PIO (up to ₹25,000)

**Exceptions:** RTI cannot be used for personal opinions, cabinet papers, trade secrets, or information that would harm national security.`,
        keyPoints: [
          'RTI application costs just ₹10 and can be filed online',
          'Government must reply within 30 days — 48 hours for life/liberty issues',
          'PIO can be fined ₹25,000 for not providing information',
          'Two levels of appeal available if your RTI is not answered',
        ],
        quiz: [
          {
            question: 'What is the fee for filing an RTI application with a central government department?',
            options: ['₹5', '₹10', '₹50', '₹100'],
            answer: 1,
          },
        ],
      },
      {
        id: 'M009-L2',
        title: 'Government Grievances, Aadhaar & Passport',
        content: `Several important government services every citizen should know how to access:

**CPGRAMS — Government Grievance Portal:**
- Visit pgportal.gov.in
- Register complaint about ANY central government service
- Get tracking number
- Department must respond within 60 days
- Can file reminder if no response

**Common Grievance Topics:**
- Pension delays
- Passport processing delays
- PDS/ration card issues
- Employee-related complaints
- Government scheme benefits not received

**Aadhaar Issues:**
- **Wrong Details:** Visit Aadhaar centre or apply online at uidai.gov.in
- **Biometric Failure:** Update biometrics at Aadhaar centre
- **Lock Biometrics:** Use mAadhaar app — prevents misuse
- **Check Authentication History:** See who used your Aadhaar online
- **Misuse:** Report to UIDAI (1947) and cybercrime.gov.in
- **Important:** Aadhaar is NOT mandatory for bank accounts or SIM cards

**Passport Issues:**
- Apply online: passportindia.gov.in
- Normal processing: 30 days
- Tatkal (urgent): 7 days with extra fee
- If delayed: File grievance on passport portal
- If refused: RTI to know the reason
- Police verification is part of the process`,
        keyPoints: [
          'CPGRAMS handles complaints about any central government service',
          'Lock Aadhaar biometrics through mAadhaar app when not in use',
          'Passport must be processed within 30 days — file grievance if delayed',
          'Aadhaar is NOT mandatory for bank accounts or SIM cards',
        ],
      },
      {
        id: 'M009-L3',
        title: 'Lok Adalat & Public Service Access',
        content: `Lok Adalats and other public services help citizens get quick, affordable justice.

**Lok Adalat — People's Court:**
Lok Adalats are organized by Legal Services Authorities to settle disputes:
- **No court fees** — completely free
- **No lawyers needed** — you represent yourself
- **One-day settlement** — decided on the spot
- **Final and binding** — no appeal, no hassle
- Both parties must agree to participate

**Cases Handled by Lok Adalat:**
1. Motor accident compensation claims
2. Labour disputes
3. Consumer complaints
4. Bank recovery cases
5. Electricity and water bill disputes
6. Family disputes (maintenance, custody)
7. Cheque bounce cases

**How to Use Lok Adalat:**
1. Contact District Legal Services Authority (DLSA)
2. Apply for your case to be heard at next Lok Adalat
3. Lok Adalats are held regularly (check dates with DLSA)
4. If both parties agree to a settlement, it becomes legally binding

**PDS / Ration Card:**
- Right to food under National Food Security Act, 2013
- Families below poverty line get subsidized grains
- If denied: Complain to District Supply Officer
- State Food Commission handles unresolved complaints

**NALSA Helpline 15100:**
The one-stop helpline for all legal aid and justice related queries. Available pan-India.`,
        keyPoints: [
          'Lok Adalat settlements are free, fast, and legally binding',
          'DLSA organizes regular Lok Adalats in every district',
          'National Food Security Act guarantees subsidized food to BPL families',
          'Call 15100 for any legal aid or justice related queries',
        ],
        quiz: [
          {
            question: 'What is the key advantage of getting a case settled in Lok Adalat?',
            options: [
              'It is expensive but very fast',
              'It is free, fast, and the decision is final',
              'You can appeal the decision in High Court',
              'Only government employees can use it',
            ],
            answer: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'M010',
    category: 'Education & Student Rights',
    title: 'Education & Student Rights',
    description:
      'Know your rights as a student — from free education under RTE to anti-ragging protection, scholarships, and handling admission disputes.',
    icon: '🎓',
    color: 'bg-indigo-50 border-indigo-200',
    estimatedMinutes: 14,
    lessons: [
      {
        id: 'M010-L1',
        title: 'Right to Education (RTE) and School Rights',
        content: `Education is a fundamental right in India under Article 21A of the Constitution.

**Right to Education Act, 2009:**
- Every child aged 6-14 has the RIGHT to free and compulsory education
- Private schools must reserve 25% seats for Economically Weaker Sections (EWS)
- No screening tests or interviews for admission till Class 1
- No child can be held back (failed) until Class 8
- No child can be expelled until Class 8
- No physical punishment or mental harassment allowed

**25% EWS Quota in Private Schools:**
- Available for children from families below ₹1 lakh annual income (varies by state)
- Government reimburses the school fees
- Apply through state education portal
- Admissions usually in January-March

**Teacher-Student Ratio:**
- Primary school: 1 teacher per 30 students
- Upper primary: 1 teacher per 35 students

**Corporal Punishment Ban:**
Under Section 17 of RTE Act:
- Physical punishment is BANNED
- Mental harassment and discrimination is BANNED
- Teachers violating this face disciplinary action
- File complaint with school, DEO, or NCPCR

**Mid-Day Meal Scheme:**
- Free cooked meal for all children in government and aided schools
- Covers Classes 1-8
- If not provided: complain to District Education Officer`,
        keyPoints: [
          'Every child 6-14 has a fundamental right to free education',
          'Private schools must reserve 25% seats for poor children',
          'Physical punishment by teachers is completely banned under RTE',
          'No child can be detained or expelled before completing Class 8',
        ],
        quiz: [
          {
            question: 'What percentage of seats must private schools reserve for economically weaker sections?',
            options: ['10%', '15%', '20%', '25%'],
            answer: 3,
          },
        ],
      },
      {
        id: 'M010-L2',
        title: 'Anti-Ragging Laws & College Safety',
        content: `Ragging is one of the most serious problems in Indian educational institutions. The law provides strong protection.

**What is Ragging?**
Any act that:
- Causes physical or psychological harm to a student
- Forces a student to do something against their will
- Prevents a student from doing normal activities
- Causes fear, shame, or embarrassment
- Includes teasing, bullying, or harassment of juniors

**Legal Framework:**
- UGC Regulations on Curbing Ragging, 2009
- Supreme Court Order in Vishwa Jagriti Mission case
- Criminal liability under IPC (assault, causing hurt, etc.)

**Punishments for Ragging:**
1. **College Level:** Suspension, expulsion, debarring from exams
2. **Criminal:** FIR under IPC — imprisonment up to 3 years
3. **Financial:** Fine and costs

**Every College Must:**
- Have Anti-Ragging Committee (faculty + students)
- Have Anti-Ragging Squad for monitoring
- Display anti-ragging posters
- Get anti-ragging affidavits from all students and parents
- Conduct awareness sessions
- Provide helpline numbers

**What to Do If Ragged:**
1. Call Anti-Ragging Helpline: **1800-180-5522** (24/7, toll-free)
2. File written complaint with Anti-Ragging Committee
3. File complaint on UGC portal: antiragging.in
4. File FIR at police station (if physical harm)
5. Your identity will be KEPT CONFIDENTIAL`,
        keyPoints: [
          'Ragging is a criminal offense that can lead to imprisonment',
          'Anti-Ragging Helpline 1800-180-5522 is available 24/7',
          'Every college MUST have an Anti-Ragging Committee and Squad',
          'Your identity is kept confidential when reporting ragging',
        ],
      },
      {
        id: 'M010-L3',
        title: 'Scholarships, Loans & Admission Rights',
        content: `Understanding financial aid and admission rights can help students access quality education.

**Government Scholarships:**
Major scholarship schemes:
1. **Post-Matric Scholarship** for SC/ST/OBC
2. **Merit-cum-Means Scholarship** for minorities
3. **National Means-cum-Merit Scholarship** for Class 8 students
4. **Central Sector Scholarship** for college students
5. **PM's Scholarship Scheme** for children of armed forces
6. **Pragati/Saksham** for women and disabled students in technical education

**How to Apply:** Register on National Scholarship Portal — scholarships.gov.in

**If Scholarship is Delayed:**
1. Check status on the portal
2. Contact District Welfare Officer
3. File RTI to know reason for delay
4. File complaint on CPGRAMS (central scholarships)

**Education Loans:**
- Banks must follow RBI guidelines
- Up to ₹4 lakh: No collateral needed
- ₹4-7.5 lakh: Co-borrower (parent) required
- Above ₹7.5 lakh: Collateral needed
- Processing fees must be reasonable
- Interest subsidy available for EWS students

**Admission Rights:**
- No capitation fees (illegal under law)
- Admission must follow merit or valid criteria
- Reservation quotas must be followed
- If denied admission unfairly:
  - File complaint with UGC/AICTE
  - File with state Fee Regulatory Authority
  - Approach High Court for urgent relief`,
        keyPoints: [
          'Apply for all government scholarships at scholarships.gov.in',
          'Education loans up to ₹4 lakh do not require any collateral',
          'Capitation fees are illegal — report to UGC or AICTE',
          'RTI can be used to check why scholarship is delayed',
        ],
        quiz: [
          {
            question: 'Education loans up to what amount do NOT require collateral from the borrower?',
            options: ['₹2 lakh', '₹4 lakh', '₹7.5 lakh', '₹10 lakh'],
            answer: 1,
          },
        ],
      },
    ],
  },
]

export function getModuleById(id: string): LearningModule | undefined {
  return learningModules.find((m) => m.id === id)
}

export function getModulesByCategory(category: string): LearningModule[] {
  return learningModules.filter((m) => m.category === category)
}
