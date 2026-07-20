# Rosario & Ignacio

Landing page elegante y responsive para el matrimonio de Rosario Vial y José Ignacio Ibieta.

## Cambios rápidos

- Ajusta la fecha del evento en [src/data/wedding.ts](src/data/wedding.ts).
- Cambia los textos, direcciones, hoteles y enlaces desde [src/data/wedding.ts](src/data/wedding.ts).
- Reemplaza las imágenes locales en [public](public) por fotografías reales cuando las tengas.
- La cuenta regresiva se actualiza automáticamente según la fecha configurada.

## Ejecutar localmente

```bash
npm install
npm run dev
```

La vista previa queda disponible en http://localhost:3000.

## Activar las confirmaciones en Google Sheets

La planilla ya está indicada en [el script de Google Apps Script](scripts/google-apps-script/appendToSheet.gs). Para activarla, con la cuenta propietaria de la hoja:

1. Abre la planilla y selecciona **Extensiones → Apps Script**.
2. Reemplaza el contenido del editor por el contenido de `scripts/google-apps-script/appendToSheet.gs` y guarda.
3. Selecciona **Implementar → Nueva implementación → Aplicación web**.
4. Elige **Ejecutar como: Yo** y concede acceso a **Cualquiera**. Autoriza los permisos solicitados.
5. Copia la URL que termina en `/exec`.
6. En el proveedor donde publiques la web, crea la variable de entorno `GOOGLE_APPS_SCRIPT_URL` con esa URL. Para desarrollo local, agrégala a un archivo `.env.local` (que no se sube al repositorio).

Al recibir la primera confirmación, se creará automáticamente la pestaña `Confirmaciones` con sus encabezados.

## Enlace de YouTube Music

Cuando crees la playlist colaborativa, pega su enlace de invitación en `youtubeMusicPlaylistUrl` dentro de `src/data/wedding.ts`. Hasta entonces, la web muestra que estará disponible próximamente.
