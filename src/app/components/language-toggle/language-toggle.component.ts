import { Component, inject } from '@angular/core';

import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-language-toggle',
  imports: [],
  templateUrl: './language-toggle.component.html',
})
export class LanguageToggleComponent {
  protected readonly language = inject(LanguageService);

  protected selectEn(): void {
    this.language.setLang('en');
  }

  protected selectEs(): void {
    this.language.setLang('es');
  }
}
