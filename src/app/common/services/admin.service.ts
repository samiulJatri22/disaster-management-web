import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class AdminService {
  baseUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  get(option: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = option;
    return this.http.get(
      `${this.baseUrl}?page=${page}&limit=${limit}&search=${search || ''}`
    );
  }

  getById(id: string) {
    return this.http.get(`${this.baseUrl}/find-one?id=${id}`);
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
