import { Component } from '@angular/core';

import { CodeWorkspaceComponent } from './components/code-workspace/code-workspace.component';

@Component({
  selector: 'app-root',
  imports: [CodeWorkspaceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
