import {
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
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
  private static readonly TYPING_STEP = 10;
  private static readonly TYPING_TICK_MS = 6;

  protected readonly language = inject(LanguageService);

  protected readonly explorerRows = PORTFOLIO_EXPLORER_ROWS;

  protected readonly defaultFileId = PORTFOLIO_FILE_ORDER[0]!;

  protected readonly openTabs = signal<PortfolioFileId[]>([this.defaultFileId]);

  protected readonly activeTab = signal<PortfolioFileId>(this.defaultFileId);

  protected readonly visibleLength = signal(0);
  protected readonly terminalInput = signal('');
  protected readonly terminalEntries = signal<string[]>([]);
  protected readonly terminalHistory = signal<string[]>([]);
  protected readonly terminalHistoryIndex = signal(-1);
  protected readonly terminalOutputRef = viewChild<ElementRef<HTMLDivElement>>('terminalOutput');
  protected readonly activeThemeId = signal<'catppuccin' | 'vsDark' | 'nord' | 'light'>(
    'catppuccin',
  );
  protected readonly availableThemes = computed(() => this.language.t().ide.theme);

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
      const step = CodeWorkspaceComponent.TYPING_STEP;
      const tickMs = CodeWorkspaceComponent.TYPING_TICK_MS;

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

    effect(() => {
      const welcome = this.language.t().ide.terminal.welcome;
      this.terminalEntries.set([welcome]);
      this.terminalHistory.set([]);
      this.terminalHistoryIndex.set(-1);
      this.terminalInput.set('');
      queueMicrotask(() => this.scrollTerminalToBottom());
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

  protected isBladeFile(id: PortfolioFileId): boolean {
    return id === 'contact_blade';
  }

  protected fileIconPath(id: PortfolioFileId): string {
    return this.isBladeFile(id)
      ? 'assets/icons/laravel-icon.png'
      : 'assets/icons/php.png';
  }

  protected themeLabel(id: 'catppuccin' | 'vsDark' | 'nord' | 'light'): string {
    return this.availableThemes()[id];
  }

  protected setTheme(id: 'catppuccin' | 'vsDark' | 'nord' | 'light'): void {
    this.activeThemeId.set(id);
  }

  protected onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.setTheme(target.value as 'catppuccin' | 'vsDark' | 'nord' | 'light');
  }

  protected updateTerminalInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.terminalInput.set(target.value);
  }

  protected onTerminalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeTerminalCommand(this.terminalInput());
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateTerminalHistory(-1);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateTerminalHistory(1);
    }
  }

  private navigateTerminalHistory(direction: -1 | 1): void {
    const history = this.terminalHistory();
    if (history.length === 0) {
      return;
    }
    const current = this.terminalHistoryIndex();
    if (direction === -1) {
      const next = current === -1 ? history.length - 1 : Math.max(current - 1, 0);
      this.terminalHistoryIndex.set(next);
      this.terminalInput.set(history[next]!);
      return;
    }
    if (current === -1) {
      return;
    }
    const next = current + 1;
    if (next >= history.length) {
      this.terminalHistoryIndex.set(-1);
      this.terminalInput.set('');
      return;
    }
    this.terminalHistoryIndex.set(next);
    this.terminalInput.set(history[next]!);
  }

  private executeTerminalCommand(rawInput: string): void {
    const command = rawInput.trim();
    if (!command) {
      return;
    }
    const prompt = `${this.language.t().ide.prompt.user}@${this.language.t().ide.prompt.repoName}:~$ ${command}`;
    this.terminalEntries.update((entries) => [...entries, prompt]);
    this.terminalHistory.update((history) => [...history, command].slice(-30));
    this.terminalHistoryIndex.set(-1);
    this.terminalInput.set('');

    const output = this.runCommand(command);
    if (output.length > 0) {
      this.terminalEntries.update((entries) => [...entries, ...output]);
    }
    queueMicrotask(() => this.scrollTerminalToBottom());
  }

  private runCommand(command: string): string[] {
    const terminal = this.language.t().ide.terminal;
    const normalized = command.toLowerCase().replace(/\s+/g, ' ');

    if (normalized === 'help') {
      return [terminal.availableCommands];
    }
    if (normalized === 'clear') {
      this.terminalEntries.set([]);
      return [];
    }
    if (normalized === 'pwd') {
      return [terminal.pwdPath];
    }
    if (normalized === 'ls') {
      return [terminal.lsItems];
    }
    if (normalized === 'git status') {
      return terminal.gitStatus;
    }
    return [terminal.unknownCommand.replace('{command}', command)];
  }

  private scrollTerminalToBottom(): void {
    const element = this.terminalOutputRef()?.nativeElement;
    if (!element) {
      return;
    }
    element.scrollTop = element.scrollHeight;
  }
}
