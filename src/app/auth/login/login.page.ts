import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { IonItem, IonInput } from "@ionic/angular/standalone";
import { IonicIconsService } from 'src/app/services/ionic-icons.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonicUiModule ]
})
export class LoginPage implements OnInit {

  showPass: boolean = false;
  authForm: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
    remember: new FormControl(false, { nonNullable: true })
  })

  constructor(private icons: IonicIconsService) { }

  ngOnInit() {
  }

  onClickLogin() {
    console.log(this.authForm.value);
  }

  get username() {
    return this.authForm.get('username')
  }
}
