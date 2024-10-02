import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { DeviceService } from 'src/app/services/device.service';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { DeviceStatusPipe } from 'src/app/pipes/device-status.pipe';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
  imports: [ IonicUiModule, DeviceStatusPipe ],
  standalone: true
})
export class DeviceDetailsComponent  implements OnInit, OnDestroy, AfterViewInit {

  @Input() device: any | undefined;
  
  baseMapUrl: string = environment.openStreetMapUrl;
  
  map!: L.Map;
  mapIcon = new L.Icon({
    iconUrl: "assets/leaflet/marker-icon.png",
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [26, 34], //w , h
    shadowSize: [45, 45]
  });
  mapOptions: any = {
    zoom: 10,
    zoomControl: false,
    center: { lat: 14.5702674, lng: 121.04475112328305 }
  };

  deviceInfo: FormGroup = new FormGroup({
    id: new FormControl(null),
    serialNo: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    status: new FormControl(0, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    long: new FormControl(null, [Validators.required]),
    lat: new FormControl(null, [Validators.required]),
    registeredDate: new FormControl(null),
    isCameraCaptureEnable: new FormControl(false),
    type: new FormControl(null)
  });

  constructor(private deviceService: DeviceService, private modalController: ModalController,) { }

  ngOnInit() {
    this.deviceInfo.patchValue(this.device);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.onInitializedMap(), 500);   
  }

  ngOnDestroy(): void {
    this.map.remove()
  }

  onInitializedMap() {
    const { long, lat, name } = this.device;  

    this.map = L.map('map', { zoomControl: false }).setView([lat, long], 15);
    L.tileLayer(this.baseMapUrl, { 
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' ,
      maxZoom: 19,
    }).addTo(this.map);
    L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

    // Add a marker
    const marker = L.marker([lat, long], { icon: this.mapIcon }).addTo(this.map);
  }

  onClickCancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  onClickConfirm() {
    this.modalController.dismiss(null, 'confirm')
  }
}
