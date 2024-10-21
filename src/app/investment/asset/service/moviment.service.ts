import { Injectable } from '@angular/core';
import { MovementHttp } from '../model/http/movement-http';
import { Crud } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export abstract class MovementService<T extends MovementHttp> extends Crud<T>{
  baseUrl: string = "http://localhost:8080/assets/";
  assetId: number = 0;
}
