import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppServerModule } from './app/app.server.module';
import { platformServer, renderModule } from '@angular/platform-server';

if (environment.production) {
  enableProdMode();
}

export default AppServerModule;