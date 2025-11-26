# StickerDex

Pequeña "pokedex" para stickers de WhatsApp. Muestra varios "slots" para stickers; los primeros 5 tienen contenido y el resto aparecen como "Por descubrir". Puedes editar el texto debajo de cada sticker y se guardará en tu navegador (localStorage).

Archivos principales:
- `index.html` — la página principal.
- `styles.css` — estilos.
- `app.js` — lógica: renderiza tarjetas, permite editar y guarda en `localStorage`.
- `assets/` — contiene 5 stickers de ejemplo y un placeholder.

Cómo usar:
- Abre `index.html` en tu navegador (doble click o `Open With` en tu editor).
- Haz clic en el texto de debajo de un sticker para editarlo.
- Pulsa `Guardar` o simplemente haz clic fuera (se guarda automáticamente al perder foco).

Notas:
- Los cambios se guardan localmente en tu navegador; para borrar todo, abre la consola y ejecuta `localStorage.clear()` o usa DevTools.
- Si quieres añadir tus propias imágenes, cámbialas en `assets/` y actualiza la ruta en `app.js`.

Bootstrap y responsive
- **Bootstrap:** ya integré Bootstrap vía CDN para mejorar la visualización en móviles y tablets. El contenedor usa clases de Bootstrap y las tarjetas usan columnas responsivas (`col-6 col-sm-4 col-md-3 col-lg-2`).

Despliegue en Render (pasos rápidos)
1. Crea un repositorio en GitHub y sube esta carpeta (ej.: `stickers`).
2. Desde PowerShell, en la raíz del proyecto ejecuta (sustituye `<user>` y `<repo>`):
```
git init
git add .
git commit -m "Add StickerDex"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
3. En https://render.com crea un nuevo **Static Site**, conecta tu cuenta de GitHub y selecciona el repositorio y la rama `main`.
4. Para un sitio estático con archivos HTML/CSS/JS no necesitas comando de build. En "Publish Directory" deja `/` (la raíz) o especifica la carpeta si subes solo una subcarpeta.
5. Pulsa "Create Static Site" y Render desplegará la aplicación.

Notas de despliegue
- Si quieres que los assets estén en una subcarpeta, confirma la ruta en `app.js` (`assets/...`).
- Si prefieres que el sitio se construya con un sistema (por ejemplo, SSG), añade un `buildCommand` apropiado en la configuración de Render.

¡Disfruta! :)