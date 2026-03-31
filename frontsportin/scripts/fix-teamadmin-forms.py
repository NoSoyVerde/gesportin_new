#!/usr/bin/env python3
"""
Converts the generated teamadmin/form/form.ts files from the event-based Pattern B
to the id+returnUrl-based Pattern A  (as expected by the teamadmin page components).

Pattern B (admin style):
  @Input() entity: IEntity | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSuccess = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

Pattern A (teamadmin style, like categoria/temporada admin forms):
  id = input<number>(0);
  returnUrl = input<string>('/entity/teamadmin');
  private router = inject(Router);
"""

import re
from pathlib import Path

BASE = Path("/home/rafa/Projects/2026/gesportin/frontsportin/src/app/component")

# Entities to convert (Pattern B → Pattern A).
# Format: (snake, Pascal, entityField, serviceName, serviceVar, serviceGetMethod)
# entityField: variable name used in loadEntityData (e.g. "articulo")
# serviceName: service class name (e.g. "ArticuloService")  
# serviceVar: service inject variable (e.g. "oArticuloService")
# serviceGetMethod: method to get by id (usually "get")
ENTITIES = [
    # (snake,      Pascal,        entityField,  serviceName,        serviceVar,           getMethod)
    ("articulo",   "Articulo",    "articulo",   "ArticuloService",  "oArticuloService",   "get"),
    ("cuota",      "Cuota",       "cuota",      "CuotaService",     "oCuotaService",      "get"),
    ("equipo",     "Equipo",      "equipo",     "EquipoService",    "oEquipoService",     "get"),
    ("jugador",    "Jugador",     "jugador",    "JugadorService",   "oJugadorService",    "get"),
    ("liga",       "Liga",        "liga",       "LigaService",      "ligaService",        "get"),
    ("noticia",    "Noticia",     "noticia",    "NoticiaService",   "oNoticiaService",    "getById"),
    ("pago",       "Pago",        "pago",       "PagoService",      "oPagoService",       "get"),
    ("partido",    "Partido",     "partido",    "PartidoService",   "oPartidoService",    "get"),
    ("tipoarticulo","Tipoarticulo","tipoarticulo","TipoarticuloService","oTipoarticuloService","get"),
    ("usuario",    "Usuario",     "usuario",    "UsuarioService",   "oUsuarioService",    "get"),
    ("factura",    "Factura",     "factura",    "FacturaService",   "oFacturaService",    "get"),
]


def convert_form(entity, Pascal, entityField, serviceName, serviceVar, getMethod):
    path = BASE / entity / "teamadmin" / "form" / "form.ts"
    if not path.exists():
        print(f"  SKIP {entity}: file not found")
        return
    
    ts = path.read_text(encoding="utf-8")
    
    # 1. Ensure 'input' is in the @angular/core imports (for input() function)
    #    Replace the angular core import line to include 'input' if missing
    ts = re.sub(
        r"import \{ ([^}]+) \} from '@angular/core';",
        lambda m: handle_angular_core_import(m.group(1)),
        ts,
        count=1,
    )
    
    # 2. Add Router import if not present
    if "from '@angular/router'" not in ts:
        ts = ts.replace(
            "import { FormBuilder,",
            "import { Router } from '@angular/router';\nimport { FormBuilder,",
        )
    elif "Router" not in ts:
        ts = ts.replace(
            "from '@angular/router'",
            "Router, from '@angular/router'"
        )
    if "Router" not in ts:
        # fallback: add after last import
        ts = re.sub(
            r"(import \{[^}]+\} from '@angular/common';)",
            r"\1\nimport { Router } from '@angular/router';",
            ts, count=1
        )

    # 3. Remove old @Input/@Output declarations (various entity field names)
    # Remove: @Input() entity: IEntity | null = null;
    ts = re.sub(
        r"  @Input\(\)\s+\w+:\s+I\w+\s*\|\s*null\s*=\s*null;\s*\n",
        "",
        ts,
    )
    # Remove: @Input() isEditMode: boolean = false;
    ts = re.sub(
        r"  @Input\(\)\s+isEditMode:\s+boolean\s*=\s*false;\s*\n",
        "",
        ts,
    )
    # Remove: @Input() mode: 'create' | 'edit' = 'create';  (equipo uses `mode` instead of isEditMode)
    ts = re.sub(
        r"  @Input\(\)\s+mode:\s+'create'\s*\|\s*'edit'\s*=\s*'create';\s*\n",
        "",
        ts,
    )
    # Remove: @Output() formSuccess = new EventEmitter<void>();
    ts = re.sub(
        r"  @Output\(\)\s+formSuccess\s*=\s*new\s+EventEmitter<void>\(\);\s*\n",
        "",
        ts,
    )
    # Remove: @Output() formCancel = new EventEmitter<void>();
    ts = re.sub(
        r"  @Output\(\)\s+formCancel\s*=\s*new\s+EventEmitter<void>\(\);\s*\n",
        "",
        ts,
    )
    
    # 4. Remove constructor effect() block
    # Pattern: constructor() {\n    effect(() => {\n      ...\n    });\n  }
    ts = re.sub(
        r"  constructor\(\) \{\s*\n    effect\(\(\) => \{[\s\S]*?\}\);\s*\n  \}\s*\n",
        "",
        ts,
    )
    
    # 5. Add id = input<number>(0) and returnUrl = input<string>('/entity/teamadmin')
    #    after the class declaration line
    class_line = f"export class {Pascal}TeamadminForm implements OnInit {{"
    id_return_block = (
        f"  id = input<number>(0);\n"
        f"  returnUrl = input<string>('/{entity}/teamadmin');\n\n"
    )
    if "id = input<number>(0)" not in ts:
        ts = ts.replace(
            class_line + "\n",
            class_line + "\n" + id_return_block,
        )
    
    # 6. Add router injection after the class body starts (after private fb = inject...)
    if "private router = inject(Router)" not in ts:
        ts = re.sub(
            r"(  private fb = inject\(FormBuilder\);)",
            r"  private router = inject(Router);\n\1",
            ts,
            count=1,
        )
    
    # 7. In ngOnInit: replace the `if (this.entityField)` check with id-based loading
    #    Old: if (this.liga) { this.loadLigaData(this.liga); }
    #    New: if (this.id() > 0) { this.loadById(this.id()); }
    ts = re.sub(
        rf"    if \(this\.{re.escape(entityField)}\) \{{\s*\n      this\.load{re.escape(Pascal)}Data\(this\.{re.escape(entityField)}\);\s*\n    \}}\s*\n",
        f"    if (this.id() > 0) {{\n      this.loadById(this.id());\n    }} else {{\n      this.loading?.set(false);\n    }}\n",
        ts,
        count=1,
    )
    # Also handle  if (this.cuota) { this.loadCuotaData(this.cuota); }  on one line
    ts = re.sub(
        rf"    if \(this\.{re.escape(entityField)}\) \{{ this\.load{re.escape(Pascal)}Data\(this\.{re.escape(entityField)}\); \}}\s*\n",
        f"    if (this.id() > 0) {{\n      this.loadById(this.id());\n    }}\n",
        ts,
        count=1,
    )
    
    # 8. Add loading signal if not present
    if "loading = signal" not in ts:
        ts = re.sub(
            r"(  submitting = signal\(false\);)",
            r"  loading = signal<boolean>(false);\n\1",
            ts,
            count=1,
        )

    # 9. Add loadById method before the existing loadEntityData method
    load_by_id_method = f"""
  private loadById(id: number): void {{
    this.loading.set(true);
    this.{serviceVar}.{getMethod}(id).subscribe({{
      next: (data: I{Pascal}) => {{
        this.load{Pascal}Data(data);
        this.loading.set(false);
      }},
      error: (err: HttpErrorResponse) => {{
        this.error.set('Error cargando el registro');
        this.loading.set(false);
        console.error(err);
      }},
    }});
  }}

"""
    if f"private loadById(" not in ts:
        # Insert before the existing loadEntityData method
        load_data_method_match = re.search(
            rf"  private load{re.escape(Pascal)}Data\(",
            ts,
        )
        if load_data_method_match:
            insert_pos = load_data_method_match.start()
            ts = ts[:insert_pos] + load_by_id_method + ts[insert_pos:]
    
    # 10. Replace formSuccess.emit() with router.navigate
    ts = ts.replace(
        "this.formSuccess.emit();",
        f"this.router.navigate([this.returnUrl()]);",
    )
    
    # 11. Rewrite onCancel to use router
    ts = re.sub(
        r"  onCancel\(\):\s*void \{\s*\n    this\.formCancel\.emit\(\);\s*\n  \}",
        f"  onCancel(): void {{\n    this.router.navigate([this.returnUrl()]);\n  }}",
        ts,
    )
    # Also handle: onCancel() { this.formCancel.emit(); }  on one line
    ts = re.sub(
        r"  onCancel\(\) \{ this\.formCancel\.emit\(\); \}",
        f"  onCancel() {{ this.router.navigate([this.returnUrl()]); }}",
        ts,
    )
    
    # 12. Fix isEditMode / mode references in onSubmit
    # equipo uses: if (this.mode === 'edit' && this.equipo?.id)
    #   → if (this.id() > 0)
    ts = re.sub(
        rf"if \(this\.mode === 'edit' && this\.{re.escape(entityField)}\?\.id\)",
        "if (this.id() > 0)",
        ts,
    )
    # Common: if (this.isEditMode && this.entity?.id)
    ts = re.sub(
        rf"if \(this\.isEditMode && this\.{re.escape(entityField)}\?\.id\)",
        "if (this.id() > 0)",
        ts,
    )
    # equipo: if (this.mode === 'edit') { this.saveUpdate(equipoData); }
    ts = re.sub(
        r"if \(this\.mode === 'edit'\) \{\s*\n      this\.saveUpdate",
        "if (this.id() > 0) {\n      this.saveUpdate",
        ts,
    )
    # replace entityData.id = this.entity.id with entityData.id = this.id()
    ts = re.sub(
        rf"      {re.escape(entityField)}Data\.id = this\.{re.escape(entityField)}\.id;\s*\n",
        f"      {entityField}Data.id = this.id();\n",
        ts,
    )
    # also: entityPlayload.id = this.entity?.id ?? 0  → .id = this.id()
    ts = re.sub(
        rf"      ([\w]+)\.id = this\.{re.escape(entityField)}\?\.id;",
        r"      \1.id = this.id();",
        ts,
    )
    
    # 13. Fix Angular import - remove unused Input/Output/EventEmitter if no longer needed
    ts = re.sub(
        r"import \{ ([^}]+) \} from '@angular/core';",
        lambda m: handle_remove_unused_exports(m.group(1)),
        ts,
        count=1,
    )
    
    path.write_text(ts, encoding="utf-8")
    print(f"  CONVERTED {entity}/teamadmin/form/form.ts")


def handle_angular_core_import(imports_str: str) -> str:
    """Ensure 'input' is in @angular/core imports."""
    imports = [i.strip() for i in imports_str.split(",")]
    needed = {"Component", "OnInit", "inject", "signal", "input"}
    for n in needed:
        if n not in imports:
            imports.append(n)
    # Remove Items no longer needed
    to_remove = {"Input", "Output", "EventEmitter"}
    imports = [i for i in imports if i not in to_remove]
    imports = list(dict.fromkeys(imports))  # deduplicate
    return f"import {{ {', '.join(imports)} }} from '@angular/core';"


def handle_remove_unused_exports(imports_str: str) -> str:
    """Remove Input, Output, EventEmitter from @angular/core imports."""
    imports = [i.strip() for i in imports_str.split(",")]
    to_remove = {"Input", "Output", "EventEmitter"}
    imports = [i for i in imports if i not in to_remove]
    imports = list(dict.fromkeys(imports))  # deduplicate
    return f"import {{ {', '.join(imports)} }} from '@angular/core';"


print("=== Converting teamadmin forms to Pattern A (id + returnUrl) ===\n")

for args in ENTITIES:
    convert_form(*args)

print("\nDone!")
