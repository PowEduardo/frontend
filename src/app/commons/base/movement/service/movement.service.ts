import { CrudService } from '../../../service/crud.service';
import { MovementHttp } from '../model/http/movement-http';

export abstract class MovementService<T extends MovementHttp> extends CrudService<T>{
  parentId!: number;
}
