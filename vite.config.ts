import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BUILD_ENV } = loadEnv(mode, process.cwd());

  const version = `${pkg.version}`;
  const isProduction = ["production", "staging"].includes(VITE_BUILD_ENV);
  process.env.VITE_BUILD_VERSION = isProduction ? version : "";

  console.log("BUILD_ENV", VITE_BUILD_ENV);
  console.log("BUILD_VERSION", process.env.VITE_BUILD_VERSION);
  console.log("NODE_ENV", process.env.NODE_ENV);

  return {
    mode: process.env.NODE_ENV,
    server: {
      port: 4050,
    },
    build: {
      sourcemap: !isProduction,
    },
    define: {
      __SENTRY_DEBUG__: false,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },
    plugins: [
      vue(),
      viteTsconfigPaths(),
      // VueI18nPlugin({
      //   /* options */
      //   // locale messages resource pre-compile option
      //   include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/plugins/i18n/**"),
      //   runtimeOnly: true,
      // }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // buffer: resolve("./node_modules/buffer"),
        // lodash: resolve("./node_modules/lodash-es"),
      },
    },
  };
});
