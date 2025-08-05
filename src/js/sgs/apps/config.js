
import { InvalidImportError, ImproperlyConfigured } from "../core/exceptions";

class AppConfig {
  constructor(app_name) {
    this.app_name = app_name;

    if (this.app_name === undefined) {
      throw new ImproperlyConfigured(
        `Class ${this.constructor.name} is missing <app_name> attribute in constructor`,
      );
    }

    if (!("label" in Object.keys(this))) {
      this.label = this.app_name;
    }
  }

  static async create(entry) {  // Made this async
    try {
      // Using dynamic import instead of require
      const app_module = await import(
        /* webpackMode: "eager", webpackChunkName: "app_[request]" */
        `../../${entry}/apps`);

      if (!app_module?.default) {
        throw new InvalidImportError(`Module ${entry}/apps has no default export`);
      }

      if (!(app_module.default.prototype instanceof this)) {
        throw new ImproperlyConfigured(`${entry} is not an instance of AppConfig`);
      }

      return new app_module.default();
    } catch (error) {
      console.error(error);
      throw new InvalidImportError(error.message);
    }
  }

  ready() {
    // Override this method in subclasses to run code when SGS famework starts.
  }
}

export { AppConfig };
