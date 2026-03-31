#!/usr/bin/env python3
"""
Generates teamadmin detail + form components and pages from admin equivalents.
Run from the frontsportin/ directory.
"""

import os
import re
import shutil
from pathlib import Path

BASE = Path("/home/rafa/Projects/2026/gesportin/frontsportin/src/app")
COMP = BASE / "component"
PAGE = BASE / "page"

# ── Entity metadata ──────────────────────────────────────────────────────────
# (snake_name, PascalName)
ENTITIES_CRUD = [
    ("articulo",    "Articulo"),
    ("categoria",   "Categoria"),
    ("cuota",       "Cuota"),
    ("equipo",      "Equipo"),
    ("jugador",     "Jugador"),
    ("liga",        "Liga"),
    ("noticia",     "Noticia"),
    ("pago",        "Pago"),
    ("partido",     "Partido"),
    ("temporada",   "Temporada"),
    ("tipoarticulo","Tipoarticulo"),
    ("usuario",     "Usuario"),
]
ENTITIES_FACTURA = [("factura", "Factura")]   # CRUD minus delete
ENTITIES_VIEW_ONLY = [
    ("carrito",       "Carrito"),
    ("club",          "Club"),
    ("comentario",    "Comentario"),
    ("comentarioart", "Comentarioart"),
    ("compra",        "Compra"),
    ("puntuacion",    "Puntuacion"),
]
ENTITIES_DETAIL_ONLY = ENTITIES_VIEW_ONLY  # need detail but NOT form
ENTITIES_NEED_FORM = ENTITIES_CRUD + ENTITIES_FACTURA

ALL_ENTITIES = ENTITIES_CRUD + ENTITIES_FACTURA + ENTITIES_VIEW_ONLY

# ── Volver / back-link URL rewrites in detail HTML ───────────────────────────
# For each entity: old Volver pattern → new Volver path

def fix_detail_html(html: str, entity: str) -> str:
    """Apply all necessary transformations to a detail.html for teamadmin."""

    # 1. Volver button – plain routerLink="/entity"
    html = html.replace(f'routerLink="/{entity}"', f'routerLink="/{entity}/teamadmin"')

    # 2. Volver button – conditional  session.isClubAdmin() ? '/entity/teamadmin' : '/entity'
    pattern = r"""session\.isClubAdmin\(\) \? ['"]/{ent}/teamadmin['"] : ['"]/{ent}['"]""".replace("{ent}", re.escape(entity))
    html = re.sub(pattern, f"'/{entity}/teamadmin'", html)

    # 3. Internal related-entity filter links → teamadmin equivalents
    # Only rewrite routes that exist in teamadmin navigation
    TEAMADMIN_FILTER_ROUTES = [
        ("/temporada/club/",          "/temporada/teamadmin/club/"),
        ("/categoria/temporada/",     "/categoria/teamadmin/temporada/"),
        ("/equipo/categoria/",        "/equipo/teamadmin/categoria/"),
        ("/liga/equipo/",             "/liga/teamadmin/equipo/"),
        ("/partido/liga/",            "/partido/teamadmin/liga/"),
        ("/jugador/equipo/",          "/jugador/teamadmin/equipo/"),
        ("/jugador/usuario/",         "/jugador/teamadmin/"),
        ("/cuota/equipo/",            "/cuota/teamadmin/equipo/"),
        ("/pago/cuota/",              "/pago/teamadmin/cuota/"),
        ("/pago/jugador/",            "/pago/teamadmin/jugador/"),
        ("/noticia/club/",            "/noticia/teamadmin/club/"),
        ("/tipoarticulo/club/",       "/tipoarticulo/teamadmin/club/"),
        ("/articulo/tipoarticulo/",   "/articulo/teamadmin/tipoarticulo/"),
        ("/usuario/club/",            "/usuario/teamadmin/club/"),
        # view-only entities → just the plist (teamadmin)
        ("/comentario/noticia/",      "/comentario/teamadmin"),
        ("/comentario/usuario/",      "/comentario/teamadmin"),
        ("/puntuacion/noticia/",      "/puntuacion/teamadmin"),
        ("/puntuacion/usuario/",      "/puntuacion/teamadmin"),
        ("/factura/usuario/",         "/factura/teamadmin"),
        ("/compra/factura/",          "/compra/teamadmin"),
        ("/compra/articulo/",         "/compra/teamadmin"),
        ("/carrito/usuario/",         "/carrito/teamadmin"),
        ("/carrito/articulo/",        "/carrito/teamadmin"),
    ]
    # also rewrite session-conditional internal links
    for old, new in TEAMADMIN_FILTER_ROUTES:
        old_esc = re.escape(old)
        # Pattern: session.isClubAdmin() ? '/new' : '/old'
        cond = rf"""session\.isClubAdmin\(\) \? '{re.escape(new[:-1] if new.endswith('/') else new)}[^']*' : '{old_esc}[^']*'"""
        html = re.sub(cond, f"'{new}'", html)
        # Plain string replacement inside [routerLink]
        html = html.replace(f"'{old}", f"'{new}")
        html = html.replace(f'"{old}', f'"{new}')

    # 4. Panel text
    html = html.replace("Panel administrativo", "Panel administrador de club")

    return html


def fix_detail_ts(ts: str, entity: str, Pascal: str) -> str:
    """Apply class/selector transformations to a detail.ts for teamadmin."""
    ts = ts.replace(f"app-{entity}-admin-detail", f"app-{entity}-teamadmin-detail")
    ts = ts.replace(f"{Pascal}AdminDetail", f"{Pascal}TeamadminDetail")
    return ts


def fix_form_ts(ts: str, entity: str, Pascal: str) -> str:
    """Apply class/selector/returnUrl transformations to a form.ts for teamadmin."""
    ts = ts.replace(f"app-{entity}-admin-form", f"app-{entity}-teamadmin-form")
    ts = ts.replace(f"{Pascal}AdminForm", f"{Pascal}TeamadminForm")
    # default returnUrl  '/entity'  →  '/entity/teamadmin'
    ts = re.sub(
        rf"returnUrl = input<string>\(['\"]/{re.escape(entity)}['\"]",
        f"returnUrl = input<string>('/{entity}/teamadmin'",
        ts,
    )
    # also: returnUrl = input<string>('/entity')  with no space
    ts = re.sub(
        rf"input<string>\(['\"]/{re.escape(entity)}['\"]",
        f"input<string>('/{entity}/teamadmin'",
        ts,
    )
    return ts


def fix_form_html(html: str, entity: str) -> str:
    """Fix any back-links in form HTML."""
    html = html.replace(f'routerLink="/{entity}"', f'routerLink="/{entity}/teamadmin"')
    html = html.replace(f"routerLink='/{entity}'", f"routerLink='/{entity}/teamadmin'")
    return html


def read_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_file(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"  WROTE {path.relative_to(BASE)}")


# ── Create teamadmin detail components ──────────────────────────────────────
print("\n=== Creating teamadmin DETAIL components ===\n")

for entity, Pascal in ALL_ENTITIES:
    src_dir = COMP / entity / "admin" / "detail"
    dst_dir = COMP / entity / "teamadmin" / "detail"

    if not src_dir.exists():
        print(f"  SKIP {entity}: no admin/detail found")
        continue

    if dst_dir.exists():
        print(f"  EXISTS {entity}/teamadmin/detail – overwriting")

    # detail.ts
    src_ts = read_file(src_dir / "detail.ts")
    dst_ts = fix_detail_ts(src_ts, entity, Pascal)
    write_file(dst_dir / "detail.ts", dst_ts)

    # detail.html
    src_html = read_file(src_dir / "detail.html")
    dst_html = fix_detail_html(src_html, entity)
    write_file(dst_dir / "detail.html", dst_html)

    # detail.css – copy from admin (if exists) or minimal
    src_css = src_dir / "detail.css"
    if src_css.exists():
        shutil.copy2(src_css, dst_dir / "detail.css")
        print(f"  COPY  {entity}/teamadmin/detail/detail.css")
    else:
        write_file(dst_dir / "detail.css", ":host { display: block; }\n")


# ── Create teamadmin form components ────────────────────────────────────────
print("\n=== Creating teamadmin FORM components ===\n")

for entity, Pascal in ENTITIES_NEED_FORM:
    src_dir = COMP / entity / "admin" / "form"
    dst_dir = COMP / entity / "teamadmin" / "form"

    if not src_dir.exists():
        print(f"  SKIP {entity}: no admin/form found")
        continue

    # form.ts
    src_ts = read_file(src_dir / "form.ts")
    dst_ts = fix_form_ts(src_ts, entity, Pascal)
    write_file(dst_dir / "form.ts", dst_ts)

    # form.html
    src_html = read_file(src_dir / "form.html")
    dst_html = fix_form_html(src_html, entity)
    write_file(dst_dir / "form.html", dst_html)

    # form.css
    src_css = src_dir / "form.css"
    if src_css.exists():
        shutil.copy2(src_css, dst_dir / "form.css")
        print(f"  COPY  {entity}/teamadmin/form/form.css")
    else:
        write_file(dst_dir / "form.css", ":host { display: block; }\n")


# ── Create missing teamadmin pages ──────────────────────────────────────────
print("\n=== Creating missing teamadmin PAGES ===\n")

PAGE_VIEW_TEMPLATE = """\
import {{ Component, OnInit, inject, signal }} from '@angular/core';
import {{ ActivatedRoute }} from '@angular/router';
import {{ {Pascal}TeamadminDetail }} from '../../../../component/{entity}/teamadmin/detail/detail';

@Component({{
  selector: 'app-{entity}-teamadmin-view-page',
  imports: [{Pascal}TeamadminDetail],
  template: '<app-{entity}-teamadmin-detail [id]="id_{entity}"></app-{entity}-teamadmin-detail>',
}})
export class {Pascal}TeamadminViewPage implements OnInit {{
  private route = inject(ActivatedRoute);
  id_{entity} = signal<number>(0);

  ngOnInit(): void {{
    const id = this.route.snapshot.paramMap.get('id');
    this.id_{entity}.set(id ? Number(id) : NaN);
  }}
}}
"""

PAGE_NEW_TEMPLATE = """\
import {{ Component }} from '@angular/core';
import {{ {Pascal}TeamadminForm }} from '../../../../component/{entity}/teamadmin/form/form';

@Component({{
  selector: 'app-{entity}-teamadmin-new-page',
  imports: [{Pascal}TeamadminForm],
  template: '<app-{entity}-teamadmin-form [returnUrl]="returnUrl"></app-{entity}-teamadmin-form>',
}})
export class {Pascal}TeamadminNewPage {{
  returnUrl = '/{entity}/teamadmin';
}}
"""

PAGE_EDIT_TEMPLATE = """\
import {{ Component, OnInit, inject, signal }} from '@angular/core';
import {{ ActivatedRoute }} from '@angular/router';
import {{ {Pascal}TeamadminForm }} from '../../../../component/{entity}/teamadmin/form/form';

@Component({{
  selector: 'app-{entity}-teamadmin-edit-page',
  imports: [{Pascal}TeamadminForm],
  template: '<app-{entity}-teamadmin-form [id]="id_{entity}()" [returnUrl]="returnUrl"></app-{entity}-teamadmin-form>',
}})
export class {Pascal}TeamadminEditPage implements OnInit {{
  private route = inject(ActivatedRoute);
  id_{entity} = signal<number>(0);
  returnUrl = '/{entity}/teamadmin';

  ngOnInit(): void {{
    const id = this.route.snapshot.paramMap.get('id');
    this.id_{entity}.set(id ? Number(id) : NaN);
  }}
}}
"""

PAGE_DELETE_TEMPLATE = """\
import {{ Component, OnInit, inject, signal }} from '@angular/core';
import {{ ActivatedRoute, Router }} from '@angular/router';
import {{ HttpErrorResponse }} from '@angular/common/http';
import {{ {Pascal}Service }} from '../../../../service/{entity}';
import {{ MatSnackBar }} from '@angular/material/snack-bar';
import {{ {Pascal}TeamadminDetail }} from '../../../../component/{entity}/teamadmin/detail/detail';

@Component({{
  selector: 'app-{entity}-teamadmin-delete-page',
  imports: [{Pascal}TeamadminDetail],
  templateUrl: './delete.html',
}})
export class {Pascal}TeamadminDeletePage implements OnInit {{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private {entity}Service = inject({Pascal}Service);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_{entity} = signal<number>(0);

  ngOnInit(): void {{
    const id = this.route.snapshot.paramMap.get('id');
    this.id_{entity}.set(id ? Number(id) : NaN);
    if (isNaN(this.id_{entity}())) this.error.set('ID no válido');
  }}

  doDelete(): void {{
    this.{entity}Service.delete(this.id_{entity}()).subscribe({{
      next: () => {{
        this.snackBar.open('{Pascal} eliminado/a', 'Cerrar', {{ duration: 4000 }});
        this.router.navigate(['/{entity}/teamadmin']);
      }},
      error: (err: HttpErrorResponse) => {{
        this.error.set('Error eliminando el registro');
        this.snackBar.open('Error eliminando el registro', 'Cerrar', {{ duration: 4000 }});
        console.error(err);
      }},
    }});
  }}

  doCancel(): void {{ window.history.back(); }}
}}
"""

PAGE_DELETE_HTML_TEMPLATE = """\
@if (error()) {{
  <div class="alert alert-danger m-3">{{ error() }}</div>
}}
@if (!error()) {{
  <div class="container py-3">
    <div class="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
      <i class="bi bi-exclamation-triangle-fill"></i>
      <strong>¿Eliminar este registro?</strong> Esta acción no se puede deshacer.
    </div>
    <app-{entity}-teamadmin-detail [id]="id_{entity}"></app-{entity}-teamadmin-detail>
    <div class="d-flex gap-2 mt-3">
      <button class="btn btn-danger" (click)="doDelete()">
        <i class="bi bi-trash me-2"></i>Eliminar
      </button>
      <button class="btn btn-secondary" (click)="doCancel()">
        <i class="bi bi-x-lg me-2"></i>Cancelar
      </button>
    </div>
  </div>
}}
"""

# ── 1. view pages for view-only entities ────────────────────────────────────
print("--- View pages for view-only entities ---")
for entity, Pascal in ENTITIES_VIEW_ONLY:
    view_dir = PAGE / entity / "teamadmin" / "view"
    view_file = view_dir / "view.ts"
    if view_file.exists():
        print(f"  EXISTS {entity}/teamadmin/view – overwriting")
    content = PAGE_VIEW_TEMPLATE.format(entity=entity, Pascal=Pascal)
    write_file(view_file, content)

# ── 2. factura: view, new, edit pages (no delete) ───────────────────────────
print("--- Factura teamadmin: view, new, edit ---")
entity, Pascal = "factura", "Factura"

view_dir = PAGE / entity / "teamadmin" / "view"
write_file(view_dir / "view.ts", PAGE_VIEW_TEMPLATE.format(entity=entity, Pascal=Pascal))

new_dir = PAGE / entity / "teamadmin" / "new"
write_file(new_dir / "new.ts", PAGE_NEW_TEMPLATE.format(entity=entity, Pascal=Pascal))

edit_dir = PAGE / entity / "teamadmin" / "edit"
write_file(edit_dir / "edit.ts", PAGE_EDIT_TEMPLATE.format(entity=entity, Pascal=Pascal))

# ── 3. Update existing CRUD pages to use teamadmin components ---------------
print("\n--- Updating existing CRUD pages to use teamadmin components ---")

for entity, Pascal in ENTITIES_CRUD:
    # --- view page ---
    view_file = PAGE / entity / "teamadmin" / "view" / "view.ts"
    if view_file.exists():
        content = PAGE_VIEW_TEMPLATE.format(entity=entity, Pascal=Pascal)
        write_file(view_file, content)
    else:
        print(f"  CREATE missing {entity}/teamadmin/view/view.ts")
        (PAGE / entity / "teamadmin" / "view").mkdir(parents=True, exist_ok=True)
        write_file(view_file, PAGE_VIEW_TEMPLATE.format(entity=entity, Pascal=Pascal))

    # --- new page ---
    new_file = PAGE / entity / "teamadmin" / "new" / "new.ts"
    if new_file.exists():
        # overwrite with teamadmin form version
        old = read_file(new_file)
        # Check if it already uses teamadmin form
        if "TeamadminForm" not in old:
            write_file(new_file, PAGE_NEW_TEMPLATE.format(entity=entity, Pascal=Pascal))
    else:
        print(f"  CREATE missing {entity}/teamadmin/new/new.ts")
        (PAGE / entity / "teamadmin" / "new").mkdir(parents=True, exist_ok=True)
        write_file(new_file, PAGE_NEW_TEMPLATE.format(entity=entity, Pascal=Pascal))

    # new.html (some entities have a new.html, not always needed if template is inline)
    new_html = PAGE / entity / "teamadmin" / "new" / "new.html"
    # If the new.ts uses templateUrl, the html must exist
    # We'll leave existing html files as-is (they typically just use the form component)

    # --- edit page ---
    edit_file = PAGE / entity / "teamadmin" / "edit" / "edit.ts"
    if edit_file.exists():
        old = read_file(edit_file)
        if "TeamadminForm" not in old:
            write_file(edit_file, PAGE_EDIT_TEMPLATE.format(entity=entity, Pascal=Pascal))
    else:
        print(f"  CREATE missing {entity}/teamadmin/edit/edit.ts")
        (PAGE / entity / "teamadmin" / "edit").mkdir(parents=True, exist_ok=True)
        write_file(edit_file, PAGE_EDIT_TEMPLATE.format(entity=entity, Pascal=Pascal))

    # --- delete page ---
    delete_file = PAGE / entity / "teamadmin" / "delete" / "delete.ts"
    if delete_file.exists():
        old = read_file(delete_file)
        if "TeamadminDetail" not in old:
            write_file(delete_file, PAGE_DELETE_TEMPLATE.format(entity=entity, Pascal=Pascal))
    else:
        print(f"  CREATE missing {entity}/teamadmin/delete/delete.ts")
        (PAGE / entity / "teamadmin" / "delete").mkdir(parents=True, exist_ok=True)
        write_file(delete_file, PAGE_DELETE_TEMPLATE.format(entity=entity, Pascal=Pascal))

    delete_html = PAGE / entity / "teamadmin" / "delete" / "delete.html"
    # Create delete.html only if delete.ts uses templateUrl
    delete_ts_content = read_file(PAGE / entity / "teamadmin" / "delete" / "delete.ts")
    if "templateUrl" in delete_ts_content and not delete_html.exists():
        write_file(delete_html, PAGE_DELETE_HTML_TEMPLATE.format(entity=entity, Pascal=Pascal))
    elif "templateUrl" in delete_ts_content and delete_html.exists():
        # Update the entity reference in delete.html if needed
        old_html = read_file(delete_html)
        if f"app-{entity}-teamadmin-detail" not in old_html:
            write_file(delete_html, PAGE_DELETE_HTML_TEMPLATE.format(entity=entity, Pascal=Pascal))


# ── 4. Update new.html files that use templateUrl ───────────────────────────
# Some entities use templateUrl for new.ts; check and update/ create new.html
print("\n--- Checking new.html files ---")
for entity, Pascal in ENTITIES_CRUD:
    new_ts_file = PAGE / entity / "teamadmin" / "new" / "new.ts"
    new_ts = read_file(new_ts_file)
    new_html_file = PAGE / entity / "teamadmin" / "new" / "new.html"
    if "templateUrl" in new_ts:
        if not new_html_file.exists():
            new_html_content = f'<app-{entity}-teamadmin-form (formSuccess)="onFormSuccess()" (formCancel)="onFormCancel()"></app-{entity}-teamadmin-form>\n'
            write_file(new_html_file, new_html_content)
        else:
            old = read_file(new_html_file)
            if f"app-{entity}-teamadmin-form" not in old:
                new_html_content = f'<app-{entity}-teamadmin-form (formSuccess)="onFormSuccess()" (formCancel)="onFormCancel()"></app-{entity}-teamadmin-form>\n'
                write_file(new_html_file, new_html_content)


print("\n=== Done! ===")
print("\nNext steps:")
print("1. Add missing imports and routes to app.routes.ts")
print("2. Run: ng build to check for errors")
