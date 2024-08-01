import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import config from '../formkit.config'
import { defaultConfig, plugin } from "@formkit/vue";

createApp(App)
.use(plugin, defaultConfig(config))
.use(router)
.mount("#app");
