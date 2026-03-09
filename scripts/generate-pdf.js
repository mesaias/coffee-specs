const fs = require('fs');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');

/**
 * Script para consolidar todas las recetas en un único PDF con Índice.
 */

// Función para crear un "slug" (ID de enlace interno) compatible con Markdown
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúñ\s-]/g, '') // Quitar emojis y caracteres especiales
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

async function generatePdf() {
    console.log('📖 Analizando archivos para generar Índice...');
    
    const readmePath = path.join(__dirname, '../README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    const mdLinkRegex = /\[[^\]]+\]\(([^)]+\.md)\)/g;
    let match;
    const filesToInclude = [];

    while ((match = mdLinkRegex.exec(readmeContent)) !== null) {
        const file = match[1];
        if (!file.includes('templates/') && !filesToInclude.includes(file)) {
            filesToInclude.push(file);
        }
    }

    let tocMarkdown = '## 🧭 Índice de Recetas\n\n';
    let contentMarkdown = '';

    for (const file of filesToInclude) {
        const filePath = path.join(__dirname, '..', file);
        if (fs.existsSync(filePath)) {
            console.log(`➕ Procesando: ${file}`);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Extraer el primer título (H1) para el índice
            const titleMatch = content.match(/^#\s+(.*)/m);
            const title = titleMatch ? titleMatch[1] : path.basename(file, '.md');
            const anchor = slugify(title);

            // Añadir al índice
            tocMarkdown += `- [${title}](#${anchor})\n`;

            // Asegurar que el título tenga el ID para el enlace interno
            content = content.replace(/^#\s+(.*)/m, `# <a name="${anchor}"></a> $1`);

            // Ajustar rutas de imágenes para que sean relativas a la raíz del proyecto
            content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
                if (src.startsWith('http')) return match;
                // Obtener la ruta absoluta de la imagen
                const absoluteImagePath = path.resolve(path.dirname(filePath), src);
                // Convertirla en una ruta relativa desde la raíz del proyecto (donde está el basedir)
                const projectRoot = path.join(__dirname, '..');
                const relativeImagePath = path.relative(projectRoot, absoluteImagePath);
                
                // Asegurar que use slashes / incluso en Windows
                return `![${alt}](${relativeImagePath.replace(/\\/g, '/')})`;
            });

            contentMarkdown += content + '\n\n<div class="page-break"></div>\n\n';
        }
    }

    const fullMarkdown = `
# ☕ Coffee Specs: El Libro de Recetas

${tocMarkdown}

<div class="page-break"></div>

${contentMarkdown}
    `.trim();

    const pdfOptions = {
        basedir: path.join(__dirname, '..'),
        dest: path.join(__dirname, '../Coffee-Specs-Libro.pdf'),
        stylesheet: path.join(__dirname, 'style.css'),
        pdf_options: {
            format: 'A4',
            margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<span style="font-size: 10px; margin-left: 20px; color: #777; font-family: sans-serif;">☕ Coffee Specs</span>',
            footerTemplate: '<div style="font-size: 10px; margin: 0 auto; color: #777; font-family: sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
        },
        launch_options: {
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        }
    };

    try {
        console.log('🚀 Generando PDF con Índice...');
        await mdToPdf({ content: fullMarkdown }, pdfOptions);
        console.log('✅ ¡PDF generado con éxito!: Coffee-Specs-Libro.pdf');
    } catch (error) {
        console.error('❌ Error generando el PDF:', error);
    }
}

generatePdf();
