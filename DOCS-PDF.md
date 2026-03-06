# 📄 Documentación: Generador de PDF (Coffee Specs)

Este proyecto incluye un sistema automatizado para convertir todas las recetas en formato Markdown (`.md`) a un único libro en formato PDF profesional.

## 🚀 Uso Rápido

1.  **Instalar dependencias** (solo la primera vez):
    ```bash
    npm install
    ```
2.  **Generar el PDF**:
    ```bash
    npm run generate-pdf
    ```
    El archivo resultante será `Coffee-Specs-Libro.pdf` en la raíz del proyecto.

---

## 🛠️ ¿Cómo funciona el sistema?

El generador utiliza un script de Node.js ubicado en `scripts/generate-pdf.js` que realiza los siguientes pasos:

1.  **Escaneo**: Lee el archivo `README.md` para identificar qué recetas existen y en qué orden deben aparecer.
2.  **Consolidación**: Une todos los archivos `.md` en un único documento temporal en memoria.
3.  **Índice Automático**: Extrae el título principal (`#`) de cada archivo y crea una **Tabla de Contenidos** con enlaces internos al inicio del PDF.
4.  **Ajuste de Imágenes**: Corrige las rutas de las imágenes locales para que el motor de PDF pueda encontrarlas correctamente.
5.  **Renderizado**: Utiliza la librería `md-to-pdf` (basada en Puppeteer/Chromium) para generar un PDF de alta calidad con estilos CSS.

---

## 🎨 Personalización del Diseño

Puedes cambiar la apariencia del PDF editando el archivo:
📍 `scripts/style.css`

Allí puedes modificar:
- **Fuentes y colores**: El esquema de color actual usa tonos café (#4e342e).
- **Márgenes**: Configurados en el script para formato A4.
- **Saltos de página**: Cada receta comienza automáticamente en una página nueva.

---

## 📝 Notas para Colaboradores

- **Orden**: El orden de las recetas en el PDF es exactamente el mismo que el orden de los enlaces en el `README.md`.
- **Títulos**: Asegúrate de que cada receta empiece con un solo título nivel 1 (ej: `# Mi Receta`) para que aparezca correctamente en el índice.
- **Imágenes**: Puedes usar rutas relativas normales en Markdown, el script se encarga de traducirlas para el PDF.

---

## 📁 Archivos Relacionados

- `package.json`: Configuración de dependencias y comandos de script.
- `scripts/generate-pdf.js`: Lógica principal del generador.
- `scripts/style.css`: Estilos visuales del documento.
- `.gitignore`: Configurado para no subir la carpeta `node_modules` ni el PDF generado al repositorio.
