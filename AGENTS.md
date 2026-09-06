# Agent Instructions

## Purpose and Authority

This workspace contains Aolong Sun's bilingual professional portfolio. Its purpose is to support recruiting by presenting verified evidence of statistical rigor, real-data experience, scientific evaluation, and growing machine-learning implementation ability.

Follow this precedence order:

1. The user's current explicit instruction.
2. `PROJECT_BRIEF.md` for product scope, audience, positioning, design, privacy, and quality decisions.
3. `content/profile.json` and bilingual Markdown files for approved public facts and wording.
4. The existing implementation.

Read `PROJECT_BRIEF.md` before product-level changes. If information is uncertain or sources conflict, do not guess; keep it private or ask the user.

## Non-Negotiable Rules

### Accuracy and positioning

- Describe Aolong accurately as a Statistics PhD student.
- Do not present a desired future role or another unearned professional title as Aolong's current title or explicit public target.
- Show relevant potential through evidence: problem definition, data provenance, methods, evaluation, uncertainty, reproducibility, results, and individual contribution.
- Never invent or inflate degrees, dates, titles, publications, metrics, links, technical skills, production impact, or project maturity.
- Avoid unsupported superlatives, skill percentages, self-ratings, and buzzword lists.

### Privacy and security

- Never publish or commit phone numbers, precise addresses, credentials, tokens, private keys, private repository details, confidential data, or source documents.
- Treat `CV/`, unfiltered `Pics/`, style references, and `source-materials/` as private inputs.
- Only deliberately selected and optimized assets may enter `public/`.
- Do not expose secrets in client-side code or Vite environment variables.
- `.gitignore` does not remove information already committed to Git history.

### Public content

- Keep biographical content in `content/profile.json` or the bilingual content files, not scattered through React components.
- English is the first-visit default; Chinese is secondary and selected through `EN / 中`, without flags.
- Every new visible string requires natural, professional English and Chinese versions.
- Keep project presentations evidence-based and distinguish clearly among research, analysis, prototype, and production work.

## Implementation Guardrails

- Use straightforward React, TypeScript, and CSS; avoid dependencies or abstractions without a clear benefit.
- Treat the Hero as one integrated introduction rather than two independent panels. Language switching and internal content edits must preserve its hierarchy and avoid visible layout jumps.
- Preserve static-site compatibility and the option to deploy with GitHub Pages.
- Do not add a backend, database, authentication, analytics, CMS, or contact-form service without explicit approval.
- Maintain semantic landmarks, logical heading order, accessible names, meaningful image alternatives, visible focus states, keyboard access, and practical touch targets.
- Functionality must not depend on hover. Respect `prefers-reduced-motion` and avoid motion that shifts layout or blocks access.
- Follow the visual direction in `PROJECT_BRIEF.md`; references are inspiration only. Never copy protected artwork, characters, logos, screenshots, proprietary fonts, or compositions.
- Use lowercase English `kebab-case` names for public assets.

## Change Workflow

1. Inspect the relevant brief, content, implementation, and existing user changes.
2. Make the smallest coherent change that satisfies the request.
3. Preserve original resumes, photos, and reference files.
4. Update structured bilingual content when public wording changes.
5. Verify the affected behavior before reporting completion.

Before handing off a completed website change, verify as applicable:

- Production build succeeds.
- English and Chinese interfaces are complete.
- Primary desktop and mobile layouts have no horizontal overflow.
- Keyboard navigation, focus indicators, reduced motion, links, images, and console state are acceptable.
- The public build contains no private source material, phone number, secret, unsupported claim, or untranslated visible string.

## External Actions

Do not initialize Git, commit, create or connect a remote repository, push, publish, or deploy unless the user explicitly authorizes that step. Do not publish placeholders as verified achievements or silently change confirmed positioning, privacy, or language decisions.
