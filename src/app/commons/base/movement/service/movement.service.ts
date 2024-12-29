import { CrudService } from '../../../service/crud.service';
import { MovementModelInterface } from '../model/movement-model-interface';

export abstract class MovementService<T extends MovementModelInterface> extends CrudService<T>{
  parentId!: number;
}
