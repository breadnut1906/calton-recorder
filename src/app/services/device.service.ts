import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  apiEndpoint = environment.apiEndpoint;
  headers!: HttpHeaders;

  constructor(private http: HttpClient, private storageService: StorageService, private cacheService: CacheService) { }

  getAllDevices(page: number = 1, limit: number = 10, filters: any = '') {
    const token = `Bearer ${this.storageService.getToken('token')}`;   
    const headers = new HttpHeaders({ 'Authorization': token });   
    this.cacheService.clear();
    return this.http.get(`${this.apiEndpoint}/device?page=${page}&limit=${limit}${filters}`, { headers });
  }

  getDeviceById(id: any) {
    const token = `Bearer ${this.storageService.getToken('token')}`;   
    const headers = new HttpHeaders({ 'Authorization': token });   
    this.cacheService.clear();
    return this.http.get(`${this.apiEndpoint}/device/${id}`, { headers });
  }

  getDeviceLastUpdated(id: any): Observable<any> {
    const token = `Bearer ${this.storageService.getToken('token')}`;   
    const headers = new HttpHeaders({ 'Authorization': token });   
    this.cacheService.clear();
    return this.http.get(`${this.apiEndpoint}/device/latest-person/${id}`, { headers });
  }

  getDeviceLiveView(id: any, page: number = 1, limit: number = 10) {
    const token = `Bearer ${this.storageService.getToken('token')}`;   
    const headers = new HttpHeaders({ 'Authorization': token });   
    this.cacheService.clear();
    return this.http.get(`${this.apiEndpoint}/device/captures/${id}?page=${page}&limit=${limit}&sortBy=createdAt&sort=desc`, { headers });
  }

  registerNewDevice(device_serial_no: string, body: any) {
    const token = `Bearer ${this.storageService.getToken('token')}`;   
    const headers = new HttpHeaders({ 'Authorization': token });   
    return this.http.patch(`${this.apiEndpoint}/device/${device_serial_no}`, body, { headers });
  }

  removeDevice(id: number) {
    const token = `Bearer ${this.storageService.getToken('token')}`;   
    const headers = new HttpHeaders({ 'Authorization': token });  
    return this.http.delete(`${this.apiEndpoint}/device/${id}`, { headers });
  }
}
