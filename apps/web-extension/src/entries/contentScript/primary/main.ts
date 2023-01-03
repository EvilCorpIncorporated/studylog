import renderContent from '../renderContent';
import Primary from './App.vue';

void renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot: HTMLElement) => {
  createApp(Primary).mount(appRoot);
});
