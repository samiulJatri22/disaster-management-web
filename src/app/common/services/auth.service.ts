import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtUtilsService } from './jwt.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private jwtService: JwtUtilsService) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    if (this.checkAuthentication()) {
      return of(new Error('User is already logged in.'));
    }

    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signOut(): Observable<any> {
    localStorage.removeItem('accessToken');

    return of(true);
  }

  //   profile(): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/profile`);
  //   }

  imageUpload(fileData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/image-upload`, fileData);
  }

  checkAuthentication(): boolean {
    return !!this.jwtService.accessToken;
  }
}
