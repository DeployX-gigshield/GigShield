import React, { useState } from 'react'
import { Card, SectionTitle, Tag, ProgressBar, Divider } from './UI.jsx'
import { claims } from '../data/mockData.js'
import { CheckCircle, Clock, Shield, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

const triggerColors = {
  'Heavy Rainfall':  { color: '#3b82f6', icon: '🌧️' },
  'Hazardous AQI':   { color: '#f59e0b', icon: '😷' },
  'Heatwave':        { color: '#f97316', icon: '🌡️' },
  'Section 144':     { color: '#ef4444', icon: '🚨' },
  'Internet Shutdown':{ color: '#8b5cf6', icon: '📡' },
}

function ClaimRow({ claim }) {
  const [expanded, setExpanded] = useState(false)
  const tc = triggerColors[claim.trigger] || { color: '#64748b', icon: '⚡' }
  const isPaid = claim.status === 'Paid'

  return (
    <>
      <tr
        onClick={() => setExpanded(e => !e)}
        style={{ cursor: 'pointer' }}
      >
        <td>
          <span className="mono" style={{ color: '#3b82f6', fontSize: 12 }}>{claim.id}</span>
        </td>
        <td>
          <div style={{ fontSize: 12 }}>{claim.date}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{claim.time}</div>
        </td>
        <td>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <span>{tc.icon}</span> {claim.trigger}
          </span>
        </td>
        <td>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#10b981' }}>₹{claim.amount}</span>
        </td>
        <td>
          <Tag
            color={isPaid ? '#10b981' : '#f59e0b'}
            dot={!isPaid}
          >
            {isPaid ? '✓ Paid' : '⏳ Review'}
          </Tag>
        </td>
        <td>
          <span style={{ fontSize: 12, color: isPaid ? '#10b981' : 'var(--text-muted)' }}>
            {claim.processingTime}
          </span>
        </td>
        <td>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {claim.consensus}
          </span>
        </td>
        <td>
          {expanded ? <ChevronUp size={14} color="var(--text-muted)" /> : <ChevronDown size={14} color="var(--text-muted)" />}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={8} style={{ padding: 0 }}>
            <div style={{
              background: 'var(--surface2)', padding: '14px 18px',
              borderBottom: '1px solid var(--border)',
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
            }}>
              {[
                { label: 'Zone',         value: claim.zone },
                { label: 'LAS Score',    value: `${(claim.lasScore * 100).toFixed(0)}%`, color: claim.lasScore >= 0.75 ? '#10b981' : '#f59e0b' },
                { label: 'PAIE Score',   value: `${(claim.paieScore * 100).toFixed(0)}%`, color: '#10b981' },
                { label: 'UPI Txn ID',   value: claim.txnId, mono: true },
                { label: 'Event Data',   value: claim.rainfall || claim.aqi || claim.temp || '—' },
                { label: 'Oracle Vote',  value: claim.consensus },
                { label: 'Notes',        value: claim.notes, span: 2 },
              ].map(f => (
                <div key={f.label} style={{ gridColumn: f.span ? `span ${f.span}` : undefined }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{f.label}</div>
                  <div style={{
                    fontSize: 12, fontWeight: 500, color: f.color || 'var(--text-2)',
                    fontFamily: f.mono ? "'JetBrains Mono', monospace" : 'inherit',
                  }}>{f.value}</div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function Claims() {
  const paid = claims.filter(c => c.status === 'Paid')
  const totalPaid = paid.reduce((s, c) => s + c.amount, 0)
  const avgTime = Math.round(paid.map(c => parseInt(c.processingTime)).filter(Boolean).reduce((a, b) => a + b, 0) / paid.length)

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Summary Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Claims',    value: claims.length,              icon: <Shield size={16} />,       color: '#3b82f6' },
          { label: 'Total Paid Out',  value: `₹${totalPaid.toLocaleString()}`, icon: <CheckCircle size={16} />, color: '#10b981' },
          { label: 'Avg Payout Time', value: `${avgTime} min`,           icon: <Clock size={16} />,        color: '#f59e0b' },
          { label: 'Under Review',    value: claims.filter(c => c.status === 'Review').length, icon: <AlertTriangle size={16} />, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            borderTop: `3px solid ${s.color}`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${s.color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.color, flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: s.color }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Claims Table ── */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SectionTitle>
            Claims History
            <Tag color="#3b82f6">{claims.length} total</Tag>
          </SectionTitle>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: -8 }}>
            Click any row to expand claim details · All payouts via UPI / Razorpay
          </div>
        </div>
        <table className="gs-table">
          <thead>
            <tr>
              {['Claim ID', 'Date', 'Trigger', 'Amount', 'Status', 'Speed', 'Consensus', ''].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {claims.map(c => <ClaimRow key={c.id} claim={c} />)}
          </tbody>
        </table>
      </Card>

      {/* ── Automated Claim Flow ── */}
      <Card>
        <SectionTitle>Automated Claim Pipeline</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: 4, gap: 0 }}>
          {[
            { step: 1, label: 'Event Detected',   sub: 'AWS Lambda polls API every 15min', color: '#3b82f6', icon: '⚡' },
            { step: 2, label: 'Oracle Consensus',  sub: '2/3 sources must agree',           color: '#6366f1', icon: '🔗' },
            { step: 3, label: 'LAS Check',         sub: 'Location authenticity verified',   color: '#f59e0b', icon: '📍' },
            { step: 4, label: 'PAIE Check',        sub: 'Activity inference — idle?',       color: '#f97316', icon: '📱' },
            { step: 5, label: 'Claim Generated',   sub: 'Guidewire ClaimCenter auto-creates', color: '#8b5cf6', icon: '📄' },
            { step: 6, label: 'UPI Payout',        sub: '< 30 min from trigger',            color: '#10b981', icon: '💸' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.step}>
              <div style={{ textAlign: 'center', minWidth: 110, flexShrink: 0 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: `${s.color}20`, border: `2px solid ${s.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, margin: '0 auto 8px',
                }}>
                  {s.icon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{s.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.4 }}>{s.sub}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: 2, background: 'var(--border)', minWidth: 16, flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

    </div>
  )
}
