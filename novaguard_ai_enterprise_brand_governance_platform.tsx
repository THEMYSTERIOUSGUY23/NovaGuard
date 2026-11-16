import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Database,
  BarChart3,
  CheckSquare,
  Plus,
  ArrowRight,
  RefreshCw,
  Eye,
  Check,
  X,
  Send,
  Layers,
  Palette,
  BookOpen,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  HelpCircle,
  Copy,
  Download,
  Play,
  Building2,
  Zap,
  Wand2,
  CheckCheck,
  Info,
  ChevronRight
} from 'lucide-react';

// ==========================================
// PRE-SEEDED ENTERPRISE PROFILES & RAG DATA
// ==========================================
const ENTERPRISE_PROFILES = {
  inkloom: {
    id: 'inkloom',
    name: 'Inkloom Enterprise Cloud',
    shortName: 'Inkloom Cloud',
    industry: 'B2B Generative AI & Cloud Infrastructure',
    approvedColors: ['#4F46E5', '#0F172A', '#10B981', '#2563EB'],
    logoClearSpaceMin: 24,
    toneSummary: 'Professional, transparent, and accurate. Avoid exaggerated "magical AI" hype or unverified pricing.',
    facts: [
      {
        id: 'FACT-INK-101',
        category: 'Pricing & Tiers',
        groundTruth: 'Official pricing starts at $49/seat/month (billed annually). There is no $19/month tier.',
        triggerWords: ['$19/month', '$19 per month', 'unlimited free tier'],
        replacement: '$49/seat/month (billed annually)',
        severity: 'high'
      },
      {
        id: 'FACT-INK-102',
        category: 'SLA & Uptime',
        groundTruth: 'Enterprise SLA guarantees 99.95% uptime with service credits (never claim 100% uptime).',
        triggerWords: ['100% uptime', '100% guaranteed uptime', 'zero downtime ever'],
        replacement: '99.95% SLA-backed uptime',
        severity: 'high'
      },
      {
        id: 'FACT-INK-103',
        category: 'Security Certifications',
        groundTruth: 'Inkloom is SOC2 Type II, ISO 27001, and GDPR compliant. FedRAMP High is not yet active.',
        triggerWords: ['FedRAMP High certified', 'DoD IL6 approved'],
        replacement: 'SOC2 Type II, ISO 27001, and GDPR compliant',
        severity: 'high'
      }
    ],
    rules: [
      {
        id: 'RULE-TONE-201',
        category: 'Brand Tone & Voice',
        name: 'No Exaggerated Hype',
        description: 'Avoid hyperbolic claims like "magical AI that kills all competitors".',
        triggerWords: ['magical AI that kills all competitors', 'world\'s only magical AI'],
        replacement: 'enterprise-grade generative AI built for reliable workflows',
        severity: 'medium'
      },
      {
        id: 'RULE-LEGAL-301',
        category: 'Legal & Compliance',
        name: 'Human-in-the-Loop Requirement',
        description: 'Never claim the AI replaces legal teams or signs off autonomously without human review.',
        triggerWords: ['100% autonomous legal sign-off without humans', 'replaces your entire compliance legal team'],
        replacement: 'accelerates review workflows with human-in-the-loop governance',
        severity: 'high'
      }
    ],
    presets: [
      {
        id: 'preset-ink-1',
        badge: 'Try Sample 1: Cloud Launch (5 Issues)',
        title: 'Q4 Product Launch Press Release',
        subtitle: 'Has $19 pricing hallucination, 100% uptime error, off-brand red banner & hype tone',
        assetType: 'Press Release',
        bannerHex: '#EF4444', // Off-brand Red
        logoClearSpace: 12,   // Below 24px min
        bannerTitle: 'INKLOOM_Q4_LAUNCH_BANNER.PNG',
        content: `FOR IMMEDIATE RELEASE: Inkloom Enterprise Cloud Redefines Content Velocity.

Today we are thrilled to announce the general availability of Inkloom Enterprise Cloud, the world's only magical AI that kills all competitors.

Organizations can now deploy our full multi-modal governance engine for just $19/month with an industry-first 100% guaranteed uptime across all global regions. Furthermore, our platform is fully FedRAMP High certified and replaces your entire compliance legal team from day one.`
      },
      {
        id: 'preset-ink-2',
        badge: 'Try Sample 2: Social Ad (4 Issues)',
        title: 'LinkedIn Enterprise Ad Campaign',
        subtitle: 'Contains autonomous legal claim, $19/mo pricing error & zero-downtime claim',
        assetType: 'Social Campaign',
        bannerHex: '#4F46E5',
        logoClearSpace: 28,
        bannerTitle: 'LINKEDIN_ENTERPRISE_CARD.SVG',
        content: `Scaling generative AI across 50+ regional marketing teams? Stop waiting weeks for manual brand reviews.

Inkloom Enterprise Cloud delivers 100% autonomous legal sign-off without humans and comes with zero downtime ever. Built for regulated enterprises at $19 per month, our DoD IL6 approved architecture keeps every campaign on-brand.`
      },
      {
        id: 'preset-ink-3',
        badge: 'Try Sample 3: 100% Clean Draft (0 Issues)',
        title: 'Approved Executive Brief (Compliant)',
        subtitle: 'Follows all RAG facts, legal disclaimers, and visual brand guidelines',
        assetType: 'Executive Brief',
        bannerHex: '#4F46E5',
        logoClearSpace: 30,
        bannerTitle: 'EXEC_BRIEF_APPROVED.PNG',
        content: `Inkloom Enterprise Cloud empowers distributed marketing and compliance teams with enterprise-grade generative AI built for reliable workflows.

Available starting at $49/seat/month (billed annually), the platform delivers 99.95% SLA-backed uptime and is SOC2 Type II, ISO 27001, and GDPR compliant. It accelerates review workflows with human-in-the-loop governance so every campaign ships with confidence.`
      }
    ]
  },
  fintrust: {
    id: 'fintrust',
    name: 'FinTrust Global Bank',
    shortName: 'FinTrust Bank',
    industry: 'Institutional Wealth & Digital Banking',
    approvedColors: ['#065F46', '#0F172A', '#D97706', '#1E293B'],
    logoClearSpaceMin: 28,
    toneSummary: 'Conservative, fiduciary, and risk-aware. Must include variable APY and market risk disclosures.',
    facts: [
      {
        id: 'FACT-FIN-101',
        category: 'Yield & Returns',
        groundTruth: 'Treasury Yield Plus offers up to 7.25% variable APY (never claim guaranteed 18% returns).',
        triggerWords: ['guaranteed 18% annual return', 'risk-free 18% APY'],
        replacement: 'up to 7.25% variable APY (subject to market conditions)',
        severity: 'high'
      },
      {
        id: 'FACT-FIN-102',
        category: 'Wire Fee Schedule',
        groundTruth: 'Domestic wires are free; international SWIFT wires have a $15 flat fee.',
        triggerWords: ['zero wire fees worldwide forever'],
        replacement: 'zero domestic wire fees ($15 flat international SWIFT fee)',
        severity: 'high'
      }
    ],
    rules: [
      {
        id: 'RULE-FIN-201',
        category: 'Brand Tone & Voice',
        name: 'No Speculative Slang',
        description: 'Avoid crypto/speculative slang like "moon your corporate treasury overnight".',
        triggerWords: ['moon your corporate treasury overnight', 'get rich effortlessly'],
        replacement: 'optimize institutional liquidity with disciplined risk management',
        severity: 'medium'
      },
      {
        id: 'RULE-FIN-301',
        category: 'Legal & Compliance',
        name: 'Mandatory Market Risk Disclosure',
        description: 'Never state an investment product is "100% immune to market downturns".',
        triggerWords: ['100% immune to market downturns'],
        replacement: 'structured to mitigate volatility (investments remain subject to market risk)',
        severity: 'high'
      }
    ],
    presets: [
      {
        id: 'preset-fin-1',
        badge: 'Try Sample: Bank Promo Email (4 Issues)',
        title: 'Treasury Yield Plus Promo Email',
        subtitle: 'Contains hallucinated 18% guaranteed APY, speculative slang & off-brand pink banner',
        assetType: 'Customer Email',
        bannerHex: '#EC4899',
        logoClearSpace: 14,
        bannerTitle: 'TREASURY_PROMO_BANNER.PNG',
        content: `Ready to moon your corporate treasury overnight?

FinTrust Global Bank's new Treasury Yield Plus account delivers a guaranteed 18% annual return with zero wire fees worldwide forever. Our institutional vault is 100% immune to market downturns so CFOs can relax.`
      }
    ]
  },
  aura: {
    id: 'aura',
    name: 'Aura HealthTech Diagnostics',
    shortName: 'Aura HealthTech',
    industry: 'Clinical AI & Medical Imaging',
    approvedColors: ['#0284C7', '#0F172A', '#0D9488', '#334155'],
    logoClearSpaceMin: 20,
    toneSummary: 'Evidence-based and clinically validated. Always frame AI as assisting doctors, never replacing them.',
    facts: [
      {
        id: 'FACT-AUR-101',
        category: 'Clinical Trial Accuracy',
        groundTruth: 'AuraScan demonstrated 96.4% clinical sensitivity in peer-reviewed trials (not 100%).',
        triggerWords: ['100% cancer detection accuracy', 'zero false negatives ever'],
        replacement: '96.4% clinical sensitivity in peer-reviewed multi-center trials',
        severity: 'high'
      }
    ],
    rules: [
      {
        id: 'RULE-AUR-201',
        category: 'Legal & Compliance',
        name: 'Clinical Decision-Support Framing',
        description: 'Must state AI assists radiologists; never claim it replaces doctors.',
        triggerWords: ['replaces radiologists completely', 'no doctor review needed'],
        replacement: 'assists board-certified radiologists as a clinical decision-support tool',
        severity: 'high'
      }
    ],
    presets: [
      {
        id: 'preset-aur-1',
        badge: 'Try Sample: Medical Brochure (4 Issues)',
        title: 'Hospital Procurement Brochure',
        subtitle: 'Claims 100% detection accuracy & autonomous doctor replacement',
        assetType: 'Sales Brochure',
        bannerHex: '#F97316',
        logoClearSpace: 10,
        bannerTitle: 'HOSPITAL_BROCHURE_HEADER.PNG',
        content: `Aura HealthTech introduces AuraScan 4.0—the clinical imaging engine that replaces radiologists completely with no doctor review needed.

Backed by 100% cancer detection accuracy and zero false negatives ever, hospitals can eliminate radiology department backlogs immediately.`
      }
    ]
  }
};

// Initial Queue Items for Tab 2
const INITIAL_APPROVAL_QUEUE = [
  {
    id: 'REV-891',
    title: 'Q4 Enterprise Cloud Launch Press Release',
    enterprise: 'Inkloom Enterprise Cloud',
    author: 'Aarav Mehta (Marketing)',
    submittedAt: '10 mins ago',
    assetType: 'Press Release',
    initialScore: 38,
    currentScore: 98,
    fixesApplied: 5,
    status: 'Pending Review',
    content: `FOR IMMEDIATE RELEASE: Inkloom Enterprise Cloud Redefines Content Velocity.\n\nToday we are thrilled to announce the general availability of Inkloom Enterprise Cloud, an enterprise-grade generative AI built for reliable workflows.\n\nOrganizations can now deploy our full multi-modal governance engine for $49/seat/month (billed annually) with an industry-first 99.95% SLA-backed uptime across all global regions. Furthermore, our platform is SOC2 Type II, ISO 27001, and GDPR compliant and accelerates review workflows with human-in-the-loop governance from day one.`,
    auditLog: [
      { time: '08:25 AM', actor: 'AI Scan Engine', action: 'Flagged 3 factual errors and 2 brand/legal rules.' },
      { time: '08:27 AM', actor: 'Aarav Mehta', action: 'Clicked "Accept All Fixes" — Score jumped from 38% to 98%.' }
    ],
    reviewerNote: ''
  },
  {
    id: 'REV-890',
    title: 'Institutional Treasury Yield Webinar Copy',
    enterprise: 'FinTrust Global Bank',
    author: 'Priya Nair (Brand Lead)',
    submittedAt: '1 hour ago',
    assetType: 'Customer Email',
    initialScore: 64,
    currentScore: 100,
    fixesApplied: 3,
    status: 'Approved for Publication',
    content: `Join FinTrust Global Bank for our Q4 Institutional Liquidity Briefing. Learn how CFOs optimize institutional liquidity with disciplined risk management while earning up to 7.25% variable APY (subject to market conditions) with zero domestic wire fees ($15 flat international SWIFT fee).`,
    auditLog: [
      { time: '07:15 AM', actor: 'AI Scan Engine', action: 'Verified APY and wire fee disclosures against FinTrust RAG rules.' },
      { time: '07:30 AM', actor: 'Rohan Kulkarni (VP Legal)', action: 'Approved for publication.' }
    ],
    reviewerNote: 'Complies with Q4 financial disclosure guidelines. Ready to publish.'
  }
];

export default function App() {
  // Navigation & Global UI State
  const [activeTab, setActiveTab] = useState('workspace');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState('inkloom');
  const [profiles, setProfiles] = useState(ENTERPRISE_PROFILES);
  const [showQuickGuideBanner, setShowQuickGuideBanner] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [autoDemoStepText, setAutoDemoStepText] = useState(null);

  const activeProfile = profiles[selectedEnterpriseId];

  // Tab 1: Content & Visual Editor State
  const [draftTitle, setDraftTitle] = useState(activeProfile.presets[0].title);
  const [assetType, setAssetType] = useState(activeProfile.presets[0].assetType);
  const [draftText, setDraftText] = useState(activeProfile.presets[0].content);
  const [bannerHex, setBannerHex] = useState(activeProfile.presets[0].bannerHex);
  const [logoClearSpace, setLogoClearSpace] = useState(activeProfile.presets[0].logoClearSpace);
  const [bannerTitle, setBannerTitle] = useState(activeProfile.presets[0].bannerTitle);

  const [dismissedIssueIds, setDismissedIssueIds] = useState({});
  const [acceptedFixHistory, setAcceptedFixHistory] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Tab 2: Approval Queue State
  const [approvalQueue, setApprovalQueue] = useState(INITIAL_APPROVAL_QUEUE);
  const [selectedQueueItem, setSelectedQueueItem] = useState(INITIAL_APPROVAL_QUEUE[0]);
  const [reviewerNoteInput, setReviewerNoteInput] = useState('');
  const [queueFilter, setQueueFilter] = useState('ALL');

  // Tab 3: Easy Custom Rule Form State
  const [newRuleType, setNewRuleType] = useState('fact');
  const [newCategory, setNewCategory] = useState('Pricing & Offers');
  const [newTriggerPhrase, setNewTriggerPhrase] = useState('');
  const [newGroundTruth, setNewGroundTruth] = useState('');
  const [newReplacement, setNewReplacement] = useState('');

  // Helper to show a friendly toast banner
  const triggerToast = (msg, actionTab = null, actionLabel = null) => {
    setToastMessage({ text: msg, actionTab, actionLabel });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Switch Brand Profile
  const handleEnterpriseChange = (newId) => {
    setSelectedEnterpriseId(newId);
    const nextProfile = profiles[newId];
    const preset = nextProfile.presets[0];
    setDraftTitle(preset.title);
    setAssetType(preset.assetType);
    setDraftText(preset.content);
    setBannerHex(preset.bannerHex);
    setLogoClearSpace(preset.logoClearSpace);
    setBannerTitle(preset.bannerTitle);
    setDismissedIssueIds({});
    setAcceptedFixHistory([]);
    triggerToast(`Switched brand rulebook to ${nextProfile.name}`);
  };

  // Load 1-Click Sample Preset
  const handleLoadPreset = (preset) => {
    setDraftTitle(preset.title);
    setAssetType(preset.assetType);
    setDraftText(preset.content);
    setBannerHex(preset.bannerHex);
    setLogoClearSpace(preset.logoClearSpace);
    setBannerTitle(preset.bannerTitle);
    setDismissedIssueIds({});
    setAcceptedFixHistory([]);
    triggerToast(`Loaded "${preset.title}" — Check the highlighted issues below!`);
  };

  // ==========================================================
  // REAL-TIME AI RAG & VISUAL DIAGNOSTIC ENGINE
  // ==========================================================
  const diagnosticReport = useMemo(() => {
    const detectedIssues = [];
    const lowerText = draftText.toLowerCase();

    // 1. Check Verified Facts (RAG)
    activeProfile.facts.forEach((fact) => {
      fact.triggerWords.forEach((trigger) => {
        const idx = lowerText.indexOf(trigger.toLowerCase());
        if (idx !== -1) {
          const exactMatch = draftText.substring(idx, idx + trigger.length);
          const issueKey = `${fact.id}-${trigger}`;
          if (!dismissedIssueIds[issueKey]) {
            detectedIssues.push({
              key: issueKey,
              id: fact.id,
              type: 'FACT_HALLUCINATION',
              badgeLabel: 'Fact Hallucination',
              category: fact.category,
              offendingText: exactMatch,
              explanation: fact.groundTruth,
              replacement: fact.replacement
            });
          }
        }
      });
    });

    // 2. Check Brand Tone & Legal Rules
    activeProfile.rules.forEach((rule) => {
      rule.triggerWords.forEach((trigger) => {
        const idx = lowerText.indexOf(trigger.toLowerCase());
        if (idx !== -1) {
          const exactMatch = draftText.substring(idx, idx + trigger.length);
          const issueKey = `${rule.id}-${trigger}`;
          if (!dismissedIssueIds[issueKey]) {
            const isLegal = rule.id.includes('LEGAL') || rule.category.toLowerCase().includes('legal');
            detectedIssues.push({
              key: issueKey,
              id: rule.id,
              type: isLegal ? 'LEGAL_COMPLIANCE' : 'BRAND_TONE',
              badgeLabel: isLegal ? 'Legal / Compliance Risk' : 'Off-Brand Tone',
              category: rule.category,
              offendingText: exactMatch,
              explanation: `${rule.name}: ${rule.description}`,
              replacement: rule.replacement
            });
          }
        }
      });
    });

    // 3. Visual Brand Checks (Banner Color & Logo Padding)
    const isColorApproved = activeProfile.approvedColors
      .map((c) => c.toUpperCase())
      .includes(bannerHex.toUpperCase());
    const isClearSpaceValid = logoClearSpace >= activeProfile.logoClearSpaceMin;
    const visualIssuesCount = (!isColorApproved ? 1 : 0) + (!isClearSpaceValid ? 1 : 0);

    // Calculate Simple, Easy-to-Read Sub-Scores
    const factErrors = detectedIssues.filter((i) => i.type === 'FACT_HALLUCINATION').length;
    const toneErrors = detectedIssues.filter((i) => i.type === 'BRAND_TONE').length;
    const legalErrors = detectedIssues.filter((i) => i.type === 'LEGAL_COMPLIANCE').length;

    const factualScore = Math.max(20, 100 - factErrors * 28);
    const toneScore = Math.max(25, 100 - toneErrors * 25);
    const legalScore = Math.max(20, 100 - legalErrors * 35);
    const visualScore = (isColorApproved ? 50 : 15) + (isClearSpaceValid ? 50 : 20);

    const overallScore = Math.round(
      factualScore * 0.35 + toneScore * 0.25 + legalScore * 0.25 + visualScore * 0.15
    );

    return {
      issues: detectedIssues,
      isColorApproved,
      isClearSpaceValid,
      visualIssuesCount,
      totalIssuesCount: detectedIssues.length + visualIssuesCount,
      scores: {
        overall: overallScore,
        factual: factualScore,
        tone: toneScore,
        legal: legalScore,
        visual: visualScore
      }
    };
  }, [draftText, activeProfile, bannerHex, logoClearSpace, dismissedIssueIds]);

  // One-Click Accept Single Text Fix
  const handleAcceptSingleFix = (issue) => {
    const updatedDraft = draftText.replace(issue.offendingText, issue.replacement);
    setDraftText(updatedDraft);
    setAcceptedFixHistory((prev) => [
      {
        id: issue.id,
        from: issue.offendingText,
        to: issue.replacement,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev
    ]);
    triggerToast(`Fixed [${issue.id}]: Replaced "${issue.offendingText}"`);
  };

  // One-Click Auto-Fix Visual Banner Issues
  const handleAutoFixVisuals = () => {
    setBannerHex(activeProfile.approvedColors[0]);
    setLogoClearSpace(activeProfile.logoClearSpaceMin + 4);
    triggerToast('Visual Banner Fixed! Applied official brand color & logo clear-space.');
  };

  // One-Click Accept ALL Fixes (Text + Visuals)
  const handleAcceptAllFixes = () => {
    let updated = draftText;
    const newlyFixed = [];
    diagnosticReport.issues.forEach((issue) => {
      if (updated.includes(issue.offendingText)) {
        updated = updated.replace(issue.offendingText, issue.replacement);
        newlyFixed.push({
          id: issue.id,
          from: issue.offendingText,
          to: issue.replacement,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    });
    setDraftText(updated);
    setBannerHex(activeProfile.approvedColors[0]);
    setLogoClearSpace(activeProfile.logoClearSpaceMin + 4);
    setAcceptedFixHistory((prev) => [...newlyFixed, ...prev]);
    triggerToast('All text & visual issues fixed! Brand Compliance Score is now 100%.');
  };

  // 1-Click Automated Interactive Demo for Judges
  const handleRunInteractiveJudgeDemo = () => {
    setActiveTab('workspace');
    const sample = activeProfile.presets[0];
    setDraftTitle(sample.title);
    setAssetType(sample.assetType);
    setDraftText(sample.content);
    setBannerHex(sample.bannerHex);
    setLogoClearSpace(sample.logoClearSpace);
    setDismissedIssueIds({});
    setAcceptedFixHistory([]);

    setAutoDemoStepText('Step 1/3: Loaded a sample launch draft with 5 deliberate errors (pricing hallucination, 100% uptime claim & off-brand red banner)...');

    setTimeout(() => {
      setAutoDemoStepText('Step 2/3: Applying non-destructive AI Smart Suggestions & fixing banner color to official brand indigo...');
      let fixedText = sample.content;
      activeProfile.facts.forEach((f) => {
        f.triggerWords.forEach((tw) => {
          fixedText = fixedText.replace(new RegExp(tw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), f.replacement);
        });
      });
      activeProfile.rules.forEach((r) => {
        r.triggerWords.forEach((tw) => {
          fixedText = fixedText.replace(new RegExp(tw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), r.replacement);
        });
      });
      setDraftText(fixedText);
      setBannerHex(activeProfile.approvedColors[0]);
      setLogoClearSpace(activeProfile.logoClearSpaceMin + 6);
    }, 2200);

    setTimeout(() => {
      setAutoDemoStepText('Step 3/3: Compliance Score reached 100%! Ready to click "Send to Approval Queue" or explore tabs above.');
      setTimeout(() => setAutoDemoStepText(null), 4500);
    }, 4500);
  };

  // Submit Draft to Human-in-the-Loop Approval Queue
  const handleSendToQueue = () => {
    const newItem = {
      id: `REV-${Math.floor(900 + Math.random() * 90)}`,
      title: draftTitle || 'Untitled Campaign Draft',
      enterprise: activeProfile.name,
      author: 'Live Demo User',
      submittedAt: 'Just now',
      assetType,
      initialScore: Math.max(38, diagnosticReport.scores.overall - acceptedFixHistory.length * 14),
      currentScore: diagnosticReport.scores.overall,
      fixesApplied: acceptedFixHistory.length,
      status: diagnosticReport.scores.overall >= 85 ? 'Pending Review' : 'Changes Requested',
      content: draftText,
      auditLog: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actor: 'NovaGuard RAG Engine',
          action: `Scanned against ${activeProfile.name} rulebook. Final Compliance Score: ${diagnosticReport.scores.overall}%.`
        }
      ],
      reviewerNote: ''
    };

    setApprovalQueue((prev) => [newItem, ...prev]);
    setSelectedQueueItem(newItem);
    triggerToast(
      `Sent "${newItem.title}" to the Human-in-the-Loop Approval Queue!`,
      'approvals',
      'Open Approval Queue →'
    );
  };

  // Copy Clean Content Helper
  const handleCopyContent = () => {
    navigator.clipboard?.writeText(draftText);
    triggerToast('Copied clean marketing copy to clipboard!');
  };

  // Download Audit Report Helper
  const handleDownloadReport = () => {
    const reportContent = `NOVAGUARD AI — ENTERPRISE BRAND GOVERNANCE REPORT
====================================================
Enterprise Profile: ${activeProfile.name}
Asset Title: ${draftTitle} (${assetType})
Overall Compliance Score: ${diagnosticReport.scores.overall}%
  - Factual Accuracy (RAG): ${diagnosticReport.scores.factual}%
  - Brand Tone & Voice: ${diagnosticReport.scores.tone}%
  - Legal & Regulatory: ${diagnosticReport.scores.legal}%
  - Visual Identity: ${diagnosticReport.scores.visual}%

REMAINING ISSUES (${diagnosticReport.issues.length}):
${
  diagnosticReport.issues.length === 0
    ? 'None — 100% Compliant with enterprise guidelines.'
    : diagnosticReport.issues.map((i) => `- [${i.id}] "${i.offendingText}" -> Suggest: "${i.replacement}"`).join('\n')
}

FINAL CONTENT:
----------------------------------------------------
${draftText}
`;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draftTitle.toLowerCase().replace(/\s+/g, '_')}_audit_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Downloaded Compliance Audit Report (.txt)!');
  };

  // Render Clickable Highlighted Text Preview
  const renderHighlightedDraft = () => {
    if (!draftText) return null;
    if (diagnosticReport.issues.length === 0) {
      return (
        <div className="whitespace-pre-wrap text-slate-800 leading-relaxed text-sm">
          {draftText}
        </div>
      );
    }

    const sortedMatches = diagnosticReport.issues
      .map((issue) => ({ ...issue, index: draftText.indexOf(issue.offendingText) }))
      .filter((m) => m.index !== -1)
      .sort((a, b) => a.index - b.index);

    const nonOverlapping = [];
    let lastEnd = -1;
    sortedMatches.forEach((m) => {
      if (m.index >= lastEnd) {
        nonOverlapping.push(m);
        lastEnd = m.index + m.offendingText.length;
      }
    });

    const segments = [];
    let cursor = 0;

    nonOverlapping.forEach((match, idx) => {
      if (match.index > cursor) {
        segments.push(<span key={`txt-${idx}`}>{draftText.substring(cursor, match.index)}</span>);
      }

      const highlightStyle =
        match.type === 'FACT_HALLUCINATION'
          ? 'bg-rose-100 text-rose-900 border-b-2 border-rose-500 hover:bg-rose-200'
          : match.type === 'LEGAL_COMPLIANCE'
          ? 'bg-purple-100 text-purple-900 border-b-2 border-purple-500 hover:bg-purple-200'
          : 'bg-amber-100 text-amber-900 border-b-2 border-amber-500 hover:bg-amber-200';

      segments.push(
        <button
          key={`match-${idx}`}
          type="button"
          onClick={() => handleAcceptSingleFix(match)}
          className={`inline ${highlightStyle} font-semibold px-1.5 py-0.5 rounded transition-all cursor-pointer mx-0.5`}
          title={`Click to replace with: "${match.replacement}"`}
        >
          <span className="line-through opacity-85">{match.offendingText}</span>
          <span className="ml-1.5 text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white no-underline">
            Fix ↻
          </span>
        </button>
      );

      cursor = match.index + match.offendingText.length;
    });

    if (cursor < draftText.length) {
      segments.push(<span key="txt-end">{draftText.substring(cursor)}</span>);
    }

    return <div className="whitespace-pre-wrap text-slate-800 leading-relaxed text-sm">{segments}</div>;
  };

  // Tab 2: Approve or Request Changes Handler
  const handleQueueDecision = (itemId, newStatus) => {
    const note =
      reviewerNoteInput.trim() ||
      (newStatus === 'Approved for Publication'
        ? 'Verified against brand & RAG rules. Approved for release.'
        : 'Please fix the flagged claims before final publication.');

    const updated = approvalQueue.map((item) => {
      if (item.id !== itemId) return item;
      const nextItem = {
        ...item,
        status: newStatus,
        reviewerNote: note,
        auditLog: [
          ...item.auditLog,
          {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actor: 'Compliance Lead (You)',
            action: `${newStatus} — "${note}"`
          }
        ]
      };
      setSelectedQueueItem(nextItem);
      return nextItem;
    });

    setApprovalQueue(updated);
    setReviewerNoteInput('');
    triggerToast(`Updated status for ${itemId} to "${newStatus}"`);
  };

  // Tab 3: Add Custom Rule & Test Immediately in Tab 1
  const handleAddRuleAndTest = (e, shouldTestImmediately = false) => {
    e.preventDefault();
    if (!newTriggerPhrase.trim() || !newGroundTruth.trim() || !newReplacement.trim()) return;

    const triggerClean = newTriggerPhrase.trim();
    const truthClean = newGroundTruth.trim();
    const replaceClean = newReplacement.trim();

    const updatedProfile = { ...activeProfile };
    let newId = '';

    if (newRuleType === 'fact') {
      newId = `FACT-${activeProfile.id.substring(0, 3).toUpperCase()}-${104 + updatedProfile.facts.length}`;
      updatedProfile.facts = [
        {
          id: newId,
          category: newCategory,
          groundTruth: truthClean,
          triggerWords: [triggerClean],
          replacement: replaceClean,
          severity: 'high'
        },
        ...updatedProfile.facts
      ];
    } else {
      newId = `RULE-${activeProfile.id.substring(0, 3).toUpperCase()}-${204 + updatedProfile.rules.length}`;
      updatedProfile.rules = [
        {
          id: newId,
          category: newCategory,
          name: newCategory,
          description: truthClean,
          triggerWords: [triggerClean],
          replacement: replaceClean,
          severity: 'medium'
        },
        ...updatedProfile.rules
      ];
    }

    setProfiles((prev) => ({ ...prev, [selectedEnterpriseId]: updatedProfile }));
    setNewTriggerPhrase('');
    setNewGroundTruth('');
    setNewReplacement('');

    if (shouldTestImmediately) {
      setDraftText((prev) => `${prev}\n\nSpecial Announcement: Try our new offer featuring ${triggerClean}!`);
      setActiveTab('workspace');
      triggerToast(`Added rule [${newId}] and injected "${triggerClean}" into the editor so you can see it flagged live!`);
    } else {
      triggerToast(`Added new rule [${newId}] to ${activeProfile.name} Knowledge Base!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* =========================================================
          TOP HEADER BAR (SIMPLE, CLEAR, ZERO LOGIN BARRIERS)
      ========================================================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* App Brand & Team Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900">NovaGuard AI</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Team Nova Tech • Round 2 MVP
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Automated Brand Governance, RAG Fact-Checker & Human-in-the-Loop Approval
              </p>
            </div>
          </div>

          {/* Right Controls: Brand Switcher + 1-Click Auto-Demo + Help Guide */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Step 1 Brand Selector */}
            <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-medium text-slate-600">Active Brand:</span>
              <select
                value={selectedEnterpriseId}
                onChange={(e) => handleEnterpriseChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                {Object.values(profiles).map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 1-Click Auto Demo Button for Judges */}
            <button
              onClick={handleRunInteractiveJudgeDemo}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Automatically loads a sample draft, highlights errors, and demonstrates AI fixes"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>1-Click Auto-Demo</span>
            </button>

            {/* How to Use / Judge's Guide Modal Trigger */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>How to Use</span>
            </button>
          </div>
        </div>

        {/* 4 Super-Clear Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto border-t border-slate-100 bg-slate-50/60">
          {[
            {
              id: 'workspace',
              label: '1. Content Check & Smart Editor',
              icon: Sparkles,
              badge:
                diagnosticReport.totalIssuesCount > 0
                  ? `${diagnosticReport.totalIssuesCount} Issues Found`
                  : '100% Compliant',
              badgeStyle:
                diagnosticReport.totalIssuesCount > 0
                  ? 'bg-rose-100 text-rose-700 border-rose-200'
                  : 'bg-emerald-100 text-emerald-700 border-emerald-200'
            },
            {
              id: 'approvals',
              label: '2. Approval Queue (Human-in-the-Loop)',
              icon: CheckSquare,
              badge: `${approvalQueue.filter((i) => i.status === 'Pending Review').length} Pending`,
              badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200'
            },
            {
              id: 'knowledge',
              label: '3. Brand Rules & Facts (RAG DB)',
              icon: Database,
              badge: `${activeProfile.facts.length + activeProfile.rules.length} Active Rules`,
              badgeStyle: 'bg-indigo-100 text-indigo-700 border-indigo-200'
            },
            {
              id: 'analytics',
              label: '4. Executive Analytics & ROI',
              icon: BarChart3,
              badge: '$6M+ Risk Saved',
              badgeStyle: 'bg-slate-200 text-slate-700 border-slate-300'
            }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold ${tab.badgeStyle}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* =========================================================
          FLOATING TOAST NOTIFICATION & AUTO-DEMO BANNER
      ========================================================= */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage.text}</span>
          {toastMessage.actionTab && (
            <button
              onClick={() => {
                setActiveTab(toastMessage.actionTab);
                setToastMessage(null);
              }}
              className="ml-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold cursor-pointer"
            >
              {toastMessage.actionLabel}
            </button>
          )}
        </div>
      )}

      {autoDemoStepText && (
        <div className="bg-indigo-600 text-white px-4 py-2.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm">
          <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
          <span>{autoDemoStepText}</span>
        </div>
      )}

      {/* =========================================================
          HOW TO USE / JUDGE'S GUIDE MODAL
      ========================================================= */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Quick 30-Second Guide (No Technical Setup Needed)
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">1. Load a Sample Campaign (Tab 1)</div>
                <p className="mt-0.5">
                  Click any of the <strong>&quot;Try Sample&quot;</strong> buttons at the top of Tab 1, or switch between <strong>Inkloom Cloud</strong>, <strong>FinTrust Bank</strong>, and <strong>Aura HealthTech</strong> in the top bar.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">2. Fix Hallucinations & Off-Brand Colors in 1 Click</div>
                <p className="mt-0.5">
                  Red, amber, and purple highlights show where the AI caught false pricing,誇hype tone, or missing legal disclaimers. Click any highlighted phrase (or click <strong>&quot;Fix All Issues in 1 Click&quot;</strong>) to watch the Compliance Score jump to 100%.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900">3. Approve or Add Custom Brand Rules (Tabs 2 & 3)</div>
                <p className="mt-0.5">
                  Send your clean draft to the <strong>Approval Queue (Tab 2)</strong> for one-click manager sign-off, or add your own custom rule in <strong>Brand Rules (Tab 3)</strong> and test it live!
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowHelpModal(false);
                  handleRunInteractiveJudgeDemo();
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
              >
                Run 1-Click Auto-Demo Now
              </button>
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Got It, Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MAIN PAGE CONTENT
      ========================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* =======================================================
            COLLAPSIBLE 1-2-3 GUIDED WORKFLOW BANNER
        ======================================================= */}
        {showQuickGuideBanner && (
          <div className="bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border border-indigo-200/80 rounded-2xl p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
                  Easy 3-Step Workflow
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  Test the entire AI Brand Governance pipeline in 3 clicks:
                </span>
              </div>
              <button
                onClick={() => setShowQuickGuideBanner(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
              >
                Dismiss Guide ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="bg-white/90 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Pick a Sample Draft Below</div>
                  <p className="text-[11px] text-slate-500">
                    Load a pre-made press release or social ad with intentional AI hallucinations &amp; wrong brand colors.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Click &quot;Fix All Issues&quot; (or Click Highlights)</div>
                  <p className="text-[11px] text-slate-500">
                    Accept non-destructive AI rewrites for false claims and auto-fix the banner hex color.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Send to Approval Queue &amp; Sign Off</div>
                  <p className="text-[11px] text-slate-500">
                    Submit your 100% compliant draft to the Human-in-the-Loop queue for final approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 1: CONTENT CHECK & SMART EDITOR
        ======================================================= */}
        {activeTab === 'workspace' && (
          <div className="space-y-6">
            {/* STEP 1 BAR: 1-CLICK SAMPLE PRESET SELECTOR */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-extrabold">
                    STEP 1
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">
                    Choose a Sample Marketing Draft to Test (or type your own below):
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  Checking against: <strong className="text-slate-800">{activeProfile.name} Rulebook</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeProfile.presets.map((preset) => {
                  const isCurrent = draftTitle === preset.title;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleLoadPreset(preset)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-600/15'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            preset.badge.includes('0 Issues')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {preset.badge}
                        </span>
                        {isCurrent && (
                          <span className="text-[11px] font-bold text-indigo-600">✓ Loaded</span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900">{preset.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{preset.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COMPLIANCE SCORE SUMMARY STRIP + 1-CLICK MASTER FIX BUTTON */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Left: Overall Score Badge */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-extrabold border-2 shrink-0 ${
                    diagnosticReport.scores.overall >= 85
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : diagnosticReport.scores.overall >= 65
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-rose-50 text-rose-700 border-rose-300'
                  }`}
                >
                  <span className="text-xl leading-none">{diagnosticReport.scores.overall}%</span>
                  <span className="text-[10px] font-semibold uppercase mt-0.5">Score</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {diagnosticReport.totalIssuesCount === 0
                        ? '100% Brand Compliant — Ready for Approval!'
                        : `${diagnosticReport.totalIssuesCount} Brand & Fact Issues Need Attention`}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {diagnosticReport.totalIssuesCount === 0
                      ? 'All factual claims, tone rules, legal disclaimers, and visual colors match official guidelines.'
                      : 'Click "Fix All Issues in 1 Click" on the right, or review individual fixes below.'}
                  </p>
                </div>
              </div>

              {/* Center: 4 Category Mini-Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: 'Fact Accuracy', val: diagnosticReport.scores.factual },
                  { label: 'Brand Tone', val: diagnosticReport.scores.tone },
                  { label: 'Legal Rules', val: diagnosticReport.scores.legal },
                  { label: 'Visual Brand', val: diagnosticReport.scores.visual }
                ].map((m, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center">
                    <div className="text-[11px] text-slate-500 font-medium">{m.label}</div>
                    <div
                      className={`text-sm font-extrabold ${
                        m.val >= 85 ? 'text-emerald-600' : m.val >= 60 ? 'text-amber-600' : 'text-rose-600'
                      }`}
                    >
                      {m.val}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Primary 1-Click Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {diagnosticReport.totalIssuesCount > 0 ? (
                  <button
                    onClick={handleAcceptAllFixes}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Fix All Issues in 1 Click ({diagnosticReport.totalIssuesCount})</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSendToQueue}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Step 3: Send to Approval Queue →</span>
                  </button>
                )}
              </div>
            </div>

            {/* STEP 2 MAIN WORKSPACE: LEFT = EDITOR + VISUAL CHECKER | RIGHT = SMART FIX CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT 7 COLUMNS: TEXT EDITOR + CLICKABLE HIGHLIGHT PREVIEW + VISUAL CHECKER */}
              <div className="lg:col-span-7 space-y-6">
                {/* Content Editor & Interactive Highlight Box */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-extrabold">
                        STEP 2A
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        Draft Text &amp; Interactive Highlight Checker
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyContent}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </button>
                      <button
                        onClick={handleDownloadReport}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Report</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Interactive Highlighted View (Click any highlight to fix immediately!) */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Eye className="w-4 h-4 text-indigo-600" />
                          Interactive AI Highlight View (Click any colored phrase below to fix it instantly!):
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800">Red = False Fact</span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">Yellow = Off-Brand Tone</span>
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800">Purple = Legal Risk</span>
                        </div>
                      </div>
                      {renderHighlightedDraft()}
                    </div>

                    {/* Raw Textarea for Free-Form Typing */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Or Edit / Paste Custom Text Directly:
                      </label>
                      <textarea
                        rows={4}
                        value={draftText}
                        onChange={(e) => setDraftText(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                        placeholder="Type or paste marketing content here..."
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2B: VISUAL BRAND BANNER CHECKER (WITH 1-CLICK AUTO-FIX) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-extrabold">
                        STEP 2B
                      </span>
                      <Palette className="w-4 h-4 text-indigo-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Visual Banner Audit (Brand Color &amp; Logo Spacing)
                      </h3>
                    </div>

                    {(!diagnosticReport.isColorApproved || !diagnosticReport.isClearSpaceValid) ? (
                      <button
                        onClick={handleAutoFixVisuals}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shadow-xs"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>1-Click Auto-Fix Banner Visuals</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        ✓ Visuals Match Brand Guidelines
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Live Visual Mockup Preview */}
                    <div
                      className="rounded-xl p-4 border border-slate-300 flex flex-col justify-between min-h-[135px] transition-all shadow-inner"
                      style={{ backgroundColor: bannerHex }}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="bg-slate-900/90 text-white px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase border border-white/25"
                          style={{ margin: `${Math.min(logoClearSpace, 32)}px` }}
                        >
                          {activeProfile.shortName} LOGO
                        </div>
                        <span className="text-[10px] font-mono bg-black/60 text-white px-2 py-0.5 rounded">
                          Padding: {logoClearSpace}px
                        </span>
                      </div>
                      <div className="mt-2 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200">
                        <div className="text-xs font-bold text-slate-900 truncate">{draftTitle}</div>
                        <div className="text-[10px] text-slate-600">
                          Banner Color: <span className="font-mono font-bold">{bannerHex}</span>
                        </div>
                      </div>
                    </div>

                    {/* Simple Visual Controls */}
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-700">1. Official Brand Colors:</span>
                          <span
                            className={`font-bold ${
                              diagnosticReport.isColorApproved ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {diagnosticReport.isColorApproved ? '✓ Approved Color' : '✕ Off-Brand Color'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {activeProfile.approvedColors.map((hex) => (
                            <button
                              key={hex}
                              onClick={() => setBannerHex(hex)}
                              className={`w-7 h-7 rounded-lg border-2 transition-transform cursor-pointer ${
                                bannerHex.toUpperCase() === hex.toUpperCase()
                                  ? 'border-slate-900 scale-110 ring-2 ring-indigo-500/30'
                                  : 'border-white shadow-xs hover:scale-105'
                              }`}
                              style={{ backgroundColor: hex }}
                              title={`Click to apply official brand color ${hex}`}
                            />
                          ))}
                          <span className="text-[11px] text-slate-400 ml-1">← Click any swatch</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-700">
                            2. Logo Clear-Space (Min {activeProfile.logoClearSpaceMin}px):
                          </span>
                          <span
                            className={`font-bold ${
                              diagnosticReport.isClearSpaceValid ? 'text-emerald-600' : 'text-amber-600'
                            }`}
                          >
                            {diagnosticReport.isClearSpaceValid
                              ? `✓ ${logoClearSpace}px OK`
                              : `⚠ ${logoClearSpace}px Too Tight`}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={8}
                          max={36}
                          value={logoClearSpace}
                          onChange={(e) => setLogoClearSpace(Number(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT 5 COLUMNS: AI SMART SUGGESTIONS LIST + SEND TO APPROVAL */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        AI Smart Suggestions ({diagnosticReport.issues.length})
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Click <strong>&quot;Accept Fix&quot;</strong> on any card to update the text without losing your formatting.
                      </p>
                    </div>
                    {diagnosticReport.issues.length > 0 && (
                      <button
                        onClick={handleAcceptAllFixes}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shrink-0"
                      >
                        Accept All ({diagnosticReport.issues.length})
                      </button>
                    )}
                  </div>

                  <div className="p-4 space-y-3 max-h-[520px] overflow-y-auto">
                    {diagnosticReport.issues.length === 0 ? (
                      <div className="text-center py-8 px-4 space-y-3">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900">
                            All Text Claims Verified!
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                            Zero hallucinations, off-brand phrases, or legal violations remain in this draft.
                          </p>
                        </div>
                        <button
                          onClick={handleSendToQueue}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send to Approval Queue Now →</span>
                        </button>
                      </div>
                    ) : (
                      diagnosticReport.issues.map((issue) => (
                        <div
                          key={issue.key}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 hover:border-indigo-300 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                issue.type === 'FACT_HALLUCINATION'
                                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                                  : issue.type === 'LEGAL_COMPLIANCE'
                                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                                  : 'bg-amber-100 text-amber-800 border-amber-200'
                              }`}
                            >
                              {issue.badgeLabel}
                            </span>
                            <span className="text-xs font-mono font-semibold text-slate-500">
                              Rule: {issue.id}
                            </span>
                          </div>

                          <p className="text-xs text-slate-700 font-medium leading-relaxed">
                            {issue.explanation}
                          </p>

                          {/* Clear Before / After Box */}
                          <div className="bg-white rounded-lg p-3 border border-slate-200 space-y-1.5 text-xs">
                            <div className="flex items-start gap-2 text-rose-700">
                              <span className="font-bold shrink-0">Instead of:</span>
                              <span className="line-through">{issue.offendingText}</span>
                            </div>
                            <div className="flex items-start gap-2 text-emerald-700 font-semibold">
                              <span className="font-bold shrink-0">Use Approved:</span>
                              <span>{issue.replacement}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              onClick={() =>
                                setDismissedIssueIds((prev) => ({ ...prev, [issue.key]: true }))
                              }
                              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 cursor-pointer"
                            >
                              Ignore
                            </button>
                            <button
                              onClick={() => handleAcceptSingleFix(issue)}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept Fix</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Step 3 Bottom Bar inside Right Card */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                    <div className="text-xs text-slate-600">
                      <span className="font-extrabold text-indigo-700">STEP 3:</span> Ready for human sign-off?
                    </div>
                    <button
                      onClick={handleSendToQueue}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit to Review Queue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 2: HUMAN-IN-THE-LOOP APPROVAL QUEUE
        ======================================================= */}
        {activeTab === 'approvals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left List of Submitted Assets (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Human-in-the-Loop Approval Queue
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click any submitted campaign below to inspect its compliance score and approve or request changes.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['ALL', 'Pending Review', 'Approved for Publication', 'Changes Requested'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setQueueFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                        queueFilter === st
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {approvalQueue
                  .filter((item) => queueFilter === 'ALL' || item.status === queueFilter)
                  .map((item) => {
                    const isSelected = selectedQueueItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedQueueItem(item)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-indigo-600 ring-2 ring-indigo-600/15 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-indigo-700">
                              {item.id}
                            </span>
                            <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                              item.status === 'Approved for Publication'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : item.status === 'Changes Requested'
                                ? 'bg-rose-100 text-rose-800 border-rose-200'
                                : 'bg-amber-100 text-amber-800 border-amber-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                          <div>
                            <strong className="text-slate-700">{item.enterprise}</strong> • {item.author} •{' '}
                            {item.submittedAt}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-700">
                              Score: <span className="text-rose-600">{item.initialScore}%</span> →{' '}
                              <span className="text-emerald-600 font-extrabold">{item.currentScore}%</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right Sign-Off Panel (5 Cols) */}
            <div className="lg:col-span-5">
              {selectedQueueItem && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 sticky top-28 shadow-xs">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-600">
                        {selectedQueueItem.id} • {selectedQueueItem.assetType}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                        {selectedQueueItem.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Submitted by {selectedQueueItem.author}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-semibold text-slate-400">Compliance</div>
                      <div className="text-2xl font-extrabold text-emerald-600">
                        {selectedQueueItem.currentScore}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-700 mb-1.5">
                      Final Content for Publication:
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                      {selectedQueueItem.content}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-700 mb-1.5">Audit Trail:</div>
                    <div className="space-y-1.5 bg-slate-50 border border-slate-200 rounded-xl p-3">
                      {selectedQueueItem.auditLog.map((log, i) => (
                        <div key={i} className="text-xs text-slate-600">
                          <span className="font-mono text-[10px] text-slate-400 mr-1.5">{log.time}</span>
                          <strong className="text-slate-900">{log.actor}:</strong> {log.action}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 1-Click Manager Decision Controls */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700">
                      Reviewer Comment (Optional):
                    </label>
                    <input
                      type="text"
                      value={reviewerNoteInput}
                      onChange={(e) => setReviewerNoteInput(e.target.value)}
                      placeholder="e.g., Verified against Q4 brand guidelines..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleQueueDecision(selectedQueueItem.id, 'Changes Requested')}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Request Changes</span>
                      </button>
                      <button
                        onClick={() =>
                          handleQueueDecision(selectedQueueItem.id, 'Approved for Publication')
                        }
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve &amp; Publish</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 3: BRAND RULES & FACTS (RAG KNOWLEDGE BASE)
        ======================================================= */}
        {activeTab === 'knowledge' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Active Rules for Current Brand */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      {activeProfile.name} — Verified Facts &amp; Rules
                    </h2>
                    <p className="text-xs text-slate-500">
                      The AI checks every draft against these exact ground-truth facts and brand rules.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activeProfile.facts.length + activeProfile.rules.length} Rules Indexed
                  </span>
                </div>

                <div className="space-y-3">
                  {activeProfile.facts.map((fact) => (
                    <div
                      key={fact.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                          Verified Fact • {fact.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{fact.category}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 pt-1">{fact.groundTruth}</p>
                      <div className="text-xs text-slate-600">
                        Catches false claims like:{' '}
                        <span className="font-mono text-rose-700 font-semibold">
                          {fact.triggerWords.map((t) => `"${t}"`).join(', ')}
                        </span>{' '}
                        → Replaces with:{' '}
                        <span className="font-mono text-emerald-700 font-semibold">
                          &quot;{fact.replacement}&quot;
                        </span>
                      </div>
                    </div>
                  ))}

                  {activeProfile.rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          Brand / Legal Rule • {rule.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{rule.category}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 pt-1">{rule.description}</p>
                      <div className="text-xs text-slate-600">
                        Catches:{' '}
                        <span className="font-mono text-rose-700 font-semibold">
                          {rule.triggerWords.map((t) => `"${t}"`).join(', ')}
                        </span>{' '}
                        → Suggests:{' '}
                        <span className="font-mono text-emerald-700 font-semibold">
                          &quot;{rule.replacement}&quot;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Add Custom Rule & Test Immediately */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-28 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs font-extrabold uppercase text-indigo-600">
                    Try Live Extensibility
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Add a New Brand Rule &amp; Test It Live
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add any forbidden phrase below and click <strong>&quot;Add &amp; Test in Editor&quot;</strong> to see the AI catch it immediately!
                  </p>
                </div>

                <form
                  onSubmit={(e) => handleAddRuleAndTest(e, true)}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      1. Forbidden Claim or Off-Brand Phrase to Catch:
                    </label>
                    <input
                      type="text"
                      value={newTriggerPhrase}
                      onChange={(e) => setNewTriggerPhrase(e.target.value)}
                      placeholder='e.g., "free forever" or "guaranteed #1 rankings"'
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      2. Why is this not allowed? (Official Fact / Policy):
                    </label>
                    <input
                      type="text"
                      value={newGroundTruth}
                      onChange={(e) => setNewGroundTruth(e.target.value)}
                      placeholder="e.g., Our enterprise trial is 14 days, not free forever."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      3. Approved Replacement Phrase:
                    </label>
                    <input
                      type="text"
                      value={newReplacement}
                      onChange={(e) => setNewReplacement(e.target.value)}
                      placeholder='e.g., "includes a 14-day enterprise trial"'
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Rule &amp; Test Live in Editor →</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 4: EXECUTIVE ANALYTICS & ROI BENCHMARKS
        ======================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Industry Validation Benchmarks from Nova Tech Deck */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-indigo-600">
                    Enterprise Market Validation • Team Nova Tech
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                    Why Mid-to-Large Enterprises Need Automated Brand Governance
                  </h2>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  CodeNova 2026 Verified Research Stats
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">The Enforcement Gap</div>
                  <div className="text-2xl font-extrabold text-slate-900 my-1">
                    95% <span className="text-sm font-normal text-slate-400">vs.</span>{' '}
                    <span className="text-amber-600">25–31%</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    95% of enterprises have brand guidelines, but only 25%–31% consistently enforce them across teams.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Cost of Brand Inconsistency</div>
                  <div className="text-2xl font-extrabold text-rose-600 my-1">$6M+ / Year</div>
                  <p className="text-xs text-slate-600">
                    52% of executives estimate off-brand or inaccurate content costs their enterprise over $6M annually.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Manual Review Bottlenecks</div>
                  <div className="text-2xl font-extrabold text-indigo-600 my-1">20% Weekly Hrs</div>
                  <p className="text-xs text-slate-600">
                    41% of enterprises face launch bottlenecks as marketing leads spend 20% of their week fixing drafts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Brand Trust &amp; AI Governance</div>
                  <div className="text-2xl font-extrabold text-emerald-600 my-1">81% &amp; 69%</div>
                  <p className="text-xs text-slate-600">
                    81% of buyers require brand trust, driving 69% of marketing leaders to increase AI governance spend.
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown of Caught Issues & System Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900">
                  Violations Intercepted Before Publication (Last 30 Days)
                </h3>
                <div className="space-y-4 pt-1">
                  {[
                    {
                      label: 'AI Factual Hallucinations (Pricing, SLA, Clinical/Yield Claims)',
                      count: 412,
                      pct: 38,
                      bar: 'bg-rose-500'
                    },
                    {
                      label: 'Off-Brand Tone & Prohibited Superlatives',
                      count: 318,
                      pct: 29,
                      bar: 'bg-amber-500'
                    },
                    {
                      label: 'Missing Mandatory Legal & Regulatory Disclaimers',
                      count: 215,
                      pct: 20,
                      bar: 'bg-purple-500'
                    },
                    {
                      label: 'Visual Brand Deviations (Wrong Hex Color / Logo Clear-Space)',
                      count: 142,
                      pct: 13,
                      bar: 'bg-indigo-500'
                    }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">{item.label}</span>
                        <span className="text-slate-500">
                          {item.count} caught ({item.pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.bar}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <h3 className="text-base font-extrabold text-slate-900">
                  Technical Stack (Round 2 Implementation)
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-indigo-700">Frontend: React + Tailwind CSS</div>
                    <p className="text-slate-600 mt-0.5">
                      Zero-login sandbox, clickable inline highlights, non-destructive diff cards, and 1-click approval queue.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-emerald-700">
                      Backend &amp; RAG: Python FastAPI + Pinecone + PostgreSQL
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      Semantic vector retrieval cross-checks draft claims against verified ground-truth facts and logs audit trails.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-amber-700">
                      AI Layer: LLM Fact/Tone Verifier + Visual Palette Inspector
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      Detects hallucinations, proposes compliant rewrites, and verifies banner hex colors &amp; logo geometry.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}