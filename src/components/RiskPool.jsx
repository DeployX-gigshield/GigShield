import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'
import { Card, SectionTitle, Tag, ProgressBar, Divider } from './UI.jsx'
import { poolStats, cityBreakdown, reserveHistory } from '../data/mockData.js'

const layers = [
  {
    num: '01', title: 'Geographic Diversification', icon: '🌍', color: '#3b82f6',
    desc: 'Pool riders across Delhi, Mumbai, Bengaluru, Hyderabad, Pune. A flood in one city does not hit all cities simultaneously. Different trigger types have different seasonality patterns.',
    metric: '5 metros · 69,272 riders',
  },
  {
    num: '02', title: 'Catastrophe Reserve Fund', icon: '🏦', color: '#10b981',
    desc: '₹4.9/week per rider allocated directly to reserve. For 100k riders: ₹4.9L/week accumulation. Target: maintain 8–12 weeks of expected claims in reserve at all times.',
    metric: '₹4.23 Cr reserve · 9.2 weeks',
  },
  {
    num: '03', title: 'Reinsurance / Stop-Loss', icon: '🛡️', color: '#f59e0b',
    desc: 'Platform retains the first ₹50L of weekly catastrophe loss. Reinsurer covers losses above ₹50L up to contract limit. Parametric products are easier to reinsure due to transparent triggers.',
    metric: '₹50L retention · External capital above',
  },
]

export default function RiskPool() {
  const totalRiders = cityBreakdown.reduce((s, c) => s + c.riders, 0)
  const totalPremium = cityBreakdown.reduce((s, c) => s + c.premium, 0)

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Pool Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Enrolled Riders', value: poolStats.totalRiders.toLocaleString(), sub: `${poolStats.activeToday.toLocaleString()} active today`, color: '#3b82f6' },
          { label: 'Weekly Premium Pool',   value: `₹${(poolStats.weeklyPool / 100000).toFixed(2)}L`, sub: `₹${poolStats.weeklyPool.toLocaleString()} collected`, color: '#10b981' },
          { label: 'Catastrophe Reserve',   value: `₹${(poolStats.reserveFund / 10000000).toFixed(2)}Cr`, sub: `${poolStats.reserveWeeks} weeks of claims`, color: '#f59e0b' },
          { label: 'Portfolio Loss Ratio',  value: `${poolStats.lossRatio}%`, sub: 'Healthy microinsurance range', color: '#10b981' },
          { label: 'Active Claims',         value: poolStats.activeClaims, sub: `${poolStats.pendingReview} pending review`, color: '#3b82f6' },
          { label: 'Avg Payout Time',       value: poolStats.avgPayoutTime, sub: `${poolStats.totalPayoutsThisWeek} payouts this week`, color: '#6366f1' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '16px 18px',
            borderTop: `3px solid ${s.color}`,
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Three-Layer Architecture ── */}
      <Card>
        <SectionTitle>Three-Layer Solvency Architecture</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {layers.map(l => (
            <div key={l.num} style={{
              borderRadius: 'var(--radius-sm)', padding: 18,
              background: 'var(--surface2)',
              border: `1px solid ${l.color}30`,
              borderTop: `3px solid ${l.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: l.color, fontWeight: 700, letterSpacing: '0.06em' }}>LAYER {l.num}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{l.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>{l.desc}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: l.color, background: `${l.color}15`, padding: '5px 10px', borderRadius: 6 }}>
                {l.metric}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* City Breakdown Bar */}
        <Card>
          <SectionTitle>
            City-wise Premium vs. Claims (₹L/week)
            <Tag color="#3b82f6">{totalRiders.toLocaleString()} riders</Tag>
          </SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cityBreakdown} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="city" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip
                contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 11 }}
                formatter={v => [`₹${(v / 100000).toFixed(2)}L`, '']}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
              <Bar dataKey="premium" name="Premium" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="claims"  name="Claims"  fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Reserve History Line */}
        <Card>
          <SectionTitle>Reserve Fund Growth (₹ Lakh)</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={reserveHistory} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 11 }}
                formatter={v => [`₹${v}L`, '']}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
              <Line type="monotone" dataKey="reserve" name="Reserve Fund" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
              <Line type="monotone" dataKey="claims"  name="Claims Paid"  stroke="#ef4444" strokeWidth={1.5} dot={{ fill: '#ef4444', r: 3 }} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── City Loss Ratio Table ── */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <SectionTitle>City-wise Loss Ratio Breakdown</SectionTitle>
        </div>
        <table className="gs-table">
          <thead>
            <tr>
              {['City', 'Riders', 'Weekly Premium', 'Weekly Claims', 'Loss Ratio', 'Health'].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {cityBreakdown.map(c => (
              <tr key={c.city}>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
                    <span style={{ fontWeight: 600 }}>{c.city}</span>
                  </span>
                </td>
                <td style={{ color: 'var(--text-dim)' }}>{c.riders.toLocaleString()}</td>
                <td style={{ color: '#10b981', fontWeight: 600 }}>₹{(c.premium / 100000).toFixed(2)}L</td>
                <td style={{ color: '#ef4444', fontWeight: 600 }}>₹{(c.claims / 100000).toFixed(2)}L</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ProgressBar value={c.lossRatio} max={100} color={c.lossRatio < 60 ? '#10b981' : '#f59e0b'} height={4} />
                    <span style={{ fontWeight: 700, fontSize: 12, minWidth: 36 }}>{c.lossRatio}%</span>
                  </div>
                </td>
                <td>
                  <Tag color={c.lossRatio < 60 ? '#10b981' : '#f59e0b'}>
                    {c.lossRatio < 60 ? '✓ Healthy' : '⚠ Watch'}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ── Stress Test ── */}
      <Card style={{ border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.03)' }}>
        <SectionTitle>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            ⛈️ Stress Test — City-Wide Flood Scenario
          </span>
          <Tag color="#ef4444">50,000 riders · Delhi-NCR</Tag>
        </SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
          {[
            { label: 'Weekly Revenue',      value: '₹17.5L', sub: '50,000 × ₹35',        color: '#10b981' },
            { label: 'Major Event Claims',  value: '₹45.0L', sub: '10,000 × ₹450 (20%)', color: '#ef4444' },
            { label: 'Weekly Gap',          value: '₹27.5L', sub: 'Covered by reserves',  color: '#f59e0b' },
            { label: 'Stop-Loss Threshold', value: '₹50L',   sub: 'Reinsurer absorbs above', color: '#3b82f6' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            '✅ Accumulated reserves offset high-claim weeks',
            '✅ Cross-city diversification (Mumbai/Bengaluru premiums)',
            '✅ Stop-loss reinsurance above ₹50L',
            '✅ Hard-coded exposure caps per rider per month',
          ].map(t => (
            <span key={t} style={{
              fontSize: 11, color: '#10b981', background: 'rgba(16,185,129,0.1)',
              padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(16,185,129,0.2)',
            }}>{t}</span>
          ))}
        </div>
      </Card>

    </div>
  )
}
