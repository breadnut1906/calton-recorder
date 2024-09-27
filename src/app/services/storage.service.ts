import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(key: any, value: any, remember: boolean = false) {
    remember ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value);
  }

  getToken(key: any): any {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  }

  removeToken(key: any) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
