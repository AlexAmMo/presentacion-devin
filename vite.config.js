import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Cada build genera un único HTML autocontenido (código, CSS, fuentes e imágenes
// incrustados) que funciona con doble clic, desde file:// y sin conexión.
// - npm run build:design → dist-design/design/design-system.html
// - La presentación (index.html) se añade en el esqueleto, con su propio build.
export default defineConfig(({ mode }) => ({
  plugins: [viteSingleFile()],
  build: {
    outDir: mode === 'design' ? 'dist-design' : 'dist',
    rollupOptions: {
      input: mode === 'design' ? 'design/design-system.html' : 'index.html',
    },
  },
}));
