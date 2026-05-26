import { Component, inject, computed } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [],
  template: `
    <div class="min-h-full w-full bg-[#f8f9fa] p-4 pt-8 pb-12 font-['Montserrat'] text-[#333] sm:p-8 sm:pt-12 sm:pb-16">
      <div class="mx-auto mb-2 w-full max-w-[850px] border border-gray-200 bg-white p-8 shadow-lg sm:mb-2 sm:p-12">
        <!-- Header -->
        <header class="flex justify-between items-start mb-8">
          <div class="flex-1">
            <h1 class="text-[54px] font-bold tracking-[0.05em] leading-none text-[#333] flex gap-4">
              <span>{{ payload().hero.name.split(' ')[0] }}</span>
              <span class="font-light text-[#444] uppercase">{{ payload().hero.name.split(' ')[1] }}</span>
            </h1>
            <p class="mt-4 text-[24px] tracking-[0.15em] text-[#555] font-normal uppercase leading-tight">
              {{ payload().hero.title }}
            </p>

            <div class="mt-5">
              <a
                class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-[#333] shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                [href]="cvPdfHref"
                download="CV-Marlon-Rivas.pdf"
                [attr.title]="isSpanish() ? 'Descargar CV' : 'Download CV'"
                [attr.aria-label]="isSpanish() ? 'Descargar CV' : 'Download CV'"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
              </a>
            </div>

            <!-- Contact Details -->
            <div class="mt-8 space-y-3">
              <div class="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[#555]">
                <a
                  class="flex items-center gap-2 transition-colors hover:text-[#111]"
                  [href]="whatsappHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <span class="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">📞</span>
                  <span>(503) 7733-7519</span>
                </a>
                <a
                  class="flex items-center gap-2 transition-colors hover:text-[#111]"
                  [href]="emailHref"
                  aria-label="Email"
                >
                  <span class="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">✉️</span>
                  <span>marlonriv003&#64;gmail.com</span>
                </a>
              </div>
              <div class="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[#555]">
                <div class="flex items-center gap-2">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">📍</span>
                  <span>San Salvador, San Salvador</span>
                </div>
                <a
                  class="flex items-center gap-2 transition-colors hover:text-[#111]"
                  [href]="linkedinHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <span class="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">in</span>
                  <span>linkedin.com/in/marlonrivs</span>
                </a>
                <a
                  class="flex items-center gap-2 transition-colors hover:text-[#111]"
                  [href]="githubHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <span class="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[10px]">GH</span>
                  <span>github.com/MarlonRivs</span>
                </a>
              </div>
            </div>
          </div>

           <!-- Photo -->
           <div class="shrink-0 ml-4">
             <div class="group h-[220px] w-[220px] rounded-full overflow-hidden border-2 border-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
               <img
                 src="assets/me.jpeg"
                 alt="Marlon Rivas"
                class="h-full w-full object-cover object-[50%_18%] transition-transform duration-300 group-hover:scale-[1.03]"
               >
              </div>
            </div>
        </header>

        <!-- Section: SOBRE MÍ -->
        <section class="mb-10">
          <div class="border-t border-gray-300 w-full mb-1"></div>
          <h2 class="text-[17px] font-bold tracking-[0.2em] text-[#333] py-1 uppercase">
            {{ isSpanish() ? 'SOBRE MÍ' : 'ABOUT ME' }}
          </h2>
          <div class="border-b border-gray-300 w-full mb-4"></div>
          <div class="text-[13px] leading-[1.7] text-[#555] text-justify font-medium">
            {{ payload().about.summary.join(' ') }}
          </div>
        </section>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
          
          <!-- Left Sidebar -->
          <div class="space-y-10 border-r border-gray-100 pr-10">
            
            <!-- EDUCACIÓN -->
            <section>
              <h2 class="text-[15px] font-bold tracking-[0.2em] text-[#333] mb-5 border-b-2 border-slate-100 pb-1 uppercase">
                {{ isSpanish() ? 'EDUCACIÓN' : 'EDUCATION' }}
              </h2>
              <div class="space-y-6">
                @for (edu of payload().about.education; track edu.degree) {
                  <div>
                    <p class="text-[12px] font-bold text-[#333] leading-tight uppercase tracking-tight">{{ edu.degree }}</p>
                    <p class="text-[12px] text-[#555] mt-2 font-medium">{{ edu.institution }}</p>
                    <p class="text-[11px] text-[#777] italic mt-1 font-medium">{{ edu.period }}</p>
                  </div>
                }
              </div>
            </section>

            <!-- CURSOS -->
            <section>
              <h2 class="text-[16px] font-bold tracking-widest text-[#333] mb-5 uppercase">
                {{ isSpanish() ? 'CURSOS' : 'COURSES' }}
              </h2>
              <ul class="space-y-4 text-[12px] text-[#555]">
                @for (course of payload().about.courses; track course) {
                  <li class="flex items-start gap-3 rounded-md px-1 py-0.5 transition-colors hover:bg-gray-50">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400"></span>
                    <span class="leading-relaxed">{{ course }}</span>
                  </li>
                }
              </ul>
            </section>

            <!-- HABILIDADES -->
            <section>
              <h2 class="text-[16px] font-bold tracking-widest text-[#333] mb-5 uppercase">
                {{ isSpanish() ? 'HABILIDADES' : 'SOFT SKILLS' }}
              </h2>
              <ul class="space-y-3 text-[12px] text-[#555]">
                @for (skill of payload().about.soft_skills; track skill) {
                  <li class="flex items-center gap-3 rounded-md px-1 py-0.5 transition-colors hover:bg-gray-50">
                    <span class="h-1.5 w-1.5 bg-gray-400 rounded-full"></span>
                    {{ skill }}
                  </li>
                }
              </ul>
            </section>

            <!-- TÉCNICAS -->
            <section>
              <h2 class="text-[16px] font-bold tracking-widest text-[#333] mb-5 uppercase">
                {{ isSpanish() ? 'TÉCNICAS' : 'TECHNICAL SKILLS' }}
              </h2>
              <ul class="space-y-2 text-[12px] text-[#555]">
                @for (cat of payload().tech_stack; track cat.category) {
                  @for (skill of getSkills(cat.skills); track skill) {
                    <li class="flex items-center gap-3 rounded-md px-1 py-0.5 transition-colors hover:bg-gray-50">
                      <span class="h-1.5 w-1.5 bg-gray-400 rounded-full"></span>
                      {{ skill.replace('_', ' ') }}
                    </li>
                  }
                }
              </ul>
            </section>

            <!-- INTERESES -->
            <section>
              <h2 class="text-[16px] font-bold tracking-widest text-[#333] mb-5 uppercase">
                {{ isSpanish() ? 'INTERESES' : 'INTERESTS' }}
              </h2>
              <ul class="space-y-3 text-[12px] text-[#555]">
                @for (item of payload().about.interests; track item) {
                  <li class="flex items-start gap-3 rounded-md px-1 py-0.5 transition-colors hover:bg-gray-50">
                    <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400"></span>
                    <span class="leading-relaxed">{{ item }}</span>
                  </li>
                }
              </ul>
            </section>
          </div>

          <!-- Main Content Area -->
          <div class="space-y-12">
            
            <!-- EXPERIENCIA PROFESIONAL -->
            <section>
              <h2 class="text-[16px] font-bold tracking-widest text-[#333] mb-8 uppercase">
                {{ isSpanish() ? 'EXPERIENCIA PROFESIONAL' : 'PROFESSIONAL EXPERIENCE' }}
              </h2>
              <div class="space-y-10">
                @for (exp of payload().experience; track exp.role) {
                  @if (exp.category === 'professional') {
                    <div class="rounded-lg transition-colors hover:bg-gray-50/60 px-2 py-2 -mx-2">
                      <h3 class="text-[14px] font-bold text-[#333] uppercase">{{ exp.role }}</h3>
                      <p class="text-[12px] text-[#666] font-medium mt-1">{{ exp.period }}</p>
                      <ul class="mt-4 space-y-2.5 text-[12px] text-[#555] leading-relaxed">
                        @for (point of exp.detail; track point) {
                          <li class="flex items-start gap-3">
                            <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#333]"></span>
                            {{ point }}
                          </li>
                        }
                      </ul>
                    </div>
                  }
                }
              </div>
            </section>

            <!-- VOLUNTARIADO -->
            <section>
              <h2 class="text-[16px] font-bold tracking-widest text-[#333] mb-8 uppercase">
                {{ isSpanish() ? 'VOLUNTARIADO' : 'VOLUNTEERING' }}
              </h2>
              <div class="space-y-10">
                @for (exp of payload().experience; track exp.role) {
                  @if (exp.category === 'volunteering') {
                    <div class="rounded-lg transition-colors hover:bg-gray-50/60 px-2 py-2 -mx-2">
                      <h3 class="text-[14px] font-bold text-[#333] uppercase leading-snug">{{ exp.role }}</h3>
                      <p class="text-[12px] text-[#666] font-medium mt-1">{{ exp.period }}</p>
                      <ul class="mt-4 space-y-2.5 text-[12px] text-[#555] leading-relaxed">
                        @for (point of exp.detail; track point) {
                          <li class="flex items-start gap-3">
                            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#333]"></span>
                            {{ point }}
                          </li>
                        }
                      </ul>
                    </div>
                  }
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    /* Simple reset for consistent rendering in the preview */
    * {
      -webkit-print-color-adjust: exact;
    }
  `
})
export class CvPreviewComponent {
  private readonly languageService = inject(LanguageService);

  protected readonly whatsappHref = 'https://wa.me/50377337519';
  protected readonly emailHref = 'mailto:marlonriv003@gmail.com';
  protected readonly linkedinHref = 'https://www.linkedin.com/in/marlonrivs';
  protected readonly githubHref = 'https://github.com/MarlonRivs';

  protected readonly cvPdfHref = 'assets/CV-Marlon-Rivas.pdf';

  protected isSpanish() {
    return this.languageService.lang() === 'es';
  }

  protected readonly payload = computed(() => {
    const t = this.languageService.t();
    return {
      hero: this.extractHero(t.codeFiles.hero_controller.content),
      about: this.extractAbout(t.codeFiles.about_model.content),
      tech_stack: this.extractTechStack(t.codeFiles.tech_migration.content),
      projects: this.extractProjects(t.codeFiles.project_seeder.content),
      experience: this.extractExperience(t.codeFiles.experience_helper.content)
    };
  });

  private extractHero(content: string): any {
    const nameMatch = content.match(/'name' => '([^']+)'/);
    const titleMatch = content.match(/'title' => '([^']+)'/);
    return {
      name: nameMatch ? nameMatch[1] : '',
      title: titleMatch ? titleMatch[1] : ''
    };
  }

  private extractAbout(content: string): any {
    const summaryMatch = content.match(/'summary' => \[([\s\S]*?)\]/);
    const summary: string[] = [];
    if (summaryMatch) {
      const lines = summaryMatch[1].match(/'([^']+)'/g);
      if (lines) lines.forEach(l => summary.push(l.replace(/'/g, '')));
    }

    const educationMatch = content.match(/'education' => \[([\s\S]*?)\]/);
    const education: any[] = [];
    if (educationMatch) {
      const eduBlocks = educationMatch[1].match(/\[([\s\S]*?)\]/g);
      if (eduBlocks) {
        eduBlocks.forEach(block => {
          const degree = block.match(/'degree' => '([^']+)'/);
          const institution = block.match(/'institution' => '([^']+)'/);
          const period = block.match(/'period' => '([^']+)'/);
          education.push({
            degree: degree ? degree[1] : '',
            institution: institution ? institution[1] : '',
            period: period ? period[1] : ''
          });
        });
      }
    }

    const coursesMatch = content.match(/'courses' => \[([\s\S]*?)\]/);
    const courses: string[] = [];
    if (coursesMatch) {
      const lines = coursesMatch[1].match(/'([^']+)'/g);
      if (lines) lines.forEach(l => courses.push(l.replace(/'/g, '')));
    }

    const softSkillsMatch = content.match(/'soft_skills' => \[([\s\S]*?)\]/);
    const soft_skills: string[] = [];
    if (softSkillsMatch) {
      const lines = softSkillsMatch[1].match(/'([^']+)'/g);
      if (lines) lines.forEach(l => soft_skills.push(l.replace(/'/g, '')));
    }

    const interestsMatch = content.match(/'interests' => \[([\s\S]*?)\]/);
    const interests: string[] = [];
    if (interestsMatch) {
      const lines = interestsMatch[1].match(/'([^']+)'/g);
      if (lines) lines.forEach((l) => interests.push(l.replace(/'/g, '')));
    }

    return { summary, education, courses, soft_skills, interests };
  }

  protected getSkills(json: string): string[] {
    try {
      return Object.keys(JSON.parse(json));
    } catch {
      return [];
    }
  }

  protected getTags(json: string): string[] {
    try {
      return JSON.parse(json);
    } catch {
      return [];
    }
  }

  private extractTechStack(content: string): any[] {
    const items: any[] = [];
    const regex =
      /'category' => '([^']+)',\s*\n\s*'skills' => json_encode\(\[([\s\S]*?)\]\)\s*,?/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      const category = m[1];
      const skillsBlock = m[2];

      // Parse `'Key' => 'Value'` lines into an object so we don't get invalid JSON
      // from trailing commas in the PHP array.
      const skills: Record<string, string> = {};
      const skillRegex = /'([^']+)'\s*=>\s*'([^']+)'/g;
      let sm;
      while ((sm = skillRegex.exec(skillsBlock)) !== null) {
        skills[sm[1]] = sm[2];
      }

      items.push({ category, skills: JSON.stringify(skills) });
    }
    return items;
  }

  private extractExperience(content: string): any[] {
    const items: any[] = [];
    const regex =
      /\[\s*\n\s*'category' => '([^']+)',\s*\n\s*'period' => '([^']+)',\s*\n\s*'role' => '([^']+)',\s*\n\s*'detail' => json_encode\(\[([\s\S]*?)\]\)\s*,?\s*\n\s*\]\s*,?/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      const detailsRaw = m[4].match(/'([^']+)'/g);
      const detail = detailsRaw ? detailsRaw.map((d) => d.replace(/'/g, '')) : [];
      items.push({ category: m[1], period: m[2], role: m[3], detail });
    }
    return items;
  }

  private extractProjects(content: string): any[] {
    const items: any[] = [];
    const regex = /'name' => '([^']+)',\s+'description' => '([^']+)',\s+'features' => json_encode\(\[([\s\S]*?)\]\),\s+'tags' => json_encode\(\[([\s\S]*?)\]\)/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      items.push({
        name: m[1],
        description: m[2],
        tags: `[${m[4].replace(/'/g, '"')}]`
      });
    }
    return items;
  }
}
