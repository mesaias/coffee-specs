# ☕ Coffee Specs - Libro de Recetas de Café

> [!IMPORTANT]  
> Versión muy temprana del proyecto. Por el momento solo las recetas de [Moka 150ml](metodos-presion/moka-150ml.md) y [Brikka Induction](metodos-presion/brikka-4-tazas-induction-arabico-estandar.md) están completas.

Bienvenido a tu libro de recetas personal de café. Aquí puedes encontrar y compartir tus métodos favoritos para cada cafetera y equipamiento.

## 🧭 Índice rápido

### 🌪️ Métodos de Presión
- [Brikka Induction: Arábico Estándar](metodos-presion/brikka-4-tazas-induction-arabico-estandar.md)
- [Brikka Induction: Arábico Daily (Agua Precalentada)](metodos-presion/brikka-4-tazas-induction-arabico-estandar-agua-precalentada.md)
- [Brikka Induction: Geisha](metodos-presion/brikka-4-tazas-induction-geisha.md)
- [Brikka Induction: Geisha Huatusco (Agua Precalentada)](metodos-presion/brikka-4-tazas-induction-geisha-agua-precalentada.md)
- [Brikka Induction: Huupa Descafeinado (Agua Precalentada)](metodos-presion/brikka-4-tazas-induction-arabico-descafeinado-agua-precalentada.md)
- [Moka 150ml](metodos-presion/moka-150ml.md)

### 🌊 Métodos de Filtro
- [Chemex 750ml](metodos-filtro/chemex-750ml.md)
- [V60 50g](metodos-filtro/v60-50g.md)
- [V60 Especialidad](metodos-filtro/v60-especialidad.md)

### ⚙️ Equipamiento y Calibración
- [DF54 Calibración](equipamiento/df54-calibracion.md)

### 🧪 Experimentos
- [Brikka con Cremina (Azúcar)](experimentos/brikka-cremina-azucar.md)

## ✍️ ¿Cómo contribuir?
1. Crea un nuevo archivo `.md` en la carpeta correspondiente.
2. Utiliza la [Plantilla de Receta](templates/receta-base.md) para mantener el formato.
3. Añade tu nueva receta al índice de este archivo.

## 📄 Generar versión en PDF
Si deseas una versión offline o para imprimir de todo el libro:

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
3. Genera el PDF:
   ```bash
   npm run generate-pdf
   ```
El archivo aparecerá en la raíz como `Coffee-Specs-Libro.pdf`.
