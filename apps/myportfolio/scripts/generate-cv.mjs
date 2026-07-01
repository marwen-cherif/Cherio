// Reproducible CV PDF generator for the portfolio.
//
// Renders a themed, self-contained HTML CV (matching the site's blue -> purple ->
// pink theme) for each locale, then prints it to a real PDF via headless Chrome /
// Edge over the DevTools Protocol (printBackground:true so the gradients/tints
// actually show up). No external dependencies — uses Node's global fetch/WebSocket.
//
// Usage:  node scripts/generate-cv.mjs
// Output: public/cv/Marwen-Cherif-CV-FR.pdf and public/cv/Marwen-Cherif-CV-EN.pdf

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'cv');

// ---------------------------------------------------------------------------
// Content (bilingual)
// ---------------------------------------------------------------------------

const contact = {
  location: { fr: 'Melun, Île-de-France', en: 'Melun, Île-de-France, France' },
  email: 'marwen.cherif@gmail.com',
  phone: '+33 6 77 62 11 23',
  website: { label: 'marwen-cherif.cherio.me', href: 'https://marwen-cherif.cherio.me' },
  linkedin: { label: 'in/marwen-cherif', href: 'https://www.linkedin.com/in/marwen-cherif-54898148/' },
  github: { label: 'github.com/marwen-cherif', href: 'https://github.com/marwen-cherif' },
};

const DATA = {
  fr: {
    lang: 'fr',
    title: 'Software Engineer — Spécialisation Front-End',
    labels: {
      profile: 'Profil',
      experience: 'Expérience',
      education: 'Formation',
      skills: 'Compétences',
      languages: 'Langues',
      interests: "Centres d'intérêt",
    },
    summary:
      "Tech Lead Front-End chez Revers.io, où je pilote la modernisation d'une plateforme SaaS — architecture, refontes UI, montée en charge. Je contribue à l'amélioration continue du produit, aussi bien de façon transverse que sur des sujets spécifiques. Une première partie de carrière en full-stack (Symfony/PHP) me donne une vision bout-en-bout, du backend à l'interface. Je privilégie le code propre, le mentorat, et les décisions pragmatiques. Technophile, j'aime expérimenter les nouveaux outils de développement, liés ou non à l'IA.",
    experiences: [
      {
        company: 'Revers.io',
        role: 'Front-End Tech Lead (depuis 2022) · Front-End Software Engineer (2019—2021)',
        period: '2019 — Présent',
        context:
          'Plateforme SaaS de gestion du SAV pour le compte de distributeurs (remboursement, réparation, intervention à domicile…).',
        bullets: [
          'Pilotage de la modernisation front-end : refonte UI, migration de librairies, architecture React / TypeScript / GraphQL.',
          'Analyse technique et chiffrage des nouvelles fonctionnalités, arbitrages techniques avec le produit.',
          "Code review et mentorat des développeurs junior, montée en compétence de l'équipe.",
          'Fiabilisation de la plateforme : tests unitaires et E2E, support des anomalies en production.',
          "Détection et traitement de la dette technique au fil de l'eau.",
          "Contribution à l'amélioration continue du produit, de façon proactive ou via l'analyse des retours du funnel client.",
        ],
      },
      {
        company: 'Addstones — BNP Paribas Asset Management',
        role: 'Ingénieur Consultant',
        period: '2018 — 2019',
        context: '',
        bullets: [
          'Automatismes Blue Prism : contrôle des factsheets des fonds/ETFs, contrôle de cohérence des données publiées.',
          'Automatisation du parcours de mise à jour et de résiliation des données clients (KYC) vers Salesforce, avec détection des incohérences et des règles réglementaires.',
          "Développement d'un analyseur de code pour les processus Blue Prism.",
          'Outil de gestion des subventions du CE (React, API .NET).',
        ],
      },
      {
        company: 'Bouygues Telecom',
        role: 'Ingénieur Consultant',
        period: '2016 — 2018',
        context: '',
        bullets: [
          'POC pour PSA Auto & Bank : automatisation du traitement des immatriculations et collecte de données (UiPath, VB.NET, Node.js / Puppeteer).',
          "Développement et maintenance de Reflex Ticketing, l'outil de support des incidents pour les clients entreprises.",
          'Fonctionnalités de bout en bout : cycle de vie des tickets, notifications, dashboards.',
          'API REST et intégrations base de données.',
          'Participation aux cérémonies agiles (sprint planning, revues de code, CI/CD).',
        ],
      },
      {
        company: 'Talan Tunisie',
        role: 'Ingénieur Consultant',
        period: '2014 — 2016',
        context: '',
        bullets: [
          'Développement et évolution de projets pour Société Générale, RATP, SFR, Quick Belux et Bouygues Telecom.',
          'Société Générale : applications de gestion RH et de gestion des contacts universités (PHP, AngularJS, MySQL).',
          "RATP : évolution de l'outil ODEXO d'analyse des données d'équipements des lignes de métro (PHP).",
          'Quick Belux : back-office restaurants et plateforme de supervision centralisée (Symfony, JavaScript).',
          'SFR : module de configuration des offres mobiles pour la boutique en ligne (AngularJS, J2EE).',
        ],
      },
    ],
    education: [
      {
        school: "École Nationale d'Ingénieurs de Tunis (ENIT)",
        field: 'Ingénierie Logicielle',
        period: '2011 – 2014',
      },
      {
        school: "Institut Préparatoire aux Études d'Ingénieurs d'El Manar",
        field: 'Classes préparatoires',
        period: '2009 – 2011',
      },
    ],
    skills: [
      { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Redux / Redux-Saga', 'Zustand', 'Storybook', 'Tailwind CSS'] },
      { category: 'Qualité', items: ['Jest', 'Vitest', 'Testing Library', 'Cypress', 'Code Review'] },
      { category: 'Style', items: ['Styled Components', 'Bootstrap'] },
      { category: 'Outils', items: ['Webpack', 'Vite', 'Git', 'GitHub', 'Jenkins'] },
      { category: 'Backend', items: ['Symfony / PHP', 'Nest', 'C#', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB'] },
      { category: 'RPA', items: ['UiPath', 'Blue Prism'] },
      { category: 'Automatisation / IA', items: ['Claude', 'Dynamic Workflows', 'Custom Skills', 'Smart GitHub Actions'] },
      { category: 'Infrastructure', items: ['Azure DevOps', 'Cloudflare', 'Datadog'] },
    ],
    languages: [
      { name: 'Français', level: 'Natif' },
      { name: 'Anglais', level: 'Professionnel' },
      { name: 'Arabe', level: 'Natif' },
    ],
    interests: ['Bricolage', 'Nouvelles technologies & IA', 'Lecture'],
  },

  en: {
    lang: 'en',
    title: 'Software Engineer — Front-End Specialization',
    labels: {
      profile: 'Profile',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      interests: 'Interests',
    },
    summary:
      'Front-End Tech Lead at Revers.io, where I drive the modernization of a SaaS platform — architecture, UI overhauls, and scaling. I contribute to continuous product improvement, both cross-functionally and on specific initiatives. An earlier full-stack chapter (Symfony/PHP) gives me an end-to-end perspective, from the backend to the interface. I value clean code, mentoring, and pragmatic decisions. A tech enthusiast, I love experimenting with new development tools, whether AI-related or not.',
    experiences: [
      {
        company: 'Revers.io',
        role: 'Front-End Tech Lead (since 2022) · Front-End Software Engineer (2019—2021)',
        period: '2019 — Present',
        context:
          'SaaS after-sales management platform for retailers (refunds, repairs, on-site interventions).',
        bullets: [
          'Driving the front-end modernization: UI redesigns, library migrations, React / TypeScript / GraphQL architecture.',
          'Technical analysis and estimation of new features, technical trade-offs alongside the product team.',
          "Code review and mentoring of junior developers, growing the team's skills.",
          'Hardening the platform: unit and E2E tests, production incident support.',
          'Detecting and addressing technical debt continuously.',
          'Contributing to continuous product improvement, proactively or through analysis of customer-funnel feedback.',
        ],
      },
      {
        company: 'Addstones — BNP Paribas Asset Management',
        role: 'Consultant Engineer',
        period: '2018 — 2019',
        context: '',
        bullets: [
          'Blue Prism automations: control of fund/ETF factsheets and consistency checks on published data.',
          'Automation of the client data update and termination journey (KYC) toward Salesforce, with inconsistency detection and enforcement of regulatory rules.',
          'Developed a code analyzer for Blue Prism processes.',
          'Works-council grants management tool (React, .NET API).',
        ],
      },
      {
        company: 'Bouygues Telecom',
        role: 'Consultant Engineer',
        period: '2016 — 2018',
        context: '',
        bullets: [
          'PoC for PSA Auto & Bank: automation of vehicle-registration processing and data collection (UiPath, VB.NET, Node.js / Puppeteer).',
          'Development and maintenance of Reflex Ticketing, the incident-support tool for enterprise clients.',
          'End-to-end features: ticket lifecycle, notifications, dashboards.',
          'REST APIs and database integrations.',
          'Participation in agile ceremonies (sprint planning, code reviews, CI/CD).',
        ],
      },
      {
        company: 'Talan Tunisie',
        role: 'Consultant Engineer',
        period: '2014 — 2016',
        context: '',
        bullets: [
          'Delivering and evolving projects for Société Générale, RATP, SFR, Quick Belux and Bouygues Telecom.',
          'Société Générale: HR management and university-contact management applications (PHP, AngularJS, MySQL).',
          'RATP: evolution of the ODEXO tool for analyzing metro-line equipment data (PHP).',
          'Quick Belux: restaurant back-office and centralized supervision platform (Symfony, JavaScript).',
          'SFR: mobile-plan configuration module for the online store (AngularJS, J2EE).',
        ],
      },
    ],
    education: [
      {
        school: "École Nationale d'Ingénieurs de Tunis (ENIT)",
        field: 'Software Engineering',
        period: '2011 – 2014',
      },
      {
        school: "Institut Préparatoire aux Études d'Ingénieurs d'El Manar",
        field: 'Engineering preparatory classes',
        period: '2009 – 2011',
      },
    ],
    skills: [
      { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Redux / Redux-Saga', 'Zustand', 'Storybook', 'Tailwind CSS'] },
      { category: 'Quality', items: ['Jest', 'Vitest', 'Testing Library', 'Cypress', 'Code Review'] },
      { category: 'Styling', items: ['Styled Components', 'Bootstrap'] },
      { category: 'Tools', items: ['Webpack', 'Vite', 'Git', 'GitHub', 'Jenkins'] },
      { category: 'Backend', items: ['Symfony / PHP', 'Nest', 'C#', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB'] },
      { category: 'RPA', items: ['UiPath', 'Blue Prism'] },
      { category: 'Automation & AI', items: ['Claude', 'Dynamic Workflows', 'Custom Skills', 'Smart GitHub Actions'] },
      { category: 'Infrastructure', items: ['Azure DevOps', 'Cloudflare', 'Datadog'] },
    ],
    languages: [
      { name: 'French', level: 'Native' },
      { name: 'English', level: 'Professional' },
      { name: 'Arabic', level: 'Native' },
    ],
    interests: ['DIY & Tinkering', 'New Technologies & AI', 'Reading'],
  },
};

// ---------------------------------------------------------------------------
// HTML rendering
// ---------------------------------------------------------------------------

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const icons = {
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M4 5c0 8 7 15 15 15l-1.5-4-4-1-1.5 2A12 12 0 0 1 7 8l2-1.5-1-4Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke-width="1.8"/>',
  github: '<path d="M9 19c-4 1.4-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.3 3.1 5.3 3.4 5.3 3.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.8 9.8c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.7V21"/>',
};

const svg = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

function renderContactItem(icon, text, href) {
  const inner = `${svg(icon)}<span>${esc(text)}</span>`;
  return href
    ? `<a class="contact-item" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
    : `<span class="contact-item">${inner}</span>`;
}

function renderHtml(d) {
  const header = `
    <header class="cv-header">
      <div class="identity">
        <h1 class="name">Marwen Cherif</h1>
        <p class="role-title">${esc(d.title)}</p>
      </div>
      <div class="contact-row">
        ${renderContactItem(icons.pin, contact.location[d.lang])}
        ${renderContactItem(icons.mail, contact.email, 'mailto:' + contact.email)}
        ${renderContactItem(icons.phone, contact.phone, 'tel:' + contact.phone.replace(/\s/g, ''))}
        ${renderContactItem(icons.linkedin, contact.linkedin.label, contact.linkedin.href)}
        ${renderContactItem(icons.github, contact.github.label, contact.github.href)}
        ${renderContactItem(icons.globe, contact.website.label, contact.website.href)}
      </div>
    </header>
    <div class="rule"></div>`;

  const summary = `
    <section class="summary">
      <div class="summary-card">${esc(d.summary)}</div>
    </section>`;

  const experience = `
    <section>
      <h2 class="section-title">${esc(d.labels.experience)}</h2>
      ${d.experiences
        .map(
          (e) => `
        <div class="xp">
          <div class="xp-head">
            <div>
              <div class="xp-role">${esc(e.role)}</div>
              <div class="xp-company">${esc(e.company)}</div>
            </div>
            <div class="period-pill">${esc(e.period)}</div>
          </div>
          ${e.context ? `<div class="xp-context">${esc(e.context)}</div>` : ''}
          <ul class="bullets">
            ${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}
          </ul>
        </div>`
        )
        .join('')}
    </section>`;

  const skills = `
    <section>
      <h2 class="section-title">${esc(d.labels.skills)}</h2>
      <div class="skills-grid">
        ${d.skills
          .map(
            (s) => `
          <div class="skill-group">
            <div class="skill-cat">${esc(s.category)}</div>
            <div class="pills">${s.items.map((i) => `<span class="pill">${esc(i)}</span>`).join('')}</div>
          </div>`
          )
          .join('')}
      </div>
    </section>`;

  const education = `
    <section>
      <h2 class="section-title">${esc(d.labels.education)}</h2>
      ${d.education
        .map(
          (ed) => `
        <div class="edu">
          <div>
            <div class="edu-school">${esc(ed.school)}</div>
            ${ed.field ? `<div class="edu-field">${esc(ed.field)}</div>` : ''}
          </div>
          <div class="period-pill soft">${esc(ed.period)}</div>
        </div>`
        )
        .join('')}
    </section>`;

  const langInterests = `
    <div class="two-col">
      <section>
        <h2 class="section-title">${esc(d.labels.languages)}</h2>
        <div class="lang-list">
          ${d.languages
            .map(
              (l) => `<div class="lang-row"><span class="lang-name">${esc(l.name)}</span><span class="pill">${esc(l.level)}</span></div>`
            )
            .join('')}
        </div>
      </section>
      <section>
        <h2 class="section-title">${esc(d.labels.interests)}</h2>
        <div class="pills">${d.interests.map((i) => `<span class="pill">${esc(i)}</span>`).join('')}</div>
      </section>
    </div>`;

  return `<!doctype html>
<html lang="${d.lang}">
<head>
<meta charset="utf-8" />
<title>Marwen Cherif — CV</title>
<style>
  :root {
    --primary: #2563eb;
    --primary-soft: #eff6ff;
    --fg: #0f172a;
    --muted: #475569;
    --muted-2: #64748b;
    --border: #e2e8f0;
    --grad: linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #db2777 100%);
  }
  * { box-sizing: border-box; }
  @page { size: A4; margin: 13mm 14mm; }
  html, body {
    margin: 0;
    padding: 0;
    color: var(--fg);
    font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 10.1pt;
    line-height: 1.34;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Header */
  .cv-header { display: flex; flex-direction: column; gap: 8px; }
  .name {
    margin: 0;
    font-size: 30pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: var(--grad);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .role-title {
    margin: 2px 0 0;
    font-size: 10.5pt;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--muted-2);
  }
  .contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 4px;
  }
  .contact-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--muted);
    text-decoration: none;
    font-size: 9pt;
    white-space: nowrap;
  }
  .contact-item svg { width: 12px; height: 12px; color: var(--primary); flex: 0 0 auto; }
  .rule { height: 3px; border-radius: 3px; background: var(--grad); margin: 9px 0 3px; }

  /* Sections */
  section { margin-top: 9px; }
  .section-title {
    position: relative;
    margin: 0 0 6px;
    padding-left: 11px;
    font-size: 11.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--fg);
    break-after: avoid;
  }
  .section-title::before {
    content: '';
    position: absolute;
    left: 0; top: 1px; bottom: 1px;
    width: 4px;
    border-radius: 3px;
    background: var(--grad);
  }

  /* Summary */
  .summary { margin-top: 9px; }
  .summary-card {
    background: linear-gradient(135deg, #eff6ff 0%, #faf5ff 55%, #fdf2f8 100%);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 9px 13px;
    color: var(--muted);
    font-size: 9.6pt;
  }

  /* Experience */
  .xp { padding: 7px 0; border-bottom: 1px solid var(--border); break-inside: avoid; }
  .xp:last-child { border-bottom: none; }
  .xp-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .xp-role { font-size: 10.8pt; font-weight: 700; color: var(--fg); }
  .xp-company { font-size: 10pt; font-weight: 600; color: var(--primary); margin-top: 1px; }
  .xp-context { font-style: italic; color: var(--muted-2); font-size: 9.2pt; margin: 4px 0 2px; }
  .period-pill {
    flex: 0 0 auto;
    background: var(--grad);
    color: #fff;
    font-size: 8pt;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .period-pill.soft { background: var(--primary-soft); color: var(--primary); }
  ul.bullets { margin: 4px 0 0; padding: 0; list-style: none; }
  ul.bullets li {
    position: relative;
    padding-left: 13px;
    margin: 1.6px 0;
    color: var(--muted);
    font-size: 9.4pt;
  }
  ul.bullets li::before {
    content: '';
    position: absolute;
    left: 0; top: 5.5px;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--primary);
  }

  /* Skills */
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 22px; }
  .skill-group { break-inside: avoid; }
  .skill-cat {
    font-size: 8.2pt; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--muted-2); margin-bottom: 4px;
  }
  .pills { display: flex; flex-wrap: wrap; gap: 5px; }
  .pill {
    background: var(--primary-soft);
    color: var(--primary);
    font-size: 8.4pt;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 999px;
  }

  /* Education */
  .edu {
    display: flex; justify-content: space-between; align-items: center;
    gap: 12px; padding: 4px 0; border-bottom: 1px solid var(--border); break-inside: avoid;
  }
  .edu:last-child { border-bottom: none; }
  .edu-school { font-weight: 700; color: var(--fg); font-size: 10pt; }
  .edu-field { color: var(--muted-2); font-size: 9.2pt; }

  /* Languages + interests */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
  .lang-list { display: flex; flex-direction: column; gap: 6px; }
  .lang-row { display: flex; justify-content: space-between; align-items: center; }
  .lang-name { font-weight: 600; color: var(--fg); font-size: 9.6pt; }
</style>
</head>
<body>
  ${header}
  ${summary}
  ${experience}
  ${skills}
  ${education}
  ${langInterests}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Headless Chrome / Edge -> PDF via DevTools Protocol
// ---------------------------------------------------------------------------

function findBrowser() {
  const pf = process.env['ProgramFiles'] || 'C:\\Program Files';
  const pfx86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
  const local = process.env['LOCALAPPDATA'] || '';
  const candidates = [
    join(pf, 'Google/Chrome/Application/chrome.exe'),
    join(pfx86, 'Google/Chrome/Application/chrome.exe'),
    join(local, 'Google/Chrome/Application/chrome.exe'),
    join(pf, 'Microsoft/Edge/Application/msedge.exe'),
    join(pfx86, 'Microsoft/Edge/Application/msedge.exe'),
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  return candidates.find((c) => existsSync(c));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForFile(path, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (existsSync(path)) return readFileSync(path, 'utf8');
    await sleep(80);
  }
  throw new Error(`Timed out waiting for ${path}`);
}

// Minimal CDP client over a single page target.
class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(new Error('WebSocket error: ' + (e?.message || 'unknown')));
    });
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
      } else if (msg.method) {
        (this.listeners.get(msg.method) || []).forEach((fn) => fn(msg.params));
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method) {
    return new Promise((resolve) => {
      const arr = this.listeners.get(method) || [];
      const fn = (p) => {
        this.listeners.set(method, (this.listeners.get(method) || []).filter((f) => f !== fn));
        resolve(p);
      };
      arr.push(fn);
      this.listeners.set(method, arr);
    });
  }
  close() {
    try { this.ws.close(); } catch {}
  }
}

// Launch a single headless browser once and reuse it for every PDF (launching
// Chrome twice in quick succession races on the DevToolsActivePort handshake).
async function launchBrowser(browser) {
  const userDataDir = mkdtempSync(join(tmpdir(), 'cv-chrome-'));
  const child = spawn(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  const portFile = join(userDataDir, 'DevToolsActivePort');
  const content = await waitForFile(portFile, 20000);
  const port = content.split('\n')[0].trim();

  let pageWs;
  for (let i = 0; i < 50; i++) {
    const list = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json());
    const page = list.find((t) => t.type === 'page');
    if (page?.webSocketDebuggerUrl) { pageWs = page.webSocketDebuggerUrl; break; }
    await sleep(80);
  }
  if (!pageWs) throw new Error('No page target found');

  const cdp = new CDP(pageWs);
  await cdp.ready;
  await cdp.send('Page.enable');

  return {
    async print(htmlPath, pdfPath) {
      const loaded = cdp.once('Page.loadEventFired');
      await cdp.send('Page.navigate', { url: pathToFileURL(htmlPath).href });
      await loaded;
      await sleep(350); // let fonts / gradients settle
      const { data } = await cdp.send('Page.printToPDF', {
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
      });
      writeFileSync(pdfPath, Buffer.from(data, 'base64'));
    },
    async close() {
      cdp.close();
      try { child.kill(); } catch {}
      await sleep(150);
      try { rmSync(userDataDir, { recursive: true, force: true }); } catch {}
    },
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = findBrowser();
  const jobs = [
    { locale: 'fr', suffix: 'FR' },
    { locale: 'en', suffix: 'EN' },
  ];

  const session = browser ? await launchBrowser(browser) : null;
  if (!browser) console.warn('No Chrome/Edge found — skipping PDF (HTML previews only).');

  try {
    for (const job of jobs) {
      const html = renderHtml(DATA[job.locale]);
      const htmlPath = join(OUT_DIR, `cv-${job.locale}.html`);
      writeFileSync(htmlPath, html, 'utf8');
      console.log(`HTML written: ${htmlPath}`);

      if (!session) continue;
      const pdfPath = join(OUT_DIR, `Marwen-Cherif-CV-${job.suffix}.pdf`);
      await session.print(htmlPath, pdfPath);
      console.log(`PDF written:  ${pdfPath}`);
    }
  } finally {
    if (session) await session.close();
  }

  if (browser) console.log(`\nDone. Browser used: ${browser}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
