#!/usr/bin/env python3
"""
Add "Create" links for 0-count counters in teamadmin detail views
AND add pre-filling parent ID support to teamadmin forms.

Changes:
1. Form TS: add idParent = input<number>(0), pre-fill in ngOnInit
2. Form HTML: hide picker button when locked by parent input
3. New page: read query param and pass to form
4. Detail HTML: add create links when counter == 0
"""
import re, os

BASE = '/home/rafa/Projects/2026/gesportin/frontsportin/src/app'

# ──────────────────────────────────────────────────────────────────────────────
# STEP 1: Modify form TS files to accept idParent input
# ──────────────────────────────────────────────────────────────────────────────
print("=== Step 1: Modify form TS files ===")

# --- jugador form: add idEquipo input ---
path = f'{BASE}/component/jugador/teamadmin/form/form.ts'
content = open(path).read()

# Add idEquipo input after 'returnUrl = input' line
content = content.replace(
    "  returnUrl = input<string>('/jugador/teamadmin');",
    "  returnUrl = input<string>('/jugador/teamadmin');\n  idEquipo = input<number>(0);"
)

# In ngOnInit, add pre-fill call after initForm
content = content.replace(
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.jugadorForm = this.fb.group({""",
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      if (this.idEquipo() > 0) {
        this.jugadorForm.patchValue({ id_equipo: this.idEquipo() });
        this.loadEquipo(this.idEquipo());
      }
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.jugadorForm = this.fb.group({"""
)

open(path, 'w').write(content)
print(f"  DONE: jugador form TS")

# --- cuota form: add idEquipo input ---
path = f'{BASE}/component/cuota/teamadmin/form/form.ts'
content = open(path).read()
content = content.replace(
    "  returnUrl = input<string>('/cuota/teamadmin');",
    "  returnUrl = input<string>('/cuota/teamadmin');\n  idEquipo = input<number>(0);"
)
content = content.replace(
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.cuotaForm = this.fb.group({""",
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      if (this.idEquipo() > 0) {
        this.cuotaForm.patchValue({ id_equipo: this.idEquipo() });
        this.loadEquipo(this.idEquipo());
      }
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.cuotaForm = this.fb.group({"""
)
open(path, 'w').write(content)
print(f"  DONE: cuota form TS")

# --- liga form: add idEquipo input ---
path = f'{BASE}/component/liga/teamadmin/form/form.ts'
content = open(path).read()
content = content.replace(
    "  returnUrl = input<string>('/liga/teamadmin');",
    "  returnUrl = input<string>('/liga/teamadmin');\n  idEquipo = input<number>(0);"
)
# After "this.loadEquipos();" add the pre-fill
content = content.replace(
    """  ngOnInit(): void {
    this.initForm();
    this.loadEquipos();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      this.loading?.set(false);
    }
  }""",
    """  ngOnInit(): void {
    this.initForm();
    this.loadEquipos();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      if (this.idEquipo() > 0) {
        this.ligaForm.patchValue({ id_equipo: this.idEquipo() });
        this.loadEquipo(this.idEquipo());
      }
      this.loading?.set(false);
    }
  }"""
)
open(path, 'w').write(content)
print(f"  DONE: liga form TS")

# --- partido form: add idLiga input ---
path = f'{BASE}/component/partido/teamadmin/form/form.ts'
content = open(path).read()
content = content.replace(
    "  returnUrl = input<string>('/partido/teamadmin');",
    "  returnUrl = input<string>('/partido/teamadmin');\n  idLiga = input<number>(0);"
)
# Find the loadLiga method
load_liga_method = ""
m = re.search(r'private load(Liga|ById)\(id.*?\{[^}]*selectedLiga[^}]*\n  \}', content, re.DOTALL)

content = content.replace(
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.partidoForm = this.fb.group({""",
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      if (this.idLiga() > 0) {
        this.partidoForm.patchValue({ id_liga: this.idLiga() });
        this.loadLiga(this.idLiga());
      }
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.partidoForm = this.fb.group({"""
)
open(path, 'w').write(content)
print(f"  DONE: partido form TS")

# --- pago form: add idCuota input ---
path = f'{BASE}/component/pago/teamadmin/form/form.ts'
content = open(path).read()
content = content.replace(
    "  returnUrl = input<string>('/pago/teamadmin');",
    "  returnUrl = input<string>('/pago/teamadmin');\n  idCuota = input<number>(0);"
)
content = content.replace(
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.pagoForm = this.fb.group({""",
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      if (this.idCuota() > 0) {
        this.pagoForm.patchValue({ id_cuota: this.idCuota() });
        this.loadCuota(this.idCuota());
      }
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.pagoForm = this.fb.group({"""
)
open(path, 'w').write(content)
print(f"  DONE: pago form TS")

# --- categoria form: add idTemporada input ---
path = f'{BASE}/component/categoria/teamadmin/form/form.ts'
content = open(path).read()
# Find where 'returnUrl' input is defined
if "returnUrl = input<string>('/categoria/teamadmin');" in content:
    content = content.replace(
        "  returnUrl = input<string>('/categoria/teamadmin');",
        "  returnUrl = input<string>('/categoria/teamadmin');\n  idTemporada = input<number>(0);"
    )
else:
    # Try to add after id = input
    content = content.replace(
        "  id = input<number>(0);",
        "  id = input<number>(0);\n  idTemporada = input<number>(0);"
    )

# Patch ngOnInit
content = content.replace(
    """  ngOnInit(): void {
    this.initForm();
    this.loadTemporadas();
    if (this.id() > 0) {
      this.loadCategoria(this.id());
    } else {
      this.loading.set(false);
    }
  }""",
    """  ngOnInit(): void {
    this.initForm();
    this.loadTemporadas();
    if (this.id() > 0) {
      this.loadCategoria(this.id());
    } else {
      if (this.idTemporada() > 0) {
        this.categoriaForm.patchValue({ id_temporada: this.idTemporada() });
        this.syncTemporada(this.idTemporada());
      }
      this.loading.set(false);
    }
  }"""
)
open(path, 'w').write(content)
print(f"  DONE: categoria form TS")

# --- equipo form: add idCategoria input ---
path = f'{BASE}/component/equipo/teamadmin/form/form.ts'
content = open(path).read()
if "returnUrl = input<string>('/equipo/teamadmin');" in content:
    content = content.replace(
        "  returnUrl = input<string>('/equipo/teamadmin');",
        "  returnUrl = input<string>('/equipo/teamadmin');\n  idCategoria = input<number>(0);"
    )
else:
    content = content.replace(
        "  id = input<number>(0);",
        "  id = input<number>(0);\n  idCategoria = input<number>(0);"
    )

content = content.replace(
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.equipoForm = this.fb.group({""",
    """  ngOnInit(): void {
    this.initForm();

    if (this.id() > 0) {
      this.loadById(this.id());
    } else {
      if (this.idCategoria() > 0) {
        this.equipoForm.patchValue({ id_categoria: this.idCategoria() });
        this.loadCategoria(this.idCategoria());
      }
      this.loading?.set(false);
    }
  }

  private initForm(): void {
    this.equipoForm = this.fb.group({"""
)
open(path, 'w').write(content)
print(f"  DONE: equipo form TS")

# ──────────────────────────────────────────────────────────────────────────────
# STEP 2: Modify form HTML files to hide picker button when locked
# ──────────────────────────────────────────────────────────────────────────────
print("\n=== Step 2: Modify form HTML files ===")

# --- jugador form HTML: hide "Buscar equipo" button when idEquipo is locked ---
path = f'{BASE}/component/jugador/teamadmin/form/form.html'
content = open(path).read()
# Find the equipo search button and wrap it
# Look for the pattern of the "Buscar" button near "openEquipoFinderModal"
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openEquipoFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idEquipo() <= 0) { \1 }',
    content
)
open(path, 'w').write(content)
print(f"  DONE: jugador form HTML")

# --- cuota form HTML: hide "Buscar" equipo button when locked ---
path = f'{BASE}/component/cuota/teamadmin/form/form.html'
content = open(path).read()
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openEquipoFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idEquipo() <= 0) { \1 }',
    content
)
open(path, 'w').write(content)
print(f"  DONE: cuota form HTML")

# --- liga form HTML: hide selector when locked ---
path = f'{BASE}/component/liga/teamadmin/form/form.html'
content = open(path).read()
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openEquipoFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idEquipo() <= 0) { \1 }',
    content
)
# Also check if liga uses a select; if so, disable select when locked
# Liga may use <select> with equipo list
content = re.sub(
    r'(<select[^>]*formControlName="id_equipo"[^>]*>)',
    r'<select\1',  # no-op placeholder
    content
)
# Actually let's look at what liga form HTML uses
open(path, 'w').write(content)
print(f"  DONE: liga form HTML (check select vs modal)")

# --- partido form HTML: hide "Buscar liga" button when locked ---
path = f'{BASE}/component/partido/teamadmin/form/form.html'
content = open(path).read()
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openLigaFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idLiga() <= 0) { \1 }',
    content
)
open(path, 'w').write(content)
print(f"  DONE: partido form HTML")

# --- pago form HTML: hide "Buscar cuota" button when locked ---
path = f'{BASE}/component/pago/teamadmin/form/form.html'
content = open(path).read()
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openCuotaFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idCuota() <= 0) { \1 }',
    content
)
open(path, 'w').write(content)
print(f"  DONE: pago form HTML")

# --- categoria form HTML: hide "Buscar temporada" button/select when locked ---
# Categoria typically uses a select list, not a modal
path = f'{BASE}/component/categoria/teamadmin/form/form.html'
content = open(path).read()
# Wrap the temporada select in @if
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openTemporadaFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idTemporada() <= 0) { \1 }',
    content
)
open(path, 'w').write(content)
print(f"  DONE: categoria form HTML")

# --- equipo form HTML: hide "Buscar categoria" button when locked ---
path = f'{BASE}/component/equipo/teamadmin/form/form.html'
content = open(path).read()
content = re.sub(
    r'(<button type="button" class="btn btn-[^"]*" \(click\)="openCategoriaFinderModal\(\)">[^<]*(?:<i[^>]*></i>[^<]*)?Buscar[^<]*<\/button>)',
    r'@if (idCategoria() <= 0) { \1 }',
    content
)
open(path, 'w').write(content)
print(f"  DONE: equipo form HTML")

# ──────────────────────────────────────────────────────────────────────────────
# STEP 3: Modify new page TS files to read query params and pass to form
# ──────────────────────────────────────────────────────────────────────────────
print("\n=== Step 3: Modify new page TS files ===")

NEW_PAGES = [
    {
        'entity': 'jugador',
        'param': 'id_equipo',
        'input': 'idEquipo',
        'selector': 'app-jugador-teamadmin-form',
        'class': 'JugadorTeamadminNewPage',
        'form_class': 'JugadorTeamadminForm',
        'form_import': '../../../../component/jugador/teamadmin/form/form',
    },
    {
        'entity': 'cuota',
        'param': 'id_equipo',
        'input': 'idEquipo',
        'selector': 'app-cuota-teamadmin-form',
        'class': 'CuotaTeamadminNewPage',
        'form_class': 'CuotaTeamadminForm',
        'form_import': '../../../../component/cuota/teamadmin/form/form',
    },
    {
        'entity': 'liga',
        'param': 'id_equipo',
        'input': 'idEquipo',
        'selector': 'app-liga-teamadmin-form',
        'class': 'LigaTeamadminNewPage',
        'form_class': 'LigaTeamadminForm',
        'form_import': '../../../../component/liga/teamadmin/form/form',
    },
    {
        'entity': 'partido',
        'param': 'id_liga',
        'input': 'idLiga',
        'selector': 'app-partido-teamadmin-form',
        'class': 'PartidoTeamadminNewPage',
        'form_class': 'PartidoTeamadminForm',
        'form_import': '../../../../component/partido/teamadmin/form/form',
    },
    {
        'entity': 'pago',
        'param': 'id_cuota',
        'input': 'idCuota',
        'selector': 'app-pago-teamadmin-form',
        'class': 'PagoTeamadminNewPage',
        'form_class': 'PagoTeamadminForm',
        'form_import': '../../../../component/pago/teamadmin/form/form',
    },
    {
        'entity': 'categoria',
        'param': 'id_temporada',
        'input': 'idTemporada',
        'selector': 'app-categoria-teamadmin-form',
        'class': 'CategoriaTeamadminNewPage',
        'form_class': 'CategoriaTeamadminForm',
        'form_import': '../../../../component/categoria/teamadmin/form/form',
    },
    {
        'entity': 'equipo',
        'param': 'id_categoria',
        'input': 'idCategoria',
        'selector': 'app-equipo-teamadmin-form',
        'class': 'EquipoTeamadminNewPage',
        'form_class': 'EquipoTeamadminForm',
        'form_import': '../../../../component/equipo/teamadmin/form/form',
    },
]

for p in NEW_PAGES:
    entity = p['entity']
    param = p['param']
    input_name = p['input']
    selector = p['selector']
    class_name = p['class']
    form_class = p['form_class']
    form_import = p['form_import']
    return_url = f'/{entity}/teamadmin'

    new_content = f"""import {{ Component, OnInit, inject, signal }} from '@angular/core';
import {{ ActivatedRoute }} from '@angular/router';
import {{ {form_class} }} from '{form_import}';

@Component({{
  selector: 'app-{entity}-teamadmin-new-page',
  imports: [{form_class}],
  template: '<{selector} [returnUrl]="returnUrl" [{input_name}]="{input_name}()"></{selector}>',
}})
export class {class_name} implements OnInit {{
  private route = inject(ActivatedRoute);
  returnUrl = '{return_url}';
  {input_name} = signal<number>(0);

  ngOnInit(): void {{
    const val = this.route.snapshot.queryParamMap.get('{param}');
    if (val) this.{input_name}.set(Number(val));
  }}
}}
"""
    path = f'{BASE}/page/{entity}/teamadmin/new/new.ts'
    open(path, 'w').write(new_content)
    print(f"  DONE: {entity} new page TS")

# ──────────────────────────────────────────────────────────────────────────────
# STEP 4: Modify detail HTML files to add create links for 0 counters
# ──────────────────────────────────────────────────────────────────────────────
print("\n=== Step 4: Modify detail HTML files ===")

# Equipo detail: jugadores, cuotas, ligas
path = f'{BASE}/component/equipo/teamadmin/detail/detail.html'
content = open(path).read()

# jugadores (0)
content = content.replace(
    """                  @if ((oEquipo()?.jugadores ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/jugador/teamadmin/equipo' : '/jugador/equipo', oEquipo()?.id]" class="text-decoration-none">{{ oEquipo()?.jugadores }}</a>
                  } @else { 0 }""",
    """                  @if ((oEquipo()?.jugadores ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/jugador/teamadmin/equipo' : '/jugador/equipo', oEquipo()?.id]" class="text-decoration-none">{{ oEquipo()?.jugadores }}</a>
                  } @else {
                    0 <a [routerLink]="['/jugador/teamadmin/new']" [queryParams]="{ id_equipo: oEquipo()?.id }" class="btn btn-outline-success btn-sm ms-1 py-0 px-1" title="Crear jugador para este equipo"><i class="bi bi-plus-lg"></i></a>
                  }"""
)

# cuotas (0)
content = content.replace(
    """                  @if ((oEquipo()?.cuotas ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/cuota/teamadmin/equipo' : '/cuota/equipo', oEquipo()?.id]" class="text-decoration-none">{{ oEquipo()?.cuotas }}</a>
                  } @else { 0 }""",
    """                  @if ((oEquipo()?.cuotas ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/cuota/teamadmin/equipo' : '/cuota/equipo', oEquipo()?.id]" class="text-decoration-none">{{ oEquipo()?.cuotas }}</a>
                  } @else {
                    0 <a [routerLink]="['/cuota/teamadmin/new']" [queryParams]="{ id_equipo: oEquipo()?.id }" class="btn btn-outline-success btn-sm ms-1 py-0 px-1" title="Crear cuota para este equipo"><i class="bi bi-plus-lg"></i></a>
                  }"""
)

# ligas (0)
content = content.replace(
    """                  @if ((oEquipo()?.ligas ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/liga/teamadmin/equipo' : '/liga/equipo', oEquipo()?.id]" class="text-decoration-none">{{ oEquipo()?.ligas }}</a>
                  } @else { 0 }""",
    """                  @if ((oEquipo()?.ligas ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/liga/teamadmin/equipo' : '/liga/equipo', oEquipo()?.id]" class="text-decoration-none">{{ oEquipo()?.ligas }}</a>
                  } @else {
                    0 <a [routerLink]="['/liga/teamadmin/new']" [queryParams]="{ id_equipo: oEquipo()?.id }" class="btn btn-outline-success btn-sm ms-1 py-0 px-1" title="Crear liga para este equipo"><i class="bi bi-plus-lg"></i></a>
                  }"""
)

open(path, 'w').write(content)
print(f"  DONE: equipo detail HTML")

# Liga detail: partidos
path = f'{BASE}/component/liga/teamadmin/detail/detail.html'
content = open(path).read()
content = content.replace(
    """                  @if ((oLiga()?.partidos ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/partido/teamadmin/liga' : '/partido/liga', oLiga()?.id]" class="text-decoration-none">{{ oLiga()?.partidos }}</a>
                  } @else { 0 }""",
    """                  @if ((oLiga()?.partidos ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/partido/teamadmin/liga' : '/partido/liga', oLiga()?.id]" class="text-decoration-none">{{ oLiga()?.partidos }}</a>
                  } @else {
                    0 <a [routerLink]="['/partido/teamadmin/new']" [queryParams]="{ id_liga: oLiga()?.id }" class="btn btn-outline-success btn-sm ms-1 py-0 px-1" title="Crear partido para esta liga"><i class="bi bi-plus-lg"></i></a>
                  }"""
)
open(path, 'w').write(content)
print(f"  DONE: liga detail HTML")

# Cuota detail: pagos
path = f'{BASE}/component/cuota/teamadmin/detail/detail.html'
content = open(path).read()
content = content.replace(
    """                  @if ((oCuota()?.pagos ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/pago/teamadmin/cuota' : '/pago/cuota', oCuota()?.id]" class="text-decoration-none">{{ oCuota()?.pagos }}</a>
                  } @else { 0 }""",
    """                  @if ((oCuota()?.pagos ?? 0) > 0) {
                    <a [routerLink]="[session.isClubAdmin() ? '/pago/teamadmin/cuota' : '/pago/cuota', oCuota()?.id]" class="text-decoration-none">{{ oCuota()?.pagos }}</a>
                  } @else {
                    0 <a [routerLink]="['/pago/teamadmin/new']" [queryParams]="{ id_cuota: oCuota()?.id }" class="btn btn-outline-success btn-sm ms-1 py-0 px-1" title="Crear pago para esta cuota"><i class="bi bi-plus-lg"></i></a>
                  }"""
)
open(path, 'w').write(content)
print(f"  DONE: cuota detail HTML")

# Temporada detail: categorias
path = f'{BASE}/component/temporada/teamadmin/detail/detail.html'
content = open(path).read()
content = content.replace(
    "@if ((oTemporada()?.categorias ?? 0) > 0) { <a [routerLink]=\"[session.isClubAdmin() ? '/categoria/teamadmin/temporada' : '/categoria/temporada', oTemporada()?.id]\" class=\"text-decoration-none\">{{ oTemporada()?.categorias }}</a> } @else { 0 }",
    "@if ((oTemporada()?.categorias ?? 0) > 0) { <a [routerLink]=\"[session.isClubAdmin() ? '/categoria/teamadmin/temporada' : '/categoria/temporada', oTemporada()?.id]\" class=\"text-decoration-none\">{{ oTemporada()?.categorias }}</a> } @else { 0 <a [routerLink]=\"['/categoria/teamadmin/new']\" [queryParams]=\"{ id_temporada: oTemporada()?.id }\" class=\"btn btn-outline-success btn-sm ms-1 py-0 px-1\" title=\"Crear categoría para esta temporada\"><i class=\"bi bi-plus-lg\"></i></a> }"
)
open(path, 'w').write(content)
print(f"  DONE: temporada detail HTML")

# Categoria detail: equipos
path = f'{BASE}/component/categoria/teamadmin/detail/detail.html'
content = open(path).read()
content = content.replace(
    "@if ((oCategoria()?.equipos ?? 0) > 0) { <a [routerLink]=\"[session.isClubAdmin() ? '/equipo/teamadmin/categoria' : '/equipo/categoria', oCategoria()?.id]\" class=\"text-decoration-none\">{{ oCategoria()?.equipos }}</a> } @else { 0 }",
    "@if ((oCategoria()?.equipos ?? 0) > 0) { <a [routerLink]=\"[session.isClubAdmin() ? '/equipo/teamadmin/categoria' : '/equipo/categoria', oCategoria()?.id]\" class=\"text-decoration-none\">{{ oCategoria()?.equipos }}</a> } @else { 0 <a [routerLink]=\"['/equipo/teamadmin/new']\" [queryParams]=\"{ id_categoria: oCategoria()?.id }\" class=\"btn btn-outline-success btn-sm ms-1 py-0 px-1\" title=\"Crear equipo para esta categoría\"><i class=\"bi bi-plus-lg\"></i></a> }"
)
open(path, 'w').write(content)
print(f"  DONE: categoria detail HTML")

print("\nAll done!")
