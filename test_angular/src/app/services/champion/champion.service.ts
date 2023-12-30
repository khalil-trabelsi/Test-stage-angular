import { Injectable } from '@angular/core';
import { Champion } from '../../models/champion.model';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  private baseUrl = "api/champions"  
  constructor(private http:HttpClient) {

   }

    getAllChampions(): Observable<Array<Champion>> {
    return this.http.get<Champion[]>(this.baseUrl)
   }

   deleteChampion(id: any) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
  }

  save(champion: Champion) {
    return this.http.post(this.baseUrl, champion);
  }
  update(champion: Champion) {
    console.log(champion)
    return this.http.put(`${this.baseUrl}/${champion.id}`, champion);
  }
}

