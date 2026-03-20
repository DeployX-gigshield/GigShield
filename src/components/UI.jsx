import React from 'react'

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`animate-in ${className}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.01em' }}>
        {children}
      </div>
      {action}
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub, delta, accent = 'var(--blue)', icon, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '18px 20px',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* subtle accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accent}, transparent)`,
      }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {label}
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: accent, lineHeight: 1, letterSpacing: '-0.02em' }}>
            {value}
          </div>
          {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5 }}>{sub}</div>}
          {delta !== undefined && (
            <div style={{ fontSize: 11, marginTop: 4, color: delta >= 0 ? 'var(--green)' : 'var(--red)' }}>
              {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}% vs last week
            </div>
          )}
        </div>
        {icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `${accent}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Badge / Tag ───────────────────────────────────────────────────────────────
export function Tag({ children, color = 'var(--blue)', bg, dot = false }) {
  const bgColor = bg || `${color}20`
  return (
    <span className="tag" style={{ color, background: bgColor, border: `1px solid ${color}30` }}>
      {dot && <span className="live-dot" style={{ background: color, width: 5, height: 5 }} />}
      {children}
    </span>
  )
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = 'var(--blue)', height = 6, showLabel = false }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, color: 'var(--text-muted)' }}>
          <span>{value}</span><span>{max}</span>
        </div>
      )}
      <div style={{ height, background: 'var(--surface3)', borderRadius: height, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: height,
          background: color, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

// ── Progress Ring ─────────────────────────────────────────────────────────────
export function ProgressRing({ value, max = 100, size = 80, stroke = 7, color = 'var(--blue)', children }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const offset = circ * (1 - pct)
  return (
    <div className="ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="ring-bg" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
        <circle
          className="ring-fill"
          cx={size / 2} cy={size / 2} r={r}
          strokeWidth={stroke}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>{children}</div>
    </div>
  )
}

// ── Tooltip wrapper ───────────────────────────────────────────────────────────
export function ChartTooltip({ active, payload, label, prefix = '₹' }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--surface2)', border: '1px solid var(--border2)',
      borderRadius: 10, padding: '10px 14px', fontSize: 12,
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-2)' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          <span style={{ color: 'var(--text-muted)' }}>{p.name}:</span>
          <span style={{ fontWeight: 600, color: 'var(--text)' }}>{prefix}{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider({ style = {} }) {
  return <div style={{ height: 1, background: 'var(--border)', ...style }} />
}

// ── Empty State ───────────────────────────────────────────────────────────────
export function EmptyState({ icon = '📭', message }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 13 }}>{message}</div>
    </div>
  )
}
