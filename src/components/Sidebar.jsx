import React from 'react'
import {
  LayoutDashboard, FileText, Zap, Shield, Brain, Users,
  ChevronRight, Bell, Settings, LogOut,
} from 'lucide-react'
import { riderProfile } from '../data/mockData.js'

const navItems = [
  { id: 'overview',  label: 'Overview',       icon: LayoutDashboard, badge: null },
  { id: 'policy',    label: 'My Policy',       icon: FileText,        badge: null },
  { id: 'triggers',  label: 'Live Triggers',   icon: Zap,             badge: '1 ALERT', badgeColor: '#f59e0b' },
  { id: 'claims',    label: 'Claims',          icon: Shield,          badge: '1 Review', badgeColor: '#ef4444' },
  { id: 'fraud',     label: 'Fraud Engine',    icon: Brain,           badge: null },
  { id: 'pool',      label: 'Risk Pool',       icon: Users,           badge: null },
]

export default function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      width: 232,
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
            flexShrink: 0,
          }}>
            <Shield size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              GigShield
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
              Parametric Insurance
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 8px 4px' }}>
          Navigation
        </div>
        {navItems.map(({ id, label, icon: Icon, badge, badgeColor }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 10px', borderRadius: 9,
                border: 'none', cursor: 'pointer',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(99,102,241,0.12))'
                  : 'transparent',
                color: isActive ? 'var(--blue-bright)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13, width: '100%', textAlign: 'left',
                transition: 'all 0.15s',
                borderLeft: isActive ? '2px solid var(--blue)' : '2px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)'; e.currentTarget.style.color = 'var(--text-2)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; if (!isActive) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 10,
                  background: `${badgeColor}25`, color: badgeColor, border: `1px solid ${badgeColor}40`,
                }}>
                  {badge}
                </span>
              )}
              {isActive && !badge && <ChevronRight size={12} />}
            </button>
          )
        })}
      </nav>

      {/* Policy Status */}
      <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 10, padding: '10px 12px', marginBottom: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700, letterSpacing: '0.06em' }}>
              POLICY ACTIVE
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>Standard · ₹35/week</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
            Coverage: Mon–Sun · UPI Autopay
          </div>
        </div>

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 4px' }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {riderProfile.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {riderProfile.name}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{riderProfile.id}</div>
          </div>
          <Settings size={13} color="var(--text-muted)" style={{ cursor: 'pointer', flexShrink: 0 }} />
        </div>
      </div>
    </aside>
  )
}
