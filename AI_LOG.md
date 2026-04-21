# AI_LOG.md — Registro de uso de Claude Code

Herramienta utilizada: **Claude Code**

---

## Entrada #1 — Herramienta: Claude Code

**Prompt enviado:**
"Necesito el backend para una prueba técnica en NestJS. Requiere: módulo de tareas con endpoints GET /api/tasks, POST /api/tasks, PATCH /api/tasks/:id/status y DELETE /api/tasks/:id. Validación de campos, manejo global de errores y CORS habilitado."

**Respuesta IA:**
Propuso la estructura completa: `TasksModule`, `TasksController`, `TasksService`, DTOs con `class-validator`, `HttpExceptionFilter` global, prefijo `/api` y CORS en `main.ts`.

**Problema encontrado:**
Ninguno en la estructura base. La IA generó correctamente los decoradores NestJS, la validación con `@IsString`, `@MaxLength`, `@IsEnum` y el filtro de excepciones global.

**Corrección aplicada:**
No fue necesaria corrección en esta etapa.

---

## Entrada #2 — Herramienta: Claude Code

**Prompt enviado:**
"Configura Prisma 7 con SQLite como base de datos para el proyecto NestJS."

**Respuesta IA:**
Configuró el schema de Prisma con el modelo `Task`, cambió el provider a SQLite, creó el `PrismaService` extendiendo `PrismaClient` con el adaptador `@prisma/adapter-libsql`, y ejecutó la migración inicial.

**Problema encontrado:**
Prisma 7 introdujo cambios breaking: la propiedad `url` ya no se define en `schema.prisma` sino en `prisma.config.ts`. Además, `PrismaClient` en Prisma 7 ya no es una clase extensible via herencia tradicional. El build falló con múltiples errores de TypeScript, incluyendo que el nombre del adaptador era `PrismaLibSql` (no `PrismaLibSQL` como se importó inicialmente).

**Corrección aplicada:**
Se movió la URL de conexión a `prisma.config.ts`, se cambió a composición en lugar de herencia para `PrismaService`, se corrigió el casing del adaptador a `PrismaLibSql`, y se usaron extensiones `.js` en los imports (requerido por `moduleResolution: nodenext`).

---

## Entrada #3 — Herramienta: Claude Code

**Prompt enviado:**
"Crea el test de integración para POST /api/tasks usando Jest y Supertest."

**Respuesta IA:**
Generó `test/tasks.e2e-spec.ts` con 4 casos: creación exitosa (201), falta de `title` (400), falta de `assignee` (400) y `title` mayor a 120 caracteres (400). Configuró `jest-e2e.json` y actualizó el script `test:e2e`.

**Problema encontrado:**
Jest (CommonJS) no pudo procesar los archivos generados por Prisma 7 que usan `import.meta.url` (sintaxis ESM exclusiva). El error fue: `SyntaxError: Cannot use 'import.meta' outside a module`. Se intentó configurar Jest en modo ESM con `--experimental-vm-modules` pero surgió un segundo error: `ReferenceError: exports is not defined` por incompatibilidades de módulos CommonJS en el entorno ESM de Jest.

**Corrección aplicada:**
Se decidió eliminar Prisma completamente y reemplazarlo por almacenamiento en memoria (`Task[]`), dado que la prueba técnica explícitamente indica "no se requiere base de datos persistente". Esto resolvió todos los conflictos ESM/CJS de Jest.

---

## Entrada #4 — Herramienta: Claude Code

**Prompt enviado:**
"Reemplaza Prisma por almacenamiento en memoria. Usa un array como store de tareas."

**Respuesta IA:**
Creó `task.entity.ts` con la interfaz `Task` y el tipo `TaskStatus`, reescribió `TasksService` usando un array privado y `crypto.randomUUID()` (nativo de Node.js, sin dependencias externas), eliminó `PrismaModule`, `PrismaService` y todos los archivos relacionados.

**Problema encontrado:**
Al quitar Prisma, se intentó usar el paquete `uuid` para generar IDs. Pero `uuid` v14 también es ESM-only y Jest no podía procesarlo: `SyntaxError: Unexpected token 'export'`.

**Corrección aplicada:**
Se eliminó la dependencia `uuid` y se usó `crypto.randomUUID()` que viene integrado en Node.js >= 14.17, sin necesidad de paquetes externos. Adicionalmente, TypeScript requería `import type` en lugar de `import` para tipos usados en firmas de métodos decorados (error `TS1272` con `isolatedModules` + `emitDecoratorMetadata`).

---

## Entrada #5 — Herramienta: Claude Code

**Prompt enviado:**
"Configura CORS para el frontend Angular y agrega el manejo global de errores para que ningún stack trace llegue al cliente."

**Respuesta IA:**
Configuró `app.enableCors()` en `main.ts` con `origin: 'http://localhost:4200'` y métodos `GET, POST, PATCH, DELETE`. Implementó `HttpExceptionFilter` con `@Catch()` para interceptar cualquier excepción y retornar una respuesta estructurada con `statusCode`, `timestamp`, `path` y `message`.

**Problema encontrado:**
Ninguno. La configuración funcionó correctamente desde el primer intento.

**Corrección aplicada:**
No fue necesaria corrección.

---

## Entrada #6 — Herramienta: Claude Code

**Prompt enviado:**
"Genera el README.md con las instrucciones de instalación y los comandos exactos para correr el proyecto."

**Respuesta IA:**
Generó el `README.md` con stack declarado, requisitos previos, comandos de instalación, arranque en desarrollo y producción, tabla de endpoints, ejemplo de uso con curl y tabla de variables de entorno.

**Problema encontrado:**
Ninguno.

**Corrección aplicada:**
No fue necesaria corrección.
