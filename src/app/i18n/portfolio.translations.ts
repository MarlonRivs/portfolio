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
            'title' => 'Full Stack Developer',
            'tagline' => 'Building scalable and modern web applications',
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
            'title' => 'Full Stack Developer',
            'tagline' => 'Construyendo aplicaciones web escalables y modernas',
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
            'education' => 'Systems Engineering Student',
            'summary' => [
                'Hands-on experience building real-world web apps',
                'Specialized in full-stack development with modern tech',
                'Focus on clean, maintainable, and scalable code',
                'Enterprise-level internal tools and systems',
            ],
            'interests' => [
                'Backend architecture and API design',
                'Interactive dashboards and analytics',
                'System integrations and automation',
                'UI and UX design principles',
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
            'education' => 'Estudiante de Ingeniería de Sistemas',
            'summary' => [
                'Experiencia práctica en aplicaciones web reales',
                'Especialización full-stack con stack moderno',
                'Código limpio, mantenible y escalable',
                'Herramientas internas y sistemas empresariales',
            ],
            'interests' => [
                'Arquitectura backend y diseño de APIs',
                'Paneles interactivos y analíticas',
                'Integraciones y automatización',
                'Principios de UI/UX',
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
                'category' => 'frontend',
                'skills' => json_encode([
                    'angular' => 'Advanced',
                    'react' => 'Basic',
                    'javascript' => 'Advanced',
                    'typescript' => 'Intermediate',
                    'tailwind_css' => 'Advanced',
                    'css' => 'Advanced',
                ]),
            ],
            [
                'category' => 'backend',
                'skills' => json_encode([
                    'php' => 'Advanced',
                    'codeigniter_4' => 'Advanced',
                    'laravel' => 'Intermediate',
                    'nodejs' => 'Intermediate',
                ]),
            ],
            [
                'category' => 'database',
                'skills' => json_encode([
                    'mysql' => 'Advanced',
                    'supabase' => 'Intermediate',
                ]),
            ],
            [
                'category' => 'tools',
                'skills' => json_encode([
                    'bitbucket' => 'Daily use',
                    'notion' => 'Daily use',
                    'confluence' => 'Daily use',
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
                'category' => 'frontend',
                'skills' => json_encode([
                    'angular' => 'Avanzado',
                    'react' => 'Básico',
                    'javascript' => 'Avanzado',
                    'typescript' => 'Intermedio',
                    'tailwind_css' => 'Avanzado',
                    'css' => 'Avanzado',
                ]),
            ],
            [
                'category' => 'backend',
                'skills' => json_encode([
                    'php' => 'Avanzado',
                    'codeigniter_4' => 'Avanzado',
                    'laravel' => 'Intermedio',
                    'nodejs' => 'Intermedio',
                ]),
            ],
            [
                'category' => 'database',
                'skills' => json_encode([
                    'mysql' => 'Avanzado',
                    'supabase' => 'Intermedio',
                ]),
            ],
            [
                'category' => 'tools',
                'skills' => json_encode([
                    'bitbucket' => 'Uso diario',
                    'notion' => 'Uso diario',
                    'confluence' => 'Uso diario',
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
                'name' => 'SkillBridge',
                'description' => 'Web platform connecting users with skill-building opportunities.',
                'features' => json_encode([
                    'Interactive dashboard with analytics',
                    'User profile management',
                    'Modular architecture',
                ]),
                'tags' => json_encode(['Web App', 'Dashboard', 'Full Stack']),
            ],
            [
                'name' => 'Elix-Perfum',
                'description' => 'Premium e-commerce platform for a perfume brand.',
                'features' => json_encode([
                    'Refined product catalog',
                    'Responsive design',
                    'Admin tooling',
                ]),
                'tags' => json_encode(['E-commerce', 'UI/UX', 'Responsive']),
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
                'name' => 'SkillBridge',
                'description' => 'Plataforma web que conecta usuarios con oportunidades de desarrollo.',
                'features' => json_encode([
                    'Panel interactivo con analíticas',
                    'Gestión de perfiles de usuario',
                    'Arquitectura modular',
                ]),
                'tags' => json_encode(['Web App', 'Dashboard', 'Full Stack']),
            ],
            [
                'name' => 'Elix-Perfum',
                'description' => 'E-commerce premium para una marca de perfumes.',
                'features' => json_encode([
                    'Catálogo de productos refinado',
                    'Diseño responsive',
                    'Herramientas de administración',
                ]),
                'tags' => json_encode(['E-commerce', 'UI/UX', 'Responsive']),
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
                'role' => 'Internal web systems',
                'detail' => 'Developed enterprise-grade internal tools',
            ],
            [
                'role' => 'Parking management system',
                'detail' => 'Request-based access control with dashboard analytics',
            ],
            [
                'role' => 'Inventory / ERP module',
                'detail' => 'Integrated with billing for streamlined operations',
            ],
            [
                'role' => 'Commercial websites',
                'detail' => 'Responsive and modern business web presences',
            ],
            [
                'role' => 'Monitoring systems',
                'detail' => 'API-based infrastructure monitoring (Zabbix)',
            ],
            [
                'role' => 'Cloud image optimization',
                'detail' => 'Storage and image processing pipelines',
            ],
            [
                'role' => 'Agile collaboration',
                'detail' => 'Bitbucket, Notion, and Confluence with cross-functional teams',
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
                'role' => 'Sistemas web internos',
                'detail' => 'Herramientas internas de nivel empresarial',
            ],
            [
                'role' => 'Sistema de estacionamiento',
                'detail' => 'Control por solicitudes con panel y analíticas',
            ],
            [
                'role' => 'Módulo inventario / ERP',
                'detail' => 'Integrado con facturación para operaciones ágiles',
            ],
            [
                'role' => 'Sitios comerciales',
                'detail' => 'Presencias web responsive y modernas',
            ],
            [
                'role' => 'Monitoreo',
                'detail' => 'Infraestructura vía APIs (Zabbix)',
            ],
            [
                'role' => 'Optimización de imágenes en la nube',
                'detail' => 'Almacenamiento y pipelines de procesamiento',
            ],
            [
                'role' => 'Colaboración ágil',
                'detail' => 'Bitbucket, Notion y Confluence en equipos multidisciplina',
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
    {{-- hello@marlonrivas.dev — portfolio inquiry --}}
    <ul>
        @foreach ($social as $link)
            <li><a href="{{ $link['url'] }}">{{ $link['label'] }}</a></li>
        @endforeach
    </ul>
    <footer>
        Built with PHP, Laravel, and care for detail.
    </footer>
</section>
@endsection
`;

const contactBladeEs = `@extends('layouts.portfolio')

@section('content')
<section class="contact">
    <h1>Contacto</h1>
    {{-- hello@marlonrivas.dev — consulta de portafolio --}}
    <ul>
        @foreach ($social as $link)
            <li><a href="{{ $link['url'] }}">{{ $link['label'] }}</a></li>
        @endforeach
    </ul>
    <footer>
        Hecho con PHP, Laravel y atención al detalle.
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
