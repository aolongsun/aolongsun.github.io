import { useEffect, useMemo, useRef, useState } from 'react'
import profile from '../content/profile.json'

type Locale = 'en' | 'zh'

const ui = {
  en: {
    skip: 'Skip to content',
    nav: [
      ['Background', 'background'],
      ['Experience', 'experience'],
      ['Approach', 'approach'],
      ['Contact', 'contact'],
    ],
    viewWork: 'View experience',
    contactMe: 'Contact me',
    scroll: 'Scroll to explore',
    aboutKicker: '01 / Background',
    aboutTitle: 'A statistical foundation for applied questions.',
    education: 'Education',
    experience: 'Selected experience',
    officialListing: 'Official department listing',
    experienceHint: 'Hover over an experience to reveal its evidence.',
    labels: {
      problem: 'Problem',
      data: 'Data',
      method: 'Method',
      outcome: 'Outcome',
    },
    approachKicker: '02 / Scientific Approach',
    approachTitle: 'How I turn questions into evidence.',
    approachIntro:
      'These are working principles grounded in my statistical training and applied experience - not self-assigned proficiency scores.',
    contactKicker: '03 / Contact',
    contactTitle: 'Let’s make complex questions clearer.',
    contactBody:
      'I welcome conversations about statistical modeling, applied machine learning, experimentation, and data-intensive research.',
    email: 'Send an email',
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
      ['个人背景', 'background'],
      ['精选经历', 'experience'],
      ['研究方法', 'approach'],
      ['联系方式', 'contact'],
    ],
    viewWork: '查看精选经历',
    contactMe: '联系我',
    scroll: '向下探索',
    aboutKicker: '01 / 个人背景',
    aboutTitle: '以统计训练回应真实问题。',
    education: '教育经历',
    experience: '精选经历',
    officialListing: '统计系官方学生目录',
    experienceHint: '将鼠标悬浮在经历上，即可查看对应的详细证据。',
    labels: {
      problem: '问题',
      data: '数据',
      method: '方法',
      outcome: '结果',
    },
    approachKicker: '02 / 科学方法',
    approachTitle: '我如何将问题转化为证据。',
    approachIntro:
      '这些原则来自统计训练与应用经历，而不是自我打分或抽象的能力标签。',
    contactKicker: '03 / 联系方式',
    contactTitle: '让复杂问题变得更清晰。',
    contactBody: '欢迎与我交流统计建模、应用机器学习、实验设计与数据密集型研究。',
    email: '发送邮件',
    github: '查看 GitHub',
    backTop: '返回顶部',
    footer: '持续记录工作、证据与学习的个人空间。',
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
  const backgroundLayoutRef = useRef<HTMLDivElement>(null)

  const copy = profile.locales[locale]
  const labels = ui[locale]

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

  const navItems = useMemo(() => labels.nav, [labels.nav])
  const experience = previewExperience === null ? null : copy.experience[previewExperience]

  const showExperience = (index: number, element: HTMLButtonElement) => {
    const layout = backgroundLayoutRef.current
    if (layout) {
      const layoutBounds = layout.getBoundingClientRect()
      const itemBounds = element.getBoundingClientRect()
      setExperienceDetailTop(Math.max(0, itemBounds.top - layoutBounds.top))
    }
    setPreviewExperience(index)
  }

  const chooseLanguage = (next: Locale) => {
    setLocale(next)
    setMenuOpen(false)
  }

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
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            aria-hidden="true"
          >
            <source src="/media/hero-motion.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-filter" aria-hidden="true" />
          <div className="hero-lines" aria-hidden="true">
            <span className="line line-one" />
            <span className="line line-two" />
            <span className="line line-three" />
          </div>
          <div className="hero-orbit" aria-hidden="true" />

          <div className="hero-content shell">
            <aside className="hero-profile" aria-label={locale === 'en' ? 'Profile summary' : '个人简介'}>
              <div className="hero-portrait">
                <img src={profile.portrait.src} alt={profile.portrait.alt[locale]} />
                <span>{copy.location}</span>
              </div>
              <div className="hero-profile-copy">
                <p className="hero-bio">{copy.shortBio}</p>
                <div className="hero-facts" aria-label={locale === 'en' ? 'Selected facts' : '精选数据'}>
                  {profile.facts.map((fact) => (
                    <div className="hero-fact" key={fact.value.en}>
                      <strong>{fact.value[locale]}</strong>
                      <span>{fact.label[locale]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">{copy.eyebrow}</p>
              <h1 id="hero-title" className={locale === 'zh' ? 'is-zh' : ''}>
                {locale === 'en' ? (
                  <>
                    <span>Aolong</span>
                    <span>Sun</span>
                  </>
                ) : (
                  <span>孙奥龙</span>
                )}
              </h1>
              <p className="hero-statement">{copy.headline}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#experience">
                  <span>{labels.viewWork}</span>
                  <span aria-hidden="true">↘</span>
                </a>
                <a className="button button-ghost" href={`mailto:${profile.contact.email}`}>
                  <span>{labels.contactMe}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="hero-copy-contact">
                <a href={`mailto:${profile.contact.email}`}>
                  <span>Email</span>
                  <strong>{profile.contact.email}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
                <a href={profile.contact.github} target="_blank" rel="noreferrer">
                  <span>GitHub</span>
                  <strong>github.com/aolongsun</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="hero-side-note" aria-hidden="true">
              <span>STAT / DATA / EVIDENCE</span>
            </div>
          </div>

          <div className="hero-footer shell">
            <span className="hero-counter">00 — 03</span>
            <a href="#background" className="scroll-cue">
              <span>{labels.scroll}</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="section background-section" id="background" aria-labelledby="background-title">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">{labels.aboutKicker}</p>
              <h2 id="background-title">{labels.aboutTitle}</h2>
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
                  className="experience-detail is-visible"
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
                  <div className="experience-evidence">
                    {(
                      [
                        ['problem', experience.problem],
                        ['data', experience.data],
                        ['method', experience.method],
                        ['outcome', experience.outcome],
                      ] as const
                    ).map(([key, text]) => (
                      <div className={key === 'data' ? 'evidence-data-cell' : undefined} key={key}>
                        <h4>{labels.labels[key]}</h4>
                        {key === 'data' ? (
                          <>
                            <div className="data-metric-table">
                              {experience.metrics.map((metric) => (
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
                    {experience.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              )}

              <div className="experience-selector" id="experience">
                <h3 className="subsection-title">{labels.experience}</h3>
                <p className="experience-hint">{labels.experienceHint}</p>
                <div className="experience-list">
                  {copy.experience.map((item, index) => (
                    <button
                      type="button"
                      className={`experience-item ${previewExperience === index ? 'is-active' : ''}`}
                      key={`${item.organization}-${item.role}`}
                      aria-expanded={previewExperience === index}
                      onMouseEnter={(event) => showExperience(index, event.currentTarget)}
                      onMouseLeave={() => setPreviewExperience(null)}
                      onFocus={(event) => showExperience(index, event.currentTarget)}
                      onBlur={() => setPreviewExperience(null)}
                    >
                      <div className="experience-topline">
                        <span>{item.period}</span>
                        <span>{item.index}</span>
                      </div>
                      <h4>{item.organization}</h4>
                      <p className="experience-role">{item.role}</p>
                      <p>{item.summary}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach" aria-labelledby="approach-title">
          <div className="shell">
            <div className="section-heading section-heading-split">
              <div>
                <p className="eyebrow">{labels.approachKicker}</p>
                <h2 id="approach-title">{labels.approachTitle}</h2>
              </div>
              <p>{labels.approachIntro}</p>
            </div>

            <div className="approach-grid">
              {copy.approach.map((item) => (
                <article className="approach-card" key={item.index}>
                  <span className="approach-index">{item.index}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-inner">
            <p className="eyebrow">{labels.contactKicker}</p>
            <h2 id="contact-title">{labels.contactTitle}</h2>
            <p className="contact-body">{labels.contactBody}</p>
            <div className="contact-links">
              <a href={`mailto:${profile.contact.email}`} className="contact-link">
                <span>{labels.email}</span>
                <strong>{profile.contact.email}</strong>
                <span aria-hidden="true">↗</span>
              </a>
              <a href={profile.contact.github} target="_blank" rel="noreferrer" className="contact-link">
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
