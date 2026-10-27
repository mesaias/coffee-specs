# ☕ Espresso: [NOMBRE DE LA RECETA]

<!--
  PARSER DE LA APP (mobile_app/lib/services/markdown_parser_service.dart):
  - Toma la PRIMERA coincidencia de cada clave en todo el documento. Mantén las claves exactas
    (Método, Ratio, Café, Molienda, Temperatura) y no uses "Café " en el título H1.
  - No escribas la palabra "agua" en el texto (la clave Agua no aplica a espresso y
    el parser podría tomar una frase suelta).
  - Molienda: término genérico (Espresso, Fina...) + opcionalmente "Nivel X en DF54".
  - Timers: espera real → negrita (Esperar **5:00** / **6s**). Solo referencia → M:SS sin negrita (0:25 y 0:28).
    Evita números seguidos de "s"/"seg"/"min" en pasos que no sean una espera real.
-->

## ☕ Ficha técnica
- **Método**: Espresso ([Máquina], portafiltro [Xmm])
- **Ratio**: [Ej: 1:2]
- **Café**: **[Xg]** ([Nombre del café, origen, proceso])
- **Rendimiento (Out)**: **[Xg]** en taza
- **Molienda**: Espresso / **Nivel X** en DF54
- **Temperatura**: **[Ej: 92°C]**
- **Presión**: [Ej: 8-9 bares]
- **Pre-infusión**: **[Ej: 6s]**
- **Tiempo de extracción**: [Ej: 25-28s]

## 🛠️ Equipamiento adicional
- [ ] Báscula con cronómetro
- [ ] [Portafiltro, WDT, tamper, etc.]

## 📝 Procedimiento
1. **Precalentamiento**: [Acción]. Esperar **5:00**.
2. **Purga**: [Acción sin espera, ej: disparo corto sin café].
3. **Molienda y carga**: [Dosis, nivel, distribución y compactado].
4. **Extracción**: [Inicio de extracción y pre-infusión de **6s**].
5. **Corte**: [Peso al que se detiene para llegar al Out final]. Debe terminar entre 0:25 y 0:28.

## 📸 Bitácora de Imágenes (Opcional)

## 💡 Notas y consejos (Opcional)
- *[Ej: Primera gota entre 0:07 y 0:09]*
- *[Ej: Si sale ácido/rápido, moler más fino; si sale amargo/lento, moler más grueso]*
