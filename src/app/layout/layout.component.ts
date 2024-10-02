import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicIconsService } from '../services/ionic-icons.service';
import { IonicUiModule } from '../modules/ionic-ui/ionic-ui.module';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [ IonRouterOutlet, IonicUiModule ]
})
export class LayoutComponent  implements OnInit {

  isOnBoard: boolean = false;
  tabs: any[] = [
    { text: 'Home', icon: 'home-outline', path: 'dashboard' },
    { text: 'Devices', icon: 'videocam-outline', path: 'devices' },
    { text: 'Profile', icon: 'person-circle-outline', path: 'user' },
    { text: 'Settings', icon: 'settings-outline', path: 'settings' },
  ]

  constructor(private icon: IonicIconsService, private storage: StorageService) { }

  ngOnInit() {
    this.isOnBoard = JSON.parse(this.storage.getToken('onboarding'));
  }

}
