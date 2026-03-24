import React, { useState } from 'react'
import {
  Zap, BarChart3, Eye, ThumbsUp, MessageSquare, Share2,
  Users, TrendingUp, AlertTriangle, CheckCircle, ArrowUpRight,
  Linkedin, Twitter, Youtube, Copy, CheckCheck, RefreshCw,
  Star, Target, Hash, BookOpen, Flame
} from 'lucide-react'
import { analyzeContent } from '../utils/grokApi'
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts'

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', Icon: Linkedin, color: '#0a66c2' },
  { id: 'twitter', label: 'X (Twitter)', Icon: Twitter, color: '#1d9bf0' },
  { id: 'youtube', label: 'YouTube', Icon: Youtube, color: '#ff0000' },
]

const gradeColor = (grade) => {
  if (grade?.startsWith('A')) return 'var(--accent-green)'
  if (grade?.startsWith('B')) return 'var(--accent-blue)'
  if (grade?.startsWith('C')) return 'var(--accent-orange)'
  return '#ef4444'
}

export default function ContentAnalyzer({ config }) {
  const [content, setContent] = useState('')
  const [platform, setPlatform] = useState('linkedin')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copiedOpt, setCopiedOpt] = useState(false)
  const [activePlatformTab, setActivePlatformTab] = useState('linkedin')

  const handleAnalyze = async () => {
    if (content.trim().length < 10) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await analyzeContent({
        content,
        platform,
        industry: config.industry,
        niche: config.niche,
        goals: config.goals,
      })
      setResult(res)
      setActivePlatformTab(platform)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const charCount = content.length
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  const platformLimits = { linkedin: 3000, twitter: 280, youtube: 5000 }
  const limit = platformLimits[platform]

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Content Analyser</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Paste your content and get AI-powered reach, engagement & performance predictions
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 20, alignItems: 'start' }}>
        {/* Input */}
        <div>
          {/* Platform selector */}
          <div className="glass-card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Target Platform</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {PLATFORMS.map(({ id, label, Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setPlatform(id)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 10, cursor: 'pointer',
                    background: platform === id ? `rgba(${color === '#0a66c2' ? '10,102,194' : color === '#ff0000' ? '255,0,0' : '29,155,240'},0.15)` : 'var(--bg-input)',
                    border: `1px solid ${platform === id ? color : 'var(--border)'}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, transition: 'all 0.2s',
                    boxShadow: platform === id ? `0 0 12px rgba(${color === '#0a66c2' ? '10,102,194' : color === '#ff0000' ? '255,0,0' : '29,155,240'},0.2)` : 'none'
                  }}
                >
                  <Icon size={18} color={platform === id ? color : 'var(--text-muted)'} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: platform === id ? color : 'var(--text-muted)' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="glass-card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Your Content</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 11, color: charCount > limit ? '#ef4444' : 'var(--text-muted)' }}>{charCount}/{limit} chars</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{wordCount} words</span>
              </div>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Paste your ${PLATFORMS.find(p => p.id === platform)?.label} content here...

Include:
• Your post/caption text
• Any hashtags
• CTAs
• Links (optional)

Tip: Include your full post for the most accurate analysis.`}
              rows={12}
              style={{
                width: '100%', padding: '12px', borderRadius: 8,
                background: 'var(--bg-input)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: 13, resize: 'vertical',
                lineHeight: 1.7, fontFamily: 'inherit', outline: 'none'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />

            {/* Character warning */}
            {charCount > limit && (
              <div style={{ display: 'flex', gap: 6, marginTop: 8, padding: '6px 10px', borderRadius: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <AlertTriangle size={12} color="#ef4444" style={{ marginTop: 1 }} />
                <span style={{ fontSize: 11, color: '#ef4444' }}>
                  Content exceeds {PLATFORMS.find(p => p.id === platform)?.label} limit by {charCount - limit} characters
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || content.trim().length < 10}
            style={{
              width: '100%', padding: '14px', borderRadius: 12, cursor: loading || content.trim().length < 10 ? 'not-allowed' : 'pointer',
              background: loading || content.trim().length < 10 ? 'var(--border)' : 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
              border: 'none', color: 'white', fontSize: 14, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: content.trim().length >= 10 && !loading ? '0 4px 30px var(--accent-blue-glow)' : 'none',
              opacity: content.trim().length < 10 ? 0.5 : 1, transition: 'all 0.2s'
            }}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Analysing with Grok AI...
              </>
            ) : (
              <>
                <Zap size={18} />
                Analyse Content Performance
              </>
            )}
          </button>

          {error && (
            <div style={{ marginTop: 12, padding: '12px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <AlertTriangle size={14} color="#ef4444" />
                <span style={{ fontSize: 12, color: '#ef4444' }}>{error}</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Score */}
            <div className="glass-card" style={{ padding: 22, textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 64, fontWeight: 900, color: gradeColor(result.grade), lineHeight: 1 }}>{result.grade}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{result.verdict}</div>
              </div>
              <div style={{ width: '100%', height: 8, borderRadius: 4, background: 'var(--border)', marginBottom: 16 }}>
                <div style={{ height: '100%', width: `${result.overallScore}%`, borderRadius: 4, background: `linear-gradient(90deg, var(--accent-blue), ${gradeColor(result.grade)})`, transition: 'width 1s ease' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {[
                  { p: 'linkedin', Icon: Linkedin, color: '#0a66c2', score: result.platformScore?.linkedin },
                  { p: 'twitter', Icon: Twitter, color: '#1d9bf0', score: result.platformScore?.twitter },
                  { p: 'youtube', Icon: Youtube, color: '#ff0000', score: result.platformScore?.youtube },
                ].map(({ p, Icon, color, score }) => (
                  <div key={p} style={{ padding: '10px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                    <Icon size={14} color={color} style={{ display: 'block', margin: '0 auto 4px' }} />
                    <div style={{ fontSize: 18, fontWeight: 800, color, textAlign: 'center' }}>{score || '–'}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center' }}>/100</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform predictions tabs */}
            <div className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Performance Predictions</h3>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {PLATFORMS.map(({ id, label, Icon, color }) => (
                  <button
                    key={id}
                    onClick={() => setActivePlatformTab(id)}
                    style={{
                      flex: 1, padding: '8px', borderRadius: 8, cursor: 'pointer',
                      background: activePlatformTab === id ? `rgba(${color === '#0a66c2' ? '10,102,194' : color === '#ff0000' ? '255,0,0' : '29,155,240'},0.15)` : 'var(--bg-input)',
                      border: `1px solid ${activePlatformTab === id ? color : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={12} color={activePlatformTab === id ? color : 'var(--text-muted)'} />
                    <span style={{ fontSize: 11, color: activePlatformTab === id ? color : 'var(--text-muted)' }}>{label}</span>
                  </button>
                ))}
              </div>

              {result.predictions && result.predictions[activePlatformTab] && (
                <div className="animate-fadeIn">
                  <PredictionGrid stats={result.predictions[activePlatformTab]} platform={activePlatformTab} />
                </div>
              )}
            </div>

            {/* Strengths & Weaknesses */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="glass-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                  <CheckCircle size={14} color="var(--accent-green)" />
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-green)' }}>Strengths</h3>
                </div>
                {(result.strengths || []).map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-green)', marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="glass-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
                  <AlertTriangle size={14} color="var(--accent-orange)" />
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-orange)' }}>Weaknesses</h3>
                </div>
                {(result.weaknesses || []).map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-orange)', marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Analysis */}
            {result.seoAnalysis && (
              <div className="glass-card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Content Quality Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
                  {[
                    { label: 'Readability', value: result.seoAnalysis.readabilityScore, color: 'var(--accent-blue)' },
                    { label: 'Sentiment', value: result.seoAnalysis.sentimentScore, color: 'var(--accent-purple)' },
                    { label: 'Hook Strength', value: result.seoAnalysis.hookStrength, color: 'var(--accent-orange)' },
                    { label: 'Overall Score', value: result.overallScore, color: 'var(--accent-green)' },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color }}>{value}/100</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${value || 0}%`, background: color, borderRadius: 2, transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {result.seoAnalysis.ctaPresent
                      ? <CheckCircle size={12} color="var(--accent-green)" />
                      : <AlertTriangle size={12} color="var(--accent-orange)" />}
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>CTA {result.seoAnalysis.ctaPresent ? 'Present' : 'Missing'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {result.seoAnalysis.optimalLength
                      ? <CheckCircle size={12} color="var(--accent-green)" />
                      : <AlertTriangle size={12} color="var(--accent-orange)" />}
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Length {result.seoAnalysis.optimalLength ? 'Optimal' : 'Needs Adjustment'}</span>
                  </div>
                </div>
                {result.seoAnalysis.keywordsFound?.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Keywords Found</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {result.seoAnalysis.keywordsFound.map((kw, i) => (
                        <span key={i} style={{ padding: '2px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 11, color: 'var(--accent-green)' }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
                {result.seoAnalysis.missingKeywords?.length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Missing Keywords</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {result.seoAnalysis.missingKeywords.map((kw, i) => (
                        <span key={i} style={{ padding: '2px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', fontSize: 11, color: '#f87171' }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Improvements */}
            {result.improvements?.length > 0 && (
              <div className="glass-card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Improvement Suggestions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {result.improvements.map((imp, i) => {
                    const impactColor = imp.impact === 'high' ? 'var(--accent-orange)' : imp.impact === 'medium' ? 'var(--accent-blue)' : 'var(--text-muted)'
                    return (
                      <div key={i} style={{ padding: '12px 14px', borderRadius: 10, background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>{imp.area}</span>
                          <span style={{ padding: '1px 8px', borderRadius: 999, background: `${impactColor}15`, fontSize: 9, fontWeight: 700, color: impactColor, textTransform: 'uppercase' }}>{imp.impact}</span>
                        </div>
                        <p style={{ fontSize: 11, color: '#ef4444', marginBottom: 4 }}>Issue: {imp.issue}</p>
                        <p style={{ fontSize: 11, color: 'var(--accent-green)' }}>Fix: {imp.suggestion}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Suggested Hashtags */}
            {result.suggestedHashtags && (
              <div className="glass-card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Suggested Hashtags</h3>
                {Object.entries(result.suggestedHashtags).map(([platform, tags]) => {
                  const icons = { linkedin: Linkedin, twitter: Twitter, youtube: Youtube }
                  const colors = { linkedin: '#0a66c2', twitter: '#1d9bf0', youtube: '#ff0000' }
                  const Icon = icons[platform]
                  return (
                    <div key={platform} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        {Icon && <Icon size={12} color={colors[platform]} />}
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{platform}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(tags || []).map((tag, i) => (
                          <span key={i} style={{ padding: '3px 10px', borderRadius: 8, background: `rgba(${colors[platform] === '#0a66c2' ? '10,102,194' : colors[platform] === '#ff0000' ? '255,0,0' : '29,155,240'},0.1)`, border: `1px solid ${colors[platform]}30`, fontSize: 11, color: colors[platform] }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Optimized version */}
            {result.optimizedVersion && (
              <div className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Flame size={15} color="var(--accent-orange)" />
                    Optimised Version
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.optimizedVersion)
                      setCopiedOpt(true)
                      setTimeout(() => setCopiedOpt(false), 2000)
                    }}
                    style={{ padding: '5px 12px', borderRadius: 8, cursor: 'pointer', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: 'var(--accent-blue)', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    {copiedOpt ? <CheckCheck size={12} /> : <Copy size={12} />}
                    {copiedOpt ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div style={{ padding: '14px', borderRadius: 10, background: 'var(--bg-input)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {result.optimizedVersion}
                </div>
                <button
                  onClick={() => setContent(result.optimizedVersion)}
                  style={{ marginTop: 10, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: 'var(--accent-green)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <RefreshCw size={12} />
                  Use this & Re-analyse
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function PredictionGrid({ stats, platform }) {
  const icons = {
    reach: Eye, impressions: BarChart3, likes: ThumbsUp,
    comments: MessageSquare, shares: Share2, retweets: Share2,
    replies: MessageSquare, followers: Users, subscribers: Users,
    views: Eye, watchTimeMinutes: BookOpen, linkClicks: ArrowUpRight,
    profileVisits: Users, viralProbability: Flame, ctr: Target,
  }

  const colors = {
    reach: 'var(--accent-blue)', impressions: 'var(--accent-purple)',
    likes: '#ec4899', comments: 'var(--accent-orange)', shares: 'var(--accent-cyan)',
    retweets: 'var(--accent-cyan)', replies: 'var(--accent-orange)',
    viralProbability: 'var(--accent-orange)', engagementRate: 'var(--accent-green)',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
      {Object.entries(stats).map(([key, val]) => {
        const Icon = icons[key] || BarChart3
        const color = colors[key] || 'var(--accent-green)'
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
        return (
          <div key={key} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            <Icon size={13} color={color} style={{ display: 'block', marginBottom: 5 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 2 }}>{val}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
          </div>
        )
      })}
    </div>
  )
}
