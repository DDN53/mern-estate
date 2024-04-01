import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        //backend ekee port number eka
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
