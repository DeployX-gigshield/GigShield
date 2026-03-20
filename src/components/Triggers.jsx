import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, SectionTitle, Tag, ProgressBar } from './UI.jsx'
import { triggers, hourlyAQI } from '../data/mockData.js'
import { RefreshCw, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react'

const statusCfg = {
  monitoring: { label: 'Monitoring', color: '#3b82f6', dot: 'blue' },
  alert:      { label: 'ALERT',      color: '#f59e0b', dot: 'yellow' },
  inactive:   { label: 'Inactive',   color: '#64748b', dot: null },
}

function OracleCard({ oracle }) {
  return (
    <div style={{
      flex: 1, borderRadius: 8, padding: '10px 12px',
      background: oracle.confirmed ? 'rgba(16,185,129,0.08)' : 'var(--surface2)',
      border: `1px solid ${oracle.confirmed ? 'rgba(16,185,129,0.35)' : 'var(--border)'}`,
    }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{oracle.source}</div>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{oracle.value}</div>
      <div style={{ fontSize: 10, color: oracle.confirmed ? '#10b981' : 'var(--text-muted)', fontWeight: 600 }}>
        {oracle.confirmed ? '✓ Confirmed' : '✗ Below threshold'}
      </div>
      <div style={{ marginTop: 6 }}>
        <ProgressBar
          value={oracle.raw}
          max={oracle.threshold * 1.5}
          color={oracle.confirmed ? '#10b981' : '#64748b'}
          height={3}
        />
      </div>
    </div>
  )
}

export default function Triggers() {
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [spinning, setSpinning] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 15000)
    return () => clearInterval(t)
  }, [])

  const refresh = () => {
    setSpinning(true)
    setTimeout(() => { setLastRefresh(new Date()); setSpinning(false) }, 900)
  }

  const alertTrigger = triggers.find(t => t.status === 'alert')

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span className="live-dot" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Live Trigger Monitor</span>
            <Tag color="#3b82f6">AWS Lambda · 15min poll</Tag>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Multi-oracle consensus required · No single-source payouts · Cryptographic timestamps
          </div>
        </div>
        <button className="btn" onClick={refresh}>
          <RefreshCw size={12} style={{ animation: spinning ? 'spin 0.8s linear infinite' : 'none' }} />
          Last updated {lastRefresh.toLocaleTimeString()}
        </button>
      </div>

      {/* ── Active Alert Banner ── */}
      {alertTrigger && (
        <div style={{
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.4)',
          borderRadius: 'var(--radius)', padding: '14px 18px',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <AlertTriangle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#f59e0b', fontSize: 13, marginBottom: 3 }}>
              ⚠️ {alertTrigger.id} — {alertTrigger.name} Alert Active · Delhi-NCR
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {alertTrigger.alertMsg}
            </div>
          </div>
          <Tag color="#f59e0b" dot>ALERT</Tag>
        </div>
      )}

      {/* ── Trigger Status Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {triggers.map(t => {
          const cfg = statusCfg[t.status]
          return (
            <div key={t.id} style={{
              background: 'var(--surface)', border: `1px solid ${t.status === 'alert' ? 'rgba(245,158,11,0.4)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)', padding: '12px 14px',
              borderTop: `3px solid ${cfg.color}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: cfg.color, background: `${cfg.color}18`, padding: '2px 6px', borderRadius: 10 }}>
                  {cfg.label}
                </span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>{t.id}</div>
              <ProgressBar value={t.pctOfThreshold} max={100} color={cfg.color} height={4} />
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
                {t.pctOfThreshold}% of threshold
              </div>
            </div>
          )
        })}
      </div>

      {/* ── AQI Chart (T3 is active) ── */}
      <Card>
        <SectionTitle>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            😷 T3 — AQI Trend Today · Mundka Station
            <Tag color="#f59e0b" dot>Live</Tag>
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Threshold: AQI 400 for 8hr</span>
        </SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={hourlyAQI} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[280, 460]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 11 }}
              formatter={(v, name) => [v, name]}
            />
            <ReferenceLine y={400} stroke="#ef4444" strokeDasharray="4 2" label={{ value: 'Threshold 400', fill: '#ef4444', fontSize: 10, position: 'right' }} />
            <Line type="monotone" dataKey="cpcb"  name="CPCB"  stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="iqair" name="IQAir" stroke="#3b82f6" strokeWidth={1.5} dot={false} strokeDasharray="3 2" />
            <Line type="monotone" dataKey="waqi"  name="WAQI"  stroke="#10b981" strokeWidth={1.5} dot={false} strokeDasharray="3 2" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ── Trigger Detail Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {triggers.map(t => {
          const cfg = statusCfg[t.status]
          const confirmedCount = t.oracles.filter(o => o.confirmed).length
          return (
            <Card key={t.id} style={{
              borderColor: t.status === 'alert' ? 'rgba(245,158,11,0.35)' : 'var(--border)',
              borderLeft: `4px solid ${cfg.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0 }}>{t.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>

                  {/* Title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</span>
                    <Tag color={cfg.color} dot={!!cfg.dot}>{cfg.label}</Tag>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                      <Clock size={10} style={{ display: 'inline', marginRight: 3 }} />
                      {t.lastChecked}
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.5 }}>
                    {t.description}
                  </div>

                  {/* Metrics row */}
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 14 }}>
                    {[
                      { label: 'Threshold',      value: t.threshold },
                      { label: 'Current Value',  value: t.currentValue, color: t.status === 'alert' ? '#f59e0b' : 'var(--text-2)' },
                      { label: 'Tier 1 Payout',  value: t.payoutTier1, color: '#10b981' },
                      t.payoutTier2 && { label: 'Tier 2 Payout', value: t.payoutTier2, color: '#10b981' },
                      { label: 'Cooldown',       value: `${t.cooldownUsed} / ${t.cooldown}` },
                    ].filter(Boolean).map(m => (
                      <div key={m.label}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{m.label}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: m.color || 'var(--text-2)' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Threshold progress */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
                      <span style={{ color: 'var(--text-muted)' }}>Threshold Progress</span>
                      <span style={{ fontWeight: 600, color: cfg.color }}>{t.pctOfThreshold}%</span>
                    </div>
                    <ProgressBar value={t.pctOfThreshold} max={100} color={cfg.color} height={6} />
                  </div>

                  {/* Oracle consensus */}
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Activity size={11} />
                      Multi-Oracle Consensus
                      <span style={{ fontWeight: 700, color: confirmedCount >= 2 ? '#10b981' : '#64748b' }}>
                        {confirmedCount}/3 confirmed
                      </span>
                      {confirmedCount >= 2
                        ? <Tag color="#10b981">Consensus Met</Tag>
                        : <Tag color="#64748b">Awaiting Consensus</Tag>
                      }
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {t.oracles.map(o => <OracleCard key={o.source} oracle={o} />)}
                    </div>
                  </div>

                  {/* API tags */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                    {t.apis.map(api => (
                      <span key={api} style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 4,
                        background: 'var(--surface2)', color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}>{api}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
