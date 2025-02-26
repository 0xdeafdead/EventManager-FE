import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const port = Number(process.env.PORT);
  return defineConfig({
    base: "/",
    plugins: [react()],
    define: {
      __API__: JSON.stringify(process.env.APP_ENV),
    },
    preview: {
      port: port ?? 3005,
      strictPort: true,
    },
    server: {
      host: "0.0.0.0",
      port: port ?? 3005,
      strictPort: true,
      cors: {
        origin:
          /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
      },
    },
  });
};
