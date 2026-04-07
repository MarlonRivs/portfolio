import {
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import {
  editorTokenClass,
  highlightCode,
  type EditorTokenType,
} from '../../code-editor/php-blade-syntax';
import { LanguageService } from '../../core/language.service';
import {
  PORTFOLIO_EXPLORER_ROWS,
  PORTFOLIO_FILE_ORDER,
  type PortfolioFileId,
} from '../../i18n/portfolio.translations';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';

@Component({
  selector: 'app-code-workspace',
  imports: [LanguageToggleComponent],
  templateUrl: './code-workspace.component.html',
  host: {
    class: 'flex min-h-0 min-w-0 flex-1 flex-col bg-[#0f0f1a]',
  },
})
export class CodeWorkspaceComponent {
  protected readonly language = inject(LanguageService);

  protected readonly explorerRows = PORTFOLIO_EXPLORER_ROWS;

  protected readonly defaultFileId = PORTFOLIO_FILE_ORDER[0]!;

  protected readonly openTabs = signal<PortfolioFileId[]>([this.defaultFileId]);

  protected readonly activeTab = signal<PortfolioFileId>(this.defaultFileId);

  protected readonly visibleLength = signal(0);

  private typingIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect((onCleanup) => {
      const tab = this.activeTab();
      const full = this.language.t().codeFiles[tab].content;

      this.visibleLength.set(0);

      if (this.typingIntervalId !== null) {
        clearInterval(this.typingIntervalId);
        this.typingIntervalId = null;
      }

      let index = 0;
      const step = 2;
      const tickMs = 18;

      this.typingIntervalId = setInterval(() => {
        index = Math.min(full.length, index + step);
        this.visibleLength.set(index);
        if (index >= full.length) {
          if (this.typingIntervalId !== null) {
            clearInterval(this.typingIntervalId);
            this.typingIntervalId = null;
          }
        }
      }, tickMs);

      onCleanup(() => {
        if (this.typingIntervalId !== null) {
          clearInterval(this.typingIntervalId);
          this.typingIntervalId = null;
        }
      });
    });
  }

  protected readonly visibleText = computed(() => {
    const tab = this.activeTab();
    const full = this.language.t().codeFiles[tab].content;
    return full.slice(0, this.visibleLength());
  });

  protected readonly highlightedTokens = computed(() => {
    const tab = this.activeTab();
    const path = this.language.t().codeFiles[tab].path;
    return highlightCode(path, this.visibleText());
  });

  protected readonly lineNumbers = computed(() => {
    const text = this.visibleText();
    const lines = text.split('\n');
    return lines.map((_, i) => i + 1);
  });

  protected readonly activeTitle = computed(() => {
    const tab = this.activeTab();
    return this.language.t().codeFiles[tab].label;
  });

  protected readonly statusModeLabel = computed(() => {
    const tab = this.activeTab();
    return this.language.t().codeFiles[tab].statusLabel;
  });

  protected tokenClass(type: EditorTokenType): string {
    return editorTokenClass(type);
  }

  protected openFile(id: PortfolioFileId): void {
    this.openTabs.update((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
    this.activeTab.set(id);
  }

  protected selectTab(id: PortfolioFileId): void {
    this.activeTab.set(id);
  }

  protected closeTab(event: MouseEvent, id: PortfolioFileId): void {
    event.stopPropagation();
    const tabs = this.openTabs().filter((t) => t !== id);
    if (tabs.length === 0) {
      this.openTabs.set([this.defaultFileId]);
      this.activeTab.set(this.defaultFileId);
      return;
    }
    this.openTabs.set(tabs);
    if (this.activeTab() === id) {
      this.activeTab.set(tabs[tabs.length - 1]!);
    }
  }

  protected isActiveFile(id: PortfolioFileId): boolean {
    return this.activeTab() === id;
  }

  protected fileIconClass(id: PortfolioFileId): string {
    return id === 'contact_blade'
      ? 'bg-[#cba6f7]'
      : 'bg-[#74c7ec]';
  }
}
