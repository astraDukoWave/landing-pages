# Inventario: scaffold raíz — Sprint 01 Paco's (Task C3)

> **Estado:** inventario entregado, **CP-3 pendiente de firma humana**. Este documento **no** ejecuta ningún borrado — solo reporta el resultado de la verificación de abandono definida en el spec (REQ-10b) y el plan (C3/C3b).
> **Autor:** Claude Code (ejecución) · **Fecha:** 2026-07-23
> **Alcance:** `src/`, `package.json` (raíz), `tsconfig.json` (raíz), `AGENTS.md` (raíz).

## Criterio de verificación (del spec)

> "Nada dentro de `pacos-landing/` ni de scripts/configs del repo lo importa o referencia; su historial muestra que no evoluciona; no existe consumidor externo conocido."

## Contenido del scaffold

- `src/index.ts` — un único archivo, una línea: `console.log('Happy developing ✨')`. Es el saludo por defecto que generan los templates "TypeScript en blanco" de IDEs tipo WebStorm/IntelliJ al crear un proyecto nuevo — no contiene lógica de negocio.
- `package.json` (raíz) — `"name": "untitled"`, sin dependencias, un solo script (`build: tsc`). El nombre `"untitled"` nunca fue cambiado desde el default del scaffolder.
- `tsconfig.json` (raíz) — config de compilador estándar (`target: es2016`, `module: commonjs`, `outDir: dist`), sin nada específico del dominio.
- `AGENTS.md` (raíz) — documentación genérica de cómo trabajar en este scaffold (`npm run build`, editar `src/`); no menciona Paco's, landings, ni ningún dominio de producto.

## Hallazgos por criterio

### 1. Referencias desde `pacos-landing/` o scripts/configs del repo

```
grep -rn "\.\./src\|require(.\./\|from '\.\./\|\"untitled\"" pacos-landing/ docs/ CLAUDE.md .github/ vercel.json
```

**Resultado: 0 referencias de código.** Los únicos matches son artefactos internos de `.next/` (paths relativos propios de Next.js, no relacionados) y la mención descriptiva del propio `docs/plans/...APPROVED.md` (que documenta la existencia del scaffold, no lo consume). No existe `vercel.json` en la raíz — la configuración de Vercel vive en el dashboard (Root Directory = `pacos-landing`), sin ningún archivo de config que apunte al scaffold. No hay `.github/` (sin CI/CD que lo referencie).

### 2. Evolución en el historial

```
git log --follow --oneline -- src/index.ts package.json tsconfig.json AGENTS.md
```

**Resultado: cada uno de los 4 archivos tiene exactamente 1 commit — el "Initial commit" del repo (`2ec6167`, 2026-07-20).** Ninguno fue tocado en ninguno de los 16 commits posteriores (todos sobre `pacos-landing/` o `docs/`). No hay evidencia de iteración, corrección de bugs, ni intención de desarrollo activo.

### 3. Consumidor externo conocido

**No verificable desde el repo** (por diseño — un consumidor externo, si existiera, no dejaría rastro en este checkout). Señales indirectas en contra de un consumidor real:
- Sin `node_modules/` instalado en la raíz de este checkout, sin `dist/` (nunca se corrió `npm run build` de forma persistente).
- El nombre `"untitled"` y el contenido de `src/index.ts` son inequívocamente boilerplate de scaffolding, no un paquete publicado o consumido en otro lugar.
- No hay ningún workflow de CI, script de deploy, ni referencia en `pacos-landing/` que dependa de él.

## Veredicto del inventario

**Los tres criterios de abandono se cumplen:** cero referencias internas, cero evolución en el historial, sin señal de consumidor externo (y evidencia indirecta en contra de que exista uno). Esto es consistente con el audit `[verified]` del plan: *"Scaffold raíz... sin relación aparente con las landings."*

## Siguiente paso — CP-3 (gateado)

Por regla del plan (§6, Task C3b) y del spec (REQ-10b): **con este resultado, la decisión pasa a `cto-review` + firma humana antes de cualquier borrado.** Claude Code no ejecuta C3b de forma autónoma. Si se aprueba el borrado, debe ser **reversible** (commit atómico revertible con `git revert`, o rama de archivo como alternativa conservadora). Con cualquier duda remanente, la instrucción por defecto es **conservar y documentar en `CLAUDE.md`**, no borrar.
