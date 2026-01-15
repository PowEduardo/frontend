import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../model/page-query';
import { MovementModelInterface } from '../model/movement-model-interface';
import { MovementService } from '../service/movement.service';

/**
 * @deprecated
 * This component has been deprecated as of Phase X.5.
 * Use the standardized `<app-table>` component from commons/base/table instead.
 * 
 * Migration Example:
 * OLD: <app-movements-table [movements]="data"></app-movements-table>
 * NEW: <app-table [columns]="columns" [data]="data" [actions]="actions"></app-table>
 * 
 * The app-table component provides:
 * - Generic type support <T>
 * - Configurable columns via TableColumn[]
 * - Flexible actions via TableAction<T>[]
 * - Content projection support
 * - Better reusability across modules
 * 
 * See: investment/asset/movements/movements.component.ts for migration example
 */
@Component({
  standalone: true,
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrl: './movements-table.component.css'
})
export class MovementsTableComponent<T extends MovementModelInterface> implements OnChanges {
  @Input()
  parentId!: number;
  @Input()
  movements?: T[];
  sort = 'date';

  constructor(protected service: MovementService<T>,
    protected modal: NgbModal
  ) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    this.getMovements('-date');
  }

  async getMovements(attribute: string) {
    if (this.sort === attribute) {
      attribute = '-' + attribute;
      this.sort = attribute;
    }
    this.movements = [];
    const query: PageQuery = new PageQuery();
    if (attribute) {
      query.sort = attribute;
    }
    this.service.parentId = this.parentId;
    await this.service.readAll(query).subscribe((data: T[]) => {
      data.map(element => {
        this.movements!.push(element);
      });
    });

  }

}