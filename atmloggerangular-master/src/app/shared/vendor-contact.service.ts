import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorContactObject } from '../model/vendorContactObject';
import { ContactObject } from '../model/contactObject';

@Injectable({
  providedIn: 'root'
})
export class VendorContactService {
  private baseUrl: string= 'http://localhost:9442/api/contacts'

  constructor(private http: HttpClient) { }

  getAllContactswNames(): Observable<VendorContactObject[]>{
    return this.http.get<VendorContactObject[]>(this.baseUrl);
  }

  insertContact(contactObject: ContactObject): Observable<any> {
    return this.http.post<any>(this.baseUrl, contactObject);    
  }

}
