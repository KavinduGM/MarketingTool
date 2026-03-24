import React, { useState } from 'react'
import {
  Lightbulb, Hash, Search, Calendar, Copy, CheckCheck,
  ChevronRight, Linkedin, Twitter, Youtube, Tag,
  TrendingUp, Star, Clock, Target, ArrowRight
} from 'lucide-react'

const PLATFORM_ICONS = { LinkedIn: Linkedin, X: Twitter, Twitter, YouTube: Youtube }
const PLATFORM_COLORS = { LinkedIn: '#0a66c2', X: '#1d9bf0', Twitter: '#1d9bf0', YouTube: '#ff0000' }
const TYPE_COLORS = {
  Article: '#3b82f6', Thread: '#1d9bf0', Video: '#ff0000', Carousel: '#8b5cf6',
  Reel: '#ec4899', Short: '#f59e0b', 'Case Study': '#10b981', Podcast: '#06b6d4'
}

export default function ContentStrategy({ data, config, onNext }) {
  const [activeTab, setActiveTab] = useState('ideas')
  const [copiedId, setCopiedId] = useState(null)
  const [selectedIdea, setSelectedIdea] = useState(null)

  if (!data) return null

  const { contentIdeas = [], keywordBank = {}, hashtagStrategy = {}, contentCalendar = [] } = data

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Content Strategy</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              AI-generated ideas, keywords & hashtags for {config.industry} / {config.niche}
            </p>
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
            Analyse Content <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Content Ideas', value: contentIdeas.length, icon: Lightbulb, color: 'var(--accent-orange)' },
          { label: 'Keywords', value: (keywordBank.primary?.length || 0) + (keywordBank.secondary?.length || 0), icon: Search, color: 'var(--accent-blue)' },
          { label: 'Hashtags', value: Object.values(hashtagStrategy).reduce((a, p) => a + Object.values(p).flat().length, 0), icon: Hash, color: 'var(--accent-purple)' },
          { label: 'Calendar Weeks', value: contentCalendar.length, icon: Calendar, color: 'var(--accent-green)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon size={20} color={color} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {[
          { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
          { id: 'keywords', label: 'Keywords', icon: Search },
          { id: 'hashtags', label: 'Hashtags', icon: Hash },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
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

      {/* Tab: Content Ideas */}
      {activeTab === 'ideas' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: selectedIdea ? '1fr 380px' : '1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {contentIdeas.map((idea, i) => {
              const PIcon = PLATFORM_ICONS[idea.platform]
              const pColor = PLATFORM_COLORS[idea.platform]
              const tColor = TYPE_COLORS[idea.contentType] || 'var(--accent-blue)'
              const isSelected = selectedIdea?.id === idea.id

              return (
                <button
                  key={i}
                  onClick={() => setSelectedIdea(isSelected ? null : idea)}
                  style={{
                    padding: '18px 20px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    background: isSelected ? 'rgba(59,130,246,0.08)' : 'var(--bg-card)',
                    border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border)'}`,
                    transition: 'all 0.2s', width: '100%',
                    boxShadow: isSelected ? '0 0 20px var(--accent-blue-glow)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      {PIcon && <PIcon size={14} color={pColor} />}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{idea.platform}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 999, background: `${tColor}20`, border: `1px solid ${tColor}50`, fontSize: 10, fontWeight: 600, color: tColor }}>
                        {idea.contentType}
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{idea.bestTimeToPost}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Star size={11} color="var(--accent-orange)" fill="var(--accent-orange)" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-orange)' }}>{idea.engagementScore}/100</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{idea.title}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{idea.angle}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {(idea.hashtags || []).slice(0, 3).map((tag, j) => (
                        <span key={j} style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--bg-input)', border: '1px solid var(--border)', fontSize: 10, color: 'var(--accent-blue)' }}>
                          {tag}
                        </span>
                      ))}
                      {(idea.hashtags || []).length > 3 && (
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>+{idea.hashtags.length - 3} more</span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      Reach: <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{idea.estimatedReach}</span>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          {selectedIdea && (
            <div className="glass-card animate-fadeIn" style={{ padding: 22, position: 'sticky', top: 80, height: 'fit-content', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, flex: 1, marginRight: 8 }}>{selectedIdea.title}</h3>
                <button onClick={() => setSelectedIdea(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                <Target size={11} style={{ display: 'inline', marginRight: 4 }} />
                {selectedIdea.whyItWorks}
              </div>

              {/* Outline */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Content Outline</h4>
                {(selectedIdea.outline || []).map((pt, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Keywords */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Keywords</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(selectedIdea.keywords || []).map((kw, i) => (
                    <span key={i} style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', fontSize: 11, color: 'var(--accent-blue)' }}>{kw}</span>
                  ))}
                </div>
              </div>

              {/* Hashtags */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h4 style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hashtags</h4>
                  <button
                    onClick={() => copyText((selectedIdea.hashtags || []).join(' '), `ht-${selectedIdea.id}`)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}
                  >
                    {copiedId === `ht-${selectedIdea.id}` ? <CheckCheck size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                    Copy all
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(selectedIdea.hashtags || []).map((tag, i) => (
                    <span key={i} style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', fontSize: 11, color: 'var(--accent-purple)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-green)', textTransform: 'uppercase', marginBottom: 4 }}>Call to Action</div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedIdea.callToAction}</p>
              </div>

              <button
                onClick={onNext}
                style={{
                  width: '100%', padding: '12px', borderRadius: 10, cursor: 'pointer', marginTop: 16,
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                  border: 'none', color: 'white', fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
              >
                Analyse My Content <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Keywords */}
      {activeTab === 'keywords' && (
        <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { title: 'Primary Keywords', key: 'primary', color: 'var(--accent-blue)', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)' },
            { title: 'Secondary Keywords', key: 'secondary', color: 'var(--accent-purple)', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
            { title: 'Long-tail Phrases', key: 'longTail', color: 'var(--accent-cyan)', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)' },
            { title: 'Trending Keywords', key: 'trending', color: 'var(--accent-orange)', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
          ].map(({ title, key, color, bg, border }) => (
            <div key={key} className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color }}>{title}</h3>
                <button
                  onClick={() => copyText((keywordBank[key] || []).join(', '), key)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}
                >
                  {copiedId === key ? <CheckCheck size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {(keywordBank[key] || []).map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => copyText(kw, `kw-${key}-${i}`)}
                    style={{
                      padding: '5px 12px', borderRadius: 8, background: bg, border: `1px solid ${border}`,
                      fontSize: 12, color, cursor: 'pointer', fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: 4, transition: 'opacity 0.2s'
                    }}
                  >
                    <Tag size={9} />
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Hashtags */}
      {activeTab === 'hashtags' && (
        <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(hashtagStrategy).map(([platform, categories]) => {
            const icons = { linkedin: Linkedin, twitter: Twitter, youtube: Youtube }
            const colors = { linkedin: '#0a66c2', twitter: '#1d9bf0', youtube: '#ff0000' }
            const Icon = icons[platform]
            const color = colors[platform]
            const allTags = Object.values(categories).flat()

            return (
              <div key={platform} className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {Icon && <Icon size={18} color={color} />}
                    <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: 'capitalize' }}>{platform}</h3>
                  </div>
                  <button
                    onClick={() => copyText(allTags.join(' '), `all-${platform}`)}
                    style={{ padding: '6px 14px', borderRadius: 8, cursor: 'pointer', background: `rgba(${color === '#0a66c2' ? '10,102,194' : color === '#ff0000' ? '255,0,0' : '29,155,240'},0.1)`, border: `1px solid ${color}40`, color: color, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}
                  >
                    {copiedId === `all-${platform}` ? <CheckCheck size={12} /> : <Copy size={12} />}
                    Copy All
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.entries(categories).map(([cat, tags]) => (
                    <div key={cat}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6, letterSpacing: 1 }}>{cat}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(tags || []).map((tag, i) => (
                          <button
                            key={i}
                            onClick={() => copyText(tag, `tag-${platform}-${cat}-${i}`)}
                            style={{
                              padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
                              background: `rgba(${color === '#0a66c2' ? '10,102,194' : color === '#ff0000' ? '255,0,0' : '29,155,240'},0.1)`,
                              border: `1px solid ${color}30`, fontSize: 12, color: color,
                              fontWeight: 500, transition: 'opacity 0.2s',
                              display: 'flex', alignItems: 'center', gap: 4
                            }}
                          >
                            <Hash size={9} />{tag.replace(/^#/, '')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tab: Calendar */}
      {activeTab === 'calendar' && (
        <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {contentCalendar.map((week, wi) => (
            <div key={wi} className="glass-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--accent-blue)' }}>{week.week}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(week.posts || []).map((post, pi) => {
                  const Icon = PLATFORM_ICONS[post.platform]
                  const color = PLATFORM_COLORS[post.platform]
                  const priorityColor = post.priority === 'high' ? 'var(--accent-orange)' : post.priority === 'medium' ? 'var(--accent-blue)' : 'var(--text-muted)'
                  return (
                    <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                      <div style={{ width: 70, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', flexShrink: 0 }}>
                        <Clock size={10} style={{ display: 'inline', marginRight: 4 }} />
                        {post.day}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 90, flexShrink: 0 }}>
                        {Icon && <Icon size={13} color={color} />}
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{post.platform}</span>
                      </div>
                      <span style={{ padding: '2px 8px', borderRadius: 6, background: `${TYPE_COLORS[post.type] || 'var(--border)'}20`, border: `1px solid ${TYPE_COLORS[post.type] || 'var(--border)'}40`, fontSize: 10, fontWeight: 600, color: TYPE_COLORS[post.type] || 'var(--text-muted)', flexShrink: 0 }}>
                        {post.type}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-primary)', flex: 1 }}>{post.topic}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 999, background: `${priorityColor}15`, border: `1px solid ${priorityColor}30`, fontSize: 10, fontWeight: 600, color: priorityColor, textTransform: 'uppercase', flexShrink: 0 }}>
                        {post.priority}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
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
          Analyse My Content →
        </button>
      </div>
    </div>
  )
}
