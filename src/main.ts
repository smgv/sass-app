import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./routes";

import "./style.css";

const pinia = createPinia();
pinia.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
  })
);

createApp(App).use(router).use(pinia).mount("#app");
