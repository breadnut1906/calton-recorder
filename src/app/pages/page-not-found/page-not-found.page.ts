import { Component, OnInit } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
  standalone: true,
  imports: [ IonicUiModule ]
})
export class PageNotFoundPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
