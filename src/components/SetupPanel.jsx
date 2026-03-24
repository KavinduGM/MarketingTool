import React, { useState } from 'react'
import {
  Building2, Tag, Target, ChevronRight, Sparkles,
  TrendingUp, ShoppingCart, Users, Megaphone, BarChart3,
  Linkedin, Twitter, Youtube, Search, CheckCircle2
} from 'lucide-react'

const INDUSTRIES = [
  { id: 'tech', label: 'Technology & SaaS', icon: '💻' },
  { id: 'finance', label: 'Finance & FinTech', icon: '💰' },
  { id: 'health', label: 'Health & Wellness', icon: '🏥' },
  { id: 'ecommerce', label: 'E-Commerce & Retail', icon: '🛍️' },
  { id: 'realestate', label: 'Real Estate', icon: '🏠' },
  { id: 'education', label: 'Education & EdTech', icon: '🎓' },
  { id: 'marketing', label: 'Marketing & Advertising', icon: '📣' },
  { id: 'consulting', label: 'Consulting & Professional', icon: '💼' },
  { id: 'creative', label: 'Creative & Design', icon: '🎨' },
  { id: 'manufacturing', label: 'Manufacturing & Industry', icon: '🏭' },
  { id: 'hospitality', label: 'Hospitality & Travel', icon: '✈️' },
  { id: 'legal', label: 'Legal & Compliance', icon: '⚖️' },
]

const NICHES = {
  tech: ['AI & Machine Learning', 'Cybersecurity', 'Cloud Computing', 'Mobile Apps', 'Web Development', 'IoT & Hardware', 'Blockchain', 'Developer Tools'],
  finance: ['Personal Finance', 'Crypto & DeFi', 'Investment Banking', 'Insurance', 'Accounting & Tax', 'Payment Solutions', 'Lending & Credit'],
  health: ['Mental Health', 'Fitness & Sports', 'Nutrition & Diet', 'Telemedicine', 'Pharmaceuticals', 'Medical Devices', 'Wellness Coaching'],
  ecommerce: ['Fashion & Apparel', 'Beauty & Cosmetics', 'Electronics', 'Home & Living', 'Food & Beverage', 'Sports & Outdoors', 'Luxury Goods'],
  realestate: ['Residential Sales', 'Commercial Leasing', 'Property Management', 'Real Estate Investment', 'Smart Homes', 'Architecture & Design'],
  education: ['Online Courses', 'Corporate Training', 'K-12 Education', 'Higher Education', 'Skill Development', 'Language Learning', 'Tutoring'],
  marketing: ['Digital Marketing', 'Content Marketing', 'SEO & SEM', 'Social Media Marketing', 'Email Marketing', 'Influencer Marketing', 'PR & Branding'],
  consulting: ['Management Consulting', 'IT Consulting', 'HR & Recruitment', 'Business Strategy', 'Operations', 'Supply Chain'],
  creative: ['Graphic Design', 'Video Production', 'Photography', 'UX/UI Design', 'Copywriting', 'Animation & Motion'],
  manufacturing: ['Automotive', 'Aerospace', 'Consumer Goods', 'Electronics Manufacturing', 'Green Energy', 'Construction'],
  hospitality: ['Hotels & Resorts', 'Restaurants & Food', 'Tourism & Tours', 'Airline & Transportation', 'Events & Entertainment'],
  legal: ['Corporate Law', 'IP & Patents', 'Compliance & Risk', 'Litigation', 'Employment Law'],
}

const GOALS = [
  { id: 'branding', label: 'Brand Awareness', icon: Sparkles, color: 'var(--accent-purple)', desc: 'Build visibility & recognition' },
  { id: 'marketing', label: 'Marketing & Leads', icon: Megaphone, color: 'var(--accent-blue)', desc: 'Drive qualified leads & traffic' },
  { id: 'sales', label: 'Sales & Revenue', icon: ShoppingCart, color: 'var(--accent-green)', desc: 'Convert audience into customers' },
  { id: 'engagement', label: 'Community & Engagement', icon: Users, color: 'var(--accent-cyan)', desc: 'Grow loyal audience' },
  { id: 'thought_leadership', label: 'Thought Leadership', icon: TrendingUp, color: 'var(--accent-orange)', desc: 'Establish industry authority' },
  { id: 'inquiries', label: 'Inquiries & Outreach', icon: Target, color: 'var(--accent-pink)', desc: 'Generate DMs and inquiries' },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3, color: '#a78bfa', desc: 'Track and measure growth' },
]

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', Icon: Linkedin, color: '#0a66c2' },
  { id: 'twitter', label: 'X (Twitter)', Icon: Twitter, color: '#1d9bf0' },
  { id: 'youtube', label: 'YouTube', Icon: Youtube, color: '#ff0000' },
]

export default function SetupPanel({ onSubmit }) {
  const [step, setStep] = useState(1) // 1=industry, 2=goals, 3=requirement
  const [industry, setIndustry] = useState(null)
  const [niche, setNiche] = useState(null)
  const [selectedGoals, setSelectedGoals] = useState([])
  const [selectedPlatforms, setSelectedPlatforms] = useState(['linkedin', 'twitter', 'youtube'])
  const [requirement, setRequirement] = useState('')
  const [search, setSearch] = useState('')

  const filteredIndustries = INDUSTRIES.filter(i =>
    i.label.toLowerCase().includes(search.toLowerCase())
  )

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(p => p !== id) : prev
        : [...prev, id]
    )
  }

  const canProceed1 = industry && niche
  const canProceed2 = selectedGoals.length > 0
  const canSubmit = requirement.trim().length > 20

  const handleSubmit = () => {
    const industryObj = INDUSTRIES.find(i => i.id === industry)
    const goalLabels = selectedGoals.map(g => GOALS.find(x => x.id === g)?.label).filter(Boolean)
    onSubmit({
      industry: industryObj?.label || industry,
      niche,
      goals: goalLabels,
      platforms: selectedPlatforms,
      requirement: requirement.trim(),
    })
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px var(--accent-blue-glow)'
          }}>
            <Sparkles size={22} color="white" />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }} className="gradient-text">
            SocialIQ
          </span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
          Marketing Intelligence Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Powered by Grok AI — Analyse trends, predict reach, craft winning content
        </p>

        {/* Step indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 24 }}>
          {[1, 2, 3].map(s => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: step > s ? 'var(--accent-green)' : step === s ? 'var(--accent-blue)' : 'var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, transition: 'all 0.3s',
                  boxShadow: step === s ? '0 0 12px var(--accent-blue)' : 'none'
                }}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                <span style={{ fontSize: 12, color: step >= s ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: step === s ? 600 : 400 }}>
                  {s === 1 ? 'Industry' : s === 2 ? 'Goals' : 'Brief'}
                </span>
              </div>
              {s < 3 && <div style={{ width: 32, height: 1, background: step > s ? 'var(--accent-green)' : 'var(--border)', transition: 'all 0.3s' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1 — Industry & Niche */}
      {step === 1 && (
        <div className="animate-fadeInUp">
          <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Building2 size={18} color="var(--accent-blue)" />
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Select Your Industry</h2>
            </div>

            <div style={{ position: 'relative', marginBottom: 16 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search industries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 34px',
                  background: 'var(--bg-input)', border: '1px solid var(--border)',
                  borderRadius: 8, color: 'var(--text-primary)', fontSize: 13
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
              {filteredIndustries.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => { setIndustry(ind.id); setNiche(null) }}
                  style={{
                    padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                    background: industry === ind.id ? 'rgba(59,130,246,0.15)' : 'var(--bg-input)',
                    border: `1px solid ${industry === ind.id ? 'var(--accent-blue)' : 'var(--border)'}`,
                    color: industry === ind.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                    transition: 'all 0.2s', fontSize: 13, fontWeight: industry === ind.id ? 600 : 400,
                    boxShadow: industry === ind.id ? '0 0 10px var(--accent-blue-glow)' : 'none'
                  }}
                >
                  <span style={{ fontSize: 18 }}>{ind.icon}</span>
                  <span>{ind.label}</span>
                </button>
              ))}
            </div>
          </div>

          {industry && (
            <div className="glass-card animate-fadeInUp" style={{ padding: 28, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Tag size={18} color="var(--accent-purple)" />
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Select Your Niche</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(NICHES[industry] || []).map(n => (
                  <button
                    key={n}
                    onClick={() => setNiche(n)}
                    style={{
                      padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                      background: niche === n ? 'rgba(139,92,246,0.2)' : 'var(--bg-input)',
                      border: `1px solid ${niche === n ? 'var(--accent-purple)' : 'var(--border)'}`,
                      color: niche === n ? 'var(--accent-purple)' : 'var(--text-secondary)',
                      fontSize: 13, fontWeight: niche === n ? 600 : 400, transition: 'all 0.2s',
                      boxShadow: niche === n ? '0 0 10px var(--accent-purple-glow)' : 'none'
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setStep(2)}
              disabled={!canProceed1}
              style={{
                padding: '12px 28px', borderRadius: 10, cursor: canProceed1 ? 'pointer' : 'not-allowed',
                background: canProceed1 ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--border)',
                border: 'none', color: 'white', fontSize: 14, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
                boxShadow: canProceed1 ? '0 4px 20px var(--accent-blue-glow)' : 'none',
                opacity: canProceed1 ? 1 : 0.5
              }}
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Goals & Platforms */}
      {step === 2 && (
        <div className="animate-fadeInUp">
          <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Target size={18} color="var(--accent-blue)" />
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>What are your goals?</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>Select all that apply</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {GOALS.map(goal => {
                const Icon = goal.icon
                const selected = selectedGoals.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    style={{
                      padding: '14px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                      background: selected ? `rgba(${hexToRgb(goal.color)}, 0.12)` : 'var(--bg-input)',
                      border: `1px solid ${selected ? goal.color : 'var(--border)'}`,
                      transition: 'all 0.2s',
                      boxShadow: selected ? `0 0 12px rgba(${hexToRgb(goal.color)}, 0.2)` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <Icon size={16} color={selected ? goal.color : 'var(--text-muted)'} />
                      <span style={{ fontWeight: 600, fontSize: 13, color: selected ? goal.color : 'var(--text-primary)' }}>
                        {goal.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 26 }}>{goal.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Target Platforms</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              {PLATFORMS.map(({ id, label, Icon, color }) => {
                const active = selectedPlatforms.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => togglePlatform(id)}
                    style={{
                      flex: 1, padding: '14px', borderRadius: 12, cursor: 'pointer',
                      background: active ? `rgba(${hexToRgb(color)}, 0.12)` : 'var(--bg-input)',
                      border: `1px solid ${active ? color : 'var(--border)'}`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      transition: 'all 0.2s',
                      boxShadow: active ? `0 0 12px rgba(${hexToRgb(color)}, 0.2)` : 'none'
                    }}
                  >
                    <Icon size={20} color={active ? color : 'var(--text-muted)'} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: active ? color : 'var(--text-muted)' }}>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: '12px 24px', borderRadius: 10, cursor: 'pointer',
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: 14
              }}
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canProceed2}
              style={{
                padding: '12px 28px', borderRadius: 10, cursor: canProceed2 ? 'pointer' : 'not-allowed',
                background: canProceed2 ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--border)',
                border: 'none', color: 'white', fontSize: 14, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: canProceed2 ? '0 4px 20px var(--accent-blue-glow)' : 'none',
                opacity: canProceed2 ? 1 : 0.5
              }}
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Brief */}
      {step === 3 && (
        <div className="animate-fadeInUp">
          <div className="glass-card" style={{ padding: 28, marginBottom: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Describe Your Business & Goals</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Tell Grok AI about your business, target audience, and what you want to achieve.
                The more detail, the better the analysis.
              </p>
            </div>

            {/* Summary chip */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', fontSize: 11, color: 'var(--accent-blue)', fontWeight: 500 }}>
                {INDUSTRIES.find(i => i.id === industry)?.icon} {INDUSTRIES.find(i => i.id === industry)?.label}
              </span>
              <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', fontSize: 11, color: 'var(--accent-purple)', fontWeight: 500 }}>
                {niche}
              </span>
              {selectedGoals.map(g => (
                <span key={g} style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', fontSize: 11, color: 'var(--accent-green)', fontWeight: 500 }}>
                  {GOALS.find(x => x.id === g)?.label}
                </span>
              ))}
            </div>

            <textarea
              value={requirement}
              onChange={e => setRequirement(e.target.value)}
              placeholder={`Example: I run a SaaS company providing AI-powered customer support tools for mid-sized e-commerce businesses. My target audience is CTOs, product managers, and operations heads at companies with 50-500 employees. I want to build thought leadership on LinkedIn by sharing insights about AI automation, customer experience trends, and case studies. On X, I'd like to engage in tech conversations and drive traffic to our blog. For YouTube, I plan to create product demos and educational content about AI integration.`}
              rows={8}
              style={{
                width: '100%', padding: '14px', borderRadius: 10,
                background: 'var(--bg-input)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: 13, resize: 'vertical',
                lineHeight: 1.7, fontFamily: 'inherit',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 11, color: requirement.length > 20 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                {requirement.length} characters {requirement.length < 20 ? `(min 20)` : '✓'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: '12px 24px', borderRadius: 10, cursor: 'pointer',
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: 14
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                padding: '14px 32px', borderRadius: 12, cursor: canSubmit ? 'pointer' : 'not-allowed',
                background: canSubmit ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'var(--border)',
                border: 'none', color: 'white', fontSize: 15, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: canSubmit ? '0 4px 30px var(--accent-blue-glow)' : 'none',
                opacity: canSubmit ? 1 : 0.5,
                transition: 'all 0.2s'
              }}
            >
              <Sparkles size={18} />
              Analyse with Grok AI
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper to convert CSS variable hex to rgb
function hexToRgb(color) {
  if (color.startsWith('var(')) return '59,130,246'
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r},${g},${b}`
}
