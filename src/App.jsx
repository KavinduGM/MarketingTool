import React, { useState } from 'react'
import SetupPanel from './components/SetupPanel'
import TrendDashboard from './components/TrendDashboard'
import ContentStrategy from './components/ContentStrategy'
import ContentAnalyzer from './components/ContentAnalyzer'
import Sidebar from './components/Sidebar'
import LoadingScreen from './components/LoadingScreen'
import { analyzeTrends, generateContentSuggestions } from './utils/grokApi'
import { AlertTriangle, RefreshCw } from 'lucide-react'

// Steps: 0=setup, 1=trends, 2=strategy, 3=analyzer
export default function App() {
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState(null)
  const [trendsData, setTrendsData] = useState(null)
  const [strategyData, setStrategyData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingLabel, setLoadingLabel] = useState('')
  const [error, setError] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const SIDEBAR_W = sidebarCollapsed ? 60 : 220

  const handleSetupSubmit = async (cfg) => {
    setConfig(cfg)
    setLoading(true)
    setLoadingLabel('Analysing industry trends with Grok AI')
    setError(null)
    try {
      const trends = await analyzeTrends(cfg)
      setTrendsData(trends)
      setStep(1)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTrendsNext = async () => {
    if (strategyData) { setStep(2); return }
    setLoading(true)
    setLoadingLabel('Generating content strategy with Grok AI')
    setError(null)
    try {
      const strategy = await generateContentSuggestions({
        ...config,
        trendingTopics: trendsData?.trendingTopics || [],
      })
      setStrategyData(strategy)
      setStep(2)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStrategyNext = () => setStep(3)

  const handleNavigate = (targetStep) => {
    if (targetStep === 0) { setStep(0); return }
    if (targetStep <= step) setStep(targetStep)
  }

  const handleReset = () => {
    setStep(0)
    setConfig(null)
    setTrendsData(null)
    setStrategyData(null)
    setError(null)
  }

  if (loading) {
    return (
      <div style={{ marginLeft: step === 0 ? 0 : SIDEBAR_W, transition: 'margin-left 0.3s' }}>
        <LoadingScreen label={loadingLabel} />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="glass-card" style={{ padding: 32, maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <AlertTriangle size={40} color="#ef4444" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Analysis Failed</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>{error}</p>
          <button
            onClick={() => setError(null)}
            style={{
              padding: '10px 24px', borderRadius: 10, cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
              border: 'none', color: 'white', fontSize: 13, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}
          >
            <RefreshCw size={14} /> Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar — only show after setup */}
      {step > 0 && (
        <Sidebar
          currentStep={step}
          onNavigate={handleNavigate}
          config={config}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(c => !c)}
        />
      )}

      {/* Main content */}
      <main style={{
        flex: 1,
        marginLeft: step > 0 ? SIDEBAR_W : 0,
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        transition: 'margin-left 0.3s ease',
        position: 'relative'
      }}>
        {/* Top bar (only after setup) */}
        {step > 0 && (
          <div style={{
            position: 'sticky', top: 0, zIndex: 50,
            background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)',
            padding: '12px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {config?.industry} · {config?.niche}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Step pills */}
              {[
                { label: 'Trends', s: 1 }, { label: 'Strategy', s: 2 }, { label: 'Analyser', s: 3 }
              ].map(({ label, s }) => (
                <button
                  key={s}
                  onClick={() => s <= step && handleNavigate(s)}
                  style={{
                    padding: '5px 14px', borderRadius: 999, cursor: s <= step ? 'pointer' : 'default',
                    background: step === s ? 'rgba(59,130,246,0.15)' : 'transparent',
                    border: `1px solid ${step === s ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
                    color: step === s ? 'var(--accent-blue)' : s <= step ? 'var(--text-secondary)' : 'var(--text-muted)',
                    fontSize: 12, fontWeight: step === s ? 600 : 400,
                    opacity: s <= step ? 1 : 0.4, transition: 'all 0.2s'
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={handleReset}
                style={{
                  padding: '5px 14px', borderRadius: 999, cursor: 'pointer',
                  background: 'transparent', border: '1px solid var(--border)',
                  color: 'var(--text-muted)', fontSize: 12,
                  display: 'flex', alignItems: 'center', gap: 5
                }}
              >
                <RefreshCw size={11} /> New Analysis
              </button>
            </div>
          </div>
        )}

        {/* Views */}
        {step === 0 && <SetupPanel onSubmit={handleSetupSubmit} />}
        {step === 1 && trendsData && (
          <TrendDashboard
            data={trendsData}
            config={config}
            onNext={handleTrendsNext}
          />
        )}
        {step === 2 && strategyData && (
          <ContentStrategy
            data={strategyData}
            config={config}
            onNext={handleStrategyNext}
          />
        )}
        {step === 3 && (
          <ContentAnalyzer config={config} />
        )}
      </main>
    </div>
  )
}
