import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  closeOutline, 
  eye, 
  eyeOff, 
  funnelOutline, 
  homeOutline, 
  locationOutline, 
  personCircleOutline, 
  qrCodeOutline, 
  scanOutline, 
  settingsOutline,
  videocamOutline 
} from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class IonicIconsService {

  constructor() {
    addIcons({
      'eye': eye,
      'eye-off': eyeOff,
      'home-outline': homeOutline,
      'qr-code-outline': qrCodeOutline,
      'person-circle-outline': personCircleOutline,
      'videocam-outline': videocamOutline,
      'settings-outline': settingsOutline,
      'scan-outline': scanOutline,
      'funnel-outline': funnelOutline,
      'close-outline': closeOutline,
      'arrow-back-outline': arrowBackOutline,
      'location-outline': locationOutline
    })
  }
}
