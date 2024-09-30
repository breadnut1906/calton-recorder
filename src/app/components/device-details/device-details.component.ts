import { Component, Input, OnInit } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { DeviceService } from 'src/app/services/device.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
  imports: [ IonicUiModule ],
  standalone: true
})
export class DeviceDetailsComponent  implements OnInit {

  @Input() device: any | undefined;

  constructor(private deviceService: DeviceService, private modalController: ModalController,) { }

  ngOnInit() {
    console.log(this.device);
    
  }

  onClickCancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  onClickConfirm() {
    this.modalController.dismiss(null, 'confirm')
  }
}
