import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class VolunteerService {
  baseUrl: string = `${environment.apiUrl}/volunteers`;

  constructor(private http: HttpClient) {}

  get(option: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = option;
    return this.http.get(
      `${this.baseUrl}?page=${page}&limit=${limit}&search=${search || ''}`
    );
  }

  latest() {
    return this.http.get(this.baseUrl + '/latest');
  }

  create(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }

  update(payload: any) {
    return this.http.put(this.baseUrl, payload);
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }
}
