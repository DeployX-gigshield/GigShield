import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Overview from './components/Overview.jsx'
import Policy from './components/Policy.jsx'
import Triggers from './components/Triggers.jsx'
import Claims from './components/Claims.jsx'
import FraudEngine from './components/FraudEngine.jsx'
import RiskPool from './components/RiskPool.jsx'

const pages = {
  overview: Overview,
  policy:   Policy,
  triggers: Triggers,
  claims:   Claims,
  fraud:    FraudEngine,
  pool:     RiskPool,
}

const titles = {
  overview: { title: 'Overview',              sub: 'Rider dashboard · Real-time protection status' },
  policy:   { title: 'My Policy',             sub: 'Coverage details · Plan comparison · Premium breakdown' },
  triggers: { title: 'Live Trigger Monitor',  sub: 'AWS Lambda polling · Multi-oracle consensus · 5 shields' },
  claims:   { title: 'Claims History',        sub: 'Automated claim pipeline · UPI payouts · Audit trail' },
  fraud:    { title: 'AI Fraud Engine',       sub: '5 adversarial countermeasure algorithms · Real-time scoring' },
  pool:     { title: 'Risk Pool & Solvency',  sub: 'Three-layer architecture · Reserve fund · Stress testing' },
}

export default function App() {
  const [page, setPage] = useState('overview')
  const Page = pages[page]
  const meta = titles[page]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar active={page} onNav={setPage} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Top header */}
        <div style={{
          padding: '14px 28px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
              {meta.title}
            </h1>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{meta.sub}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              GigShield · Guidewire DEVTrails 2026 · Team DeployX
            </span>
            <div style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--green)',
              animation: 'pulse-dot 1.8s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1 }}>
          <Page />
        </div>
      </main>
    </div>
  )
}
