// ── Rider ──────────────────────────────────────────────────────────────────
export const riderProfile = {
  name: 'Rahul Kumar',
  id: 'GS-DL-00421',
  plan: 'Standard',
  zone: 'Mundka, Delhi-NCR',
  pincode: '110041',
  darkStore: 'Blinkit — Mundka Hub',
  platform: 'Blinkit / Zepto',
  vehicle: 'Hero Splendor (BS4)',
  enrolled: 'Jan 6, 2025',
  weeklyPremium: 35,
  status: 'Active',
  lasScore: 0.87,
  paieScore: 0.92,
  streakDays: 5,
  totalPayouts: 2300,
  totalPremiumPaid: 840,
  claimsCount: 6,
  avgDailyOrders: 27,
  weeklyEarnings: 7200,
  phone: '+91 98XXX XXXXX',
  upi: 'rahul.k@okaxis',
  kyc: 'Aadhaar Verified',
  joinedDays: 192,
}

// ── Policy Plans ────────────────────────────────────────────────────────────
export const plans = [
  { name: 'Basic',    premium: 25, payout: 300, maxDays: 2, maxBenefit: 600,  lossRatio: 48 },
  { name: 'Standard', premium: 35, payout: 450, maxDays: 3, maxBenefit: 1350, lossRatio: 55.6, recommended: true },
  { name: 'Plus',     premium: 45, payout: 600, maxDays: 3, maxBenefit: 1800, lossRatio: 60 },
]

// ── Weekly Earnings (12 weeks) ───────────────────────────────────────────────
export const weeklyEarnings = [
  { week: 'Feb W3', normal: 7100, actual: 7100, payout: 0,   premium: 35 },
  { week: 'Feb W4', normal: 7300, actual: 5830, payout: 450, premium: 35, event: 'Rain' },
  { week: 'Mar W1', normal: 7200, actual: 7200, payout: 0,   premium: 35 },
  { week: 'Mar W2', normal: 7500, actual: 7500, payout: 0,   premium: 35 },
  { week: 'Mar W3', normal: 7400, actual: 6200, payout: 900, premium: 35, event: 'Rain×2' },
  { week: 'Apr W1', normal: 7600, actual: 7600, payout: 0,   premium: 35 },
  { week: 'Apr W2', normal: 7200, actual: 6850, payout: 350, premium: 35, event: 'Heat' },
  { week: 'May W1', normal: 7800, actual: 5580, payout: 750, premium: 35, event: 'Rain T2' },
  { week: 'May W3', normal: 7300, actual: 7300, payout: 0,   premium: 35 },
  { week: 'Jun W2', normal: 7100, actual: 6800, payout: 300, premium: 35, event: 'AQI' },
  { week: 'Jun W4', normal: 7500, actual: 7500, payout: 0,   premium: 35 },
  { week: 'Jul W2', normal: 7200, actual: 6750, payout: 450, premium: 35, event: 'Rain' },
]

// ── Hourly AQI (today) ───────────────────────────────────────────────────────
export const hourlyAQI = [
  { time: '06:00', cpcb: 318, iqair: 305, waqi: 322 },
  { time: '07:00', cpcb: 342, iqair: 330, waqi: 348 },
  { time: '08:00', cpcb: 371, iqair: 358, waqi: 375 },
  { time: '09:00', cpcb: 389, iqair: 376, waqi: 392 },
  { time: '10:00', cpcb: 401, iqair: 388, waqi: 408 },
  { time: '11:00', cpcb: 412, iqair: 398, waqi: 421 },
  { time: '12:00', cpcb: 418, iqair: 405, waqi: 425 },
  { time: '13:00', cpcb: 422, iqair: 410, waqi: 430 },
]

// ── Triggers ─────────────────────────────────────────────────────────────────
export const triggers = [
  {
    id: 'T1', name: 'Heavy Rainfall', icon: '🌧️', color: '#3b82f6',
    threshold: '≥64.5mm/24hr + ≥10mm/hr for 3hr',
    currentValue: '12.3mm/hr · 38.2mm/24hr',
    pctOfThreshold: 59,
    payoutTier1: '₹400', payoutTier2: '₹750',
    cooldown: '2/month', cooldownUsed: 1,
    status: 'monitoring',
    apis: ['OpenWeatherMap 3.0', 'IMD AWS', 'TomTom Traffic'],
    oracles: [
      { source: 'OpenWeatherMap', value: '12.3mm/hr', raw: 12.3, threshold: 10, confirmed: true },
      { source: 'IMD AWS',        value: '11.8mm/hr', raw: 11.8, threshold: 10, confirmed: true },
      { source: 'TomTom Traffic', value: 'Speed −38%', raw: 38,  threshold: 55, confirmed: false },
    ],
    lastChecked: '2 min ago',
    description: 'Rainfall ≥64.5mm/24hr AND rate ≥10mm/hr for 3+ consecutive hours within 3km of dark-store.',
  },
  {
    id: 'T2', name: 'Extreme Heatwave', icon: '🌡️', color: '#f97316',
    threshold: 'Temp ≥45°C OR Heat Index ≥50°C for 3hr',
    currentValue: '38.4°C · Heat Index 41°C',
    pctOfThreshold: 85,
    payoutTier1: '₹350', payoutTier2: null,
    cooldown: '8/month', cooldownUsed: 0,
    status: 'inactive',
    apis: ['Tomorrow.io', 'OpenWeatherMap', 'IMD Alert'],
    oracles: [
      { source: 'Tomorrow.io',    value: '38.4°C',  raw: 38.4, threshold: 45, confirmed: false },
      { source: 'OpenWeatherMap', value: '38.1°C',  raw: 38.1, threshold: 45, confirmed: false },
      { source: 'IMD Alert',      value: 'No Alert', raw: 0,   threshold: 1,  confirmed: false },
    ],
    lastChecked: '4 min ago',
    description: 'Ambient temp ≥45°C OR Heat Index ≥50°C sustained ≥3 consecutive hours (11AM–5PM IST).',
  },
  {
    id: 'T3', name: 'Hazardous AQI', icon: '😷', color: '#f59e0b',
    threshold: 'AQI ≥400 for ≥8hr OR AQI ≥450 for ≥4hr',
    currentValue: 'AQI 422 · 3hr 10min sustained',
    pctOfThreshold: 92,
    payoutTier1: '₹300', payoutTier2: null,
    cooldown: '10/season', cooldownUsed: 2,
    status: 'alert',
    apis: ['CPCB Real-Time', 'IQAir / AirVisual', 'WAQI'],
    oracles: [
      { source: 'CPCB',  value: 'AQI 422', raw: 422, threshold: 400, confirmed: true },
      { source: 'IQAir', value: 'AQI 398', raw: 398, threshold: 400, confirmed: false },
      { source: 'WAQI',  value: 'AQI 430', raw: 430, threshold: 400, confirmed: true },
    ],
    lastChecked: 'Just now',
    description: 'AQI ≥400 (Severe) for ≥8 consecutive hours at CPCB monitoring station in rider zone.',
    alertMsg: 'AQI 422 at Mundka CPCB station. 2/3 oracles confirmed. 4h 50min remaining to trigger payout.',
  },
  {
    id: 'T4', name: 'Internet Shutdown', icon: '📡', color: '#8b5cf6',
    threshold: 'Confirmed mobile internet shutdown ≥4hr',
    currentValue: 'No active shutdown',
    pctOfThreshold: 0,
    payoutTier1: '₹200/8hr block', payoutTier2: '₹800 cap',
    cooldown: '3/month', cooldownUsed: 0,
    status: 'inactive',
    apis: ['SFLC.in Tracker', 'NetBlocks / OONI', 'Downdetector ISP'],
    oracles: [
      { source: 'SFLC.in',     value: 'No shutdown', raw: 0, threshold: 1, confirmed: false },
      { source: 'NetBlocks',   value: 'No shutdown', raw: 0, threshold: 1, confirmed: false },
      { source: 'Downdetector',value: '2% reports',  raw: 2, threshold: 80, confirmed: false },
    ],
    lastChecked: '8 min ago',
    description: 'Confirmed mobile internet shutdown ≥4 hours in rider\'s registered district/pin-code cluster.',
  },
  {
    id: 'T5', name: 'Section 144 / Curfew', icon: '🚨', color: '#ef4444',
    threshold: 'Official govt order ≥4hr in rider zone',
    currentValue: 'No active order',
    pctOfThreshold: 0,
    payoutTier1: '₹250/8hr block', payoutTier2: '₹750 cap',
    cooldown: '2/month', cooldownUsed: 0,
    status: 'inactive',
    apis: ['GDELT Project API', 'District e-Gazette', 'Google Maps Traffic'],
    oracles: [
      { source: 'GDELT',          value: 'No event',   raw: 0, threshold: 1, confirmed: false },
      { source: 'e-Gazette',      value: 'No order',   raw: 0, threshold: 1, confirmed: false },
      { source: 'Google Traffic', value: 'Speed −8%',  raw: 8, threshold: 70, confirmed: false },
    ],
    lastChecked: '6 min ago',
    description: 'Official gazette notification of Section 144 or curfew, effective ≥4 hours in police jurisdiction.',
  },
]

// ── Claims ────────────────────────────────────────────────────────────────────
export const claims = [
  {
    id: 'CLM-0041', date: 'Jul 12, 2025', time: '16:42', trigger: 'Heavy Rainfall',
    triggerId: 'T1', amount: 450, status: 'Paid', processingTime: '18 min',
    lasScore: 0.89, paieScore: 0.94, consensus: '3/3',
    txnId: 'UPI2025071200421', zone: 'Mundka, Delhi',
    rainfall: '71.2mm/24hr', notes: 'Tier 1 payout. All oracles confirmed.',
  },
  {
    id: 'CLM-0038', date: 'Jul 5, 2025', time: '14:18', trigger: 'Heavy Rainfall',
    triggerId: 'T1', amount: 450, status: 'Paid', processingTime: '22 min',
    lasScore: 0.91, paieScore: 0.88, consensus: '2/3',
    txnId: 'UPI2025070500388', zone: 'Mundka, Delhi',
    rainfall: '68.4mm/24hr', notes: 'TomTom below threshold. IMD + OWM confirmed.',
  },
  {
    id: 'CLM-0031', date: 'Jun 28, 2025', time: '11:05', trigger: 'Hazardous AQI',
    triggerId: 'T3', amount: 300, status: 'Paid', processingTime: '14 min',
    lasScore: 0.85, paieScore: 0.96, consensus: '3/3',
    txnId: 'UPI2025062800311', zone: 'Mundka, Delhi',
    aqi: 'AQI 418 · 9.5hr sustained', notes: 'Full 8hr threshold met.',
  },
  {
    id: 'CLM-0027', date: 'Jun 14, 2025', time: '13:30', trigger: 'Heatwave',
    triggerId: 'T2', amount: 350, status: 'Paid', processingTime: '11 min',
    lasScore: 0.93, paieScore: 0.91, consensus: '3/3',
    txnId: 'UPI2025061400277', zone: 'Mundka, Delhi',
    temp: '46.2°C · 4hr sustained', notes: 'IMD Red Alert co-trigger confirmed.',
  },
  {
    id: 'CLM-0019', date: 'May 30, 2025', time: '18:55', trigger: 'Heavy Rainfall',
    triggerId: 'T1', amount: 750, status: 'Paid', processingTime: '26 min',
    lasScore: 0.88, paieScore: 0.90, consensus: '3/3',
    txnId: 'UPI2025053000199', zone: 'Mundka, Delhi',
    rainfall: '128.6mm/24hr', notes: 'Tier 2 payout. >115mm threshold crossed.',
  },
  {
    id: 'CLM-0012', date: 'May 18, 2025', time: '09:20', trigger: 'Section 144',
    triggerId: 'T5', amount: 250, status: 'Review', processingTime: '—',
    lasScore: 0.61, paieScore: 0.72, consensus: '2/3',
    txnId: '—', zone: 'Mundka, Delhi',
    notes: 'LAS score 0.61 — routed to manual underwriter review. GDELT + e-Gazette disagree.',
  },
]

// ── Fraud Modules ─────────────────────────────────────────────────────────────
export const fraudModules = [
  {
    id: 'LAS', name: 'Location Authenticity Score', shortName: 'LAS',
    score: 87, status: 'pass', threat: 'GPS Spoofing',
    icon: '📍', color: '#3b82f6',
    factors: [
      { label: 'Historical Zone Match',       weight: 30, score: 92 },
      { label: 'Cell Tower / GPS Concordance',weight: 30, score: 88 },
      { label: 'Wi-Fi BSSID Familiarity',     weight: 15, score: 81 },
      { label: 'Velocity Plausibility',       weight: 15, score: 95 },
      { label: 'Device Sensor Consistency',   weight: 10, score: 74 },
    ],
  },
  {
    id: 'PAIE', name: 'Platform Activity Inference', shortName: 'PAIE',
    score: 92, status: 'pass', threat: 'Double-Dipping',
    icon: '📱', color: '#10b981',
    factors: [
      { label: 'Competing App Screen Time', weight: 35, score: 96 },
      { label: 'Battery Drain Pattern',     weight: 25, score: 89 },
      { label: 'Step Count (GPS idle)',      weight: 20, score: 91 },
      { label: 'Earnings Reconciliation',   weight: 20, score: 88 },
    ],
  },
  {
    id: 'AAS', name: 'Anti-Adverse Selection', shortName: 'AAS',
    score: 100, status: 'pass', threat: 'Storm Chasing',
    icon: '🚫', color: '#6366f1',
    factors: [
      { label: '30-day Enrollment Check',    weight: 40, score: 100 },
      { label: 'Forecast-Aware Block',       weight: 30, score: 100 },
      { label: 'Buy-Cancel Pattern',         weight: 30, score: 100 },
    ],
  },
  {
    id: 'GRD', name: 'Ghost Rider Detection', shortName: 'GRD',
    score: 100, status: 'pass', threat: 'Identity Farming',
    icon: '👻', color: '#8b5cf6',
    factors: [
      { label: 'Device Fingerprint',         weight: 35, score: 100 },
      { label: 'Behavioral Biometrics',      weight: 30, score: 100 },
      { label: 'Network Graph Analysis',     weight: 20, score: 100 },
      { label: 'UPI Destination Check',      weight: 15, score: 100 },
    ],
  },
  {
    id: 'MOC', name: 'Multi-Oracle Consensus', shortName: 'MOC',
    score: 78, status: 'pass', threat: 'Data Manipulation',
    icon: '🔗', color: '#f59e0b',
    factors: [
      { label: 'Primary API Integrity',      weight: 40, score: 85 },
      { label: 'Secondary Confirmation',     weight: 35, score: 74 },
      { label: 'Cryptographic Timestamp',    weight: 25, score: 72 },
    ],
  },
]

// ── Live Feed Events ──────────────────────────────────────────────────────────
export const liveFeed = [
  { time: '13:42', type: 'payout',   msg: 'CLM-0041 · ₹450 sent via UPI to rahul.k@okaxis', zone: 'Mundka' },
  { time: '13:40', type: 'trigger',  msg: 'T3 AQI threshold breach confirmed · CPCB + WAQI agree', zone: 'Delhi-NCR' },
  { time: '13:38', type: 'fraud',    msg: 'LAS check passed (0.89) · PAIE idle confirmed', zone: 'Mundka' },
  { time: '13:35', type: 'oracle',   msg: 'OpenWeatherMap polled · Rainfall 12.3mm/hr · Below T1 threshold', zone: 'Delhi' },
  { time: '13:20', type: 'payout',   msg: 'CLM-0040 · ₹300 sent via UPI to priya.s@ybl', zone: 'Rohini' },
  { time: '13:15', type: 'trigger',  msg: 'T1 monitoring · 38.2mm/24hr · 59% of threshold', zone: 'Mundka' },
  { time: '13:00', type: 'system',   msg: 'Lambda poll cycle #847 completed · 5 triggers evaluated', zone: 'AWS' },
  { time: '12:45', type: 'fraud',    msg: 'Ghost rider flag cleared · Device fingerprint unique', zone: 'Dwarka' },
  { time: '12:30', type: 'payout',   msg: 'CLM-0039 · ₹450 sent via UPI to amit.v@paytm', zone: 'Noida' },
  { time: '12:15', type: 'oracle',   msg: 'IMD AWS data ingested · 3 stations reporting', zone: 'Delhi-NCR' },
]

// ── Pool / Risk Stats ─────────────────────────────────────────────────────────
export const poolStats = {
  totalRiders: 24847,
  activeToday: 21203,
  weeklyPool: 869645,
  reserveFund: 42300000,
  reserveWeeks: 9.2,
  lossRatio: 55.6,
  activeClaims: 3,
  pendingReview: 1,
  avgPayoutTime: '19 min',
  totalPayoutsThisWeek: 312,
  totalPayoutAmountThisWeek: 140400,
  reinsuranceThreshold: 5000000,
}

export const cityBreakdown = [
  { city: 'Delhi-NCR',  riders: 24847, premium: 869645, claims: 483500, lossRatio: 55.6, color: '#3b82f6' },
  { city: 'Mumbai',     riders: 18204, premium: 637140, claims: 318570, lossRatio: 50.0, color: '#10b981' },
  { city: 'Bengaluru',  riders: 12391, premium: 433685, claims: 238527, lossRatio: 55.0, color: '#6366f1' },
  { city: 'Hyderabad',  riders: 8612,  premium: 301420, claims: 180852, lossRatio: 60.0, color: '#f59e0b' },
  { city: 'Pune',       riders: 5218,  premium: 182630, claims: 100447, lossRatio: 55.0, color: '#f97316' },
]

export const reserveHistory = [
  { month: 'Feb', reserve: 28.4, claims: 3.2 },
  { month: 'Mar', reserve: 31.2, claims: 4.8 },
  { month: 'Apr', reserve: 34.8, claims: 2.1 },
  { month: 'May', reserve: 37.1, claims: 8.4 },
  { month: 'Jun', reserve: 39.6, claims: 3.9 },
  { month: 'Jul', reserve: 42.3, claims: 2.8 },
]

// ── Ticker items ──────────────────────────────────────────────────────────────
export const tickerItems = [
  { label: 'AQI · Mundka', value: '422 ⚠️', color: '#f59e0b' },
  { label: 'Rainfall · Delhi', value: '12.3mm/hr', color: '#3b82f6' },
  { label: 'Temp · Delhi', value: '38.4°C', color: '#f97316' },
  { label: 'Active Riders', value: '21,203', color: '#10b981' },
  { label: 'Claims Today', value: '47', color: '#6366f1' },
  { label: 'Avg Payout', value: '19 min', color: '#10b981' },
  { label: 'Pool Reserve', value: '₹4.23Cr', color: '#3b82f6' },
  { label: 'Loss Ratio', value: '55.6%', color: '#10b981' },
  { label: 'T3 Status', value: 'ALERT 🔴', color: '#ef4444' },
  { label: 'T1 Status', value: 'Monitoring', color: '#3b82f6' },
  { label: 'T2 Status', value: 'Inactive', color: '#64748b' },
  { label: 'Wind · Delhi', value: '14 km/h NW', color: '#94a3b8' },
]
