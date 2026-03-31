#!/usr/bin/env python3
"""Fix build errors in teamadmin components."""
import re, os

BASE = '/home/rafa/Projects/2026/gesportin/frontsportin/src/app'

# ──────────────────────────────────────────────────────────────────────────────
# 1. Fix delete HTML files: { error() } → {{ error() }}
# ──────────────────────────────────────────────────────────────────────────────
entities_crud = [
    'articulo','categoria','cuota','equipo','jugador','liga',
    'noticia','pago','partido','temporada','tipoarticulo','usuario'
]

for entity in entities_crud:
    path = f'{BASE}/page/{entity}/teamadmin/delete/delete.html'
    if not os.path.exists(path):
        print(f'SKIP (not found): {path}')
        continue
    content = open(path).read()
    # Single braces { error() } (standalone in text node) → {{ error() }}
    # Only when it's not inside an @if expression
    new_content = re.sub(r'(?<!\{)\{ error\(\) \}(?!\})', '{{ error() }}', content)
    if new_content != content:
        open(path, 'w').write(new_content)
        print(f'FIXED delete HTML: {entity}')
    else:
        print(f'no change in delete HTML: {entity}')

# ──────────────────────────────────────────────────────────────────────────────
# 2. Fix form HTML templates: isEditMode → id() > 0
# ──────────────────────────────────────────────────────────────────────────────
form_html_fixes = {
    'articulo':     [('isEditMode', 'id() > 0')],
    'cuota':        [('isEditMode', 'id() > 0')],
    'factura':      [('isEditMode', 'id() > 0')],
    'jugador':      [('isEditMode', 'id() > 0')],
    'liga':         [('isEditMode', 'id() > 0')],
    'noticia':      [('isEditMode', 'id() > 0')],
    'pago':         [('isEditMode', 'id() > 0')],
    'partido':      [('isEditMode', 'id() > 0')],
    'tipoarticulo': [('isEditMode', 'id() > 0')],
    'usuario':      [
        ("*ngIf=\"!isEditMode\"", "*ngIf=\"!(id() > 0)\""),
        ('isEditMode', 'id() > 0'),
    ],
    # equipo and categoria use 'mode'
    'equipo': [
        ("mode === 'edit'", 'id() > 0'),
        ("mode === 'create'", 'id() <= 0'),
        ("mode === 'create' ? 'Crear Equipo' : 'Guardar Cambios'",
         "id() <= 0 ? 'Crear Equipo' : 'Guardar Cambios'"),
    ],
    'categoria': [
        ("mode === 'create' ? 'Crear categoría' : 'Editar categoría'",
         "id() <= 0 ? 'Crear categoría' : 'Editar categoría'"),
        ("mode === 'edit'", 'id() > 0'),
        ("mode === 'create' ? 'Crear Categoría' : 'Guardar Cambios'",
         "id() <= 0 ? 'Crear Categoría' : 'Guardar Cambios'"),
    ],
}

for entity, replacements in form_html_fixes.items():
    path = f'{BASE}/component/{entity}/teamadmin/form/form.html'
    if not os.path.exists(path):
        print(f'SKIP (not found): {path}')
        continue
    content = open(path).read()
    changed = False
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            changed = True
            print(f'  fixed "{old}" → "{new}" in {entity}/form.html')
    if changed:
        open(path, 'w').write(content)
        print(f'FIXED form HTML: {entity}')
    else:
        print(f'no change in form HTML: {entity}')

# ──────────────────────────────────────────────────────────────────────────────
# 3. Fix service import paths in delete pages
# ──────────────────────────────────────────────────────────────────────────────
# jugador: ../../../../service/jugador → ../../../../service/jugador-service
# usuario: ../../../../service/usuario → ../../../../service/usuarioService

service_fixes = {
    'jugador': ("from '../../../../service/jugador'",
                "from '../../../../service/jugador-service'"),
    'usuario': ("from '../../../../service/usuario'",
                "from '../../../../service/usuarioService'"),
}
for entity, (old, new) in service_fixes.items():
    path = f'{BASE}/page/{entity}/teamadmin/delete/delete.ts'
    if not os.path.exists(path):
        print(f'SKIP (not found): {path}')
        continue
    content = open(path).read()
    if old in content:
        open(path, 'w').write(content.replace(old, new))
        print(f'FIXED service import: {entity}/delete.ts')
    else:
        print(f'no change in service import: {entity}')

print('\nDone.')
