import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor';
import { Observable } from 'rxjs';
import { VendorObj } from '../model/vendorObj';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private baseUrl: string = 'http://localhost:9442/api/vendors';

  constructor(private http: HttpClient) {}

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseUrl);
  }

  insertVendor(vendorObj: VendorObj): Observable<any> {
    return this.http.post<Vendor>(`${this.baseUrl}`, vendorObj);
  }
  
}
