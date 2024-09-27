import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class IonicIconsService {

  constructor() {
    addIcons({
      'eye': eye,
      'eye-off': eyeOff
    })
  }
}
