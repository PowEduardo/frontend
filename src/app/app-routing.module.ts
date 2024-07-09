import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  providers: [{
    provide: RouteReuseStrategy, useValue: {
      shouldReuseRoute: (...args: unknown[]) => {
        console.log("return false", args);
        return false;
      }
    }
  }],
  exports: [RouterModule]
})
export class AppRoutingModule { }