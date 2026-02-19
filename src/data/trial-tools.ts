/* ───────────────────────────────────────────────────────
   Mock data & type definitions for Trial prompt tools
   ─────────────────────────────────────────────────────── */

export type FieldType = "text" | "textarea" | "select" | "multiselect" | "email" | "url";

export interface ToolField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface PromptTool {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // emoji placeholder
  fields: ToolField[];
  outputTemplate: (values: Record<string, string>) => string;
}

/* ── Shared option lists ──────────────────────────────── */

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ko", label: "Korean" },
  { value: "es", label: "Spanish" },
  { value: "zh", label: "Chinese (Mandarin)" },
  { value: "ja", label: "Japanese" },
  { value: "pt", label: "Portuguese" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "other", label: "Other" },
];

const regionOptions = [
  { value: "us", label: "United States" },
  { value: "korea", label: "South Korea" },
  { value: "latam", label: "Latin America" },
  { value: "eu", label: "Europe" },
  { value: "sea", label: "Southeast Asia" },
  { value: "japan", label: "Japan" },
  { value: "global", label: "Global / Remote" },
];

const industryOptions = [
  { value: "ecommerce", label: "E-commerce / DTC" },
  { value: "saas", label: "SaaS / Tech" },
  { value: "beauty", label: "Beauty & Wellness" },
  { value: "food", label: "Food & Beverage" },
  { value: "education", label: "Education" },
  { value: "creative", label: "Creative / Design" },
  { value: "fitness", label: "Fitness & Health" },
  { value: "professional", label: "Professional Services" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "under-1k", label: "Under $1,000/mo" },
  { value: "1k-3k", label: "$1,000–$3,000/mo" },
  { value: "3k-5k", label: "$3,000–$5,000/mo" },
  { value: "5k-10k", label: "$5,000–$10,000/mo" },
  { value: "10k-plus", label: "$10,000+/mo" },
  { value: "project", label: "Project-based" },
];

const goalOptions = [
  { value: "leads", label: "More leads / customers" },
  { value: "revenue", label: "Increase revenue" },
  { value: "awareness", label: "Brand awareness" },
  { value: "retention", label: "Customer retention" },
  { value: "expansion", label: "New market expansion" },
  { value: "partnerships", label: "Creator / brand partnerships" },
];

/* ── SMB Track Tools ──────────────────────────────────── */

export const smbTools: PromptTool[] = [
  {
    id: "smb-diagnosis",
    title: "Business Growth Diagnosis",
    subtitle: "Identify the biggest bottleneck holding your growth back.",
    icon: "🔍",
    fields: [
      { name: "businessName", label: "Business Name", type: "text", placeholder: "Acme Co.", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
      { name: "industry", label: "Industry / Niche", type: "select", options: industryOptions, required: true },
      { name: "languages", label: "Languages You Serve", type: "select", options: languageOptions },
      { name: "region", label: "Target Market", type: "select", options: regionOptions },
      { name: "monthlyRevenue", label: "Monthly Revenue Range", type: "select", options: budgetOptions },
      { name: "primaryGoal", label: "Primary Goal", type: "select", options: goalOptions, required: true },
      { name: "biggestChallenge", label: "Biggest Challenge Right Now", type: "textarea", placeholder: "Describe in 1–2 sentences…", required: true },
      { name: "website", label: "Website URL", type: "url", placeholder: "https://..." },
    ],
    outputTemplate: (v) => `# Growth Diagnosis — ${v.businessName || "Your Business"}

## Snapshot
- **Industry:** ${v.industry || "—"}
- **Market:** ${v.region || "—"}
- **Revenue range:** ${v.monthlyRevenue || "—"}
- **Primary goal:** ${v.primaryGoal || "—"}

## Preliminary Assessment
Based on your inputs, your #1 growth bottleneck appears to be **customer acquisition alignment**. Your challenge ("${v.biggestChallenge?.slice(0, 80) || "—"}") suggests a gap between your current marketing channels and your ideal customer.

### Recommended Focus Areas
1. **Messaging clarity** — Sharpen your value proposition so prospects immediately understand what you do and who you serve.
2. **Channel-market fit** — Audit which channels actually reach your ICP in ${v.region || "your target market"}.
3. **Conversion path** — Simplify the journey from first touch to purchase.

### Quick Wins (Next 7 Days)
- Rewrite your homepage headline around a single customer outcome.
- Set up a basic tracking dashboard (Google Analytics 4 + one KPI).
- Run a 5-person customer feedback sprint to validate messaging.

---
*This is a preliminary assessment. Book a discovery call for a deeper, personalized audit.*`,
  },
  {
    id: "smb-icp",
    title: "Ideal Customer + Positioning Generator",
    subtitle: "Define your ideal customer profile and sharpen your positioning.",
    icon: "🎯",
    fields: [
      { name: "businessName", label: "Business Name", type: "text", placeholder: "Acme Co.", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
      { name: "industry", label: "Industry / Niche", type: "select", options: industryOptions, required: true },
      { name: "currentCustomer", label: "Describe Your Best Current Customer", type: "textarea", placeholder: "Age, role, what they buy, why they stay…", required: true },
      { name: "painPoint", label: "What Problem Do You Solve?", type: "textarea", placeholder: "Be specific…", required: true },
      { name: "competitors", label: "Who Do Customers Compare You To?", type: "text", placeholder: "Competitor names or types" },
      { name: "languages", label: "Languages You Operate In", type: "select", options: languageOptions },
      { name: "region", label: "Target Region", type: "select", options: regionOptions },
    ],
    outputTemplate: (v) => `# Ideal Customer Profile — ${v.businessName || "Your Business"}

## ICP Snapshot
Based on your description, your ideal customer looks like:

**Demographics:**
- Industry: ${v.industry || "—"}
- Region: ${v.region || "—"}
- Profile: ${v.currentCustomer?.slice(0, 120) || "—"}

**Psychographics:**
- Core pain: ${v.painPoint?.slice(0, 120) || "—"}
- Decision driver: Speed to results + trust in expertise
- Buying trigger: Frustration with current solution or hitting a growth ceiling

## Positioning Statement
> **${v.businessName || "Your Business"}** helps [${v.currentCustomer?.split(",")[0] || "your ideal customer"}] solve [${v.painPoint?.split(".")[0] || "their core challenge"}] — unlike ${v.competitors || "generic alternatives"}, we combine [your unique approach] with measurable outcomes.

## Messaging Angles to Test
1. **Outcome-first:** Lead with the result, not the process.
2. **Contrast:** "Unlike [competitor approach], we [your differentiator]."
3. **Social proof:** Customer story that mirrors ICP profile.

## Next Steps
- Validate this ICP with 3–5 real customer interviews.
- A/B test positioning statement on your landing page.
- Build a content calendar around ICP pain points.

---
*Want a complete ICP + messaging strategy? Book a discovery call.*`,
  },
  {
    id: "smb-ads",
    title: "Google Ads Readiness Check",
    subtitle: "See if your business is ready to run profitable Google Ads.",
    icon: "📊",
    fields: [
      { name: "businessName", label: "Business Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "website", label: "Website URL", type: "url", placeholder: "https://...", required: true },
      { name: "industry", label: "Industry", type: "select", options: industryOptions, required: true },
      { name: "hasRunAds", label: "Have You Run Google Ads Before?", type: "select", options: [
        { value: "never", label: "Never" },
        { value: "tried", label: "Tried but stopped" },
        { value: "running", label: "Currently running" },
      ]},
      { name: "monthlyBudget", label: "Monthly Ad Budget", type: "select", options: budgetOptions },
      { name: "conversionGoal", label: "What's a Conversion for You?", type: "select", options: [
        { value: "purchase", label: "Online purchase" },
        { value: "lead", label: "Lead / form submission" },
        { value: "call", label: "Phone call" },
        { value: "booking", label: "Appointment booking" },
        { value: "other", label: "Other" },
      ]},
      { name: "landingPage", label: "Do You Have a Dedicated Landing Page?", type: "select", options: [
        { value: "yes", label: "Yes" },
        { value: "homepage", label: "No — I'd send traffic to homepage" },
        { value: "no", label: "No landing page at all" },
      ]},
    ],
    outputTemplate: (v) => {
      const score = (() => {
        let s = 40;
        if (v.landingPage === "yes") s += 20;
        if (v.monthlyBudget && !["under-1k"].includes(v.monthlyBudget)) s += 15;
        if (v.hasRunAds === "running") s += 15;
        else if (v.hasRunAds === "tried") s += 5;
        if (v.website) s += 10;
        return Math.min(s, 100);
      })();
      return `# Google Ads Readiness — ${v.businessName || "Your Business"}

## Readiness Score: ${score}/100

${score >= 70 ? "✅ **You're in a good position to run Google Ads.**" : score >= 50 ? "⚠️ **Almost ready — a few gaps to fix first.**" : "🔴 **Not ready yet — build your foundation first.**"}

## Assessment Breakdown

| Factor | Status |
|--------|--------|
| Website | ${v.website ? "✅ Have one" : "❌ Missing"} |
| Landing page | ${v.landingPage === "yes" ? "✅ Dedicated page" : v.landingPage === "homepage" ? "⚠️ Homepage only" : "❌ None"} |
| Ad experience | ${v.hasRunAds === "running" ? "✅ Active" : v.hasRunAds === "tried" ? "⚠️ Past experience" : "🟡 None yet"} |
| Budget | ${v.monthlyBudget || "Not specified"} |
| Conversion type | ${v.conversionGoal || "Not specified"} |

## Recommendations
${score < 70 ? `1. **Build a dedicated landing page** — Don't send paid traffic to a general homepage.
2. **Set up conversion tracking** — Google Analytics 4 + Google Ads conversion tag.
3. **Start with a small test** — $500–$1,000 over 2 weeks to gather data before scaling.` : `1. **Optimize your landing page** — Test headline, CTA, and page speed.
2. **Structure campaigns tightly** — One theme per ad group, 3–5 keywords each.
3. **Set up proper tracking** — Conversion value tracking for ROAS measurement.`}

---
*Want a full ads strategy + setup? Check out our Growth System package.*`;
    },
  },
  {
    id: "smb-content",
    title: "2-Week Content Calendar Builder",
    subtitle: "Get a ready-to-use content plan tailored to your business.",
    icon: "📅",
    fields: [
      { name: "businessName", label: "Business Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "industry", label: "Industry", type: "select", options: industryOptions, required: true },
      { name: "platforms", label: "Primary Platform", type: "select", options: [
        { value: "instagram", label: "Instagram" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "tiktok", label: "TikTok" },
        { value: "youtube", label: "YouTube" },
        { value: "twitter", label: "X / Twitter" },
        { value: "blog", label: "Blog / SEO" },
      ], required: true },
      { name: "frequency", label: "How Often Can You Post?", type: "select", options: [
        { value: "daily", label: "Daily" },
        { value: "3-4", label: "3–4x per week" },
        { value: "2-3", label: "2–3x per week" },
        { value: "weekly", label: "Once a week" },
      ]},
      { name: "tone", label: "Brand Voice / Tone", type: "select", options: [
        { value: "professional", label: "Professional & authoritative" },
        { value: "casual", label: "Casual & friendly" },
        { value: "witty", label: "Witty & bold" },
        { value: "educational", label: "Educational & helpful" },
      ]},
      { name: "goal", label: "Content Goal", type: "select", options: goalOptions },
      { name: "topics", label: "Key Topics / Themes", type: "textarea", placeholder: "List 3–5 topics your audience cares about…" },
    ],
    outputTemplate: (v) => `# 2-Week Content Calendar — ${v.businessName || "Your Business"}

**Platform:** ${v.platforms || "—"} | **Frequency:** ${v.frequency || "—"} | **Tone:** ${v.tone || "—"}

---

## Week 1

| Day | Type | Topic | Hook / Caption Idea |
|-----|------|-------|---------------------|
| Mon | Educational | Industry insight | "Most ${v.industry || "businesses"} get this wrong about [topic]…" |
| Wed | Social proof | Customer story | "Here's what happened when [customer] tried [your solution]…" |
| Fri | Engagement | Poll / Question | "Quick question for ${v.industry || "my"} community: [relevant question]?" |

## Week 2

| Day | Type | Topic | Hook / Caption Idea |
|-----|------|-------|---------------------|
| Mon | Behind-the-scenes | Process / team | "Here's how we actually [do the thing]…" |
| Wed | Value / Tips | Actionable advice | "3 things I'd do if I were starting [in your niche] today" |
| Fri | CTA / Promo | Offer or service | "If [pain point] sounds familiar, here's how we can help →" |

## Content Pillars
Based on your topics (${v.topics?.slice(0, 80) || "general"}):
1. **Educate** — Position as expert, share frameworks
2. **Relate** — Behind-the-scenes, founder stories, culture
3. **Convert** — Case studies, testimonials, clear CTAs

## Pro Tips
- Batch-create content on one day per week.
- Repurpose: one long post → 3 short-form pieces.
- Engage in comments for 15 min after each post.

---
*Need a full content strategy with templates? Book a discovery call.*`,
  },
];

/* ── Creator Track Tools ──────────────────────────────── */

export const creatorTools: PromptTool[] = [
  {
    id: "creator-collab",
    title: "Collaboration Finder + Outreach Templates",
    subtitle: "Find the right brands and get outreach templates that work.",
    icon: "🤝",
    fields: [
      { name: "creatorName", label: "Creator Name / Handle", type: "text", placeholder: "@yourhandle", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "niche", label: "Your Niche / Category", type: "select", options: industryOptions, required: true },
      { name: "languages", label: "Languages You Create In", type: "select", options: languageOptions, required: true },
      { name: "region", label: "Target Brand Region", type: "select", options: regionOptions },
      { name: "platforms", label: "Main Platform", type: "select", options: [
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "YouTube" },
        { value: "tiktok", label: "TikTok" },
        { value: "podcast", label: "Podcast" },
        { value: "blog", label: "Blog / Newsletter" },
        { value: "multi", label: "Multi-platform" },
      ]},
      { name: "audienceSize", label: "Audience Size (approx)", type: "select", options: [
        { value: "nano", label: "Under 10K" },
        { value: "micro", label: "10K–50K" },
        { value: "mid", label: "50K–200K" },
        { value: "macro", label: "200K+" },
      ]},
      { name: "collabGoal", label: "What Are You Looking For?", type: "textarea", placeholder: "Sponsored posts, long-term partnerships, affiliate…" },
    ],
    outputTemplate: (v) => `# Collaboration Playbook — ${v.creatorName || "Creator"}

## Your Profile
- **Niche:** ${v.niche || "—"}
- **Platform:** ${v.platforms || "—"}
- **Audience:** ${v.audienceSize || "—"}
- **Languages:** ${v.languages || "—"}
- **Target market:** ${v.region || "—"}

## Ideal Brand Matches
Based on your niche (${v.niche || "—"}) and audience, look for:
1. **DTC brands** in ${v.niche || "your space"} that are actively running influencer campaigns
2. **Emerging brands** (Series A–B stage) wanting to build awareness in ${v.region || "your region"}
3. **Cross-border brands** entering ${v.languages || "your language"}-speaking markets

## Outreach Template

**Subject:** Collaboration opportunity — ${v.creatorName || "[Your Name]"} × [Brand Name]

Hi [Brand Contact],

I'm ${v.creatorName || "[Your Name]"}, a ${v.languages || "bilingual"} content creator in the ${v.niche || "[niche]"} space with a ${v.audienceSize || "growing"} community on ${v.platforms || "[platform]"}.

I've been following [Brand] and love [specific thing]. I'd love to explore a collaboration that [specific value you'd bring].

A few highlights:
- [Engagement rate or key metric]
- [Relevant past collaboration]
- [Unique angle: bilingual, cultural bridge, etc.]

Would you be open to a quick chat this week?

Best,
${v.creatorName || "[Your Name]"}

---
*Want personalized brand matching? Join the Dalbit creator network.*`,
  },
  {
    id: "creator-rates",
    title: "Rate + Package Builder",
    subtitle: "Build professional pricing packages for brand collaborations.",
    icon: "💰",
    fields: [
      { name: "creatorName", label: "Creator Name / Handle", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "platforms", label: "Primary Platform", type: "select", options: [
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "YouTube" },
        { value: "tiktok", label: "TikTok" },
        { value: "podcast", label: "Podcast" },
        { value: "multi", label: "Multi-platform" },
      ], required: true },
      { name: "audienceSize", label: "Audience Size", type: "select", options: [
        { value: "nano", label: "Under 10K" },
        { value: "micro", label: "10K–50K" },
        { value: "mid", label: "50K–200K" },
        { value: "macro", label: "200K+" },
      ], required: true },
      { name: "niche", label: "Niche", type: "select", options: industryOptions },
      { name: "languages", label: "Languages", type: "select", options: languageOptions },
      { name: "deliverables", label: "What Do You Typically Deliver?", type: "textarea", placeholder: "Reels, stories, blog posts, videos…" },
      { name: "currentRates", label: "Current Rates (if any)", type: "text", placeholder: "e.g., $500 per reel" },
    ],
    outputTemplate: (v) => {
      const rateMultiplier = v.audienceSize === "macro" ? 4 : v.audienceSize === "mid" ? 2.5 : v.audienceSize === "micro" ? 1.5 : 1;
      const base = Math.round(200 * rateMultiplier);
      return `# Rate Card — ${v.creatorName || "Creator"}

## Recommended Packages

### 🌱 Starter — $${base}
- 1 in-feed post OR 1 short-form video
- 2 story frames
- 30-day usage rights
- Best for: brand awareness, product launches

### 🌿 Growth — $${Math.round(base * 2.2)}
- 2 in-feed posts OR 1 long-form + 1 short-form video
- 5 story frames with link/swipe-up
- 60-day usage rights
- 1 round of revisions
- Best for: campaign pushes, seasonal promos

### 🌳 Partnership — $${Math.round(base * 4)} /month
- 4 pieces of content (mix of formats)
- Ongoing story coverage
- Whitelisting / paid amplification rights
- Monthly performance report
- Best for: long-term brand ambassadorships

## Rate Justification
- **Platform:** ${v.platforms || "—"}
- **Audience:** ${v.audienceSize || "—"}
- **Niche premium:** ${v.niche || "—"} (${["beauty", "saas", "fitness"].includes(v.niche || "") ? "high-value niche ✅" : "standard niche"})
- **Language bonus:** ${v.languages && v.languages !== "en" ? "Bilingual / multilingual content adds 15–30% premium ✅" : "English-only (standard rate)"}

## Tips
- Always quote in packages, not hourly rates.
- Include usage rights and revision limits.
- Bilingual content is a premium — charge accordingly.

---
*Need help negotiating rates? Join the Dalbit creator network.*`;
    },
  },
  {
    id: "creator-pitch",
    title: "B2B Portfolio / Pitch Builder",
    subtitle: "Create a professional pitch document for brand outreach.",
    icon: "📋",
    fields: [
      { name: "creatorName", label: "Creator Name / Handle", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "niche", label: "Niche / Category", type: "select", options: industryOptions, required: true },
      { name: "languages", label: "Languages", type: "select", options: languageOptions, required: true },
      { name: "platforms", label: "Primary Platform", type: "select", options: [
        { value: "instagram", label: "Instagram" },
        { value: "youtube", label: "YouTube" },
        { value: "tiktok", label: "TikTok" },
        { value: "multi", label: "Multi-platform" },
      ]},
      { name: "audienceDemo", label: "Audience Demographics", type: "textarea", placeholder: "Age range, location, interests…" },
      { name: "bestWork", label: "Top 3 Past Collaborations or Content Pieces", type: "textarea", placeholder: "Brand names, results, links…" },
      { name: "uniqueAngle", label: "What Makes You Different?", type: "textarea", placeholder: "Your unique value as a creator…" },
    ],
    outputTemplate: (v) => `# Creator Pitch Deck — ${v.creatorName || "Creator"}

---

## About Me
**${v.creatorName || "Creator"}** — ${v.niche || "Content"} creator on ${v.platforms || "multiple platforms"}
Languages: ${v.languages || "English"}

${v.uniqueAngle ? `### My Edge\n${v.uniqueAngle}\n` : ""}

## Audience Overview
${v.audienceDemo || "Engaged community of [demographic] interested in [topics]."}

## Past Work & Results
${v.bestWork || "Available upon request."}

## What I Offer Brands
1. **Authentic content** that resonates with ${v.languages || "English"}-speaking audiences
2. **Cultural bridge** — I understand both the brand's market and my audience's culture
3. **Professional delivery** — clear timelines, revision process, and performance tracking

## Collaboration Options
- Sponsored content (posts, reels, videos)
- Brand ambassadorship (ongoing partnerships)
- Product reviews and tutorials
- Event coverage and live content
- Cross-cultural / bilingual campaigns

## Let's Work Together
📧 ${v.email || "[email]"}
🔗 [Portfolio / social links]

---
*Built with Dalbit AI — Creator Growth Tools*`,
  },
  {
    id: "creator-brandfit",
    title: "Brand Fit Filter",
    subtitle: "Evaluate brand deals against your values, boundaries, and red flags.",
    icon: "🛡️",
    fields: [
      { name: "creatorName", label: "Creator Name / Handle", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "brandName", label: "Brand You're Evaluating", type: "text", placeholder: "Brand name", required: true },
      { name: "dealType", label: "Type of Deal", type: "select", options: [
        { value: "sponsored", label: "Sponsored post" },
        { value: "ambassador", label: "Brand ambassador" },
        { value: "affiliate", label: "Affiliate / commission" },
        { value: "gifted", label: "Gifted / product only" },
        { value: "other", label: "Other" },
      ]},
      { name: "compensation", label: "Offered Compensation", type: "text", placeholder: "$X or product details" },
      { name: "values", label: "Your Core Values (pick what matters most)", type: "textarea", placeholder: "Sustainability, authenticity, inclusivity, quality…" },
      { name: "boundaries", label: "Your Hard Boundaries", type: "textarea", placeholder: "No alcohol, no fast fashion, no misleading claims…" },
      { name: "redFlags", label: "Anything That Feels Off?", type: "textarea", placeholder: "Vague contract, pushy timeline, no creative freedom…" },
    ],
    outputTemplate: (v) => {
      const hasRedFlags = v.redFlags && v.redFlags.trim().length > 10;
      const isGifted = v.dealType === "gifted";
      return `# Brand Fit Assessment — ${v.brandName || "Brand"} × ${v.creatorName || "Creator"}

## Deal Overview
- **Brand:** ${v.brandName || "—"}
- **Deal type:** ${v.dealType || "—"}
- **Compensation:** ${v.compensation || "Not specified"}

## Values Alignment Check
Your values: ${v.values || "Not specified"}

${v.values ? `Ask yourself:
- Does ${v.brandName || "this brand"} publicly align with these values?
- Have they faced controversies that conflict with your standards?
- Would you use / recommend this product without being paid?` : ""}

## Boundary Check
Your boundaries: ${v.boundaries || "Not specified"}

${v.boundaries ? `✅ Review the brand's product line, marketing, and past campaigns against your boundaries before accepting.` : ""}

## Red Flag Analysis
${hasRedFlags ? `⚠️ **You noted concerns:** "${v.redFlags?.slice(0, 200)}"

Common red flags to watch for:
- No written contract → always require one
- "Exposure" as primary compensation → know your worth
- Unreasonable exclusivity clauses
- No creative control / rigid scripting
- Payment only after performance metrics` : "✅ No major red flags noted."}

${isGifted ? `\n### ⚠️ Gifted / Product-Only Note\nGifted collabs can be worth it for relationship-building, but don't undervalue your time. Consider:
- Is this a brand you genuinely want to work with long-term?
- Can you negotiate a paid follow-up if the content performs well?
- Will this take more than 2 hours of your time?` : ""}

## Verdict
${hasRedFlags ? "🟡 **Proceed with caution.** Address the red flags before accepting." : "🟢 **Looks like a reasonable fit.** Proceed with a clear contract and expectations."}

## Negotiation Tips
1. Always get the deal in writing.
2. Define deliverables, timeline, and revision limits.
3. Negotiate usage rights separately.
4. Set payment terms (50% upfront is standard).

---
*Need help evaluating deals? Join the Dalbit creator network.*`;
    },
  },
];
