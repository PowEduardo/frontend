import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicTableComponent } from './component/dynamic-table/dynamic-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, DynamicTableComponent, CommonModule],
  templateUrl: './pages/home/home.component.html',
  styleUrl: './pages/home/home.component.css'
})
export class AppComponent {
  title = 'frontend';
}
