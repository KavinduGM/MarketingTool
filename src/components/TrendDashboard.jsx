import React, { useState } from 'react'
import {
  TrendingUp, TrendingDown, Zap, Clock, BarChart3, Eye,
  Users, Globe, Linkedin, Twitter, Youtube, ChevronRight,
  ArrowUpRight, Flame, Calendar, AlertCircle, Activity,
  Target, MessageSquare
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts'

const PLATFORM_ICONS = { LinkedIn: Linkedin, X: Twitter, Twitter, YouTube: Youtube }
const PLATFORM_COLORS = { LinkedIn: '#0a66c2', X: '#1d9bf0', Twitter: '#1d9bf0', YouTube: '#ff0000' }

const statusColor = {
  trending: 'var(--accent-orange)',
  peak: 'var(--accent-pink)',
  rising: 'var(--accent-green)',
  declining: '#94a3b8',
}

const statusBg = {
  trending: 'rgba(245,158,11,0.15)',
  peak: 'rgba(236,72,153,0.15)',
  rising: 'rgba(16,185,129,0.15)',
  declining: 'rgba(148,163,184,0.1)',
}

export default function TrendDashboard({ data, config, onNext }) {
  const [activeTab, setActiveTab] = useState('trending')

  if (!data) return null

  const { industryOverview, trendingTopics = [], predictedTopics = [], contentTypes = [],
    audienceInsights, volumePredictions, currentSocialTrends = [], sampleContents = [] } = data

  // Mock chart data
  const engagementData = [
    { day: 'Mon', linkedin: 65, twitter: 45, youtube: 30 },
    { day: 'Tue', linkedin: 72, twitter: 58, youtube: 42 },
    { day: 'Wed', linkedin: 88, twitter: 62, youtube: 38 },
    { day: 'Thu', linkedin: 75, twitter: 70, youtube: 55 },
    { day: 'Fri', linkedin: 95, twitter: 80, youtube: 48 },
    { day: 'Sat', linkedin: 45, twitter: 55, youtube: 72 },
    { day: 'Sun', linkedin: 40, twitter: 50, youtube: 80 },
  ]

  const trendVolumeData = trendingTopics.slice(0, 6).map(t => ({
    name: t.topic.length > 18 ? t.topic.slice(0, 18) + '…' : t.topic,
    volume: parseInt(t.volume) || Math.floor(Math.random() * 5000) + 1000,
    score: t.relevanceScore || 70,
  }))

  const radarData = [
    { subject: 'Reach', value: industryOverview?.sentimentScore || 70 },
    { subject: 'Engagement', value: 68 },
    { subject: 'Virality', value: 55 },
    { subject: 'Authority', value: 72 },
    { subject: 'Relevance', value: 80 },
    { subject: 'Timing', value: 65 },
  ]

  return (
    <div style={{ padding: '24px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.5px' }}>
              Trend Intelligence Report
            </h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', fontSize: 11, color: 'var(--accent-blue)' }}>
                {config.industry}
              </span>
              <span style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', fontSize: 11, color: 'var(--accent-purple)' }}>
                {config.niche}
              </span>
              <span style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', fontSize: 11, color: 'var(--accent-green)' }}>
                Grok AI Analysis
              </span>
            </div>
          </div>
          <button
            onClick={onNext}
            style={{
              padding: '10px 22px', borderRadius: 10, cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
              border: 'none', color: 'white', fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 20px var(--accent-blue-glow)'
            }}
          >
            Content Strategy <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Industry overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        <StatCard
          icon={<Activity size={18} color="var(--accent-blue)" />}
          label="Market Sentiment"
          value={industryOverview?.marketSentiment?.toUpperCase() || 'POSITIVE'}
          sub={`Score: ${industryOverview?.sentimentScore || 74}/100`}
          accent="var(--accent-blue)"
        />
        <StatCard
          icon={<Flame size={18} color="var(--accent-orange)" />}
          label="Trending Topics"
          value={trendingTopics.length}
          sub="Active right now"
          accent="var(--accent-orange)"
        />
        <StatCard
          icon={<Calendar size={18} color="var(--accent-purple)" />}
          label="Predicted Topics"
          value={predictedTopics.length}
          sub="Next 2–4 weeks"
          accent="var(--accent-purple)"
        />
        <StatCard
          icon={<Globe size={18} color="var(--accent-green)" />}
          label="Content Formats"
          value={contentTypes.length}
          sub="Analysed types"
          accent="var(--accent-green)"
        />
      </div>

      {/* Key insight */}
      {industryOverview?.keyInsight && (
        <div style={{
          padding: '14px 18px', borderRadius: 12, marginBottom: 24,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
          border: '1px solid rgba(59,130,246,0.25)',
          display: 'flex', gap: 12, alignItems: 'flex-start'
        }}>
          <Zap size={16} color="var(--accent-blue)" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: 1 }}>Key Insight</span>
            <p style={{ fontSize: 13, color: 'var(--text-primary)', marginTop: 4 }}>{industryOverview.keyInsight}</p>
          </div>
        </div>
      )}

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="glass-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)' }}>WEEKLY ENGAGEMENT PATTERN</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="linkedin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0a66c2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="twitter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d9bf0" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1d9bf0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="youtube" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff0000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Area type="monotone" dataKey="linkedin" stroke="#0a66c2" fill="url(#linkedin)" strokeWidth={2} />
              <Area type="monotone" dataKey="twitter" stroke="#1d9bf0" fill="url(#twitter)" strokeWidth={2} />
              <Area type="monotone" dataKey="youtube" stroke="#ff0000" fill="url(#youtube)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            {[['#0a66c2', 'LinkedIn'], ['#1d9bf0', 'X'], ['#ff0000', 'YouTube']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)' }}>CONTENT PERFORMANCE RADAR</h3>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#475569' }} />
              <Radar name="Score" dataKey="value" stroke="var(--accent-blue)" fill="var(--accent-blue)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {[
          { id: 'trending', label: 'Trending Now', icon: Flame },
          { id: 'predicted', label: 'Predicted Topics', icon: Calendar },
          { id: 'content', label: 'Content Types', icon: BarChart3 },
          { id: 'social', label: 'Social Trends', icon: TrendingUp },
          { id: 'samples', label: 'Sample Content', icon: MessageSquare },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              padding: '10px 16px', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontSize: 13,
              background: activeTab === id ? 'var(--bg-card)' : 'transparent',
              border: activeTab === id ? '1px solid var(--border)' : '1px solid transparent',
              borderBottom: activeTab === id ? '1px solid var(--bg-card)' : '1px solid transparent',
              color: activeTab === id ? 'var(--accent-blue)' : 'var(--text-muted)',
              fontWeight: activeTab === id ? 600 : 400,
              display: 'flex', alignItems: 'center', gap: 6, marginBottom: -1,
              transition: 'all 0.2s'
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Trending Now */}
      {activeTab === 'trending' && (
        <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {trendingTopics.map((topic, i) => (
            <div key={i} className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: statusBg[topic.status] || 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: statusColor[topic.status] || 'var(--text-muted)' }}>#{i + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700 }}>{topic.topic}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600, background: statusBg[topic.status], color: statusColor[topic.status] }}>
                    {topic.status?.toUpperCase()}
                  </span>
                  {(topic.platforms || []).map(p => {
                    const Icon = PLATFORM_ICONS[p]
                    return Icon ? <Icon key={p} size={13} color={PLATFORM_COLORS[p]} /> : null
                  })}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{topic.description}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{topic.growth}</span>
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    ~{topic.volume?.toLocaleString()} mentions/week
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Relevance: <span style={{ color: 'var(--accent-blue)' }}>{topic.relevanceScore}/100</span>
                  </span>
                </div>
              </div>
              <div style={{ width: 60 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textAlign: 'right' }}>Score</div>
                <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${topic.relevanceScore || 70}%`, background: `linear-gradient(90deg, var(--accent-blue), var(--accent-purple))`, borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)', textAlign: 'right', marginTop: 2 }}>
                  {topic.relevanceScore || 70}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Predicted Topics */}
      {activeTab === 'predicted' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {predictedTopics.map((topic, i) => (
            <div key={i} className="glass-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, flex: 1, marginRight: 8 }}>{topic.topic}</h3>
                <div style={{
                  padding: '3px 10px', borderRadius: 999,
                  background: `rgba(139,92,246,${(topic.confidence || 70) / 200})`,
                  border: '1px solid rgba(139,92,246,0.3)',
                  fontSize: 11, color: 'var(--accent-purple)', fontWeight: 700, flexShrink: 0
                }}>
                  {topic.confidence || 70}%
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <Clock size={11} color="var(--accent-orange)" />
                <span style={{ fontSize: 11, color: 'var(--accent-orange)', fontWeight: 500 }}>{topic.expectedPeak}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{topic.reason}</p>
              <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span style={{ fontSize: 11, color: 'var(--accent-green)', fontWeight: 600 }}>Opportunity: </span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{topic.opportunity}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {(topic.platforms || []).map(p => {
                  const Icon = PLATFORM_ICONS[p]
                  return Icon ? (
                    <span key={p} style={{ padding: '3px 8px', borderRadius: 6, background: `rgba(${p === 'LinkedIn' ? '10,102,194' : p === 'YouTube' ? '255,0,0' : '29,155,240'},0.12)`, border: `1px solid rgba(${p === 'LinkedIn' ? '10,102,194' : p === 'YouTube' ? '255,0,0' : '29,155,240'},0.3)`, display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
                      <Icon size={10} color={PLATFORM_COLORS[p]} />
                      <span style={{ color: 'var(--text-secondary)' }}>{p}</span>
                    </span>
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Content Types */}
      {activeTab === 'content' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {contentTypes.map((ct, i) => (
            <div key={i} className="glass-card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700 }}>{ct.type}</h3>
                <span style={{
                  padding: '3px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600,
                  background: ct.trend === 'rising' ? 'rgba(16,185,129,0.15)' : ct.trend === 'stable' ? 'rgba(59,130,246,0.15)' : 'rgba(148,163,184,0.1)',
                  color: ct.trend === 'rising' ? 'var(--accent-green)' : ct.trend === 'stable' ? 'var(--accent-blue)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', gap: 4
                }}>
                  {ct.trend === 'rising' ? <TrendingUp size={9} /> : ct.trend === 'declining' ? <TrendingDown size={9} /> : null}
                  {ct.trend?.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                {(ct.bestFor || []).map(p => {
                  const Icon = PLATFORM_ICONS[p]
                  return Icon ? <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--text-secondary)' }}><Icon size={10} color={PLATFORM_COLORS[p]} />{p}</span> : null
                })}
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Avg Engagement</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{ct.engagement}</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>{ct.tip}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Social Trends */}
      {activeTab === 'social' && (
        <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Audience insights */}
          {audienceInsights && (
            <div className="glass-card" style={{ padding: 20, marginBottom: 4 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Audience Insights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <div>
                  <h4 style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Peak Engagement Times</h4>
                  {Object.entries(audienceInsights.peakEngagementTimes || {}).map(([platform, time]) => {
                    const icons = { linkedin: Linkedin, twitter: Twitter, youtube: Youtube }
                    const Icon = icons[platform]
                    const colors = { linkedin: '#0a66c2', twitter: '#1d9bf0', youtube: '#ff0000' }
                    return (
                      <div key={platform} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        {Icon && <Icon size={13} color={colors[platform]} />}
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{time}</span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <h4 style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Pain Points</h4>
                  {(audienceInsights.audiencePainPoints || []).map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                      <AlertCircle size={12} color="var(--accent-orange)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Content Preferences</h4>
                  {(audienceInsights.contentPreferences || []).map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                      <ArrowUpRight size={12} color="var(--accent-blue)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Volume predictions */}
          {volumePredictions && (
            <div className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Volume Predictions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
                {Object.entries(volumePredictions).map(([platform, stats]) => {
                  const icons = { linkedin: Linkedin, twitter: Twitter, youtube: Youtube }
                  const colors = { linkedin: '#0a66c2', twitter: '#1d9bf0', youtube: '#ff0000' }
                  const Icon = icons[platform]
                  return (
                    <div key={platform} style={{ padding: 16, borderRadius: 10, background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                        {Icon && <Icon size={16} color={colors[platform]} />}
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{platform}</span>
                      </div>
                      {Object.entries(stats).map(([key, val]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-green)' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Social trends */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {currentSocialTrends.map((t, i) => (
              <div key={i} className="glass-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <TrendingUp size={14} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <h3 style={{ fontSize: 13, fontWeight: 700 }}>{t.trend}</h3>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{t.description}</p>
                <p style={{ fontSize: 12, color: 'var(--accent-green)' }}>{t.applicability}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Sample Content */}
      {activeTab === 'samples' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {sampleContents.map((s, i) => {
            const Icon = PLATFORM_ICONS[s.platform]
            const color = PLATFORM_COLORS[s.platform]
            return (
              <div key={i} className="glass-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {Icon && <Icon size={15} color={color} />}
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{s.platform}</span>
                  </div>
                  <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--bg-input)', border: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)' }}>
                    {s.type}
                  </span>
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, fontStyle: 'italic' }}>{s.preview}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Est. Reach</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{s.estimatedReach}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Engagement</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-green)' }}>{s.engagementRate}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Bottom CTA */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button
          onClick={onNext}
          style={{
            padding: '14px 40px', borderRadius: 12, cursor: 'pointer',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            border: 'none', color: 'white', fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            boxShadow: '0 4px 30px var(--accent-blue-glow)'
          }}
        >
          Generate Content Strategy →
        </button>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="glass-card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `rgba(${accent === 'var(--accent-blue)' ? '59,130,246' : accent === 'var(--accent-orange)' ? '245,158,11' : accent === 'var(--accent-purple)' ? '139,92,246' : '16,185,129'},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: accent }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
    </div>
  )
}
