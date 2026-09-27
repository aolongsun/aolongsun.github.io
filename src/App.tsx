import { useEffect, useMemo, useRef, useState } from 'react'
import profile from '../content/profile.json'

type Locale = 'en' | 'zh'

const ui = {
  en: {
    skip: 'Skip to content',
    nav: [
      ['Experience', 'experience'],
      ['Papers', 'papers'],
      ['Contact', 'contact'],
    ],
    viewWork: 'View experience',
    contactMe: 'Contact me',
    aboutKicker: '01 / Experience',
    education: 'Education',
    experience: 'Selected experience',
    officialListing: 'Official department listing',
    experienceEvidence: 'Evidence from experience',
    labels: {
      problem: 'Problem',
      data: 'Data',
      method: 'Method',
      outcome: 'Outcome',
    },
    papersKicker: '02 / Papers',
    paperFocus: 'Research focus',
    paperLink: 'View publication',
    contactKicker: '03 / Contact',
    contactBody:
      'I welcome conversations about statistical modeling, applied machine learning, experimentation, and data-intensive research.',
    github: 'View GitHub',
    backTop: 'Back to top',
    footer: 'Designed as an evolving record of work, evidence, and learning.',
    languageLabel: 'Language',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  zh: {
    skip: '跳转至正文',
    nav: [
      ['经历', 'experience'],
      ['文章', 'papers'],
      ['联系', 'contact'],
    ],
    viewWork: '查看经历',
    contactMe: '联系我',
    aboutKicker: '01 / 经历',
    education: '教育经历',
    experience: '精选经历',
    officialListing: '统计系官方学生目录',
    experienceEvidence: '经历依据',
    labels: {
      problem: '问题',
      data: '数据',
      method: '方法',
      outcome: '结论',
    },
    papersKicker: '02 / 文章',
    paperFocus: '研究重点',
    paperLink: '查看文章',
    contactKicker: '03 / 联系',
    contactBody: '欢迎就统计建模、机器学习评估、实验设计与复杂数据分析等议题进行交流。',
    github: '查看 GitHub',
    backTop: '返回顶部',
    footer: '持续记录研究实践、分析依据与学习进展。',
    languageLabel: '语言',
    openMenu: '打开导航菜单',
    closeMenu: '关闭导航菜单',
  },
} as const

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = window.localStorage.getItem('aolong-site-language')
    return saved === 'zh' ? 'zh' : 'en'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [previewExperience, setPreviewExperience] = useState<number | null>(null)
  const [experienceDetailTop, setExperienceDetailTop] = useState(0)
  const [pinnedExperience, setPinnedExperience] = useState<number | null>(null)
  const backgroundLayoutRef = useRef<HTMLDivElement>(null)

  const copy = profile.locales[locale]
  const labels = ui[locale]
  const primaryEmail = profile.contact.emails[0]

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN'
    document.title = copy.metaTitle
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', copy.metaDescription)
    window.localStorage.setItem('aolong-site-language', locale)
  }, [copy.metaDescription, copy.metaTitle, locale])

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 820px)')
    const clearResponsivePreviews = () => {
      setPreviewExperience(null)
      setPinnedExperience(null)
    }

    mobileQuery.addEventListener('change', clearResponsivePreviews)
    return () => mobileQuery.removeEventListener('change', clearResponsivePreviews)
  }, [])

  useEffect(() => {
    const closeEvidence = () => {
      setPinnedExperience(null)
      setPreviewExperience(null)
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target
      if (
        target instanceof Element &&
        target.closest('.experience-item, .experience-detail')
      ) {
        return
      }
      closeEvidence()
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeEvidence()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const navItems = useMemo(() => labels.nav, [labels.nav])
  const experience = previewExperience === null ? null : copy.experience[previewExperience]

  const showExperience = (index: number, element: HTMLButtonElement) => {
    if (!window.matchMedia('(min-width: 821px)').matches) {
      return
    }

    const layout = backgroundLayoutRef.current
    if (layout) {
      const layoutBounds = layout.getBoundingClientRect()
      const itemBounds = element.getBoundingClientRect()
      setExperienceDetailTop(Math.max(0, itemBounds.top - layoutBounds.top))
    }
    if (pinnedExperience !== null && pinnedExperience !== index) {
      setPinnedExperience(null)
    }
    setPreviewExperience(index)
  }

  const hideExperience = () => {
    if (window.matchMedia('(min-width: 821px)').matches) {
      setPreviewExperience(pinnedExperience)
    }
  }

  const toggleExperience = (index: number) => {
    if (pinnedExperience === index) {
      setPinnedExperience(null)
      setPreviewExperience(null)
      return
    }

    setPinnedExperience(index)
    setPreviewExperience(index)
  }

  const chooseLanguage = (next: Locale) => {
    setLocale(next)
    setMenuOpen(false)
  }

  const renderExperienceEvidence = (item: (typeof copy.experience)[number]) => (
    <>
      <div className="experience-evidence">
        {(
          [
            ['problem', item.problem],
            ['data', item.data],
            ['method', item.method],
            ['outcome', item.outcome],
          ] as const
        ).map(([key, text]) => (
          <div className={key === 'data' ? 'evidence-data-cell' : undefined} key={key}>
            <h4>{labels.labels[key]}</h4>
            {key === 'data' ? (
              <>
                <div className="data-metric-table">
                  {item.metrics.map((metric) => (
                    <div className="data-metric-row" key={`${metric.value}-${metric.label}`}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <p className="data-source-note">{text}</p>
              </>
            ) : (
              <p>{text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="experience-tags">
        {item.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </>
  )

  return (
    <>
      <a className="skip-link" href="#main-content">
        {labels.skip}
      </a>

      <header className="site-header">
        <nav className="nav-shell" aria-label={locale === 'en' ? 'Primary navigation' : '主导航'}>
          <a className="wordmark" href="#top" aria-label={`${copy.name} — ${labels.backTop}`}>
            <span className="wordmark-mark">AS</span>
            <span className="wordmark-name">{copy.name}</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-links"
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <div className={`nav-panel ${menuOpen ? 'is-open' : ''}`} id="primary-links">
            <div className="nav-links">
              {navItems.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
            <div className="language-control" role="group" aria-label={labels.languageLabel}>
              <button
                type="button"
                aria-pressed={locale === 'en'}
                className={locale === 'en' ? 'active' : ''}
                onClick={() => chooseLanguage('en')}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                aria-pressed={locale === 'zh'}
                className={locale === 'zh' ? 'active' : ''}
                onClick={() => chooseLanguage('zh')}
              >
                中
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section
          className="hero"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-content shell">
            <div className="hero-intro">
              <div className="hero-portrait">
                <img src={profile.portrait.src} alt={profile.portrait.alt[locale]} />
                <span>{copy.location}</span>
              </div>

              <div className="hero-copy">
                <p className="eyebrow hero-eyebrow">{copy.eyebrow}</p>
                <h1 id="hero-title" className={locale === 'zh' ? 'is-zh' : ''}>
                  <span>{locale === 'en' ? 'Aolong Sun' : '孙奥龙'}</span>
                </h1>
                <p className="hero-statement">{copy.headline}</p>
                <p className="hero-bio">{copy.shortBio}</p>
                <div className="hero-facts" aria-label={locale === 'en' ? 'Selected facts' : '精选数据'}>
                  {profile.facts.map((fact) => (
                    <div className="hero-fact" key={fact.value.en}>
                      <strong>{fact.value[locale]}</strong>
                      <span>{fact.label[locale]}</span>
                    </div>
                  ))}
                </div>
                <div className="hero-actions">
                  <a className="button button-primary" href="#experience">
                    <span>{labels.viewWork}</span>
                    <span aria-hidden="true">↘</span>
                  </a>
                  <a className="button button-ghost" href={`mailto:${primaryEmail.address}`}>
                    <span>{labels.contactMe}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
                <div className="hero-copy-contact">
                  {profile.contact.emails.map((email) => (
                    <a
                      className="hero-contact-link hero-email-link"
                      href={`mailto:${email.address}`}
                      key={email.address}
                    >
                      <span>{email.label[locale]}</span>
                      <strong>{email.address}</strong>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                  <a
                    className="hero-contact-link hero-github-link"
                    href={profile.contact.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>GitHub</span>
                    <strong>github.com/aolongsun</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-footer shell">
            <span className="hero-counter">00 — 03</span>
            <a href="#experience" className="scroll-cue" aria-label={labels.viewWork}>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="section background-section" id="experience" aria-labelledby="experience-title">
          <div className="shell">
            <div className="chapter-heading">
              <h2 className="eyebrow" id="experience-title">{labels.aboutKicker}</h2>
            </div>

            <div className="background-layout" ref={backgroundLayoutRef}>
              <div className="education-panel">
                <h3 className="subsection-title">{labels.education}</h3>
                <div className="timeline">
                  {copy.education.map((item, index) => (
                    <article className="timeline-item" key={`${item.institution}-${item.degree}`}>
                      <div className="timeline-meta">
                        <span className="timeline-period">{item.period}</span>
                        <div
                          className={`education-brand ${index === 1 ? 'is-bnu' : 'is-vt'}`}
                          role="img"
                          aria-label={profile.educationMarks[index].alt[locale]}
                        >
                          <img src={profile.educationMarks[index].src} alt="" />
                        </div>
                      </div>
                      <div>
                        <h4 className="education-degree">
                          {item.degree.split(' · ').map((degree) => (
                            <span key={degree}>{degree}</span>
                          ))}
                        </h4>
                        <p className="timeline-organization">{item.institution}</p>
                        {'officialUrl' in item && (
                          <a className="official-listing-link" href={item.officialUrl} target="_blank" rel="noreferrer">
                            {labels.officialListing} <span aria-hidden="true">↗</span>
                          </a>
                        )}
                        <ul className="education-points">
                          {item.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {experience && (
                <article
                  className={`experience-detail is-visible ${pinnedExperience === previewExperience ? 'is-pinned' : ''}`}
                  aria-live="polite"
                  style={{ '--detail-top': `${experienceDetailTop}px` } as React.CSSProperties}
                >
                  <header className="experience-detail-header">
                    <span>{experience.index}</span>
                    <div>
                      <p>{experience.period}</p>
                      <h3>{experience.organization}</h3>
                      <p className="experience-detail-role">{experience.role}</p>
                    </div>
                  </header>
                  {renderExperienceEvidence(experience)}
                </article>
              )}

              <div className="experience-selector">
                <h3 className="subsection-title">{labels.experience}</h3>
                <div className="experience-list">
                  {copy.experience.map((item, index) => (
                    <button
                      type="button"
                      className={`experience-item ${previewExperience === index ? 'is-active' : ''}`}
                      key={`${item.organization}-${item.role}`}
                      aria-expanded={previewExperience === index}
                      aria-pressed={pinnedExperience === index}
                      aria-controls={`experience-evidence-${index}`}
                      onMouseEnter={(event) => showExperience(index, event.currentTarget)}
                      onMouseLeave={hideExperience}
                      onFocus={(event) => showExperience(index, event.currentTarget)}
                      onBlur={hideExperience}
                      onClick={(event) => {
                        if ((event.target as Element).closest('.experience-detail-inline')) {
                          return
                        }
                        toggleExperience(index)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          toggleExperience(index)
                        }
                      }}
                    >
                      <div className="experience-topline">
                        <span>{item.period}</span>
                        <span>{item.index}</span>
                      </div>
                      <h4>{item.organization}</h4>
                      <p className="experience-role">{item.role}</p>
                      <p>{item.summary}</p>
                      {previewExperience === index && (
                        <div
                          className="experience-detail-inline"
                          id={`experience-evidence-${index}`}
                          aria-live="polite"
                        >
                          <p className="experience-evidence-label">{labels.experienceEvidence}</p>
                          {renderExperienceEvidence(item)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section papers-section" id="papers" aria-labelledby="papers-title">
          <div className="shell">
            <div className="chapter-heading">
              <h2 className="eyebrow" id="papers-title">{labels.papersKicker}</h2>
            </div>

            <div className="papers-list">
              {copy.papers.map((paper, index) => (
                <article className="paper-item" key={paper.title}>
                  <div className="paper-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="paper-status">{paper.status}</div>
                  <div className="paper-content">
                    <h3>{paper.title}</h3>
                    {'authors' in paper && <p className="paper-authors">{paper.authors}</p>}
                    {'venue' in paper && <p className="paper-venue">{paper.venue}</p>}
                    <div className="paper-focus">
                      <span>{labels.paperFocus}</span>
                      <p>{paper.focus}</p>
                    </div>
                  </div>
                  {'url' in paper ? (
                    <a className="paper-link" href={paper.url} target="_blank" rel="noreferrer">
                      {labels.paperLink} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="paper-link paper-link-muted" aria-hidden="true">—</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <div className="chapter-heading">
              <h2 className="eyebrow" id="contact-title">{labels.contactKicker}</h2>
            </div>
            <p className="contact-body">{labels.contactBody}</p>
            <div className="contact-links">
              {profile.contact.emails.map((email) => (
                <a
                  href={`mailto:${email.address}`}
                  className="contact-link contact-email-link"
                  key={email.address}
                >
                  <span>{email.label[locale]}</span>
                  <strong>{email.address}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noreferrer"
                className="contact-link contact-github-link"
              >
                <span>{labels.github}</span>
                <strong>github.com/aolongsun</strong>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <p>© {new Date().getFullYear()} {copy.name}</p>
          <p>{labels.footer}</p>
          <a href="#top">{labels.backTop} ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App
