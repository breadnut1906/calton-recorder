import { Component, OnInit } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';

@Component({
  selector: 'app-skeleton-loading',
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss'],
  imports: [ IonicUiModule ],
  standalone: true
})
export class SkeletonLoadingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
