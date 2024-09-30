import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { closeOutline, eye, eyeOff, funnelOutline, homeOutline, personCircleOutline, qrCodeOutline, scanOutline, settingsOutline, videocamOutline } from 'ionicons/icons';

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
      'close-outline': closeOutline
    })
  }
}
