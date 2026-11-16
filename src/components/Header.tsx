import React from 'react';
import { useLang } from '../i18n/LanguageContext';

const TABS = [
  { href: '#/', label: 'Home' },
  { href: '#/lab', label: 'Diagnostic Lab' },
  { href: '#/symptoms', label: 'Symptoms' },
  { href: '#/triage', label: 'Guided Intake' },
  { href: '#/guides', label: 'Fix Database' },
  { href: '#/learning', label: 'Learning' },
  { href: '#/reference', label: 'Reference' },
  { href: '#/about', label: 'About' },
  { href: '#/contact', label: 'Contact' },
];

function resolvePage(route: string): string {
  if (route.startsWith('#/')) return route;
  if (route === '#guides') return '#/guides';
  if (route === '#learning' || route === '#safety-lesson') return '#/learning';
  return '#/';
}

interface HeaderProps {
  route: string;
}

/**
 * Responsive page navigation. These are links to application pages,
 * styled as tabs; aria-current communicates the active page correctly
 * without misusing the ARIA tabs pattern.
 */
export const Header: React.FC<HeaderProps> = ({ route }) => {
  const activePage = resolvePage(route);
  const { lang, setLang, t } = useLang();

  return (
    <>
      <a className="skip-link" href="#main">
        {t('Skip to content')}
      </a>
      <div className="announcement">
        <span className="status-dot" aria-hidden="true" />
        <strong>{t('PUBLIC EDUCATIONAL RESOURCE')}</strong>
        <span>
          {t('Some library content is still pending mechanic review. Educational reference only.')}
        </span>
      </div>
      <header className="site-header" id="top">
        <div className="header-top">
          <a className="brand" href="#/" aria-label={t('The Diagnostic Bay home')}>
            <span className="brand-copy">
              <strong>THE <em>DIAGNOSTIC BAY</em></strong>
              <small>WE HELP YOU FIND THE FAULT - OR TEACH YOU TO FIND IT</small>
            </span>
          </a>
          <span className="lang-toggle" role="group" aria-label={t('Language')}>
            <button
              type="button"
              className={lang === 'en' ? 'is-on' : undefined}
              aria-pressed={lang === 'en'}
              aria-label={t('Switch language to English')}
              lang="en"
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={lang === 'es' ? 'is-on' : undefined}
              aria-pressed={lang === 'es'}
              aria-label={t('Switch language to Spanish')}
              lang="es"
              onClick={() => setLang('es')}
            >
              ES
            </button>
          </span>
        </div>
        <nav className="tab-nav" aria-label={t('Main navigation')}>
          {TABS.map((tab) => {
            const active = activePage === tab.href;
            return (
              <a
                key={tab.href}
                href={tab.href}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                {t(tab.label)}
              </a>
            );
          })}
        </nav>
      </header>
    </>
  );
};
