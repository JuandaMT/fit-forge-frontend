import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Diet } from '../models/diet.model';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/diets`;

  getDiets(): Observable<Diet[]> {
    return this.http.get<Diet[]>(this.apiUrl);
  }

  getDietById(id: string | number): Observable<Diet> {
    return this.http.get<Diet>(`${this.apiUrl}/${id}`);
  }
}
