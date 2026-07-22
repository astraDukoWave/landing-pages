\# Spec: sprint-1-pacos-produccion — v0.3

\> Estado: APPROVAL · Autor: Fable (CTO) · Fecha: 2026-07-21  
\> Supersede: v0.2. Dirección del spec ya aprobada por Jonathan; esta revisión aplica dos  
\> cambios menores (WhatsApp en URL pública \+ orden de ejecución). Changelog al final.  
\> Decisiones fuente: dictamen CTO (cambios 1–5) \+ D1 (demo en URL temporal de Vercel;  
\> dominio pendiente de confirmar) \+ D2 (retainer gestionado; no se entrega código) \+  
\> D3 (alcance innovador confirmado) \+ revisiones v0.2 y v0.3 de Jonathan.  
\> Nota de repo público: este spec no contiene estrategia comercial, precios ni números  
\> de teléfono personales. El número de demostración en vivo está registrado en el  
\> Proyecto (privado), no aquí.

\#\# Resumen General

Llevar \`pacos-landing\` de demo local a \*\*demo desplegado y vendible\*\* en una URL temporal  
de Vercel, implementando por el camino las \*\*convenciones reutilizables del sistema\*\*  
(tokens semánticos, contenido extraído, config única) sin que el objetivo de mostrar y  
vender Paco's se pierda dentro del refactor. El riesgo de plataforma (Vercel \+  
subdirectorio \+ auto-deploy) se valida primero y aislado; el hardening técnico no  
bloqueante se agenda, no se antepone.

\#\# Objetivos del Usuario

\- Como operador (Jonathan), quiero un demo público y coherente de Paco's esta semana,  
  para poder enseñarlo y vender el servicio.  
\- Como dueño de Paco's, quiero mandar mis datos y eventos por WhatsApp y verlos  
  publicados en minutos, para que mi web nunca esté vencida — sin tocar yo ningún panel.  
\- Como operador del sistema, quiero que identidad, contenido y datos vivan fuera de los  
  componentes, para producir el siguiente sitio (Valhalla) sin reescribir secciones.

\#\# Estructura del alcance: pistas \+ gate

| Pista | Qué es | Bloquea |  
|---|---|---|  
| \*\*A0 — Deploy mínimo controlado\*\* | Validar la plataforma antes del refactor: Vercel despliega el subdirectorio \`pacos-landing\` y el auto-deploy funciona | El arranque de todo lo demás |  
| \*\*A1 — Demo funcional vendible\*\* | Lo mínimo para enseñar y vender: coherencia de datos, CTAs con política de WhatsApp correcta, assets provisionales | El objetivo del sprint |  
| \*\*B — Convenciones del sistema\*\* | Lo reutilizable que nace en Paco's: tokens, datos extraídos, config única, SEO derivado, flujo gestionado | El cierre del sprint (no la venta) |  
| \*\*C — Hardening técnico\*\* | Resiliencia y limpieza no bloqueantes | Nada — post-venta o en huecos |  
| \*\*Gate Producción\*\* | Checklist de datos/activos reales para pasar de demo a sitio del cliente | El switch demo → producción (post-venta) |

\*\*Orden de ejecución (v0.3): A0 → B → A1 → C.\*\* Primero se valida que la plataforma  
despliega (riesgo aislado, sin mezclarlo con el refactor); luego las convenciones que  
hacen coherente al demo; luego se publica el demo vendible sobre el pipeline ya probado;  
el hardening se agenda.

\#\# Alcance Estricto v1

\#\#\# Incluye — Pista A0 (Deploy mínimo controlado):

\*\*REQ-11a — Validación de plataforma.\*\*  
Crear el proyecto de Vercel apuntando al subdirectorio \`pacos-landing\` del repo y  
desplegar \*\*el estado actual del código tal cual está\*\*, sin refactor previo. Verificar  
el auto-deploy con un push trivial (cambio inocuo). URL temporal \`\*.vercel.app\`  
(nombre según disponibilidad).  
\*\*AC:\*\* la URL temporal responde con el sitio actual; el root directory al subdirectorio  
funciona; un push trivial a main publica en ≤ 5 minutos. Si algo falla, se resuelve  
\*\*antes\*\* de tocar el refactor de la pista B.

\#\#\# Incluye — Pista A1 (Demo funcional vendible):

\*\*REQ-11b — Publicación del demo.\*\*  
Tras completar la pista B, el demo vendible se publica en la misma URL temporal por el  
pipeline ya validado en A0. \`baseUrl\` en config apunta a la URL temporal; el dominio  
\`pacoswingsandbeer.com\` sigue \*\*pendiente de confirmar\*\* (D1): no se compra ni configura  
en este sprint.  
\*\*AC:\*\* el demo publicado refleja las convenciones de B; push a main publica en ≤ 5 min.

\*\*REQ-04 — Datos coherentes del demo \+ política de WhatsApp (v0.3).\*\*  
El demo usa los mejores datos disponibles, servidos desde la config única (REQ-03):  
dirección y horarios conocidos (lun–mar y jue–dom, 1 PM–10 PM, cerrado miércoles), un  
solo handle de Instagram, y eventos recientes nunca vencidos (REQ-09).

\*\*Política de WhatsApp del demo (v0.3):\*\*  
\- \*\*URL de distribución pública (default):\*\* nunca un número personal. Default en este  
  orden: (1) \*\*número de WhatsApp Business dedicado al producto\*\*, si ya existe;  
  (2) si no existe aún, \*\*modo demo controlado\*\* — los CTAs conservan la UX completa  
  (visibles, con su mensaje contextual) pero al tocarlos muestran un aviso de  
  demostración ("sitio de demostración — el chat se activa al lanzar con el negocio")  
  en lugar de abrir un chat.  
\- \*\*Demostración en vivo:\*\* el número de demostración registrado en el Proyecto  
  (privado) se configura en config \*\*solo durante la sesión en vivo\*\* y se revierte al  
  terminar (checklist de reversión en el CLAUDE.md). Ese número no permanece en la URL  
  distribuida ni aparece en este spec.  
\- \*\*Producción:\*\* el número real del negocio (público por naturaleza) entra vía Gate  
  Producción.  
El modo vigente (demo | número) y el número activo son \*\*un solo punto de cambio en  
config\*\*.  
\*\*AC:\*\* cero contradicciones internas (IG único, horarios únicos); ningún placeholder  
\`52XXXXXXXXXX\`; la URL de distribución pública no enlaza a ningún número personal; en  
modo demo los tres CTAs muestran el aviso; el cambio de modo/número no toca componentes.

\*\*REQ-05 — Assets de demo.\*\*  
\`public/\` con favicon e iconos \*\*provisionales de marca\*\* (derivados de la identidad  
actual) y una imagen OG provisional propia de 1200×630 — deja de apuntar a placehold.co.  
Los gradientes actuales se aceptan como placeholder visual de fotos en el demo. Una foto  
faltante nunca produce imagen rota (fallback al gradiente de marca).  
\*\*AC:\*\* cero referencias a placehold.co; favicon y OG propios visibles al compartir el  
link del demo.

\#\#\# Incluye — Pista B (Convenciones reutilizables que nacen en Paco's):

\*\*REQ-01 — Tokens semánticos (dos capas), con la regla acotada.\*\*  
La paleta \`pacos.\*\` pasa a capa base; los componentes consumen la capa semántica para  
todo lo que sea \*\*identidad del cliente\*\*: \`brand-primary\`, \`brand-primary-strong\`,  
\`brand-accent\`, \`surface\`, \`surface-elevated\`, \`ink\`, \`ink-muted\`, y tokens de estado  
del negocio: \`state-live\`, \`state-confirmed\`, \`state-pending\`. Los dos glows con rgba  
literal del naranja se expresan vía token con opacidad.  
\*\*Regla acotada:\*\* los componentes \*\*no pueden contener\*\* identidad del cliente (colores  
de marca en hex/rgba, familias tipográficas), datos del negocio ni copy editorial  
hardcodeados. Los \*\*estilos estructurales y de layout sí pueden vivir en componentes\*\*  
(espaciado, grids, overlays neutros, blancos/negros usados como estructura y contraste,  
no como identidad). Roles de marca y estados salen siempre de tokens.  
\*\*AC:\*\* grep de los valores hex/rgba de la paleta de Paco's dentro de \`components/\` → 0;  
los estados del calendario y el badge EN VIVO usan tokens de estado (no \`emerald-\*\` ni  
\`red-600\` como identidad); paridad visual con el sitio actual.

\*\*REQ-02 — Contenido extraído a archivos de datos.\*\*  
Eventos, menú y copy editorial (titulares del hero, subtítulos, textos de badges) salen  
de los componentes hacia archivos de datos por dominio (nombres exactos los define el  
design-plan). Fechas de eventos en formato estructurado (ISO); el formato visible se  
deriva.  
\*\*AC:\*\* cambiar un evento o platillo \= editar un solo archivo de datos; ningún componente  
contiene arrays de contenido ni fechas.

\*\*REQ-03 — Config única del negocio.\*\*  
Un solo archivo concentra: nombre y tagline, dirección, horarios estructurados por día,  
WhatsApp (\*\*modo demo | número activo\*\* \+ mensajes por contexto), Instagram, \`baseUrl\`,  
campos SEO. NavBar, Hero, Footer, metadata, sitemap, robots y Schema leen de aquí. La  
metadata duplicada (layout vs page) se consolida. El año del copyright se deriva.  
\*\*AC:\*\* cada dato del negocio existe en exactamente un lugar; los bugs del audit  
(IG doble, horarios dobles) quedan imposibles por construcción.

\*\*REQ-07 — SEO local derivado de config.\*\*  
\`metadataBase\` y canónicas desde \`baseUrl\`; robots; sitemap desde config; JSON-LD  
Schema.org de negocio local (BarOrPub/Restaurant) con nombre, dirección, geo,  
\`openingHoursSpecification\` derivada de horarios estructurados, \`sameAs\` y teléfono —  
generado desde config, no escrito a mano. En modo demo, el teléfono se omite del Schema  
(no se publica un número personal ni uno falso).  
\*\*AC (demo):\*\* estructura del JSON-LD válida con los datos disponibles; sitemap y robots  
responden en la URL desplegada. \*\*AC (producción):\*\* validación completa en la prueba de  
resultados enriquecidos con teléfono real (Gate Producción). Cambiar \`baseUrl\` propaga a  
todo con un solo cambio.

\*\*REQ-08 — WhatsApp contextual por sección.\*\*  
Cada CTA usa el modo/número vigente en config y un mensaje precargado específico de su  
contexto: nav (pedir ahora), menú (ver menú completo), footer (contacto general).  
\*\*AC:\*\* los tres CTAs respetan el modo vigente (aviso de demo, o chat con el mensaje  
correcto de su sección); si un contexto no define mensaje, cae al genérico de config  
(fallback explícito).

\*\*REQ-09 — Flujo de actualización gestionado (sin CMS, sin autoservicio).\*\*  
En v1 \*\*no hay CMS ni autoservicio\*\*: el cliente manda los datos por WhatsApp;  
\*\*Jonathan\*\* edita el archivo de eventos, commit, push, y Vercel publica — en \*\*≤ 10  
minutos de punta a punta\*\*. El flujo queda documentado paso a paso en el CLAUDE.md del  
proyecto, incluida la \*\*reversión post-demo en vivo\*\* (REQ-04). Los eventos con fecha  
pasada se filtran en build y no se renderizan.  
\*\*AC:\*\* simulacro cronometrado en E2E; un evento de ayer no aparece hoy; el CLAUDE.md  
describe el flujo real, no un CMS imaginario.

\*Transversal a la pista B:\* al cierre del sprint, el \*\*CLAUDE.md refleja la estructura  
real\*\* (datos, config, tokens, flujo gestionado, política de WhatsApp) — requisito de  
las sesiones autónomas de Claude Code.

\#\#\# Incluye — Pista C (Hardening técnico, no bloqueante):

\*\*REQ-06 — Fuentes autohospedadas.\*\*  
Migrar de Google Fonts en build a fuentes locales commiteadas (Bebas Neue 400, Inter en  
los pesos usados), mismas variables CSS. Motivo verificado: el build depende hoy de la  
red de Google Fonts; además el sistema necesitará tipografías de clientes como archivos  
(Valhalla).  
\*\*AC:\*\* build completa sin acceso a fonts.googleapis.com; tipografía idéntica.

\*\*REQ-10 — Higiene de repo: inventario \+ decisión reversible.\*\*  
(a) Sacar \`.idea/\` del tracking y añadirlo al .gitignore.  
(b) \*\*Scaffold raíz (\`src/\`, package raíz, tsconfig raíz, \`AGENTS.md\`): inventario  
primero, decisión después.\*\* Criterio de verificación de abandono: nada dentro de  
\`pacos-landing/\` ni de scripts/configs del repo lo importa o referencia; su historial  
muestra que no evoluciona; no existe consumidor externo conocido. \*\*Solo si se verifica  
abandonado y sin consumidores\*\*, se elimina — de forma reversible (commit dedicado y  
atómico, revertible; alternativa conservadora: rama de archivo). Con cualquier duda, se  
conserva y se documenta en CLAUDE.md.  
(c) Instalar el tooling de lint que el script ya promete, para que \`npm run lint\` sea  
operativo.  
\*\*AC:\*\* \`git status\` limpio de archivos de IDE; existe el inventario con el resultado de  
la verificación; la decisión ejecutada es revertible con un solo revert; lint corre.

\*\*Validación de datos en build.\*\* Dato de evento malformado (fecha inválida, campo  
faltante) → el build falla con mensaje que nombra archivo y campo. Protege el flujo  
gestionado de errores de dedo.

\#\#\# Gate Producción (post-venta — bloquea el switch demo → sitio del cliente, no el sprint):

\- \[ \] Número de WhatsApp real del negocio en config, en modo número (reemplaza modo  
      demo / número de demostración).  
\- \[ \] Handle de Instagram confirmado por el cliente.  
\- \[ \] Eventos reales de la semana en curso.  
\- \[ \] Fotos reales aprobadas (hero \+ platillos) integradas vía datos/config, sin tocar  
      componentes.  
\- \[ \] Activos de marca aprobados por el cliente (favicon/OG definitivos si difieren de  
      los provisionales).  
\- \[ \] Teléfono real incorporado al Schema; prueba de resultados enriquecidos en verde.  
\- \[ \] Dominio: decisión ejecutada cuando se confirme (cambio de \`baseUrl\` \+ DNS; un solo  
      punto de cambio).

\#\#\# NO incluye:

\- Migración a monorepo/workspace y extracción del núcleo compartido (Sprint 3, con  
  Valhalla como evidencia).  
\- Valhalla y su Brand Intake (Sprint 2, según orden a decidir post-sprint).  
\- CMS de cualquier tipo, Google Sheets (v1.5) y agentes de IA — de contenido y de  
  atención (v2).  
\- Del doc "perspectiva innovadora", registrados como candidatos al Sprint 2 (compiten  
  con Valhalla): modo vivo/dormido, Web Push semanal, contador de anticipación, memoria  
  de visita.  
\- Compra/configuración de dominio (pendiente de confirmar, D1).  
\- Página 404 personalizada, analytics, multi-idioma, verticales no-F\&B.  
\- Estrategia comercial, precios o números personales dentro del repo (repo público).

\#\# Comportamiento Esperado

\#\#\# Flujo feliz:

1\. \*\*A0:\*\* el proyecto de Vercel queda creado, la URL temporal responde con el sitio  
   actual y un push trivial publica solo — la plataforma está validada antes de tocar  
   nada.  
2\. \*\*B:\*\* las convenciones entran; los bugs de duplicación se vuelven imposibles por  
   construcción.  
3\. \*\*A1:\*\* el demo vendible se publica; el cliente lo abre en móvil y ve la identidad de  
   Paco's con datos coherentes; el calendario muestra solo eventos vigentes; los CTAs  
   respetan la política de WhatsApp (aviso de demo en la URL pública, chat real en la  
   demostración en vivo).  
4\. Vendido el servicio, el dueño manda datos por WhatsApp → Jonathan actualiza y publica  
   en ≤ 10 minutos → el Gate Producción se cierra ítem por ítem.  
5\. Cuando el dominio se confirme, se cambia \`baseUrl\` y todo el SEO propaga solo.

\#\#\# Casos edge:

\- Evento con fecha pasada → no se renderiza (filtrado en build).  
\- Cero eventos tras filtrar → estado vacío diseñado ("síguenos en Instagram para la  
  próxima cartelera"), nunca una sección rota.  
\- Platillo sin foto → gradiente de marca como fallback; nunca imagen rota.  
\- CTA sin mensaje definido para su contexto → mensaje genérico de config.  
\- Termina una sesión de demostración en vivo → la config se revierte al modo público  
  (checklist de reversión en CLAUDE.md); la URL distribuida nunca queda apuntando a un  
  número personal.  
\- Nombre deseado de URL de Vercel tomado → cualquier subdominio disponible; \`baseUrl\`  
  lo absorbe.  
\- Cambio de horarios (p. ej. abre un miércoles especial) → se edita solo la config;  
  Hero, Footer y Schema no pueden divergir.  
\- El scaffold raíz resulta tener consumidores → se conserva, se documenta, y el sprint  
  sigue sin bloquearse.  
\- El deploy A0 falla (subdirectorio, permisos, build en Vercel) → se resuelve como  
  incidente de plataforma aislado, sin arrastrar el refactor.

\#\# Manejo de Errores

\- Dato de evento malformado → build falla con archivo y campo nombrados; nunca llega  
  calendario corrupto a producción (Pista C).  
\- Imagen referenciada inexistente → fallback de gradiente \+ advertencia en log de build.  
\- JSON-LD inválido → se detecta en E2E; el gate correspondiente no cierra con Schema  
  roto.  
\- Error de build en Vercel → la versión anterior sigue publicada; el flujo del CLAUDE.md  
  indica revisar el log del deploy antes de avisar al dueño.

\#\# Archivos afectados (estimado)

\- \`pacos-landing/tailwind.config.ts\` — capa base \+ capa semántica.  
\- \`pacos-landing/app/layout.tsx\` — metadata consolidada desde config, año derivado;  
  fuentes locales (Pista C).  
\- \`pacos-landing/app/page.tsx\` — se simplifica (metadata a una sola fuente).  
\- \`pacos-landing/app/sitemap.ts\` y robots (nuevo) — derivados de config.  
\- \`pacos-landing/components/\` (los 5\) — sin identidad, datos ni copy hardcodeados;  
  consumen datos, config y tokens; CTAs con soporte de modo demo.  
\- Nuevos: directorio de datos/contenido (eventos, menú, copy), config del negocio  
  (incluye modo/número de WhatsApp), utilidad de Schema JSON-LD, estado vacío del  
  calendario, aviso de modo demo, validador de datos en build (Pista C).  
\- \`pacos-landing/public/\` (nuevo) — favicon/iconos y OG provisionales, carpeta de fotos,  
  fuentes locales (Pista C).  
\- \`pacos-landing/package.json\` — tooling de lint (Pista C).  
\- Raíz: \`.gitignore\` (\`.idea/\`); inventario del scaffold y decisión reversible  
  documentada; \`CLAUDE.md\` reescrito a la realidad post-sprint.  
\- Fuera del repo: proyecto de Vercel (root directory \= \`pacos-landing\`); número de  
  demostración en vivo (registro privado del Proyecto).  
\- \`docs/specs/PACOS\_SPRINT-01\_DESIGN-SPEC\_v1.0\_APPROVED.md\` — este spec, commiteado al  
  aprobarse (el estado del nombre cambia al aprobar).

\#\# Verificación E2E

\*\*E2E-A0 (valida plataforma, antes del refactor):\*\*  
1\. La URL temporal responde con el sitio actual; root directory al subdirectorio  
   funcionando.  
2\. Push trivial a main → publicado en ≤ 5 minutos.

\*\*E2E-Demo (cierra A1):\*\*  
3\. Build completa; sitemap y robots accesibles en la URL desplegada.  
4\. Favicon y OG provisionales propios visibles al compartir el link; cero placehold.co.  
5\. IG y horarios idénticos en todas sus apariciones (una sola fuente).  
6\. Los 3 CTAs respetan el modo vigente: en modo demo muestran el aviso; en modo número  
   abren chat con el mensaje correcto por sección. La URL de distribución pública no  
   expone ningún número personal.  
7\. Responsive sin overflow horizontal en 360 px, 768 px y 1280 px.  
8\. Evento con fecha de ayer insertado a propósito → no aparece; sin eventos → estado  
   vacío diseñado.

\*\*E2E-Sprint (cierra Pista B):\*\*  
9\. Greps de convención: valores de la paleta de Paco's en \`components/\` → 0;  
   contenido/copy/datos en \`components/\` → 0\.  
10\. Simulacro cronometrado del flujo gestionado: editar evento → push → visible en  
    producción ≤ 10 min.  
11\. Simulacro de demo en vivo: activar número de demostración → verificar CTA →  
    revertir con el checklist → la URL pública vuelve al modo demo.  
12\. CLAUDE.md leído en frío describe el repo real sin afirmaciones falsas.

\*\*E2E-Producción (cierra el Gate, post-venta):\*\*  
13\. \`52XXXXXXXXXX\` en el repo → 0; datos reales en config; teléfono real en Schema;  
    prueba de resultados enriquecidos en verde; Lighthouse móvil: SEO ≥ 95,  
    Accesibilidad ≥ 95, Performance ≥ 90\.

\#\# Inputs pendientes (bloquean tasks o el Gate, no la aprobación del spec)

\- Decisión operativa: ¿se crea ya el número de WhatsApp Business dedicado al producto, o  
  el demo público sale en modo demo controlado? (Cualquiera cumple la política; es un  
  solo punto de config.)  
\- Handle de Instagram a usar en el demo (\`pacoswingsandbeer\` vs \`pacosbar\`) — la  
  confirmación del cliente cierra el Gate.  
\- Eventos disponibles más recientes para el demo.  
\- Post-venta: WhatsApp real del negocio, fotos, activos de marca aprobados, eventos de  
  la semana.

\#\# Definition of Done

\*\*DoD-A0 · Plataforma validada:\*\*  
\- \[ \] URL temporal de Vercel viva sirviendo el subdirectorio \`pacos-landing\`.  
\- \[ \] Auto-deploy verificado con push trivial (≤ 5 min).

\*\*DoD-A1 · Demo vendible (objetivo del sprint):\*\*  
\- \[ \] Demo público en la URL temporal, compartible con el cliente.  
\- \[ \] Cero placeholders visibles ni referencias a placehold.co; favicon/OG provisionales  
      propios.  
\- \[ \] Datos internos coherentes (IG único, horarios únicos); CTAs conforme a la política  
      de WhatsApp; ningún número personal en la URL de distribución.  
\- \[ \] Eventos pasados nunca visibles; estado vacío diseñado existe.

\*\*DoD-B · Convenciones del sistema (cierre del sprint):\*\*  
\- \[ \] Identidad, datos y copy fuera de \`components/\` (greps de convención en 0); marca y  
      estados vía tokens semánticos.  
\- \[ \] Config única operando: cada dato del negocio en exactamente una fuente (incluido  
      modo/número de WhatsApp).  
\- \[ \] Flujo de actualización gestionado \+ reversión post-demo documentados en CLAUDE.md  
      y ensayados (≤ 10 min el flujo de eventos).  
\- \[ \] CLAUDE.md veraz respecto al repo real.  
\- \[ \] Este spec commiteado en \`docs/specs/\` con estado APPROVED en el nombre.

\*\*DoD-C · Hardening (agendado, no bloquea A ni B):\*\*  
\- \[ \] Build independiente de Google Fonts.  
\- \[ \] Inventario del scaffold hecho; decisión reversible ejecutada o conservación  
      documentada.  
\- \[ \] \`.idea/\` fuera del repo; lint operativo; validación de datos en build activa.

\*\*Gate Producción:\*\* checklist propio (arriba) — se cierra post-venta, ítem por ítem.

\#\# Changelog

\*\*v0.2 → v0.3\*\*  
1\. \*\*Política de WhatsApp para la URL pública:\*\* ningún número personal como default.  
   Default \= número de WhatsApp Business dedicado al producto o, mientras no exista,  
   modo demo controlado (CTAs con UX completa \+ aviso de demostración). El número de  
   demostración en vivo queda registrado en el Proyecto (privado), se configura solo  
   durante sesiones en vivo y se revierte con checklist; no aparece en este spec ni  
   permanece en la URL distribuida. Schema omite teléfono en modo demo.  
2\. \*\*Orden de ejecución:\*\* A0 (deploy mínimo controlado del código actual: valida  
   Vercel \+ subdirectorio \+ auto-deploy, riesgo aislado) → B (convenciones) → A1 (demo  
   funcional) → C (hardening). REQ-11 se divide en REQ-11a (A0) y REQ-11b (A1); E2E y  
   DoD ganan su tramo A0.  
3\. Config única incorpora el campo modo/número de WhatsApp como único punto de cambio;  
   E2E-Sprint añade el simulacro de demo en vivo con reversión.

\*\*v0.1 → v0.2\*\*  
1\. Alcance en pistas A (demo) / B (convenciones) / C (hardening) \+ Gate Producción.  
2\. REQ-09 renombrado a "Flujo de actualización gestionado (sin CMS, sin autoservicio)".  
3\. REQ-10 reescrito: inventario \+ verificación de abandono \+ decisión reversible.  
4\. Regla de literales acotada (identidad/datos/copy fuera; estilos estructurales  
   permitidos; marca y estados vía tokens).  
5\. Assets demo vs producción \+ Gate Producción.  
6\. Convención de nombres {PRODUCTO}\_{ÁMBITO}\_{ARTEFACTO}\_vX.Y\_{ESTADO}.md adoptada.  
