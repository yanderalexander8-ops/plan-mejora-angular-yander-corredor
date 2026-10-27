# Plan de mejoramiento – Angular (módulo de publicaciones)

**Aprendiz:** Yander Alexander Corredor Hernández
**Programa:** Análisis y desarrollo de software
**Ficha:** 3231651
**Recurso asignado:** Publicaciones (`/posts`) de la API DummyJSON
**Resultado de aprendizaje:** Crear componentes front-end del software de acuerdo con el diseño

---

## ¿Qué es este proyecto?

Una aplicación web hecha con **Angular** usando **módulos (NgModules)**, sin componentes standalone.
Consume la API pública [DummyJSON](https://dummyjson.com), inicia sesión con **token JWT** y permite
**listar, buscar, ver, crear, editar y eliminar publicaciones**, además de ver el perfil del usuario.

> DummyJSON solo **simula** crear, editar y eliminar: responde como si hubiera funcionado, pero
> no guarda los cambios. Por eso la app muestra un mensaje con la respuesta que recibió.

## Cómo ejecutarlo

Necesitas tener instalado **Node.js 20.19 o superior** (o 22.12+) y **npm**.

```bash
# 1. Instalar las dependencias
npm install

# 2. Iniciar la aplicación
npm start
```

Luego abre <http://localhost:4200> en el navegador.

**Usuario de prueba:** `emilys`  ·  **Contraseña:** `emilyspass`

Para generar la versión de producción: `npm run build`.

## ¿Qué puede hacer la aplicación?

- **Iniciar sesión** con un formulario reactivo (usuario y contraseña obligatorios, contraseña de mínimo 6 caracteres).
  Si las credenciales son incorrectas muestra un mensaje.
- **Listado de publicaciones** paginado de 10 en 10 (`limit` y `skip`) con **búsqueda**.
- **Detalle** de cada publicación (`/posts/:id`).
- **Crear y editar** con el mismo formulario (`/posts/new` y `/posts/:id/edit`). Al editar, el formulario
  se llena con los datos de la publicación.
  - Título: mínimo 5 caracteres.
  - Contenido: mínimo 20 caracteres.
  - Etiquetas: select múltiple (vienen de `/posts/tag-list`), mínimo 1.
  - ID de usuario: número entero mayor a 0.
- **Eliminar** con una ventana de confirmación.
- **Mi perfil** (`/profile`) con los datos de `GET /auth/me`.
- **Cerrar sesión**: borra el `localStorage` y vuelve a `/auth/login`.
- Indicador de **carga**, manejo de **errores** y mensajes de **confirmación** al crear, editar o eliminar.
- Cualquier ruta que no exista muestra la página **404**.

## Cómo está organizado

```
src/app/
├── app.module.ts            Módulo raíz (importa CoreModule una sola vez)
├── app-routing.module.ts    Rutas principales con carga perezosa
├── core/                    CoreModule
│   ├── services/            AuthService y NotificationService
│   ├── interceptors/        AuthInterceptor (agrega el token Bearer)
│   ├── guards/              authGuard y guestGuard
│   ├── models/              Interfaces TypeScript
│   └── constants/           URL de la API y llaves de localStorage
├── shared/                  SharedModule
│   ├── components/          Navbar, página 404, spinner, toast y paginación
│   └── validators/          Validadores propios
└── features/
    ├── auth/                AuthModule (carga perezosa en /auth)
    ├── posts/               PostsModule (carga perezosa en /posts)
    │   ├── models/          Interfaces: Post, PostsResponse, etc.
    │   ├── services/        PostsService (todas las peticiones HTTP)
    │   └── components/      Lista, detalle y formulario
    └── profile/             ProfileModule (carga perezosa en /profile)
```

### Piezas importantes

| Pieza | Para qué sirve |
|---|---|
| `CoreModule` | Guarda lo que existe una sola vez: servicios, guards e interceptor. |
| `SharedModule` | Componentes reutilizables y reexporta `CommonModule`, `ReactiveFormsModule` y `RouterModule`. |
| `AuthService` | Iniciar sesión, cerrar sesión, obtener el token y saber si hay sesión activa. |
| `AuthInterceptor` | Agrega `Authorization: Bearer <token>` a las peticiones. |
| `authGuard` | Protege las rutas privadas (si no hay sesión, va al login). |
| `guestGuard` | Evita volver al login si ya hay sesión. |
| `PostsService` | Hace las peticiones HTTP con `HttpClient` y devuelve `Observable`. Los componentes no usan `HttpClient`. |

## Flujo de autenticación

1. El usuario escribe sus credenciales en `/auth/login`.
2. `AuthService` envía `POST /auth/login` a DummyJSON.
3. La respuesta trae el `accessToken`; se guarda en `localStorage` junto con los datos básicos del usuario.
4. Desde ese momento el interceptor agrega el token en cada petición.
5. Las rutas privadas están protegidas por `authGuard`.
6. Al cerrar sesión se borra el `localStorage` y se redirige al login.

## Tecnologías

Angular 20 · TypeScript · RxJS · Reactive Forms · CSS propio (fuente Inter)
