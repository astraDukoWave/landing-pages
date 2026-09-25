# Plan — demo comercial reutilizable v1.0

Fecha: 2026-09-24. Rama: feature/restaurant-commercial-demo.
Fuente: docs/specs/RESTAURANT_DEMO_COMMERCIAL_SPEC_v1.0.md.

1. Congelar goal, alcance y criterios C01–C10 de esta iteración (sin editar históricos).
2. Extender config y textos; presentación editorial sin imágenes ficticias (C01–C03,C07).
3. Menú por categorías, ubicación, contacto explicativo y cartelera opcional (C03–C05,C08).
4. Metadata noindex, sitemap, OG, accesibilidad y documentación de adaptación (C06–C09).
5. Build/lint y navegador en 360/768/1280; registrar resultados aquí (C10).
6. Rama y PR hacia main; revisar preview. Merge/publicación requieren aprobación humana,
   siguiendo CP-2 del plan anterior. No se reabren checkpoints del scaffold ya cerrado.

## Verificación
Verificado 2026-09-24 en build local y preview de Vercel.

| Criterios | Resultado | Evidencia |
| --- | --- | --- |
| C01–C03 | PASS | Propuesta visible; menú de seis entradas, filtro Bebidas muestra una opción; reset muestra seis. |
| C04 | PASS | Tres contextos de contacto muestran mensajes diferentes; Escape cierra y devuelve foco a Contacto; sin wa.me en HTML de demo. |
| C05 | PASS | Mapa codifica dirección de config; información provisional visible; sin enlace Instagram no confirmado. |
| C06 | PASS | HTTP 200; metadata noindex/nofollow; sin JSON-LD; robots rastreable y sitemap XML sin URLs. |
| C07 | PASS | Config de datos y paleta compartida con OG/iconos; guía de adaptación actualizada. |
| C08 | PASS | Fecha local antes/después de medianoche comprobada; horarios con minutos y domingo distinto conservados; cartelera sin eventos muestra estado vacío. |
| C09 | PASS con límites | Marcos de navegador de 360/768/1280 px (área útil 345/753/1265 por scrollbar): scrollWidth=clientWidth en los tres. Capturas de móvil/tableta/escritorio revisadas; diálogo móvil sin overflow; cierre con Escape. No es prueba en dispositivos físicos ni certificación de accesibilidad. |
| C10 | PASS | npm run build, tipos y npm run lint sin errores. Vercel preview READY. PR #2. |

La página responsive-check.html usada temporalmente para QA se retira antes del
merge. La revisión funcional se realizó sobre la UI del commit b51c45f; el commit
final solo retira ese harness y registra evidencia. Los logs observados del navegador
incluyen errores de una extensión de revisión (chrome-extension), no del sitio.
No se observaron overlays de error de la aplicación. No se midió Lighthouse ni
conversión comercial. Ninguna métrica comercial se infiere de una revisión técnica.

## Cierre
Implementación y verificación realizadas. Pendiente: revisión visual del usuario y
aprobación de merge/publicación según CP-2. Fotos, precios, identidad y datos oficiales
continúan en el gate posterior a contratación. Valhalla permanece fuera del alcance.


## Revisión de identidad y ubicación — 2026-09-24
El usuario corrige dirección a Ferrocarril 707, Centro, 72750 San Andrés Cholula,
Puebla y proporciona el pin https://maps.app.goo.gl/W6WF4REVtPAsD1xaA. Se usa el
enlace exacto en lugar de búsqueda ambigua. Instagram confirmado por usuario:
https://www.instagram.com/pacoscholula/. Logo JPG de 150×150 suministrado por el
usuario para este demo: se conserva original y se muestra pequeño, sin ampliación
ni recreación. Paleta roja/negra/blanca; texto blanco sobre botones rojos y acento
rojo claro sobre fondos oscuros. La existencia o propiedad de un Perfil de Empresa
no está verificada; no se afirma su ausencia ni se crea/reclama una ficha.
