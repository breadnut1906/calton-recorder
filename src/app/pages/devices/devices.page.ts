import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { from, mergeMap, tap } from 'rxjs';
import { Pagination } from 'src/app/interfaces/pagination';
import { CustomModule } from 'src/app/modules/custom/custom.module';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { DeviceStatusPipe } from 'src/app/pipes/device-status.pipe';
import { DeviceService } from 'src/app/services/device.service';
import { IonicIconsService } from 'src/app/services/ionic-icons.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [ IonicUiModule, CustomModule, DeviceStatusPipe ],
  providers: [ ModalController ]
})
export class DevicesPage implements OnInit {

  isLoading: boolean = false;
  emptyResult: boolean = false;
  devices: any[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemCount: 0,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0
  }
  
  filters: FormGroup = new FormGroup({
    search: new FormControl(''),
    type: new FormControl('People Counter', { nonNullable: true })
  })

  constructor(private icon: IonicIconsService, private deviceService: DeviceService, private utility: UtilityService) { 
    this.type?.valueChanges.subscribe({ next: (value: any) => {
      this.onLoadDevices(true);
    }})

    this.search?.valueChanges.subscribe({ next: (value: any) => {
      this.onLoadDevices(true);      
    }})
  }

  ngOnInit() { 
    this.isLoading = true;
    this.onLoadDevices()
  }

  onLoadDevices(isRefresh: boolean = false) {
    if (isRefresh) {
      this.devices = [];
      this.isLoading = true;
      this.emptyResult = false;
      this.pagination.currentPage = 1;
    }

    const filters = `&type=${this.type?.value}`; //${this.search?.value != '' ? `&search=${this.search?.value}` : ''}
    
    this.deviceService.getAllDevices(this.pagination.currentPage, this.pagination.itemsPerPage, filters).subscribe({ next: (result: any) => {
      const { items, meta } = result;      
      this.pagination = meta;
      
      if (items.length == 0) {
        this.emptyResult = true;
        this.pagination.currentPage-=1;
      } else {
        this.devices = [ ...this.devices, ...items ];
        this.pagination.currentPage+=1;
      }

      this.isLoading = false;
      this.onGetDeviceLastUpdate(this.devices)
    }})
  }

  async onGetDeviceLastUpdate(devices: any[]) {
    from(devices).pipe(
      mergeMap(item => this.deviceService.getDeviceLastUpdated(item.id).pipe(
        tap(result => {
          Object.assign(item, { 
            lastUpdate: result.latestDetectionDate ? this.utility.convertDateTime(result.latestDetectionDate, 'Asia/Manila', 'MMM DD, YYYY hh:mm:ss a') : 'No update available',
            lastUpdateDate: result.latestDetectionDate
          })
        })
      ))
    )
    .subscribe({
      error: error => {},
      complete: () => {}
    });
  }

  get type() {
    return this.filters.get('type')
  }

  get search() {
    return this.filters.get('search')
  }
}
