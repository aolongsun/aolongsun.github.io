# Aolong Sun Personal Website - Project Brief

## 1. Project Overview

This project is a bilingual personal portfolio for Aolong Sun, a Statistics PhD student at Virginia Tech with B.S. and M.S. training in statistics from Beijing Normal University.

The site should support future recruiting by presenting a coherent evidence-based profile: rigorous statistical training, experience with complex real-world data, scientific evaluation habits, and an expanding ability to turn research questions into reproducible computational work.

The website must not state a desired future job title or present an unearned professional title as Aolong's current role. Instead, the content and project structure should demonstrate relevant potential through problem formulation, data quality, modeling, evaluation, and clear communication.

## 2. Primary Goals

- Give recruiters and technical collaborators a clear professional introduction in under two minutes.
- Present education, selected experience, and work samples as a connected narrative rather than a copied resume.
- Demonstrate the thinking expected in applied statistics and machine learning: problem definition, data provenance, meaningful baselines, model evaluation, uncertainty, limitations, and reproducibility.
- Create a distinctive first public engineering artifact that can later connect to dedicated AI/ML repositories.
- Provide a maintainable bilingual foundation for future projects, publications, and research updates.

## 3. Audience

Primary audiences, in order:

1. Recruiters and hiring managers for quantitative research, machine learning, experimentation, data science, and related technical roles.
2. Scientists, engineers, and potential research collaborators.
3. Academic peers and other professional contacts.

## 4. Desired Visitor Actions

- Understand Aolong's statistical background and working style.
- Review selected work and the evidence behind it.
- Visit the public GitHub profile.
- Optionally verify the current Virginia Tech affiliation through the department's official graduate-student directory.
- Contact Aolong through the public email address.

## 5. Version 0.1 Content

- Full-viewport hero with a restrained motion background, identity, positioning statement, and two calls to action.
- Fixed glass-effect navigation with English/Chinese switching.
- The navigation wordmark pairs the unchanged geometric `AS` monogram with a handwritten full-name signature: locally hosted Kaushan Script for English and a three-glyph Ma Shan Zheng subset for Chinese. The two elements use contrasting typographic roles rather than repeating the same brush treatment.
- Two-column hero with an equal-height profile card on the left and identity statement on the right. Both columns share one top baseline; public email and GitHub sit beneath the right-side actions. Hero facts summarize the overall academic and professional path rather than one experience.
- On desktop, both Hero columns and their internal content bands use language-independent geometry so switching between English and Chinese does not move surrounding elements. The Chinese name remains on one line. Mobile layouts return to natural content flow.
- One unified Experience section containing scannable education points and an evidence browser organized around problem, data, method, and outcome. On desktop, hover or keyboard focus reveals a left-side panel aligned vertically with the active experience item; clicking locks the panel so its text can be selected and copied. On touch layouts, tapping an item expands the same evidence inside that card. The Data cell contains a compact three-row evidence table.
- Education entries reserve a separate left metadata rail for dates and proportion-preserving school identifiers, leaving the degree column at full width. Virginia Tech uses its complete university lockup; Beijing Normal University uses the user-selected complete blue lockup containing the seal, calligraphic Chinese name, and English name. Multi-degree entries separate the bachelor's and master's degrees onto distinct lines.
- Scientific Approach section describing evidence-backed working principles rather than subjective skill ratings. Its existing two-by-two desktop grid and geometry remain unchanged. Hovering or focusing a card reveals a same-row evidence panel over the opposite column; clicking locks the panel for text selection, while touch layouts expand the evidence within the active card.
- Papers section after Scientific Approach, presenting verified bibliographic information and concise research focus for two published papers plus one clearly labeled research-in-progress item. The private proposal source is neither linked nor copied into public assets.
- Compact closing contact section with public email and GitHub.

## 6. Out of Scope for Version 0.1

- No resume download.
- No phone number, detailed address, private documents, or confidential data.
- No contact-form backend, authentication, database, analytics, CMS, or blog.
- No claim of holding an unearned professional title.
- No copied Persona/Atlus characters, logos, typefaces, screenshots, or other protected assets.
- No paid custom domain for Version 0.1; the site uses the GitHub Pages user-site URL.

## 7. Public and Private Information

Public information may include name, broad location, public email, GitHub URL, educational institutions, degree status, selected experience, non-confidential methods, and substantiated aggregate figures already present in the resume.

Private information includes phone number, precise address, original resume files, unfiltered photos, style-reference images, credentials, private repository information, internal company data, and any fact not explicitly approved for public use.

When visibility is uncertain, treat the information as private.

## 8. Language Requirements

- English is the default language.
- Chinese is available through an `EN / 中` control in the top-right navigation.
- Do not use country flags to represent language.
- Remember the visitor's explicit language choice on the device.
- Every visible navigation label, heading, button, description, image alternative, and metadata-relevant phrase should have both language versions.
- Translation should preserve meaning and professional tone rather than mirror sentence structure word for word.
- Major section headings use explicit, semantically chosen line breaks. A line must not split a Chinese phrase or leave an isolated character.
- Public email addresses and web addresses remain complete on one line across supported browsers and must not be truncated with ellipses.

## 9. Visual Direction

The visual direction is a professional editorial portfolio with high-contrast color blocking, hard-edged shading, precise graphic linework, asymmetric composition, and restrained Persona/Atlus-inspired motion.

Design principles:

- Advanced and distinctive, but not loud or game-like.
- Dark navy, warm white, and near-black form the base; electric cyan and a controlled red are accents.
- The full Klein-blue surface is reserved for the Hero. Experience, Scientific Approach, and Papers share the same warm-paper field; Contact uses a restrained light blue-gray before the narrow dark footer.
- Section variety comes from typography, rules, interaction, and the final cool-paper shift rather than additional accent colors, gradients, or transitional decoration.
- Use hard edges, diagonal cuts, thin rules, offset shadows, large typography, and disciplined whitespace.
- Reserve glass blur primarily for the fixed navigation.
- Keep body copy calm and highly readable.
- Use no more than one dominant motion focus per viewport.
- Prefer fast, purposeful micro-interactions over decorative animation.
- Never reproduce reference artwork directly.

## 10. Interaction Requirements

- Fixed translucent navigation with backdrop blur and a solid-color fallback.
- Smooth in-page navigation that respects reduced-motion preferences.
- Buttons and links have coordinated hover and keyboard-focus feedback.
- Motion must not cause layout shift.
- Touch users must not depend on hover to understand or activate controls.
- Experience and Approach use the same evidence interaction model: hover or focus previews on desktop, click locks the panel for copying, click outside or press Escape closes it, and touch layouts expand evidence inside the active card.
- Approach evidence panels are overlays on desktop and must not reflow, resize, or restyle the underlying two-by-two card framework.
- Hero motion pauses or becomes static when `prefers-reduced-motion` is enabled.

## 11. Layout and Responsive Requirements

- Desktop-first presentation with an outer shell up to approximately 1700px.
- Long-form reading width remains approximately 700-900px.
- Project layouts may expand to approximately 1400-1600px.
- The first version must remain fully usable on tablet and mobile, even though desktop is the primary showcase.
- Use fluid type and spacing rather than fixed desktop-only dimensions.

## 12. Accessibility and Quality

- Semantic landmarks and logical heading levels.
- Full keyboard access with visible focus states.
- Sufficient text/background contrast.
- Meaningful alternative text for public imagery.
- No information communicated through color alone.
- Minimum practical touch targets around 44px.
- Respect reduced-motion preferences.
- Optimize public images and video; provide a static fallback for hero media.
- Avoid broken links, console errors, clipping, horizontal overflow, and untranslated interface text.

## 13. Technical Direction

- React, Vite, and TypeScript.
- Static, single-page architecture compatible with GitHub Pages.
- Content is maintained in the `content/` directory and represented as structured bilingual data for the UI.
- CSS handles the majority of layout and motion; avoid unnecessary UI and animation libraries.
- Local storage is permitted only for device-local language preference.
- No runtime secrets are required for version 0.1.

## 14. Success Criteria

- The site starts locally and creates a successful production build.
- English appears on a first visit and the language control switches the complete interface to Chinese.
- Hero, unified experience, scientific approach, papers, and contact sections are complete.
- Fixed navigation, hover/focus interactions, and reduced-motion behavior work.
- Public content is accurate, bilingual, and contains no phone number or private source material.
- The design is recognizably custom while maintaining recruiter-friendly scanning and readability.
- Desktop and mobile previews have no obvious layout defects.

## 15. Confirmed Decisions

- Recruiting is the primary purpose.
- Professional potential should be demonstrated through evidence, not stated as a target.
- English is the default language.
- The site uses a professional hybrid interpretation of the visual references.
- The first implementation uses React + Vite + TypeScript.
- The public repository is `https://github.com/aolongsun/aolongsun.github.io`.
- The public site is `https://aolongsun.github.io/`.
- Pushes to `main` build and deploy the site through GitHub Actions.

## 16. Future Decisions

- Final licensed/original hero video and poster treatment.
- Final experience ordering after public AI/ML repositories exist.
- Whether to add dedicated project-detail routes.
- Whether to add LinkedIn, a resume download, or a blog.
- Whether to purchase and configure a custom domain in a later version.
