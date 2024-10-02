import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';
import { AuthService } from 'src/app/services/auth.service';
import { IonicIconsService } from 'src/app/services/ionic-icons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [ IonicUiModule, RouterModule ]
})
export class DashboardPage implements OnInit {

  constructor(private auth: AuthService, private icon: IonicIconsService) { }

  ngOnInit() {
  }

  onLogOut() {
    this.auth.onLogOut();
  }

}
