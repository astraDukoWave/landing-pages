# Plan: sprint-01-pacos — v1.0

> **Estado:** APPROVED · **Aprobado por:** Jonathan (CP-1) · **Fecha:** 2026-07-21
> **Autor:** Fable (arquitecto de ejecución)
> **Spec fuente de verdad:** `docs/specs/PACOS_SPRINT-01_DESIGN-SPEC_v1.0_APPROVED.md`
> **Este archivo (congelado):** `docs/plans/PACOS_SPRINT-01_DESIGN-PLAN_v1.0_APPROVED.md`
> **Repo:** `astraDukoWave/landing-pages` (público) · sitio en `pacos-landing/`
> **Rama de refactor:** `feature/sprint-01-pacos`
>
> Supersede a `..._v0.1_PENDING-APPROVAL`. Cambios de esta versión: se registra la aprobación (CP-1),
> se resuelven Q1–Q3 (§11), se divide DOC-0 en freeze del spec + freeze del plan con la aclaración
> de congelación verbatim, y se fija el bucle humano mínimo (HP-1, CP-2, CP-3, HP-5-si-en-vivo). Changelog al final.
>
> Repo público: cero números de teléfono, precios o estrategia comercial en cualquier archivo commiteado.
> El "Prompt para Claude Code" vive en el *implementation-handoff*, no aquí.

---

## 0. Clasificación de riesgo del ciclo (Paso 0 de cto-review)

**Veredicto: RUTINA, con una única acción de alto riesgo gateada.**

| Dimensión | ¿Toca? | Nota |
|---|---|---|
| Producción | No | Demo en URL temporal de Vercel; producción es post-venta (Gate Producción). |
| Dinero / costos | No | Dominio diferido (D1); Vercel en tier de demo. |
| Secretos | No | El número de demostración **nunca** se commitea; sin API keys. |
| Datos de usuarios | No | WhatsApp click-to-chat; sin formularios ni captura. |
| Acción difícil de revertir | **Sí (1)** | Eliminación del **scaffold raíz** → **gateada** (§6, Task C3b). |
| Permisos amplios de agente | No | La conexión Vercel↔GitHub la hace **Jonathan** (HP-1), no el agente. |

La única decisión de alto riesgo **no se resuelve en este plan**. Se produce un inventario verificable (Task C3), y **antes** de cualquier borrado se activa `cto-review` + firma humana (checkpoint CP-3). Con cualquier duda: se conserva y se documenta en `CLAUDE.md`. El resto del ciclo es Rutina: refactor reversible sobre un demo, verificado contra el remoto.

---

## 1. Hechos verificados del repo (audit — `[verified]`)

Base para que cada task sea autocontenida. Fuente: audit del repo real (handoff §4).

- Stack: **Next.js 14.2.30 + React + Tailwind**. **No** hay shadcn/ui ni Framer Motion → animaciones = CSS/Tailwind + rAF. `tsc --noEmit` pasa; instalación limpia.
- **5 componentes** con contenido y copy hardcodeados. Eventos fechados en **mayo (vencidos)**.
- Duplicación con divergencia real: **dos handles de Instagram**, **dos versiones de horarios** (el Hero se contradice a sí mismo), **© 2025**.
- Placeholder **`52XXXXXXXXXX`** en NavBar, MenuHero y Footer. **OG apuntando a `placehold.co`**. **No existe `public/`** (sin favicon, sin fotos). Dominio hardcodeado sin confirmar.
- Identidad fugada de tokens: **rgba literales del naranja (×2)**, badge **EN VIVO en `red-600`**, estados del calendario en **`emerald-*`**.
- **El build depende de Google Fonts en tiempo de compilación.** `npm run lint` promete un tooling **no instalado**. Sin tests.
- **`.idea/` (WebStorm) commiteado.** **Scaffold raíz** (`src/`, package `"untitled"`, `tsconfig`, `AGENTS.md`) sin relación aparente con las landings.

> Contexto de dominio: el spec **no** citó el RAG de system-design (es frontend puro), así que no hay reglas de backend que pegar. El "contexto de dominio" de este plan son los hechos del audit de arriba.

---

## 2. Topología de ejecución (confirmada — Q1)

Resuelve la tensión entre dos reglas: el spec exige que **A0 pruebe que un push a `main` auto-despliega** (REQ-11a), y la skill `design-plan` exige **rama `feature/` antes de tocar archivos**.

- **`main` = rama de producción de Vercel** (auto-deploy). Honra el AC del spec.
- **A0 opera sobre `main`**, porque su trabajo *es* probar el pipeline de `main` con el código actual, **antes** del refactor. Su commit de prueba es inocuo y **dentro de `pacos-landing/`** (para que el build del sitio realmente se dispare).
- **DOC-0** (registro del spec y del plan) se commitea a `docs/specs/` y `docs/plans/` en **`main`**: registro canónico que no afecta el build de `pacos-landing/`.
- **El refactor (B), el demo vendible (A1) y el hardening (C) viven en `feature/sprint-01-pacos`**, creada a partir de `main` una vez A0 valide la plataforma. Un commit por task; **push tras cada task**. Vercel genera **preview deploys** de la rama para verificación visual.
- **Publicación del demo (A1 / REQ-11b) = merge `feature/sprint-01-pacos → main`** (checkpoint humano CP-2) → deploy de producción en la misma URL temporal.
- La verificación se hace **contra el remoto** (la rama, y luego `main`), nunca contra el working tree.

> Alternativa considerada y **descartada**: trunk-based directo a `main`. Se elige la topología de arriba.

---

## 3. Convenciones para Claude Code (capa de ejecución)

- **Un commit por task**, en la rama indicada por cada track. **Push tras cada task** (obligatorio al terminar). *El plan falla por definición si la ejecución termina sin push al remoto* — la verificación se hace contra el remoto.
- Mensajes de commit en **Conventional Commits** (indicados por task).
- **No hay Docker en esta máquina.** Todo lo que requiera el sitio corriendo se verifica con `npm run build` / `npm run dev` local o contra la **URL desplegada** de Vercel; nada se delega a Codespaces (no aplica).
- **No re-decidir arquitectura.** Ante ambigüedad → **preguntar**, no asumir. Si algo del repo contradice el plan → **reportar**, no resolver solo.
- Al terminar: reportar **rama exacta + SHA del último commit pusheado + output literal** de los checks que sí se corrieron local.
- **Repo público:** cero números de teléfono, precios, estrategia o artefactos privados en archivos commiteados. Los únicos artefactos del proyecto que van al repo son el **spec** (`docs/specs/`) y el **plan** (`docs/plans/`) aprobados; todo lo demás vive en el Proyecto.

---

## 4. Orden y dependencias (resumen)

**Orden macro (mandato del spec): A0 → B → A1 → C.** DOC-0 es documental y precede a todo.

```
DOC-0  (freeze del spec + del plan en docs/, main, commits separados, sin tocar producto)
  │
  ▼
A0     Deploy mínimo controlado (main, código actual, SIN refactor)
  ├─ A0.1  [HUMANO HP-1]  crear proyecto Vercel + root dir = pacos-landing + conectar repo
  ├─ A0.2  verificar que la URL temporal sirve el sitio ACTUAL
  └─ A0.3  commit trivial e inocuo dentro de pacos-landing/ → auto-deploy ≤5 min
  │        ── crear rama feature/sprint-01-pacos desde main ──
  ▼
B      Convenciones del sistema (feature/sprint-01-pacos)  [tocan los mismos 5 componentes → ESTRICTAMENTE SECUENCIAL]
  ├─ B1  Config única del negocio (fuente de verdad)                    [fundacional]
  ├─ B2  Tokens semánticos de 2 capas + extraer literales de identidad
  ├─ B3  Extraer eventos/menú/copy a archivos de datos
  ├─ B4  SEO local derivado de config (metadata, sitemap, robots, JSON-LD)   depende: B1
  ├─ B5  CTAs de WhatsApp contextuales + modo demo controlado                depende: B1
  ├─ B6  Filtrar eventos vencidos en build + estado vacío del calendario     depende: B3
  └─ B7  CLAUDE.md refleja estructura real + flujo gestionado + reversión     depende: B1–B6
  │
  ▼
A1     Demo funcional vendible (feature/sprint-01-pacos)
  ├─ A1.1  Assets de demo (favicon/OG propios) + fallback de imagen
  ├─ A1.2  Datos coherentes finales + política de WhatsApp (modo demo)   bloqueado: HP-3, HP-4
  └─ A1.3  Publicar demo → merge feature→main [CHECKPOINT CP-2]          depende: A1.1, A1.2, B*
  │
  ▼
C      Hardening (NO bloqueante — post-venta o en huecos; ordenado al final)
  ├─ C1  Fuentes autohospedadas (sin Google Fonts en build)
  ├─ C2  Higiene de repo: destrackear .idea/ + instalar tooling de lint
  ├─ C3  Inventario del scaffold raíz + criterio de abandono            → [CHECKPOINT CP-3]
  ├─ C3b Decisión del scaffold (eliminar-reversible | conservar+doc)    GATEADA (cto-review + firma)
  └─ C4  Validación de datos de eventos en build
```

**Dependencias clave:** B1 es fundacional (config); B4/B5 dependen de B1; B6 de B3; B7 de todo B; A1 de B completo; A1.3 (publicación) tras CP-2; el scaffold (C3b) tras CP-3.

---

## 5. Prerequisitos humanos e inputs (bucle humano mínimo)

El bucle humano queda deliberadamente reducido a **HP-1, CP-2, CP-3 y HP-5 (solo si hay demostración en vivo)**. Ninguno bloquea la aprobación del plan (ya otorgada); bloquean tasks o el Gate.

| ID | Input | Bloquea | Estado / Default |
|---|---|---|---|
| **HP-1** | **Conexión Vercel↔GitHub + root dir = `pacos-landing`.** Requiere tu cuenta y otorga a Vercel acceso al repo → **acción humana**, no del agente. | A0 (todo el sprint) | Pendiente antes de A0 (imprescindible) |
| **HP-2** | Decisión WhatsApp del demo. | Valor final de config — no bloquea B1 | **Resuelto (Q2): modo demo controlado.** URL pública sin número personal; CTAs con UX completa + aviso de demostración. |
| **HP-3** | Handle de Instagram del demo. | A1.2 (dato coherente) | **Resuelto (Q3): `pacoswingsandbeer`, único, marcado pendiente de confirmación con el cliente** (cierra en Gate Producción). |
| **HP-4** | **Eventos disponibles más recientes** (mínimo 1, no vencido). Claude Code no inventa eventos. | A1.2 (calendario con evento vigente) | Si no se provee → **estado vacío diseñado** ("síguenos en Instagram para la próxima cartelera") — estado válido de demo. |
| **HP-5** | *(Runtime, no es task)* **Número de demostración en vivo:** lo proporcionas **solo durante la sesión en vivo**, se configura en el único punto de config y se **revierte** con el checklist del `CLAUDE.md`. **Nunca se commitea.** | Sesión de venta en vivo | Operativo (solo si hay demostración en vivo). |

**Gate Producción (post-venta, fuera de este sprint):** WhatsApp real del negocio, fotos reales aprobadas, activos de marca definitivos, eventos de la semana, decisión de dominio. Trazabilidad únicamente; **no** son inputs de este sprint.

---

## 6. Checkpoints de aprobación

- **CP-1 — Aprobación del plan:** **OTORGADA** (Jonathan, 2026-07-21). Habilita el *implementation-handoff*; Claude Code arranca solo tras el OK a ese handoff.
- **CP-2 — Merge `feature→main` (publicación del demo, A1.3):** Jonathan revisa el **preview deploy** de la rama y aprueba el merge que hace público el demo. Claude Code **abre el PR y se detiene**; no mergea sin aprobación.
- **CP-3 — Decisión del scaffold raíz (C3→C3b), GATEADA:** Claude Code entrega el **inventario** (Task C3) y **se detiene**. Se activa `cto-review` sobre el inventario; si el abandono está verificado y sin consumidores → firma humana → C3b ejecuta un borrado **reversible** (commit atómico revertible, o rama de archivo). Con **cualquier duda** → se conserva y se documenta en `CLAUDE.md`. **Claude Code no borra el scaffold de forma autónoma.**

---

## 7. Tasks

Formato por task: **Archivo(s)** · **Qué hacer** · **Verificación** (comando + dónde) · **Commit** · **Depende / Bloqueado / Checkpoint**.
Dónde se verifica: `LOCAL` (Claude Code CLI, sin Docker) · `URL` (sitio desplegado en Vercel) · `TARBALL` (capa estratégica, grep/diff sobre `codeload`).

---

### DOC-0a · Congelar el spec aprobado (verbatim)
- **Archivo(s):** `docs/specs/PACOS_SPRINT-01_DESIGN-SPEC_v1.0_APPROVED.md` (nuevo).
- **Qué hacer:** crear `docs/specs/` y colocar el spec aprobado **exactamente como fue firmado (byte a byte)**. **Sin reinterpretar ni alterar** el contenido: no se "corrige" el encabezado interno, ni el formato, ni nada — **el estado vive en el nombre del archivo**. Fuente: el archivo aprobado que provee Jonathan; **no** regenerar. **Commit separado, sin tocar `pacos-landing/`.**
- **Verificación:** `LOCAL` `git show --stat HEAD` → un solo archivo bajo `docs/specs/`, cero cambios en `pacos-landing/`; contenido idéntico al aprobado.
- **Commit:** `docs(specs): registrar PACOS Sprint-01 design-spec v1.0 APPROVED`
- **Rama:** `main`. **Depende:** — · **Checkpoint:** —

### DOC-0b · Congelar el plan aprobado
- **Archivo(s):** `docs/plans/PACOS_SPRINT-01_DESIGN-PLAN_v1.0_APPROVED.md` (nuevo — este archivo).
- **Qué hacer:** crear `docs/plans/` y colocar el plan aprobado (esta versión limpia v1.0). **Commit separado, sin tocar `pacos-landing/`.** Da a `verify` su input (la skill lee spec **y** plan).
- **Verificación:** `LOCAL` `git show --stat HEAD` → un solo archivo bajo `docs/plans/`, cero cambios en `pacos-landing/`.
- **Commit:** `docs(plans): registrar PACOS Sprint-01 design-plan v1.0 APPROVED`
- **Rama:** `main`. **Depende:** — · **Checkpoint:** —

---

### A0 · Deploy mínimo controlado *(main, código actual, SIN refactor)*

#### A0.1 · Crear y conectar el proyecto de Vercel — **[HUMANO · HP-1]**
- **Qué hacer (Jonathan):** crear el proyecto de Vercel, **root directory = `pacos-landing`**, conectar el repo `astraDukoWave/landing-pages`, **rama de producción = `main`**. Deploy inicial del `main` actual.
- **Verificación:** `URL` la URL temporal `*.vercel.app` responde con el **sitio actual** (aunque tenga los bugs del audit).
- **Commit:** — (acción de plataforma; no toca el repo). **Bloquea:** A0.2, A0.3 y todo el sprint.

#### A0.2 · Verificar que la plataforma sirve el subdirectorio
- **Archivo(s):** — (verificación).
- **Qué hacer:** confirmar que el root directory al subdirectorio funciona y el sitio actual carga en la URL temporal.
- **Verificación:** `URL` `curl -sI https://<slug>.vercel.app` → 200; la home renderiza el Paco's actual.
- **Commit:** —. **Depende:** A0.1.

#### A0.3 · Validar el auto-deploy con push trivial
- **Archivo(s):** un archivo dentro de `pacos-landing/` (p. ej. un comentario inocuo en `app/layout.tsx`).
- **Qué hacer:** commit **inocuo dentro de `pacos-landing/`** y push a `main`. Cronometrar el redeploy. **Si algo falla, se resuelve como incidente de plataforma aislado, antes de tocar el refactor.**
- **Verificación:** `URL` el push a `main` publica en **≤ 5 min**; el cambio inocuo aparece.
- **Commit:** `chore(pacos): commit trivial para validar auto-deploy de Vercel`
- **Depende:** A0.2. **Al terminar A0:** crear `feature/sprint-01-pacos` desde `main`.

> **DoD-A0:** URL temporal viva sirviendo `pacos-landing/`; auto-deploy verificado (≤5 min). Cierra E2E-A0 (1–2).

---

### B · Convenciones del sistema *(rama `feature/sprint-01-pacos` · ESTRICTAMENTE SECUENCIAL — todas tocan los 5 componentes)*

#### B1 · Config única del negocio (fuente de verdad) — REQ-03
- **Archivo(s):** config del negocio (nuevo, nombre exacto lo fija la ejecución); `components/` (NavBar, Hero, Footer); `app/layout.tsx`; `app/page.tsx`.
- **Qué hacer:** un solo archivo concentra: nombre + tagline, dirección, **horarios estructurados por día**, **WhatsApp (`modo: 'demo' | 'number'` + `número activo` + mensajes por contexto)**, Instagram, `baseUrl`, campos SEO. NavBar/Hero/Footer/metadata leen de aquí. **Consolidar la metadata duplicada** (layout vs page). **Derivar** el año del copyright. **La config sale en `modo: 'demo'`, sin número literal y sin `52XXXXXXXXXX`.**
- **Verificación:** `LOCAL` `grep -rn "52XXXXXXXXXX" pacos-landing/` → **0**; `grep` de segundo handle de IG y de horarios divergentes en `components/` → **0** (dato único por construcción); `npm run build` completa. `TARBALL` cada dato del negocio existe en **exactamente un** lugar.
- **Commit:** `refactor(pacos): config única del negocio como fuente de verdad`
- **Depende:** — (fundacional). **Bloqueado:** — (modo demo por default; Q2 fija el valor).

#### B2 · Tokens semánticos de 2 capas + extraer literales de identidad — REQ-01
- **Archivo(s):** `tailwind.config.ts`; `components/` (los 5).
- **Qué hacer:** paleta `pacos.*` → **capa base**; componentes consumen **capa semántica** para identidad del cliente: `brand-primary`, `brand-primary-strong`, `brand-accent`, `surface`, `surface-elevated`, `ink`, `ink-muted`, y estados: `state-live`, `state-confirmed`, `state-pending`. Los **dos glows rgba del naranja** → token con opacidad. **Regla acotada:** fuera de componentes la identidad (hex/rgba de marca, familias tipográficas), datos y copy; **sí** permitidos estilos estructurales/layout (espaciado, grids, overlays neutros, blancos/negros de estructura).
- **Verificación:** `LOCAL`/`TARBALL` `grep -rniE "<valores hex/rgba de la paleta de Paco's>" pacos-landing/components/` → **0**; el badge EN VIVO usa `state-live` (no `red-600`), los estados del calendario usan `state-confirmed`/`state-pending` (no `emerald-*`). Paridad visual con el sitio actual (revisión en preview deploy).
- **Commit:** `refactor(pacos): tokens semánticos de dos capas + extraer literales de identidad`
- **Depende:** B1.

#### B3 · Extraer eventos, menú y copy a archivos de datos — REQ-02
- **Archivo(s):** directorio de datos (nuevos: eventos, menú, copy); `components/` (los 5).
- **Qué hacer:** eventos, menú y copy editorial (titulares del hero, subtítulos, textos de badges) salen a **archivos de datos por dominio**. **Fechas de eventos en ISO**; el formato visible se deriva. Ningún componente contiene arrays de contenido ni fechas.
- **Verificación:** `LOCAL`/`TARBALL` grep de arrays de contenido/fechas en `components/` → **0**; cambiar un evento o platillo = editar **un solo** archivo de datos; `npm run build` completa.
- **Commit:** `refactor(pacos): extraer eventos, menú y copy a archivos de datos`
- **Depende:** B1 (idealmente tras B2 para no re-tocar tokens en los mismos componentes).

#### B4 · SEO local derivado de config — REQ-07
- **Archivo(s):** `app/layout.tsx` (metadata); `app/sitemap.ts`; robots (nuevo); utilidad de Schema JSON-LD (nuevo).
- **Qué hacer:** `metadataBase` + canónicas desde `baseUrl`; robots; sitemap desde config; **JSON-LD Schema.org de negocio local (BarOrPub/Restaurant)** con nombre, dirección, geo, `openingHoursSpecification` **derivada de los horarios estructurados**, `sameAs` y teléfono — **generado desde config, no a mano**. **En modo demo, el teléfono se omite del Schema** (no se publica número personal ni falso).
- **Verificación:** `LOCAL` estructura del JSON-LD válida con los datos disponibles; cambiar `baseUrl` propaga a todo. `URL` (tras A1.3) `curl -sI <url>/sitemap.xml` → 200; `curl -s <url>/robots.txt` responde. En modo demo, el Schema **no** incluye teléfono.
- **Commit:** `feat(pacos): SEO local (metadata, sitemap, robots, JSON-LD) derivado de config`
- **Depende:** B1.

#### B5 · CTAs de WhatsApp contextuales + modo demo controlado — REQ-08 (+ política REQ-04)
- **Archivo(s):** `components/` (NavBar, MenuHero, Footer); componente de **aviso de modo demo** (nuevo).
- **Qué hacer:** cada CTA usa el **modo/número vigente de config** y un mensaje precargado por contexto: nav (*pedir ahora*), menú (*ver menú completo*), footer (*contacto general*). **Fallback** al genérico si un contexto no define mensaje. **En `modo: 'demo'`**: los CTAs conservan la UX completa (visibles, con su mensaje) pero al tocarlos muestran el **aviso de demostración** ("sitio de demostración — el chat se activa al lanzar con el negocio") en lugar de abrir chat. **La URL de distribución pública nunca enlaza a un número personal.**
- **Verificación:** `LOCAL`/preview los 3 CTAs respetan el modo: en demo muestran el aviso; en `number` abren chat con el mensaje correcto por sección; el fallback funciona. Ningún número personal en la salida.
- **Commit:** `feat(pacos): CTAs de WhatsApp contextuales con modo demo controlado`
- **Depende:** B1.

#### B6 · Filtrar eventos vencidos en build + estado vacío — REQ-09 (parte código) + caso edge
- **Archivo(s):** utilidad de filtrado de eventos; componente/estado vacío del calendario (nuevo); componente de calendario en `components/`.
- **Qué hacer:** **eventos con fecha pasada se filtran en build** y no se renderizan. **Cero eventos tras filtrar → estado vacío diseñado** ("síguenos en Instagram para la próxima cartelera"), nunca sección rota.
- **Verificación:** `LOCAL` insertar un evento de **ayer** → no aparece; vaciar eventos → estado vacío diseñado; `npm run build` completa.
- **Commit:** `feat(pacos): filtrar eventos vencidos en build + estado vacío del calendario`
- **Depende:** B3.

#### B7 · `CLAUDE.md` refleja estructura real + flujo gestionado + reversión — REQ-09 (doc) + transversal B
- **Archivo(s):** `CLAUDE.md` (raíz; crear/reescribir).
- **Qué hacer:** `CLAUDE.md` describe la **estructura real post-B** (datos, config, tokens, política de WhatsApp) y el **flujo de actualización gestionado paso a paso**: cliente manda por WhatsApp → **Jonathan** edita el archivo de eventos → commit → push → Vercel publica **en ≤ 10 min** (sin CMS, sin autoservicio). Incluye el **checklist de reversión de la demostración en vivo** (activar número de demostración → verificar CTA → revertir → la URL pública vuelve a modo demo).
- **Verificación:** `TARBALL` leído en frío, `CLAUDE.md` describe el repo **real** sin afirmaciones falsas (no menciona un CMS imaginario); el flujo y el checklist de reversión están presentes.
- **Commit:** `docs(pacos): CLAUDE.md refleja estructura real + flujo gestionado + reversión de demo`
- **Depende:** B1–B6.

> **DoD-B:** identidad/datos/copy fuera de `components/` (greps en 0); marca y estados vía tokens; config única operando (cada dato en una sola fuente, incluido modo/número WhatsApp); flujo gestionado + reversión documentados y ensayados (≤10 min); `CLAUDE.md` veraz; spec y plan commiteados en `docs/`. Cierra E2E-Sprint (9–12).

---

### A1 · Demo funcional vendible *(rama `feature/sprint-01-pacos`)*

#### A1.1 · Assets de demo + fallback de imagen — REQ-05
- **Archivo(s):** `pacos-landing/public/` (nuevo): favicon/iconos **provisionales de marca** (derivados de la identidad actual) + **OG provisional propia 1200×630**; lógica de fallback en el componente de fotos.
- **Qué hacer:** dejar de apuntar a `placehold.co`. Los **gradientes actuales** se aceptan como placeholder visual de fotos. **Foto faltante → gradiente de marca** (nunca imagen rota).
- **Verificación:** `LOCAL`/`TARBALL` `grep -rn "placehold.co" pacos-landing/` → **0**; `URL` favicon y OG propios visibles al compartir el link.
- **Commit:** `feat(pacos): assets de demo (favicon/OG propios) y fallback de imagen`
- **Depende:** B* (estructura de config/datos ya en su lugar).

#### A1.2 · Datos coherentes finales + política de WhatsApp — REQ-04 — **[Bloqueado: HP-3, HP-4]**
- **Archivo(s):** config del negocio; datos de eventos.
- **Qué hacer:** poblar la config con los **mejores datos disponibles**, coherentes y servidos desde el único punto: dirección y horarios conocidos (**lun–mar y jue–dom, 1 PM–10 PM, cerrado miércoles**), **un solo** handle de Instagram (**`pacoswingsandbeer`**, Q3, marcado pendiente), y **eventos recientes nunca vencidos** (HP-4). Confirmar **modo demo** para la URL pública (Q2): sin número personal.
- **Verificación:** `LOCAL`/`URL` cero contradicciones internas (IG único, horarios únicos); ningún `52XXXXXXXXXX`; la URL de distribución pública no enlaza a ningún número personal; en modo demo los 3 CTAs muestran el aviso. **Si falta HP-4:** el calendario cae al **estado vacío diseñado** (demo válido).
- **Commit:** `chore(pacos): datos coherentes del demo + política de WhatsApp (modo demo)`
- **Depende:** A1.1. **Bloqueado:** HP-3 (resuelto, provisional), HP-4 (default estado vacío).

#### A1.3 · Publicar el demo vendible — REQ-11b — **[CHECKPOINT CP-2]**
- **Qué hacer:** con B y A1.1/A1.2 completos, **abrir PR `feature/sprint-01-pacos → main`**; Jonathan revisa el **preview deploy** y aprueba el **merge** (CP-2). Al mergear, `main` publica el demo en la **misma URL temporal** por el pipeline ya validado en A0. `baseUrl` apunta a la URL temporal; **`pacoswingsandbeer.com` sigue pendiente** (no se compra ni configura).
- **Verificación:** `URL` el demo publicado refleja las convenciones de B; push a `main` (el merge) publica en **≤ 5 min**; el cliente lo abre en móvil y ve la identidad de Paco's con datos coherentes y calendario solo con eventos vigentes.
- **Commit:** merge commit `feat(pacos): publicar demo vendible en URL temporal`
- **Depende:** A1.1, A1.2, B*. **Checkpoint:** **CP-2** (aprobación del merge por Jonathan).

> **DoD-A1:** demo público en la URL temporal, compartible; cero placeholders/`placehold.co`, favicon/OG propios; datos coherentes; CTAs conforme a la política; ningún número personal en la URL de distribución; eventos pasados nunca visibles; estado vacío existe. Cierra E2E-Demo (3–8).

---

### C · Hardening *(NO bloqueante — post-venta o en huecos; rama `feature/sprint-01-pacos`)*

#### C1 · Fuentes autohospedadas — REQ-06
- **Archivo(s):** `app/layout.tsx`; `pacos-landing/public/` (fuentes locales).
- **Qué hacer:** migrar de Google Fonts en build a **fuentes locales commiteadas** (Bebas Neue 400, Inter en los pesos usados), mismas variables CSS. Motivo `[verified]`: el build depende hoy de la red de Google Fonts; además el sistema necesitará tipografías de clientes como archivos (Valhalla).
- **Verificación:** `LOCAL` build completa **sin** acceso a `fonts.googleapis.com`; tipografía idéntica.
- **Commit:** `chore(pacos): fuentes autohospedadas (Bebas Neue, Inter) sin Google Fonts en build`
- **Depende:** —.

#### C2 · Higiene de repo (partes seguras) — REQ-10 (a, c)
- **Archivo(s):** `.gitignore`; `package.json`.
- **Qué hacer:** (a) sacar **`.idea/`** del tracking y añadirlo al `.gitignore`; (c) instalar el **tooling de lint** que el script ya promete, para que `npm run lint` sea operativo.
- **Verificación:** `LOCAL` `git status` limpio de archivos de IDE; `npm run lint` corre.
- **Commit:** `chore(repo): dejar de trackear .idea/ + instalar tooling de lint`
- **Depende:** —.

#### C3 · Inventario del scaffold raíz + criterio de abandono — REQ-10 (b) — **[termina en CHECKPOINT CP-3]**
- **Archivo(s):** nota de inventario (nuevo, p. ej. en `docs/`).
- **Qué hacer:** producir el **inventario verificable** del scaffold raíz (`src/`, package raíz, `tsconfig` raíz, `AGENTS.md`) contra el criterio del spec: ¿algo dentro de `pacos-landing/` o de scripts/configs del repo lo **importa/referencia**? ¿su **historial** muestra evolución? ¿hay **consumidor externo** conocido? **NO borrar nada.** El inventario reporta el resultado. **Se detiene aquí.**
- **Verificación:** `TARBALL` existe la nota de inventario con el resultado de la verificación de abandono (referencias, historial, consumidores).
- **Commit:** `docs(repo): inventario del scaffold raíz + criterio de abandono`
- **Depende:** —. **Checkpoint:** **CP-3** (activar `cto-review` sobre el inventario antes de C3b).

#### C3b · Decisión del scaffold — **GATEADA (cto-review + firma humana)**
- **Qué hacer:** **solo si** CP-3 concluye **abandonado y sin consumidores** → borrado **reversible**: commit dedicado, atómico y **revertible** (alternativa conservadora: **rama de archivo**). **Con cualquier duda → conservar y documentar en `CLAUDE.md`** (sin borrado). **Claude Code no ejecuta esto de forma autónoma.**
- **Verificación:** `LOCAL`/`TARBALL` la decisión ejecutada es **revertible con un solo `git revert`** (o existe la rama de archivo); si se conserva, `CLAUDE.md` documenta por qué.
- **Commit:** `chore(repo): [eliminar|archivar] scaffold raíz (revertible)` — **solo tras CP-3**.
- **Depende:** C3 + CP-3.

#### C4 · Validación de datos de eventos en build — Pista C (validación)
- **Archivo(s):** validador de datos en build.
- **Qué hacer:** un **evento malformado** (fecha inválida, campo faltante) → el **build falla** con mensaje que **nombra archivo y campo**. Protege el flujo gestionado de errores de dedo.
- **Verificación:** `LOCAL` inyectar un evento malformado → `npm run build` **falla** nombrando archivo y campo; revertir → build vuelve a pasar.
- **Commit:** `feat(pacos): validación de datos de eventos en build (falla con archivo+campo)`
- **Depende:** B3.

> **DoD-C:** build independiente de Google Fonts; `.idea/` fuera del repo; lint operativo; inventario del scaffold hecho; decisión reversible ejecutada **o** conservación documentada; validación de datos en build activa.

---

## 8. Matriz de verificación E2E (mapeo al spec)

| E2E (spec) | Cubierto por | Dónde |
|---|---|---|
| E2E-A0 (1–2) URL temporal + push trivial ≤5 min | A0.2, A0.3 | `URL` |
| E2E-Demo 3 build + sitemap/robots accesibles | B4 + A1.3 | `URL` |
| E2E-Demo 4 favicon/OG propios; cero `placehold.co` | A1.1 | `URL` |
| E2E-Demo 5 IG y horarios idénticos (una fuente) | B1, A1.2 | `LOCAL`/`TARBALL` |
| E2E-Demo 6 los 3 CTAs respetan el modo; sin número personal | B5, A1.2 | `LOCAL`/`URL` |
| E2E-Demo 7 responsive sin overflow (360/768/1280) | revisión en preview (A1.3) | `URL` |
| E2E-Demo 8 evento de ayer no aparece; sin eventos → estado vacío | B6 | `LOCAL` |
| E2E-Sprint 9 greps de convención (paleta/contenido en `components/` → 0) | B2, B3 | `LOCAL`/`TARBALL` |
| E2E-Sprint 10 simulacro cronometrado del flujo gestionado ≤10 min | B7 (ensayo) | `LOCAL`+`URL` |
| E2E-Sprint 11 simulacro de demo en vivo + reversión | B7 (checklist) + HP-5 (runtime) | operativo |
| E2E-Sprint 12 `CLAUDE.md` en frío describe el repo real | B7 | `TARBALL` |
| E2E-Producción 13 `52XXXXXXXXXX`→0, teléfono real en Schema, Lighthouse | **Gate Producción (post-venta)** | fuera del sprint |

> **Nota de verify (artefacto heredado):** la lista de regresiones del **paso 4 de la skill `verify`** (CV Engine, SSE del copilot, `useAudioCapture.ts`) pertenece a **CareerAI, no a este repo** → `[contradicted]` para este proyecto. El verify de este sprint debe usar los **happy-paths de este producto**: el sitio renderiza, los 3 CTAs respetan el modo, sitemap/robots responden, el calendario filtra vencidos, el build no depende de Google Fonts. Fijar esa lista al mergear.

---

## 9. Riesgos → mitigación

- **Vercel + subdirectorio + auto-deploy mal configurado** → A0 lo **aísla y valida con el código actual antes** del refactor; si falla, se trata como incidente de plataforma, no se arrastra al refactor.
- **Las tasks de B tocan los mismos 5 componentes** → **ejecución estrictamente secuencial**, un commit por task; nunca en paralelo.
- **El build depende de Google Fonts hasta C1** → aceptado (C es no bloqueante); C1 elimina la dependencia de red en build.
- **Exposición accidental de un número personal** → política dura: **modo demo por default**, cero literales de número en el repo, número de demostración inyectado en runtime (HP-5) y **revertido** por checklist.
- **Eliminación del scaffold (irreversible)** → inventario (C3) + **cto-review + firma** (CP-3) + borrado **reversible** o rama de archivo; con duda se conserva.
- **Eventos vencidos llegando a la URL** → filtrado en build (B6) + validador que **falla el build** ante datos malformados (C4).
- **Repo público filtrando estrategia/precios** → este plan y todos los artefactos **no** contienen contenido comercial; solo el spec y el plan aprobados van a `docs/`. Verify revisa que no se cuele nada de strategy en cada task.
- **Divergencia de datos reaparece** → imposible por construcción tras B1 (dato único en config); los greps de convención lo blindan.

---

## 10. Lo que este plan NO hace

- No entrega el prompt de ejecución (vive en el *implementation-handoff*).
- No compra ni configura dominio (D1, pendiente de confirmar).
- No incluye monorepo/extracción del núcleo (Sprint 3), Valhalla/Brand Intake (Sprint 2), CMS/Google Sheets (v1.5), agentes de IA (v2), ni "sitio que respira"/Push/contador (candidatos Sprint 2).
- No cierra el Gate Producción (post-venta, ítem por ítem).
- No añade ningún número de teléfono, precio, estrategia ni artefacto privado a ningún archivo commiteado.

---

## 11. Estado de aprobación y decisiones confirmadas

- **CP-1:** OTORGADA (Jonathan, 2026-07-21). Estructura `DOC-0 → A0 → B → A1 → C` aprobada.
- **Q1 — Topología:** `main` (DOC-0 + A0) + `feature/sprint-01-pacos` (B, A1, C) + publicación por **merge a `main`** solo tras CP-2. *(Alternativa trunk-based descartada.)*
- **Q2 — WhatsApp del demo:** **modo demo controlado por default**; URL pública sin número personal.
- **Q3 — Instagram:** **`pacoswingsandbeer`** como handle único, **marcado pendiente de confirmación** con el cliente.
- **Bucle humano mínimo confirmado:** **HP-1** (conexión Vercel↔GitHub), **CP-2** (aprobación del merge del demo), **CP-3** (decisión del scaffold), **HP-5** (solo si hay demostración en vivo).

Siguiente artefacto del ciclo: `PACOS_SPRINT-01_IMPLEMENTATION-HANDOFF_v0.1.md` (aprobado por Jonathan). Claude Code arranca solo tras el OK a ese handoff, deteniéndose en CP-2 y CP-3.

---

## Changelog

- **v1.0 (2026-07-21) — APPROVED:** registra CP-1; resuelve Q1 (topología), Q2 (modo demo), Q3 (`pacoswingsandbeer` pendiente); divide DOC-0 en DOC-0a (freeze verbatim del spec) + DOC-0b (freeze del plan) con la aclaración de congelación; fija el bucle humano mínimo (HP-1/CP-2/CP-3/HP-5-si-en-vivo); §11 pasa de "pregunta de aprobación" a "estado de aprobación". Supersede a v0.1_PENDING-APPROVAL.
- **v0.1 (2026-07-21) — PENDING-APPROVAL:** primera versión del plan; descomposición del spec v1.0 en tasks A0/B/A1/C con verificación binaria, gates y bucle humano.
