import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Export a bootstrap function compatible with CommonEngineRenderOptions.bootstrap
// which has the shape: (context: BootstrapContext) => Promise<ApplicationRef>
// This allows the @angular/ssr CommonEngine to create the platform and pass
// the required BootstrapContext so `bootstrapApplication` finds the server
// platform (avoiding NG0401).
export default function bootstrap(context: BootstrapContext) {
	// Pass the merged server ApplicationConfig and the BootstrapContext to the
	// platform bootstrap. `config` already contains server-specific providers
	// (e.g., provideServerRendering()).
	return bootstrapApplication(AppComponent, config, context);
}
