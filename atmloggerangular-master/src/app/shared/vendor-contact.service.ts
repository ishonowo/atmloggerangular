import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorContactObject } from '../model/vendorContactObject';
import { VendorContact } from '../model/vendorContact';
import { ContactObject } from '../model/contactObject';
import { VNameOption } from '../model/vNameOption';

@Injectable({
  providedIn: 'root',
})
export class VendorContactService {
  private baseUrl: string = 'http://localhost:9442/api/contacts';
  private names: string = 'names';

  constructor(private http: HttpClient) {}

  getAllContactswNames(): Observable<VendorContactObject[]> {
    return this.http.get<VendorContactObject[]>(
      `${this.baseUrl}/${this.names}`
    );
  }

  getAllContacts(): Observable<VendorContact[]> {
    return this.http.get<VendorContact[]>(this.baseUrl);
  }

  getVendorContactById(id: number): Observable<VendorContact> {
    return this.http.get<VendorContact>(`${this.baseUrl}/${id}`);
  }

  insertContact(contactObject: ContactObject): Observable<any> {
    return this.http.post<VendorContact>(this.baseUrl, contactObject);
  }

  updateVendorContact(contact: VendorContact): Observable<any> {
    return this.http.put<VendorContact>(this.baseUrl, contact);
  }

  async updateVendorNames(
    vendorContacts: VendorContact[],
    vendorNames: VNameOption[]
  ): Promise<VendorContact[]> {
    // Create a map for faster lookups
    const vendorNameMap = new Map<number, string>(
      vendorNames.map((vn) => [vn.id, vn.vendorName])
    );
  
    // Process each contact and wait for all to complete
    const updatedContacts = await Promise.all(
      vendorContacts.map(async (contact) => {
  
        return {
          vendorId: contact.vendorId,
          contact: contact.contact,
          status: contact.status,
          id: contact.id,
          vendorName: vendorNameMap.get(contact.vendorId) || contact.vendorName || '', // Fallback if no name found
        };
      })
    );
  
    return updatedContacts;
  }
}
