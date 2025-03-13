import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Ensure React support
    tailwindcss(), // Enable Tailwind CSS
  ],
  esbuild: {
    loader: "jsx", // Ensure JSX is recognized
    include: /src\/.*\.[jt]sx?$/, // Apply to JS and JSX files inside /src
  },
});
