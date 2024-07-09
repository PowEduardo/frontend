export abstract class Crud<T, Y> {

  abstract toHttp(model: T): Y;
  abstract toModel(request: Y): T;

}