import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubmenuItem } from './model/submenu-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css'
})
export class SubmenuComponent {

  @Input() submenuItems: SubmenuItem[] = [];

}
