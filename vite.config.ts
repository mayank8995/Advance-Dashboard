import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import EnvironmentPlugin from 'vite-plugin-environment';
// https://vite.dev/config/
export default defineConfig({
  // plugins: [react(), tailwindcss(), EnvironmentPlugin('all')], //use this during test - need to find workaround
  plugins: [react(), tailwindcss()],
});
