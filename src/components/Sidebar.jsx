import React from 'react'
import {
  Sparkles, LayoutDashboard, TrendingUp, FileText,
  Zap, ChevronLeft, Settings
} from 'lucide-react'

const NAV = [
  { id: 'setup', label: 'Setup', icon: Settings, step: 0 },
  { id: 'trends', label: 'Trend Analysis', icon: TrendingUp, step: 1 },
  { id: 'strategy', label: 'Content Strategy', icon: FileText, step: 2 },
  { id: 'analyzer', label: 'Content Analyser', icon: Zap, step: 3 },
]

export default function Sidebar({ currentStep, onNavigate, config, collapsed, onToggle }) {
  return (
    <aside style={{
      width: collapsed ? 60 : 220,
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0, top: 0,
      transition: 'width 0.3s ease',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '18px 0' : '18px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 15px var(--accent-blue-glow)'
        }}>
          <Sparkles size={16} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.3px' }} className="gradient-text">SocialIQ</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 500 }}>Marketing Intelligence</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV.map(({ id, label, icon: Icon, step }) => {
          const active = currentStep === step
          const reachable = step === 0 || (step === 1 && currentStep >= 1) || (step === 2 && currentStep >= 2) || (step === 3 && currentStep >= 1)
          const clickable = reachable && currentStep >= step

          return (
            <button
              key={id}
              onClick={() => clickable && onNavigate(step)}
              title={collapsed ? label : undefined}
              style={{
                padding: collapsed ? '10px 0' : '10px 12px',
                borderRadius: 10, cursor: clickable ? 'pointer' : 'default',
                background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                border: `1px solid ${active ? 'rgba(59,130,246,0.3)' : 'transparent'}`,
                color: active ? 'var(--accent-blue)' : clickable ? 'var(--text-secondary)' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: 'all 0.2s', opacity: clickable ? 1 : 0.4,
                boxShadow: active ? '0 0 10px var(--accent-blue-glow)' : 'none'
              }}
            >
              <Icon size={16} color={active ? 'var(--accent-blue)' : undefined} />
              {!collapsed && <span style={{ fontSize: 13, fontWeight: active ? 600 : 400 }}>{label}</span>}
              {!collapsed && active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-blue)', marginLeft: 'auto', boxShadow: '0 0 6px var(--accent-blue)' }} />}
            </button>
          )
        })}
      </nav>

      {/* Config info */}
      {!collapsed && config && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Current Setup</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{config.industry}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{config.niche}</div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          padding: '12px', borderTop: '1px solid var(--border)', background: 'none', border: 'none',
          cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-end', paddingRight: collapsed ? undefined : 16,
          transition: 'all 0.2s'
        }}
      >
        <ChevronLeft size={16} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
      </button>
    </aside>
  )
}
