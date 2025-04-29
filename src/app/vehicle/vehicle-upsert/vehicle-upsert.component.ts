import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-upsert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.css'
})
export class VehicleUpsertComponent {
  activeModal: any;
  submit() {
    throw new Error('Method not implemented.');
  }
  model: any;

}
