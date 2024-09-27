import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean> ( false );
  apiUrl: string = environment.apiEndpoint;

  constructor(private http: HttpClient, private storageService: StorageService) { 
    this.checkToken();
  }

  checkToken() {
    const accessToken = this.storageService.getToken('token');
    const refreshToken = this.storageService.getToken('refreshToken');
    if (accessToken && refreshToken) this.isAuthenticated.next(true);
  }

  onLogin(body: any) {
    const { remember, ...data } = body
    return this.http.post(`${this.apiUrl}/auth/login`, data).pipe(
      map((response: any) => {
        if (response) {        
          this.storageService.setToken('token', response.accessToken, remember);
          this.storageService.setToken('refreshToken', response.refreshToken, remember);
          this.storageService.setToken('remember', remember, remember);
          this.isAuthenticated.next(true);
        }
        return response
      })
    )
  }

  onLogOut() {
    this.storageService.removeToken('token');
    this.storageService.removeToken('refreshToken');
    this.storageService.removeToken('remember');
    this.storageService.removeToken('user');
    this.isAuthenticated.next(false);
  }

  refreshToken() {
    const refreshToken = this.storageService.getToken('refreshToken');
    if (!refreshToken) return of(false);
    
    const remember = JSON.parse(this.storageService.getToken('remember'));
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${refreshToken}` });    

    return this.http.post(`${this.apiUrl}/auth/refresh`, {}, { headers }).pipe(
      tap((response: any) => {
        this.storageService.setToken('token', response.accessToken, remember);
        this.storageService.setToken('refreshToken', response.refreshToken, remember);
      }),
      catchError(() => of(false))
    )
  }
}
