import React, { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, SectionTitle, Tag, ProgressBar, Divider } from './UI.jsx'
import { fraudModules, riderProfile } from '../data/mockData.js'
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react'

const decisionThresholds = [
  { range: '≥ 0.75', action: 'AUTO APPROVE', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { range: '0.50 – 0.74', action: 'MANUAL REVIEW 24HR', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { range: '< 0.50', action: 'AUTO DENY + FLAG', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
]

function ModuleCard({ module }) {
  const [open, setOpen] = useState(false)
  const scoreColor = module.score >= 80 ? '#10b981' : module.score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '16px 18px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14,
          borderLeft: `4px solid ${module.color}`,
        }}
      >
        <span style={{ fontSize: 24, flexShrink: 0 }}>{module.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{module.name}</span>
            <Tag color={module.color}>{module.shortName}</Tag>
            <Tag color="#64748b" style={{ marginLeft: 'auto' }}>Threat: {module.threat}</Tag>
          </div>
          <ProgressBar value={module.score} max={100} color={scoreColor} height={5} />
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: scoreColor }}>{module.score}%</div>
          <Tag color="#10b981">✓ Pass</Tag>
        </div>
      </div>

      {open && (
        <div style={{ padding: '0 18px 16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                Factor Breakdown
              </div>
              {module.factors.map(f => (
                <div key={f.label} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{f.label}</span>
                    <span style={{ fontWeight: 600, color: f.score >= 80 ? '#10b981' : '#f59e0b' }}>
                      {f.score}% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({f.weight}% weight)</span>
                    </span>
                  </div>
                  <ProgressBar value={f.score} max={100} color={f.score >= 80 ? '#10b981' : '#f59e0b'} height={4} />
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                Decision Thresholds
              </div>
              {decisionThresholds.map(t => (
                <div key={t.range} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 10px', borderRadius: 6, marginBottom: 6,
                  background: t.bg, border: `1px solid ${t.color}30`,
                }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{t.range}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.color }}>{t.action}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(16,185,129,0.08)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.25)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>Current Rider Decision</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>✓ AUTO APPROVE</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Score {module.score}% ≥ 75% threshold</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default function FraudEngine() {
  const radarData = fraudModules.map(m => ({ subject: m.shortName, score: m.score, fullMark: 100 }))
  const overallScore = Math.round(fraudModules.reduce((s, m) => s + m.score, 0) / fraudModules.length)

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Header ── */}
      <Card style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Shield size={22} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 3 }}>AI Fraud Detection Engine</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            5 adversarial countermeasure algorithms · Real-time scoring · All checks passed for {riderProfile.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#10b981' }}>{overallScore}%</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Overall Score</div>
          </div>
          <Tag color="#10b981" dot>All Clear</Tag>
        </div>
      </Card>

      {/* ── Radar + Score Bars ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionTitle>Module Score Radar</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 600 }} />
              <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip
                contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 11 }}
                formatter={v => [`${v}%`, 'Score']}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Module Scores — {riderProfile.name}</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {fraudModules.map(m => {
              const scoreColor = m.score >= 80 ? '#10b981' : m.score >= 60 ? '#f59e0b' : '#ef4444'
              return (
                <div key={m.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
                      <span>{m.icon}</span>
                      <span style={{ fontWeight: 500 }}>{m.name}</span>
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 14, color: scoreColor }}>{m.score}%</span>
                  </div>
                  <ProgressBar value={m.score} max={100} color={scoreColor} height={6} />
                </div>
              )
            })}
          </div>
          <Divider style={{ margin: '16px 0' }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>LAS Score</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{(riderProfile.lasScore * 100).toFixed(0)}%</div>
            </div>
            <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>PAIE Score</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>{(riderProfile.paieScore * 100).toFixed(0)}%</div>
            </div>
            <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>Decision</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#10b981' }}>APPROVE</div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Module Detail Cards (expandable) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>
          Click any module to expand factor breakdown ↓
        </div>
        {fraudModules.map(m => <ModuleCard key={m.id} module={m} />)}
      </div>

    </div>
  )
}
