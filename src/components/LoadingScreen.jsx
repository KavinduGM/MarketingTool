import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const MESSAGES = [
  'Connecting to Grok AI...',
  'Scanning industry trends...',
  'Analysing social media patterns...',
  'Identifying trending topics...',
  'Predicting future trends...',
  'Researching content formats...',
  'Analysing audience behaviour...',
  'Generating insights...',
  'Preparing your dashboard...',
]

export default function LoadingScreen({ label }) {
  const [msgIdx, setMsgIdx] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length)
    }, 1200)

    const progressTimer = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 8, 92))
    }, 400)

    return () => {
      clearInterval(msgTimer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 24, padding: 24
    }}>
      {/* Animated logo */}
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse-glow 2s ease infinite',
          boxShadow: '0 0 40px var(--accent-blue-glow)'
        }}>
          <Sparkles size={36} color="white" />
        </div>
        {/* Orbiting dot */}
        <div style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'var(--accent-blue)',
          animation: 'spin 1.5s linear infinite'
        }} />
      </div>

      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{label || 'Analysing with Grok AI'}</h2>
        <p style={{ fontSize: 14, color: 'var(--accent-blue)', fontWeight: 500, height: 22, transition: 'all 0.3s' }}>
          {MESSAGES[msgIdx]}
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 320, height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3, transition: 'width 0.4s ease',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
          boxShadow: '0 0 10px var(--accent-blue-glow)'
        }} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{Math.round(progress)}% complete</div>

      {/* Floating tags */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 400 }}>
        {['Trending Topics', 'Audience Analysis', 'Content Formats', 'Keyword Mining', 'Performance Metrics', 'Hashtag Strategy'].map((tag, i) => (
          <span key={tag} style={{
            padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            color: 'var(--accent-blue)',
            animation: `fadeIn 0.5s ease ${i * 0.2}s both`
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
