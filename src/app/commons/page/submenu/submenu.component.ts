import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubmenuItem } from './model/submenu-item';


@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.css'
})
export class SubmenuComponent {

  @Input() submenuItems: SubmenuItem[] = [];

}
