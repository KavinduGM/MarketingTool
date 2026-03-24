const XAI_API_KEY = import.meta.env.VITE_XAI_API_KEY
const API_BASE = 'https://api.x.ai/v1'

async function callGrok(messages, options = {}) {
  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${XAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || 'grok-3',
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens || 4096,
      stream: false,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`xAI API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.choices[0].message.content
}

export async function analyzeTrends({ industry, niche, goals, requirement }) {
  const prompt = `You are a world-class social media strategist and trend analyst with access to real-time data.

Analyze the following business context and provide a comprehensive social media trend analysis:

**Industry:** ${industry}
**Niche/Category:** ${niche}
**Marketing Goals:** ${goals.join(', ')}
**Business Requirement:** ${requirement}

**Target Platforms:** LinkedIn, X (Twitter), YouTube

Provide a detailed JSON response (no markdown, pure JSON) with this exact structure:
{
  "industryOverview": {
    "summary": "2-3 sentence industry snapshot",
    "marketSentiment": "positive|neutral|negative",
    "sentimentScore": 0-100,
    "keyInsight": "one key actionable insight"
  },
  "trendingTopics": [
    {
      "topic": "topic name",
      "volume": "estimated weekly posts/mentions (number)",
      "growth": "+XX% this week",
      "platforms": ["LinkedIn","X","YouTube"],
      "status": "trending|peak|rising|declining",
      "description": "brief description",
      "relevanceScore": 0-100
    }
  ],
  "predictedTopics": [
    {
      "topic": "predicted trending topic",
      "expectedPeak": "timeframe e.g. Next 2 weeks",
      "confidence": 0-100,
      "reason": "why this will trend",
      "platforms": ["LinkedIn","X","YouTube"],
      "opportunity": "how to leverage this"
    }
  ],
  "contentTypes": [
    {
      "type": "content format e.g. Short-form video",
      "engagement": "average engagement rate %",
      "bestFor": ["LinkedIn"],
      "trend": "rising|stable|declining",
      "tip": "specific tip for this industry"
    }
  ],
  "audienceInsights": {
    "peakEngagementTimes": {
      "linkedin": "e.g. Tue-Thu 8-10am",
      "twitter": "e.g. Mon-Wed 12-2pm",
      "youtube": "e.g. Sat-Sun 2-4pm"
    },
    "topDemographics": ["demographic 1", "demographic 2"],
    "audiencePainPoints": ["pain point 1", "pain point 2", "pain point 3"],
    "contentPreferences": ["preference 1", "preference 2"]
  },
  "volumePredictions": {
    "linkedin": { "impressions": "realistic range per post", "engagement": "engagement rate %", "followers": "monthly growth %" },
    "twitter": { "impressions": "realistic range per post", "engagement": "engagement rate %", "followers": "monthly growth %" },
    "youtube": { "views": "realistic range per video", "watchTime": "avg minutes", "subscribers": "monthly growth %" }
  },
  "currentSocialTrends": [
    {
      "trend": "trend name",
      "description": "what it is",
      "applicability": "how to apply it",
      "platforms": ["platform"]
    }
  ],
  "sampleContents": [
    {
      "platform": "LinkedIn|X|YouTube",
      "type": "content type",
      "title": "post title or hook",
      "preview": "first 100 chars of content",
      "estimatedReach": "reach estimate",
      "engagementRate": "X.X%"
    }
  ]
}

Return ONLY valid JSON. Be specific to the ${industry} / ${niche} combination. Use realistic 2024-2025 data patterns.`

  const text = await callGrok([{ role: 'user', content: prompt }], { maxTokens: 5000 })
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(clean)
  } catch {
    throw new Error('Failed to parse trend analysis response')
  }
}

export async function generateContentSuggestions({ industry, niche, goals, trendingTopics, requirement }) {
  const topics = trendingTopics.slice(0, 5).map(t => t.topic).join(', ')
  const prompt = `You are a top content strategist specializing in ${industry} / ${niche}.

Based on these trending topics: ${topics}
Goals: ${goals.join(', ')}
Requirement: ${requirement}
Target Platforms: LinkedIn, X (Twitter), YouTube

Generate comprehensive content suggestions as pure JSON (no markdown):
{
  "contentIdeas": [
    {
      "id": 1,
      "title": "compelling content title",
      "platform": "LinkedIn|X|YouTube",
      "contentType": "Article|Thread|Video|Carousel|Reel|Short",
      "topic": "main topic",
      "angle": "unique angle/hook",
      "outline": ["point 1", "point 2", "point 3"],
      "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
      "estimatedReach": "X,XXX - XX,XXX",
      "engagementScore": 0-100,
      "bestTimeToPost": "Day, Time",
      "callToAction": "specific CTA",
      "whyItWorks": "brief explanation"
    }
  ],
  "keywordBank": {
    "primary": ["kw1", "kw2", "kw3", "kw4", "kw5"],
    "secondary": ["kw6", "kw7", "kw8", "kw9", "kw10"],
    "longTail": ["phrase 1", "phrase 2", "phrase 3"],
    "trending": ["trending kw 1", "trending kw 2", "trending kw 3"]
  },
  "hashtagStrategy": {
    "linkedin": {
      "high": ["#popular1", "#popular2"],
      "medium": ["#mid1", "#mid2", "#mid3"],
      "niche": ["#niche1", "#niche2", "#niche3"]
    },
    "twitter": {
      "trending": ["#trending1", "#trending2"],
      "industry": ["#ind1", "#ind2", "#ind3"],
      "engagement": ["#eng1", "#eng2"]
    },
    "youtube": {
      "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
    }
  },
  "contentCalendar": [
    {
      "week": "Week 1",
      "posts": [
        { "day": "Monday", "platform": "LinkedIn", "type": "Article", "topic": "topic", "priority": "high|medium|low" }
      ]
    },
    {
      "week": "Week 2",
      "posts": [
        { "day": "Tuesday", "platform": "X", "type": "Thread", "topic": "topic", "priority": "high|medium|low" }
      ]
    }
  ]
}

Generate at least 6 content ideas. Return ONLY valid JSON.`

  const text = await callGrok([{ role: 'user', content: prompt }], { maxTokens: 5000 })
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(clean)
  } catch {
    throw new Error('Failed to parse content suggestions response')
  }
}

export async function analyzeContent({ content, platform, industry, niche, goals }) {
  const prompt = `You are an expert social media analyst and performance prediction specialist.

Analyze this content for ${platform} in the ${industry}/${niche} space:

---
${content}
---

Goals: ${goals.join(', ')}

Provide a detailed performance analysis as pure JSON (no markdown):
{
  "overallScore": 0-100,
  "grade": "A+|A|A-|B+|B|B-|C+|C|D|F",
  "verdict": "one sentence verdict",
  "platformScore": {
    "linkedin": 0-100,
    "twitter": 0-100,
    "youtube": 0-100
  },
  "predictions": {
    "linkedin": {
      "reach": "X,XXX - XX,XXX",
      "impressions": "XX,XXX - XXX,XXX",
      "engagementRate": "X.X%",
      "likes": "XXX - X,XXX",
      "comments": "XX - XXX",
      "shares": "XX - XXX",
      "profileVisits": "XXX - X,XXX",
      "viralProbability": "X%"
    },
    "twitter": {
      "reach": "X,XXX - XX,XXX",
      "impressions": "XX,XXX - XXX,XXX",
      "engagementRate": "X.X%",
      "likes": "XXX - X,XXX",
      "retweets": "XX - XXX",
      "replies": "XX - XXX",
      "linkClicks": "XX - XXX",
      "viralProbability": "X%"
    },
    "youtube": {
      "views": "X,XXX - XX,XXX",
      "watchTimeMinutes": "X - XX avg minutes",
      "likes": "XXX - X,XXX",
      "comments": "XX - XXX",
      "subscribers": "+XX - +XXX new",
      "ctr": "X.X%",
      "viralProbability": "X%"
    }
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "improvements": [
    {
      "area": "area name",
      "issue": "current issue",
      "suggestion": "specific fix",
      "impact": "high|medium|low"
    }
  ],
  "seoAnalysis": {
    "keywordsFound": ["kw1", "kw2"],
    "missingKeywords": ["missing kw1", "missing kw2"],
    "readabilityScore": 0-100,
    "sentimentScore": 0-100,
    "hookStrength": 0-100,
    "ctaPresent": true,
    "optimalLength": true
  },
  "suggestedHashtags": {
    "linkedin": ["#tag1", "#tag2", "#tag3", "#tag4"],
    "twitter": ["#tag1", "#tag2", "#tag3"],
    "youtube": ["tag1", "tag2", "tag3"]
  },
  "optimizedVersion": "A rewritten/improved version of the content for maximum engagement (keep it concise but impactful)"
}

Return ONLY valid JSON. Be realistic with predictions based on average account performance (not viral accounts).`

  const text = await callGrok([{ role: 'user', content: prompt }], { maxTokens: 4000 })
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(clean)
  } catch {
    throw new Error('Failed to parse content analysis response')
  }
}
