import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageQuery } from '../../../../investment/asset/model/page-query';
import { MovementMapper } from '../mapper/movement-mapper';
import { MovementHttp } from '../model/http/movement-http';
import { MovementModel } from '../model/movement-model';
import { MovementService } from '../service/movement.service';

@Component({
  standalone: true,
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
  styleUrl: './movements-table.component.css'
})
export class MovementsTableComponent<T extends MovementModel, Y extends MovementHttp> {
  @Input()
  parentId!: number;
  @Input()
  movements?: T[];
  sort: string = 'date';

  constructor(protected service: MovementService<Y>,
    protected mapper: MovementMapper<T, Y>,
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
    await this.service.readAll(query).subscribe((data: Y[]) => {
      data.map(element => {
        this.movements!.push(this.mapper.toModel(element));
      });
    });

  }

}