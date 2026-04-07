import { computed, Injectable, signal } from '@angular/core';

import {
  PORTFOLIO_TRANSLATIONS,
  type PortfolioLang,
  type PortfolioTranslations,
} from '../i18n/portfolio.translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<PortfolioLang>(this.readInitialLang());

  readonly t = computed<PortfolioTranslations>(() => PORTFOLIO_TRANSLATIONS[this.lang()]);

  constructor() {
    this.applyDocument(this.lang());
  }

  setLang(next: PortfolioLang): void {
    this.lang.set(next);
    this.applyDocument(next);
    try {
      localStorage.setItem('portfolio-lang', next);
    } catch {
      /* ignore */
    }
  }

  toggle(): void {
    this.setLang(this.lang() === 'en' ? 'es' : 'en');
  }

  private applyDocument(next: PortfolioLang): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.lang = PORTFOLIO_TRANSLATIONS[next].meta.htmlLang;
    document.title = PORTFOLIO_TRANSLATIONS[next].meta.pageTitle;
  }

  private readInitialLang(): PortfolioLang {
    try {
      const stored = localStorage.getItem('portfolio-lang');
      if (stored === 'en' || stored === 'es') {
        return stored;
      }
    } catch {
      /* ignore */
    }
    if (typeof navigator !== 'undefined') {
      const nav = navigator.language?.toLowerCase() ?? '';
      if (nav.startsWith('es')) {
        return 'es';
      }
    }
    return 'en';
  }
}
