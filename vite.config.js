// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // 깃허브 저장소 이름으로 설정
  plugins: [react()],
});
