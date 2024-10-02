import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [ IonicUiModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OnboardingPage implements OnInit {

  slides = [
    {
      title: 'Welcome to Our App!',
      description: 'This is a simple onboarding process.',
    },
    {
      title: 'Discover Features',
      description: 'Explore the amazing features we offer.',
    },
    {
      title: 'Get Started',
      description: 'Let’s get started with your journey!',
    },
  ];

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() { }

  onClickStartApp() {
    const remember = JSON.parse(this.storage.getToken('remember'));
    this.storage.setToken('onboarding', true, remember);
    this.router.navigateByUrl('/dashboard')
  }

}
