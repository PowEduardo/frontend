import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovimentService {
  baseUrl: string = "http://localhost:8080/moviments";
  constructor(private httpClient: HttpClient) { }

  searchMoviments(): Observable<any> {

    return this.httpClient.get(this.baseUrl + "/moviments:search?_limit=10&_offset=0");
  }
}
