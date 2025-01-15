import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class SolValidationService {
  private apiUrl = 'http://localhost:9442/api/branches/sol/validate';

  constructor(private http: HttpClient) {}

  validateSol(solId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${solId}`).pipe(
          catchError(() => of(false))
      );
  }
}