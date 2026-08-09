# 🧠 Contexto del Proyecto: Coffee Specs

Este archivo sirve como memoria persistente para asistentes de IA. **NO BORRAR.**

## 🎯 Objetivo
Un libro de recetas de café colaborativo, fácil de editar en Markdown y con generación automática de un libro en PDF profesional, acompañado de una aplicación móvil en Flutter para consultar y crear recetas.

---

## 🛠️ Arquitectura Técnica — Libro de Recetas (raíz)
- **Generador de PDF:** `scripts/generate-pdf.js`. Usa la librería `md-to-pdf`.
- **Estilos PDF:** `scripts/style.css`.
- **Índice:** Generado automáticamente desde el `README.md`.
- **Comando:** `npm run generate-pdf` → genera `Coffee-Specs-Libro.pdf`.

## 📋 Estructura de Carpetas
- **metodos-presion/:** Moka, Brikka (incluye variantes Kirkland, Geisha, Descafeinado Baja Desert, Don Justo No. 02).
- **metodos-filtro/:** V60 (Hoffmann, Especialidad, Kirkland), Chemex (Geisha, Estándar).
- **aeropress/:** Recetas estándar e invertidas (James Hoffmann, Kirkland, Geisha).
- **experimentos/:** Pruebas como Brikka con Cremina.
- **equipamiento/:** Guías de calibración (DF54).
- **templates/:** Plantilla base para nuevas recetas.

## ⚙️ Estándares de Calibración
- **Molino de Referencia:** DF54 calibrada a Punto Cero.
- **Notación de Molienda:** `Nivel X (Tipo)` (ej: `Nivel 17 (Fina)`) para compatibilidad con la app.
- **Brikka:** Se prefiere agua precalentada (~75°C) para proteger notas volátiles.

---

## 📱 Aplicación Móvil (`mobile_app/`)
- **Framework:** Flutter (Dart ≥3.0) con Riverpod.
- **Repositorio:** `git@github.com:mesaias/coffee-specs-app.git` (rama `main`).
- **Base de datos:** Isar 3.1.0.
- **Dependencias clave:** `flutter_riverpod`, `flutter_markdown`, `google_fonts` (Lato), `isar`, `path_provider`.

### Características implementadas
- **Buscador dinámico:** Filtra por nombre o método. **Insensible a acentos** (arabico = Arábico).
- **Filtros por categoría:** Todas, Presión, Filtro, Otros, Favoritos.
- **Parser de Markdown:** Extrae ficha técnica y pasos interactivos automáticamente.
- **Pantalla de detalle:** Ficha técnica en grid, vista previa de pasos, receta completa en Markdown.
- **Modo guía paso a paso:** Con temporizador circular por paso, vibración (HapticFeedback) al terminar.
- **Favoritos persistentes:** Guardados en Isar, sobreviven reinicios.
- **Recetas propias:** Los usuarios pueden crear, editar y eliminar sus propias recetas desde la app.

### Arquitectura de archivos
```
lib/
├── main.dart                        # HomeScreen, búsqueda, filtros, tarjetas
├── models/
│   ├── recipe.dart                  # Modelo Isar (NO modificar sin regenerar recipe.g.dart)
│   ├── recipe.g.dart                # Auto-generado — no editar
│   └── grinder.dart                 # Molinos soportados + tabla de conversión DF54
├── providers/
│   └── recipes_provider.dart        # AsyncNotifier: carga defaults + recetas propias, CRUD
├── screens/
│   ├── recipe_detail_screen.dart    # Detalle con ficha técnica, Markdown completo, botón iniciar
│   ├── recipe_form_screen.dart      # Formulario crear/editar recetas propias
│   └── guide_mode_screen.dart       # Guía interactiva con timers y haptics
└── services/
    ├── isar_service.dart            # Singleton de inicialización de Isar
    ├── markdown_parser_service.dart # .md → Recipe (detecta tiempos en pasos automáticamente)
    └── user_recipes_storage.dart    # Persiste IDs de recetas propias en JSON (path_provider)
```

### Flujo de navegación
```
HomeScreen → RecipeDetailScreen(recipeId) → GuideModeScreen(recipe)
HomeScreen [FAB +] → RecipeFormScreen()          ← crear receta propia
RecipeDetailScreen [✏️] → RecipeFormScreen(recipe) ← editar receta propia
```

### Decisión crítica de Isar (no olvidar)
El QueryBuilder de Isar 3.x NO compila con `findAll()`/`findFirst()` en Dart 3.x por invarianza de genéricos. Solución:
- **Recetas default:** ID = hash de 31 bits del nombre → `isar.recipes.get(id)`.
- **Recetas propias:** ID = `DateTime.now().millisecondsSinceEpoch` (~1.7T, sin colisión con hashes) → IDs persistidos en `user_recipe_ids.json` → cargados con `isar.recipes.getAll(ids)`.

### Recetas propias vs. default
- **Default:** vienen de `assets/recipes/*.md`, solo lectura, icono café marrón.
- **Propias:** creadas en app, guardadas en Isar, icono naranja (`edit_note`). Tienen botones Editar y Eliminar en la pantalla de detalle.
- El formulario genera Markdown → lo parsea con `MarkdownParserService.parse()` → detección de timers gratis.

## 🚀 Comandos Útiles
- `npm run generate-pdf` — Actualiza `Coffee-Specs-Libro.pdf`.
- `flutter run` — Ejecutar app en modo debug.
- `flutter run -d <id>` — Ejecutar en dispositivo específico.
- `flutter devices` — Listar dispositivos conectados.
- `flutter pub run build_runner build --delete-conflicting-outputs` — Regenerar `recipe.g.dart` si se modifica `recipe.dart`.
