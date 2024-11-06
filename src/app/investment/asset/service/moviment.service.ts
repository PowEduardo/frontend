import { Injectable } from '@angular/core';
import { InvestmentMovementHttp } from '../model/http/movement-http';
import { Crud } from './crud.service';

@Injectable({
  providedIn: 'root'
})

export abstract class MovementService<T extends InvestmentMovementHttp> extends Crud<T>{
  baseUrl: string = "http://localhost:8080/assets/";
  assetId: number = 0;
}
