import React, { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts'
import { Card, SectionTitle, StatCard, Tag, ChartTooltip, ProgressBar, Divider } from './UI.jsx'
import {
  riderProfile, weeklyEarnings, liveFeed, tickerItems,
} from '../data/mockData.js'
import { MapPin, Calendar, Bike, Flame, TrendingUp, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react'

// ── Ticker ────────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span key={i} style={{ padding: '0 28px', fontSize: 11, color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-dim)', marginRight: 6 }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: 600 }}>{item.value}</span>
            <span style={{ color: 'var(--border2)', marginLeft: 28 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Live Feed ─────────────────────────────────────────────────────────────────
const feedColors = {
  payout:  { color: '#10b981', bg: '#064e3b', label: 'PAYOUT' },
  trigger: { color: '#f59e0b', bg: '#451a03', label: 'TRIGGER' },
  fraud:   { color: '#6366f1', bg: '#1e1b4b', label: 'FRAUD' },
  oracle:  { color: '#3b82f6', bg: '#1e3a5f', label: 'ORACLE' },
  system:  { color: '#64748b', bg: '#1e293b', label: 'SYSTEM' },
}

function LiveFeed() {
  const [feed, setFeed] = useState(liveFeed)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {feed.slice(0, 7).map((item, i) => {
        const cfg = feedColors[item.type]
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '9px 0', borderBottom: i < 6 ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
              background: cfg.bg, color: cfg.color, flexShrink: 0, marginTop: 1,
              letterSpacing: '0.04em',
            }}>
              {cfg.label}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{item.msg}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                {item.time} · {item.zone}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Overview() {
  const totalPaid = weeklyEarnings.reduce((s, w) => s + w.payout, 0)
  const totalPremium = weeklyEarnings.length * 35
  const netBenefit = totalPaid - totalPremium
  const disruptionWeeks = weeklyEarnings.filter(w => w.payout > 0).length

  const chartData = weeklyEarnings.map(w => ({
    ...w,
    protected: w.actual + w.payout,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Ticker />

      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* ── Rider Profile ── */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0d1a3a 0%, #111827 60%)',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 20,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 800, color: '#fff', flexShrink: 0,
              boxShadow: '0 0 0 3px rgba(99,102,241,0.3)',
            }}>
              {riderProfile.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>{riderProfile.name}</span>
                <Tag color="var(--green)" dot>Active</Tag>
                <Tag color="var(--blue)">{riderProfile.plan} Plan</Tag>
              </div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {[
                  { icon: <MapPin size={11} />, text: riderProfile.zone },
                  { icon: <Bike size={11} />, text: riderProfile.darkStore },
                  { icon: <Calendar size={11} />, text: `Enrolled ${riderProfile.enrolled}` },
                  { icon: <span className="mono" style={{ fontSize: 10 }}>#</span>, text: riderProfile.id },
                ].map((m, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                    {m.icon} {m.text}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, textAlign: 'center' }}>
              {[
                { label: 'Streak', value: `🔥 ${riderProfile.streakDays}d`, color: 'var(--yellow)' },
                { label: 'LAS Score', value: `${(riderProfile.lasScore * 100).toFixed(0)}%`, color: 'var(--green)' },
                { label: 'KYC', value: '✓ Verified', color: 'var(--green)' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid var(--border)' }}>
            {[
              { label: 'Weekly Premium', value: '₹35', sub: '0.78% of earnings', color: 'var(--blue)' },
              { label: 'Daily Payout', value: '₹450', sub: '70% income replacement', color: 'var(--green)' },
              { label: 'Total Received', value: `₹${riderProfile.totalPayouts.toLocaleString()}`, sub: `${riderProfile.claimsCount} claims`, color: 'var(--green)' },
              { label: 'Payout Speed', value: '<30 min', sub: 'From trigger confirmation', color: 'var(--yellow)' },
              { label: 'Days Enrolled', value: riderProfile.joinedDays, sub: 'Since Jan 6, 2025', color: 'var(--text-2)' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '14px 18px',
                borderRight: i < 4 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Earnings Chart + Cascading Loss ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
          <Card>
            <SectionTitle>
              Weekly Earnings — Normal vs. Actual + GigShield Recovery
              <Tag color="var(--blue)">12 Weeks</Tag>
            </SectionTitle>
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gProtected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(1)}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)', paddingTop: 8 }} />
                <Area type="monotone" dataKey="normal" name="Normal Earnings" stroke="#3b82f6" fill="url(#gNormal)" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
                <Area type="monotone" dataKey="actual" name="Actual Earnings" stroke="#ef4444" fill="url(#gActual)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="protected" name="After GigShield" stroke="#10b981" fill="url(#gProtected)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Cascading Loss */}
          <Card>
            <SectionTitle>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={13} color="var(--yellow)" /> Cascading Loss Scenario
              </span>
            </SectionTitle>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.5 }}>
              Heavy rain · Friday 4PM–10PM · 6 hours lost
            </div>

            {[
              { label: 'Orders (28 → 10)', normal: '₹500', disrupted: '₹180', loss: '-₹320' },
              { label: 'Daily Milestone', normal: '₹300', disrupted: '₹0', loss: '-₹300' },
              { label: 'Weekly Streak', normal: '₹600', disrupted: '₹0', loss: '-₹600' },
            ].map(r => (
              <div key={r.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                  <span style={{ color: 'var(--red)', fontWeight: 600 }}>{r.loss}</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--blue)', borderRadius: 2, opacity: 0.6 }} />
                  <div style={{ width: '30%', height: 4, background: 'var(--red)', borderRadius: 2 }} />
                </div>
              </div>
            ))}

            <Divider style={{ margin: '14px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Total Loss</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--red)' }}>−₹1,220</span>
            </div>
            <div style={{
              background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 8, padding: '10px 12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--green)', fontWeight: 600 }}>🛡️ GIGSHIELD PAYOUT</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Credited in &lt;30 min</div>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>+₹450</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
              Net loss reduced from <span style={{ color: 'var(--red)' }}>₹1,220</span> to <span style={{ color: 'var(--yellow)' }}>₹770</span> · 63% recovery
            </div>
          </Card>
        </div>

        {/* ── Protection Summary + Live Feed ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card>
            <SectionTitle>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <TrendingUp size={13} color="var(--green)" /> Protection Summary · 12 Weeks
              </span>
            </SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Total Premium Paid', value: `₹${totalPremium}`, color: 'var(--text-2)', bar: totalPremium, max: totalPaid + 200 },
                { label: 'Total Payouts Received', value: `₹${totalPaid.toLocaleString()}`, color: 'var(--green)', bar: totalPaid, max: totalPaid + 200 },
                { label: 'Net Benefit', value: `+₹${netBenefit.toLocaleString()}`, color: 'var(--green)' },
                { label: 'Disruption Events', value: `${disruptionWeeks} weeks`, color: 'var(--yellow)' },
                { label: 'Avg Payout per Event', value: `₹${Math.round(totalPaid / disruptionWeeks)}`, color: 'var(--blue)' },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: r.bar ? 5 : 0 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: r.color }}>{r.value}</span>
                  </div>
                  {r.bar && <ProgressBar value={r.bar} max={r.max} color={r.color} height={4} />}
                </div>
              ))}
            </div>
            <Divider style={{ margin: '14px 0' }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>Loss Ratio</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>55.6%</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Healthy range</div>
              </div>
              <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>ROI on Premium</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--blue)' }}>
                  {((totalPaid / totalPremium) * 100).toFixed(0)}%
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Payout / Premium</div>
              </div>
              <div style={{ flex: 1, background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>Avg Speed</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--yellow)' }}>19 min</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Trigger → UPI</div>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="live-dot" /> System Live Feed
              </span>
              <Tag color="var(--green)" dot>Live</Tag>
            </SectionTitle>
            <LiveFeed />
          </Card>
        </div>

      </div>
    </div>
  )
}
