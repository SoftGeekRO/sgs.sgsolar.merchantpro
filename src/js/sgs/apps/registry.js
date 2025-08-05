
import { AppConfig } from "./config";

class Apps {
  constructor(installed_apps = []) {
    this.app_configs = {};
    this.apps_ready = this.ready = false;

    if (!("SGS" in window)) {
      window.SGS = {};
    }

    if (installed_apps != null) {
      this.populate(installed_apps).catch(error => {
        console.error('Failed to populate apps:', error);
      });
    }
  }

  async populate(installed_apps = []) {  // Made this async
    if (this.ready) {
      return;
    }

    try {
      // Phase 1: initialize app and import modules
      for (const entry of installed_apps) {
        let app_config;
        if (entry instanceof AppConfig) {
          app_config = entry;
        } else {
          app_config = await AppConfig.create(entry);  // Await here
        }
        this.app_configs[app_config.label] = app_config;
      }

      this.apps_ready = true;

      // Phase 2: run ready() methods of app configs.
      for (const app_config of this.get_app_configs()) {
        if (typeof app_config.ready === 'function') {
          await app_config.ready();  // Await if ready is async
        }
      }

      Object.assign(window.SGS, { ...this.app_configs });
      this.ready = true;
    } catch (error) {
      console.error('Population failed:', error);
      throw error;
    }
  }

  get_app_configs() {
    return Object.values(this.app_configs);
  }
}

const apps = new Apps(null);

export default apps;
