import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'recharts',
        'papaparse',
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'recharts': 'Recharts',
          'papaparse': 'Papa',
        }
      }
    }
  },
  // base: "/goose/",

});
