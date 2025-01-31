import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class DonationService {
  baseUrl: string = `${environment.apiUrl}/donations`;

  constructor(private http: HttpClient) {}

  get(option: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = option;
    return this.http.get(
      `${this.baseUrl}?page=${page}&limit=${limit}&search=${search || ''}`
    );
  }

  create(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }

  selfDonation(payload: any) {
    return this.http.post(`${this.baseUrl}/self`, payload);
  }

  update(payload: any) {
    return this.http.put(this.baseUrl, payload);
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }
}
