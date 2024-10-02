import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { IonicIconsService } from 'src/app/services/ionic-icons.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonicUiModule ]
})
export class LoginPage implements OnInit {

  errorMsg: any;
  alertButtons = ['Close'];
  isAlert: boolean = false;
  showPass: boolean = false;
  authForm: FormGroup = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ]),
    remember: new FormControl(false, { nonNullable: true })
  })

  constructor(
    private icons: IonicIconsService, 
    private authService: AuthService, 
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() { }

  onClickLogin() {
    const onBoard = JSON.parse(this.storage.getToken('onboarding'));    
    this.authService.onLogin(this.authForm.value).subscribe({ next: () => {
      if (!onBoard) {
        this.router.navigateByUrl('/onboarding');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    }, error: (err: any) => {
      console.log(err);
      this.errorMsg = `${err.toString()}, URL: ${window.location.href}`;
      this.isAlert = true;
    }})
  }

  get username() {
    return this.authForm.get('username')
  }
}
