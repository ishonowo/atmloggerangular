import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Region } from '../model/region';
//import { Region } from '../model/region';

@Injectable({
    providedIn: 'root'
})
export class RegionService {
    private baseUrl: string = 'http://localhost:9442/api/regions';
    private val: string ='validate';
    
    constructor(private http: HttpClient) {}
    
    validateRegion(num: number): Observable<{regionFound: boolean} | null> {
        return this.http.get<boolean>(`${this.baseUrl}/${this.val}/${num}`).pipe(
            map(isValid => isValid ? { regionFound: true } : null),
            catchError(() => {
                console.error('Error validating region');
                return [null];
            })

        );
    }

    getAllRegions(): Observable<Region[]> {
        return this.http.get<Region[]>(this.baseUrl);
    }

    insertRegion(regionName: string): Observable<any> {
        return this.http.post(this.baseUrl, regionName);
    }
  

}