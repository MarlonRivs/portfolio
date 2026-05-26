export type PortfolioLang = 'en' | 'es';

export type PortfolioFileId =
  | 'hero_controller'
  | 'about_model'
  | 'tech_migration'
  | 'project_seeder'
  | 'experience_helper'
  | 'portfolio_service'
  | 'contact_request'
  | 'contact_blade';

export type ExplorerEntry =
  | { kind: 'folder'; name: string; children: ExplorerEntry[] }
  | { kind: 'file'; id: PortfolioFileId };

export interface CodeFileEntry {
  label: string;
  path: string;
  content: string;
  statusLabel: string;
}

export interface PortfolioTranslations {
  meta: { htmlLang: string; pageTitle: string };
  ide: {
    explorer: string;
    rootFolder: string;
    statusBranch: string;
    statusErrors: string;
    statusEncoding: string;
    statusLive: string;
    windowTitle: string;
    panel: {
      problems: string;
      output: string;
      debugConsole: string;
      terminal: string;
      ports: string;
      newTerminal: string;
      splitTerminal: string;
      killTerminal: string;
      closePanel: string;
    };
    prompt: {
      user: string;
      repoName: string;
      inRepo: string;
      on: string;
      via: string;
      gitAdd: string;
      gitDel: string;
      gitDirty: string;
      nodeVersion: string;
      ariaLabel: string;
    };
    terminal: {
      welcome: string;
      placeholder: string;
      availableCommands: string;
      pwdPath: string;
      lsItems: string;
      gitStatus: string[];
      unknownCommand: string;
    };
    theme: {
      label: string;
      catppuccin: string;
      vsDark: string;
      nord: string;
      light: string;
    };
  };
  codeFiles: Record<PortfolioFileId, CodeFileEntry>;
  language: { en: string; es: string; aria: string };
}

export const PORTFOLIO_EXPLORER_ROOT: ExplorerEntry = {
  kind: 'folder',
  name: 'MARLON-PORTFOLIO',
  children: [
    {
      kind: 'folder',
      name: 'app',
      children: [
        {
          kind: 'folder',
          name: 'Http',
          children: [
            {
              kind: 'folder',
              name: 'Controllers',
              children: [{ kind: 'file', id: 'hero_controller' }],
            },
            {
              kind: 'folder',
              name: 'Requests',
              children: [{ kind: 'file', id: 'contact_request' }],
            },
          ],
        },
        {
          kind: 'folder',
          name: 'Models',
          children: [{ kind: 'file', id: 'about_model' }],
        },
        {
          kind: 'folder',
          name: 'Services',
          children: [{ kind: 'file', id: 'portfolio_service' }],
        },
        {
          kind: 'folder',
          name: 'Helpers',
          children: [{ kind: 'file', id: 'experience_helper' }],
        },
      ],
    },
    {
      kind: 'folder',
      name: 'database',
      children: [
        {
          kind: 'folder',
          name: 'migrations',
          children: [{ kind: 'file', id: 'tech_migration' }],
        },
        {
          kind: 'folder',
          name: 'seeders',
          children: [{ kind: 'file', id: 'project_seeder' }],
        },
      ],
    },
    {
      kind: 'folder',
      name: 'resources',
      children: [
        {
          kind: 'folder',
          name: 'views',
          children: [{ kind: 'file', id: 'contact_blade' }],
        },
      ],
    },
  ],
};

function flattenExplorer(entries: ExplorerEntry[], depth: number) {
  const rows: { type: 'folder' | 'file'; depth: number; name?: string; id?: PortfolioFileId }[] =
    [];
  for (const e of entries) {
    if (e.kind === 'folder') {
      rows.push({ type: 'folder', depth, name: e.name });
      rows.push(...flattenExplorer(e.children, depth + 1));
    } else {
      rows.push({ type: 'file', depth, id: e.id });
    }
  }
  return rows;
}

export const PORTFOLIO_EXPLORER_ROWS = flattenExplorer(
  [PORTFOLIO_EXPLORER_ROOT],
  0,
);

export const PORTFOLIO_FILE_ORDER: PortfolioFileId[] = [
  'hero_controller',
  'about_model',
  'tech_migration',
  'project_seeder',
  'experience_helper',
  'portfolio_service',
  'contact_request',
  'contact_blade',
];

const heroControllerEn = `<?php

namespace App\\Http\\Controllers;

class HeroController extends Controller
{
    public function index(): array
    {
        return [
            'name' => 'Marlon Rivas',
            'title' => 'Software Developer',
            'tagline' => 'Building functional applications and optimizing technological processes',
        ];
    }
}
`;

const heroControllerEs = `<?php

namespace App\\Http\\Controllers;

class HeroController extends Controller
{
    public function index(): array
    {
        return [
            'name' => 'Marlon Rivas',
            'title' => 'Software Developer',
            'tagline' => 'Desarrollando aplicaciones funcionales y optimizando procesos tecnológicos',
        ];
    }
}
`;

const aboutModelEn = `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class AboutModel extends Model
{
    protected $table = 'developers';

    protected $fillable = ['education', 'summary', 'interests'];

    public function getProfile(): array
    {
        return [
            'education' => [
                [
                    'degree' => 'EGRESADO INGENIERÍA SISTEMAS Y COMPUTACIÓN',
                    'institution' => 'Universidad Dr. Andres Bello',
                    'period' => '2021 – ACTUALIDAD',
                ],
                [
                    'degree' => 'BACHILLER',
                    'institution' => 'Instituto Manuel Jose Arce',
                    'period' => '2019 – 2020',
                ],
            ],
            'summary' => [
                'Systems Engineering student and web developer focused on Backend and Frontend',
                'Passionate about developing functional applications and constantly learning new technologies',
                'Responsible, self-taught person oriented towards problem-solving through technological solutions',
            ],
            'courses' => [
                'AWS Cloud Management Foundations',
                'JS from zero to expert',
            ],
            'soft_skills' => [
                'Problem solving',
                'Teamwork',
                'Self-taught learning',
                'Adaptability',
                'Effective communication',
                'Logical thinking',
            ],
            'interests' => [
                'Full-stack development (Angular, Laravel, Node.js)',
                'Process optimization and scalable architecture',
                'Cloud computing and containerization',
                'Continuous learning and technological innovation',
            ],
        ];
    }
}
`;

const aboutModelEs = `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class AboutModel extends Model
{
    protected $table = 'developers';

    protected $fillable = ['education', 'summary', 'interests'];

    public function getProfile(): array
    {
        return [
            'education' => [
                [
                    'degree' => 'EGRESADO INGENIERÍA SISTEMAS Y COMPUTACIÓN',
                    'institution' => 'Universidad Dr. Andres Bello',
                    'period' => '2021 – ACTUALIDAD',
                ],
                [
                    'degree' => 'BACHILLER',
                    'institution' => 'Instituto Manuel Jose Arce',
                    'period' => '2019 – 2020',
                ],
            ],
            'summary' => [
                'Estudiante de Ingeniería en Sistemas y desarrollador web enfocado en Backend y Frontend',
                'Apasionado por desarrollar aplicaciones funcionales y aprender constantemente nuevas tecnologías',
                'Persona responsable, autodidacta y orientada a la resolución de problemas mediante soluciones tecnológicas',
            ],
            'courses' => [
                'Fundamentos de gestión de la nube con AWS',
                'JS de cero a experto',
            ],
            'soft_skills' => [
                'Resolución de problemas',
                'Trabajo en equipo',
                'Aprendizaje autodidacta',
                'Adaptabilidad',
                'Comunicación efectiva',
                'Pensamiento lógico',
            ],
            'interests' => [
                'Desarrollo Full-stack (Angular, Laravel, Node.js)',
                'Optimización de procesos y arquitectura escalable',
                'Cloud computing y dockerización',
                'Aprendizaje continuo e innovación tecnológica',
            ],
        ];
    }
}
`;

const techMigrationEn = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_stack', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->json('skills');
            $table->timestamps();
        });

        DB::table('tech_stack')->insert([
            [
                'category' => 'técnicas',
                'skills' => json_encode([
                    'PHP' => 'Advanced',
                    'JavaScript' => 'Advanced',
                    'TypeScript' => 'Advanced',
                    'Node.js' => 'Intermediate',
                    'Angular' => 'Advanced',
                    'Laravel' => 'Advanced',
                    'CodeIgniter 4' => 'Intermediate',
                    'Next.js' => 'Intermediate',
                    'MySQL' => 'Advanced',
                    'Git y GitHub' => 'Daily use',
                    'Docker' => 'Intermediate',
                    'HTML y CSS' => 'Advanced',
                ]),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_stack');
    }
};
`;

const techMigrationEs = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_stack', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->json('skills');
            $table->timestamps();
        });

        DB::table('tech_stack')->insert([
            [
                'category' => 'técnicas',
                'skills' => json_encode([
                    'PHP' => 'Avanzado',
                    'JavaScript' => 'Avanzado',
                    'TypeScript' => 'Avanzado',
                    'Node.js' => 'Intermedio',
                    'Angular' => 'Avanzado',
                    'Laravel' => 'Avanzado',
                    'CodeIgniter 4' => 'Intermedio',
                    'Next.js' => 'Intermedio',
                    'MySQL' => 'Avanzado',
                    'Git y GitHub' => 'Uso diario',
                    'Docker' => 'Intermedio',
                    'HTML y CSS' => 'Avanzado',
                ]),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_stack');
    }
};
`;

const projectSeederEn = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'name' => 'Volunteer Management System',
                'description' => 'Web platform for managing university volunteers and events.',
                'features' => json_encode([
                    'Volunteer management and university events',
                    'Student enrollment in social activities',
                    'Admin-controlled event management for social hours',
                ]),
                'tags' => json_encode(['JSP', 'Web App', 'University Project']),
            ],
            [
                'name' => '[Upcoming Project]',
                'description' => 'Reserved space for your next personal project.',
                'features' => json_encode(['Pending implementation']),
                'tags' => json_encode(['Draft']),
            ],
        ]);
    }
}
`;

const projectSeederEs = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use Illuminate\\Support\\Facades\\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('projects')->insert([
            [
                'name' => 'Sistema de Gestión de Voluntariados',
                'description' => 'Plataforma web para la gestión de voluntariados y eventos universitarios.',
                'features' => json_encode([
                    'Gestión de plataforma utilizando JSP',
                    'Sistema de inscripción de estudiantes a actividades sociales',
                    'Gestión de eventos administrados por usuarios con control de horas sociales',
                ]),
                'tags' => json_encode(['JSP', 'Web App', 'Proyecto Universitario']),
            ],
            [
                'name' => '[Próximo Proyecto]',
                'description' => 'Espacio reservado para tu siguiente proyecto personal.',
                'features' => json_encode(['Pendiente de implementar']),
                'tags' => json_encode(['Borrador']),
            ],
        ]);
    }
}
`;

const experienceHelperEn = `<?php

if (! function_exists('get_experience')) {

    function get_experience(): array
    {
        return [
            [
                'category' => 'professional',
                'period' => 'April 2025 – Present',
                'role' => 'Software Developer Jr.',
                'detail' => json_encode([
                    'Development and maintenance of web applications.',
                    'Implementation of backend and frontend functionalities.',
                    'Integration and consumption of APIs.',
                    'Relational database management.',
                    'Technical documentation and version control.',
                    'Participation in deployment and dockerization of projects.',
                    'Collaborative work using methodologies and development tools.',
                ]),
            ],
            [
                'category' => 'professional',
                'period' => 'May 2024 – April 2025',
                'role' => 'Software Developer Internship',
                'detail' => json_encode([
                    'Support in the development and integration of APIs.',
                    'Learning and application of web technologies.',
                    'Documentation of processes and projects.',
                    'Support in backend and frontend development tasks.',
                ]),
            ],
            [
                'category' => 'volunteering',
                'period' => 'June 2023',
                'role' => 'IT Support — Central American and Caribbean Games',
                'detail' => json_encode([
                    'Monitoring of equipment and access points (APs).',
                    'Technical support for athletes and event staff.',
                    'Verification of connectivity and device operation.',
                ]),
            ],
            [
                'category' => 'volunteering',
                'period' => 'January 2023',
                'role' => 'Volunteer Management System — University Project',
                'detail' => json_encode([
                    'Development of a web platform using JSP for managing volunteers and university events.',
                    'Implementation of a student enrollment system for social activities.',
                    'Management of events administered by users with social hour control.',
                ]),
            ],
        ];
    }
}
`;

const experienceHelperEs = `<?php

if (! function_exists('get_experience')) {

    function get_experience(): array
    {
        return [
            [
                'category' => 'professional',
                'period' => 'Abril 2025 – Actualidad',
                'role' => 'Software Developer Jr.',
                'detail' => json_encode([
                    'Desarrollo y mantenimiento de aplicaciones web.',
                    'Implementación de funcionalidades backend y frontend.',
                    'Integración y consumo de APIs.',
                    'Manejo de bases de datos relacionales.',
                    'Documentación técnica y control de versiones.',
                    'Participación en despliegue y dockerización de proyectos.',
                    'Trabajo colaborativo utilizando metodologías y herramientas de desarrollo.',
                ]),
            ],
            [
                'category' => 'professional',
                'period' => 'Mayo 2024 – Abril 2025',
                'role' => 'Pasantía Software Developer',
                'detail' => json_encode([
                    'Apoyo en el desarrollo e integración de APIs.',
                    'Aprendizaje y aplicación de tecnologías web.',
                    'Documentación de procesos y proyectos.',
                    'Soporte en tareas de desarrollo backend y frontend.',
                ]),
            ],
            [
                'category' => 'volunteering',
                'period' => 'Junio 2023',
                'role' => 'Soporte TI — Juegos Centroamericanos y del Caribe',
                'detail' => json_encode([
                    'Monitoreo de equipos y puntos de acceso (APs).',
                    'Soporte técnico para atletas y personal del evento.',
                    'Verificación de conectividad y funcionamiento de dispositivos.',
                ]),
            ],
            [
                'category' => 'volunteering',
                'period' => 'Enero 2023',
                'role' => 'Sistema de Gestión de Voluntariados — Proyecto Universitario',
                'detail' => json_encode([
                    'Desarrollo de plataforma web utilizando JSP para la gestión de voluntariados y eventos universitarios.',
                    'Implementación de sistema de inscripción de estudiantes a actividades sociales.',
                    'Gestión de eventos administrados por usuarios con control de horas sociales.',
                ]),
            ],
        ];
    }
}
`;

const portfolioServiceEn = `<?php

namespace App\\Services;

use App\\Http\\Controllers\\HeroController;
use App\\Models\\AboutModel;
use Illuminate\\Support\\Facades\\DB;

class PortfolioService
{
    public function __construct(
        protected AboutModel $aboutModel
    ) {
    }

    public function getLandingPayload(): array
    {
        return [
            'hero' => app(HeroController::class)->index(),
            'about' => $this->aboutModel->getProfile(),
            'tech_stack' => DB::table('tech_stack')->get(),
            'projects' => DB::table('projects')->get(),
            'experience' => get_experience(),
        ];
    }
}
`;

const portfolioServiceEs = `<?php

namespace App\\Services;

use App\\Http\\Controllers\\HeroController;
use App\\Models\\AboutModel;
use Illuminate\\Support\\Facades\\DB;

class PortfolioService
{
    public function __construct(
        protected AboutModel $aboutModel
    ) {
    }

    public function getLandingPayload(): array
    {
        return [
            'hero' => app(HeroController::class)->index(),
            'about' => $this->aboutModel->getProfile(),
            'tech_stack' => DB::table('tech_stack')->get(),
            'projects' => DB::table('projects')->get(),
            'experience' => get_experience(),
        ];
    }
}
`;

const contactRequestEn = `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class ContactFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc'],
            'message' => ['required', 'string', 'max:5000'],
            'linkedin' => ['nullable', 'url'],
            'github' => ['nullable', 'url'],
        ];
    }
}
`;

const contactRequestEs = `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class ContactFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc'],
            'message' => ['required', 'string', 'max:5000'],
            'linkedin' => ['nullable', 'url'],
            'github' => ['nullable', 'url'],
        ];
    }
}
`;

const contactBladeEn = `@extends('layouts.portfolio')

@section('content')
<section class="contact">
    <h1>Contact</h1>
    {{-- marlonriv003@gmail.com — (503) 7733-7519 --}}
    <ul>
        <li>Email: marlonriv003@gmail.com</li>
        <li>Location: San Salvador, El Salvador</li>
        @foreach ($social as $link)
            <li><a href="{{ $link['url'] }}">{{ $link['label'] }}</a></li>
        @endforeach
    </ul>
    <footer>
        Built with Angular 21, PHP/Laravel (simulated), and passion.
    </footer>
</section>
@endsection
`;

const contactBladeEs = `@extends('layouts.portfolio')

@section('content')
<section class="contact">
    <h1>Contacto</h1>
    {{-- marlonriv003@gmail.com — (503) 7733-7519 --}}
    <ul>
        <li>Email: marlonriv003@gmail.com</li>
        <li>Ubicación: San Salvador, El Salvador</li>
        @foreach ($social as $link)
            <li><a href="{{ $link['url'] }}">{{ $link['label'] }}</a></li>
        @endforeach
    </ul>
    <footer>
        Hecho con Angular 21, PHP/Laravel (simulado) y pasión.
    </footer>
</section>
@endsection
`;

export const PORTFOLIO_TRANSLATIONS: Record<PortfolioLang, PortfolioTranslations> = {
  en: {
    meta: { htmlLang: 'en', pageTitle: 'Marlon Rivas — MARLON-PORTFOLIO' },
    ide: {
      explorer: 'EXPLORER',
      rootFolder: 'MARLON-PORTFOLIO',
      statusBranch: 'main',
      statusErrors: '0 errors',
      statusEncoding: 'UTF-8',
      statusLive: 'Live',
      windowTitle: 'Marlon Rivas Portfolio',
      panel: {
        problems: 'Problems',
        output: 'Output',
        debugConsole: 'Debug Console',
        terminal: 'Terminal',
        ports: 'Ports',
        newTerminal: 'New terminal',
        splitTerminal: 'Split terminal',
        killTerminal: 'Kill terminal',
        closePanel: 'Close panel',
      },
      prompt: {
        user: 'marlonriv',
        repoName: 'portfolio',
        inRepo: 'in repo:',
        on: 'on',
        via: 'via',
        gitAdd: '+105',
        gitDel: '-365',
        gitDirty: '[!?]',
        nodeVersion: 'v25.7.0',
        ariaLabel: 'Simulated shell prompt',
      },
      terminal: {
        welcome: 'Type help to see available commands.',
        placeholder: 'Type a command...',
        availableCommands: 'Available commands: help, clear, pwd, ls, git status',
        pwdPath: '/home/marlonriv/portfolio',
        lsItems: 'app  src  package.json  angular.json  README.md',
        gitStatus: [
          'On branch main',
          'Your branch is up to date with origin/main.',
          'Changes not staged for commit:',
          '  modified: src/main.ts',
          '  modified: angular.json',
        ],
        unknownCommand: 'Command not found: {command}',
      },
      theme: {
        label: 'Theme',
        catppuccin: 'Catppuccin',
        vsDark: 'VS Dark',
        nord: 'Nord',
        light: 'Light',
      },
    },
    codeFiles: {
      hero_controller: {
        label: 'HeroController.php',
        path: 'app/Http/Controllers/HeroController.php',
        content: heroControllerEn,
        statusLabel: 'PHP',
      },
      about_model: {
        label: 'AboutModel.php',
        path: 'app/Models/AboutModel.php',
        content: aboutModelEn,
        statusLabel: 'PHP',
      },
      tech_migration: {
        label: '2024_01_01_000000_create_tech_stack_table.php',
        path: 'database/migrations/2024_01_01_000000_create_tech_stack_table.php',
        content: techMigrationEn,
        statusLabel: 'PHP',
      },
      project_seeder: {
        label: 'ProjectSeeder.php',
        path: 'database/seeders/ProjectSeeder.php',
        content: projectSeederEn,
        statusLabel: 'PHP',
      },
      experience_helper: {
        label: 'experience_helper.php',
        path: 'app/Helpers/experience_helper.php',
        content: experienceHelperEn,
        statusLabel: 'PHP',
      },
      portfolio_service: {
        label: 'PortfolioService.php',
        path: 'app/Services/PortfolioService.php',
        content: portfolioServiceEn,
        statusLabel: 'PHP',
      },
      contact_request: {
        label: 'ContactFormRequest.php',
        path: 'app/Http/Requests/ContactFormRequest.php',
        content: contactRequestEn,
        statusLabel: 'PHP',
      },
      contact_blade: {
        label: 'contact.blade.php',
        path: 'resources/views/contact.blade.php',
        content: contactBladeEn,
        statusLabel: 'Blade',
      },
    },
    language: { en: 'EN', es: 'ES', aria: 'Switch language' },
  },
  es: {
    meta: { htmlLang: 'es', pageTitle: 'Marlon Rivas — MARLON-PORTFOLIO' },
    ide: {
      explorer: 'EXPLORER',
      rootFolder: 'MARLON-PORTFOLIO',
      statusBranch: 'main',
      statusErrors: '0 errores',
      statusEncoding: 'UTF-8',
      statusLive: 'En vivo',
      windowTitle: 'Portafolio Marlon Rivas',
      panel: {
        problems: 'Problemas',
        output: 'Salida',
        debugConsole: 'Consola de depuración',
        terminal: 'Terminal',
        ports: 'Puertos',
        newTerminal: 'Nueva terminal',
        splitTerminal: 'Dividir terminal',
        killTerminal: 'Cerrar terminal',
        closePanel: 'Cerrar panel',
      },
      prompt: {
        user: 'marlonriv',
        repoName: 'portfolio',
        inRepo: 'en repo:',
        on: 'en rama',
        via: 'con',
        gitAdd: '+105',
        gitDel: '-365',
        gitDirty: '[!?]',
        nodeVersion: 'v25.7.0',
        ariaLabel: 'Prompt de terminal simulado',
      },
      terminal: {
        welcome: 'Escribe help para ver los comandos disponibles.',
        placeholder: 'Escribe un comando...',
        availableCommands: 'Comandos disponibles: help, clear, pwd, ls, git status',
        pwdPath: '/home/marlonriv/portfolio',
        lsItems: 'app  src  package.json  angular.json  README.md',
        gitStatus: [
          'En la rama main',
          'Tu rama esta actualizada con origin/main.',
          'Cambios no preparados para commit:',
          '  modificado: src/main.ts',
          '  modificado: angular.json',
        ],
        unknownCommand: 'Comando no encontrado: {command}',
      },
      theme: {
        label: 'Tema',
        catppuccin: 'Catppuccin',
        vsDark: 'VS Dark',
        nord: 'Nord',
        light: 'Claro',
      },
    },
    codeFiles: {
      hero_controller: {
        label: 'HeroController.php',
        path: 'app/Http/Controllers/HeroController.php',
        content: heroControllerEs,
        statusLabel: 'PHP',
      },
      about_model: {
        label: 'AboutModel.php',
        path: 'app/Models/AboutModel.php',
        content: aboutModelEs,
        statusLabel: 'PHP',
      },
      tech_migration: {
        label: '2024_01_01_000000_create_tech_stack_table.php',
        path: 'database/migrations/2024_01_01_000000_create_tech_stack_table.php',
        content: techMigrationEs,
        statusLabel: 'PHP',
      },
      project_seeder: {
        label: 'ProjectSeeder.php',
        path: 'database/seeders/ProjectSeeder.php',
        content: projectSeederEs,
        statusLabel: 'PHP',
      },
      experience_helper: {
        label: 'experience_helper.php',
        path: 'app/Helpers/experience_helper.php',
        content: experienceHelperEs,
        statusLabel: 'PHP',
      },
      portfolio_service: {
        label: 'PortfolioService.php',
        path: 'app/Services/PortfolioService.php',
        content: portfolioServiceEs,
        statusLabel: 'PHP',
      },
      contact_request: {
        label: 'ContactFormRequest.php',
        path: 'app/Http/Requests/ContactFormRequest.php',
        content: contactRequestEs,
        statusLabel: 'PHP',
      },
      contact_blade: {
        label: 'contact.blade.php',
        path: 'resources/views/contact.blade.php',
        content: contactBladeEs,
        statusLabel: 'Blade',
      },
    },
    language: { en: 'EN', es: 'ES', aria: 'Cambiar idioma' },
  },
};
