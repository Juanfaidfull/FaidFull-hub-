# JuanProjects

Biblioteca web para compartir **juegos modificados** y **proyectos optimizados**
mediante enlaces de descarga (MediaFire, Mega, Drive, GitHub…).

Réplica mejorada de la página original de JuanProjects: mismo estilo oscuro con
acentos rojos y glow, buscador en vivo, pestañas Juegos/Proyectos, tarjetas con
botón de descarga, y un panel para **subir contenido** con uno o varios espejos.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- Persistencia en `localStorage` (sin backend) — el contenido subido se guarda
  en el navegador del usuario.

## Desarrollo

```bash
pnpm install
pnpm dev        # servidor de desarrollo en http://localhost:5173
pnpm build      # build de producción en dist/
pnpm preview    # previsualizar el build
pnpm lint       # ESLint
```

## Características

- 🔎 Búsqueda en vivo por título, descripción y etiquetas.
- 🎮 Pestañas **Juegos** / **Proyectos** con contadores.
- ↕️ Orden por recientes, más descargados, destacados o A–Z.
- ⬆️ Subir / editar / eliminar publicaciones con validación de enlaces.
- 🔗 Múltiples fuentes de descarga por publicación (MediaFire, Mega, …).
- 📱 Diseño responsive (móvil → escritorio) con animaciones y modo oscuro.

## Nota sobre persistencia

Esta versión funciona 100% en el navegador y guarda el contenido en
`localStorage`, por lo que las publicaciones son locales a cada visitante. Para
una biblioteca compartida entre todos los usuarios se necesitaría un backend
(API + base de datos); el código está estructurado para añadirlo fácilmente.
