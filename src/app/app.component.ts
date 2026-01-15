import { Component } from '@angular/core';
import { ToastContainerComponent } from './commons/page/toast-container/toast-container.component';
import { WelcomeComponent } from "./welcome/welcome.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WelcomeComponent, ToastContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
