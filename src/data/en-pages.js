// English version of the key pages. Same facts as the French site: no prices, free audit first, quote after.
// Pure JavaScript (read by React and by scripts/prerender.mjs).
export const enPages = [
  {
    slug: '',
    fr: '/',
    metaTitle: 'AI, Automation & IT Support for SMEs | ArchiAtech',
    metaDescription:
      'ArchiAtech helps SMEs in Monaco, the Riviera and France with sovereign AI, workflow automation and IT support. Free 30-minute audit, then a quote.',
    h1: 'AI that stays in your hands.',
    eyebrow: 'ArchiAtech Digital Solutions · Monaco',
    intro:
      'We help small and medium businesses save time with automation, use AI without exposing their data, and keep their IT reliable.',
    summary:
      'ArchiAtech Digital Solutions: sovereign AI consulting, workflow automation and IT support for SMEs in Monaco, the French Riviera and France.',
    sections: [
      {
        title: 'What we do',
        items: [
          ['Sovereign AI consulting', 'AI applied to your processes, with you choosing where your data is hosted.', '/en/services/'],
          ['Workflow automation', 'Your tools connected, your repetitive tasks gone (n8n, RPA, APIs).', '/en/services/'],
          ['IT support & deployment', 'Workstations installed, configured and monitored.', '/en/services/'],
        ],
      },
      {
        title: 'Our offers',
        items: [
          ['AutoFlow', 'Repetitive tasks automated between your tools.', '/offres/autoflow/'],
          ['BrainBot', 'An AI assistant that answers from your own documents.', '/offres/brainbot/'],
          ['Dashboard Pro', 'A clear dashboard to follow your business.', '/offres/dashboard-pro/'],
          ['TechCare', 'Regular follow-up of your IT equipment and tools.', '/offres/techcare/'],
        ],
        note: 'Offer pages are currently available in French.',
      },
    ],
    faq: [
      ['How much do your services cost?', 'There is no fixed price: every project is quoted after a free audit that defines scope, timing and cost.'],
      ['What does the free audit involve?', 'A 30-minute conversation to understand your needs (AI, automation, IT support) and tell you what is realistic. No commitment.'],
      ['Is my data kept confidential?', 'We choose the hosting with you (local, private or European cloud) and tell you clearly when an external service is involved.'],
      ['Do you work on site?', 'Yes, in Monaco and the Alpes-Maritimes depending on the request, and remotely across France.'],
    ],
  },
  {
    slug: 'services',
    fr: '/services/ia-souveraine/',
    metaTitle: 'AI, Automation and IT Services for SMEs | ArchiAtech',
    metaDescription:
      'Sovereign AI consulting, workflow automation (n8n, RPA, APIs) and IT support for SMEs in Monaco and France. Free audit, project quoted afterwards.',
    h1: 'Our services',
    eyebrow: 'Services',
    intro: 'Three areas, one contact: we help you choose, build and run what actually saves your team time.',
    summary: 'Sovereign AI consulting, workflow automation and IT support for SMEs in Monaco and France.',
    sections: [
      {
        title: 'Sovereign AI consulting & integration',
        text:
          'We help you choose, integrate and supervise AI solutions suited to your processes, with particular attention to where data is hosted and to compliance (GDPR). Typical work: use-case scoping, internal assistants that rely on your own documents, model and hosting choices, rules of use and team awareness.',
      },
      {
        title: 'Workflow automation (n8n, RPA, APIs)',
        text:
          'We remove repetitive tasks and connect your tools: reminders, data entry, synchronisations, reports, alerts. Workflows are tested on your real data, monitored, and documented for your team.',
      },
      {
        title: 'IT support & deployment',
        text:
          'Installation and configuration of workstations, Microsoft 365 and access management, regular follow-up and a single point of contact when something goes wrong.',
      },
    ],
  },
  {
    slug: 'contact',
    fr: '/contact/',
    metaTitle: 'Contact ArchiAtech | Book a free audit',
    metaDescription:
      'Book a free 30-minute audit with ArchiAtech or send us your project. On site in Monaco and the Alpes-Maritimes, remote across France. Reply within 24 hours.',
    h1: 'Book your free audit',
    eyebrow: 'Contact',
    intro: 'Tell us about your project or pick a time directly. We usually reply within 24 working hours.',
    summary: 'Book a free 30-minute audit with ArchiAtech, or send us your project.',
    contact: true,
  },
];
