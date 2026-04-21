# Task Manager — Backend

## Stack declarado

| Componente   | Tecnología                        |
|--------------|-----------------------------------|
| Backend      | NestJS 11 (Node.js + TypeScript)  |
| Persistencia | In-memory (array en memoria)      |
| AI Tool(s)   | Claude Code                       |

## Requisitos previos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
npm install
```

## Levantar el servidor

```bash
# Desarrollo (watch mode)
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El servidor corre en `http://localhost:3001`

## Endpoints disponibles

| Método   | Ruta                        | Descripción                          |
|----------|-----------------------------|--------------------------------------|
| GET      | /api/tasks                  | Listar tareas (filtro `?status=`)    |
| POST     | /api/tasks                  | Crear tarea                          |
| PATCH    | /api/tasks/:id/status       | Cambiar status de una tarea          |
| DELETE   | /api/tasks/:id              | Eliminar tarea                       |

### Ejemplo de creación de tarea

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi tarea", "assignee": "Juan", "description": "Opcional", "dueDate": "2026-05-01"}'
```

### Valores válidos de status

`TODO` | `IN_PROGRESS` | `DONE`

## Tests de integración

```bash
npm run test:e2e
```

## Variables de entorno (opcionales)

| Variable       | Default                    | Descripción                    |
|----------------|----------------------------|--------------------------------|
| `PORT`         | `3001`                     | Puerto del servidor            |
| `FRONTEND_URL` | `http://localhost:4200`    | Origen permitido por CORS      |
