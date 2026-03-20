import React from 'react'
import { Card, SectionTitle, Tag, ProgressBar, Divider } from './UI.jsx'
import { riderProfile, plans } from '../data/mockData.js'
import { CheckCircle, Star, Shield, Zap, Clock, RefreshCw } from 'lucide-react'

const loading = [
  { label: 'Pure Claims Cost',        amount: 19.5, pct: null,  color: '#3b82f6' },
  { label: 'Operations / Admin',      amount: 3.9,  pct: '20%', color: '#6366f1' },
  { label: 'Fraud & Data/API Cost',   amount: 2.0,  pct: '10%', color: '#f59e0b' },
  { label: 'Catastrophe Reserve',     amount: 4.9,  pct: '25%', color: '#ef4444' },
  { label: 'Profit / Sustainability', amount: 2.0,  pct: '10%', color: '#10b981' },
]

const coverageItems = [
  { icon: '🌧️', label: 'Heavy Rainfall',      payout: '₹400–₹750', limit: '2/month' },
  { icon: '🌡️', label: 'Extreme Heatwave',    payout: '₹350',      limit: '8/month' },
  { icon: '😷', label: 'Hazardous AQI',       payout: '₹300',      limit: '10/season' },
  { icon: '📡', label: 'Internet Shutdown',   payout: '₹200–₹800', limit: '3/month' },
  { icon: '🚨', label: 'Section 144 / Curfew',payout: '₹250–₹750', limit: '2/month' },
]

export default function Policy() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Active Policy Banner ── */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0d1a3a 0%, #111827 100%)',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', gap: 20,
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 0 0 3px rgba(99,102,241,0.25)',
          }}>
            <Shield size={24} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
              <span style={{ fontWeight: 800, fontSize: 17 }}>Policy #{riderProfile.id}</span>
              <Tag color="var(--green)" dot>Active</Tag>
              <Tag color="var(--blue)">{riderProfile.plan} Plan</Tag>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { label: 'Enrolled', value: riderProfile.enrolled },
                { label: 'Coverage', value: 'Mon 00:00 – Sun 23:59' },
                { label: 'Collection', value: 'UPI Autopay · Every Monday' },
                { label: 'KYC', value: riderProfile.kyc },
              ].map(f => (
                <span key={f.label} style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--text-dim)' }}>{f.label}: </span>{f.value}
                </span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#3b82f6' }}>₹35</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>per week</div>
            <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 4 }}>0.78% of earnings</div>
          </div>
        </div>

        {/* Policy detail grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { label: 'Policy ID',    value: riderProfile.id,       mono: true },
            { label: 'Dark Store',   value: riderProfile.darkStore },
            { label: 'Zone',         value: riderProfile.zone },
            { label: 'UPI Handle',   value: riderProfile.upi,      mono: true },
            { label: 'LAS Score',    value: `${(riderProfile.lasScore * 100).toFixed(0)}%`, color: 'var(--green)' },
            { label: 'PAIE Score',   value: `${(riderProfile.paieScore * 100).toFixed(0)}%`, color: 'var(--green)' },
            { label: 'Platform',     value: riderProfile.platform },
            { label: 'Vehicle',      value: riderProfile.vehicle },
          ].map((f, i) => (
            <div key={f.label} style={{
              padding: '13px 18px',
              borderTop: '1px solid var(--border)',
              borderRight: i % 4 < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{f.label}</div>
              <div style={{
                fontSize: 12, fontWeight: 600,
                color: f.color || 'var(--text-2)',
                fontFamily: f.mono ? "'JetBrains Mono', monospace" : 'inherit',
              }}>{f.value}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Plan Comparison ── */}
      <Card>
        <SectionTitle>Plan Comparison</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {plans.map(p => {
            const isActive = p.name === riderProfile.plan
            return (
              <div key={p.name} style={{
                border: `2px solid ${isActive ? '#3b82f6' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', padding: 20, position: 'relative',
                background: isActive ? 'rgba(59,130,246,0.06)' : 'var(--surface2)',
                transition: 'all 0.2s',
              }}>
                {p.recommended && (
                  <div style={{
                    position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                    color: '#fff', fontSize: 10, fontWeight: 700,
                    padding: '2px 12px', borderRadius: 20,
                    display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
                  }}>
                    <Star size={9} fill="#fff" /> RECOMMENDED
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#3b82f6', marginBottom: 4, letterSpacing: '-0.03em' }}>
                  ₹{p.premium}
                  <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)' }}>/week</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>
                  Loss Ratio: {p.lossRatio}%
                </div>
                <Divider style={{ marginBottom: 12 }} />
                {[
                  { label: 'Daily Payout',        value: `₹${p.payout}` },
                  { label: 'Max Days / Month',     value: `${p.maxDays} days` },
                  { label: 'Max Monthly Benefit',  value: `₹${p.maxBenefit.toLocaleString()}` },
                  { label: 'Annual Premium',       value: `₹${(p.premium * 52).toLocaleString()}` },
                ].map(r => (
                  <div key={r.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12,
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{r.value}</span>
                  </div>
                ))}
                {isActive && (
                  <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green)', fontSize: 12, fontWeight: 600 }}>
                    <CheckCircle size={13} /> Your Current Plan
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* ── Coverage + Premium Breakdown ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Coverage */}
        <Card>
          <SectionTitle>What's Covered — 5 Shields</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {coverageItems.map(c => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--surface2)', borderRadius: 8, padding: '10px 14px',
              }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>Limit: {c.limit}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{c.payout}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Premium Breakdown */}
        <Card>
          <SectionTitle>Premium Loading Structure</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {loading.map(l => (
              <div key={l.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {l.label}
                    {l.pct && <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: 10 }}>({l.pct})</span>}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>₹{l.amount}</span>
                </div>
                <ProgressBar value={l.amount} max={20} color={l.color} height={4} />
              </div>
            ))}
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 800, fontSize: 16 }}>
            <span>Total Weekly Premium</span>
            <span style={{ color: '#3b82f6' }}>₹35</span>
          </div>
          <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '12px 14px' }}>
            {[
              { label: 'Annual Premium Collected', value: '₹1,820' },
              { label: 'Annual Expected Claims',   value: '₹1,012.50' },
              { label: 'Gross Margin / Rider',     value: '₹807.50' },
              { label: 'Target Loss Ratio',        value: '55.6%', color: 'var(--green)' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                <span style={{ fontWeight: 600, color: r.color || 'var(--text-2)' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  )
}
