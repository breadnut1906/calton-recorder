import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
  imports: [ IonicUiModule ],
  standalone: true
})
export class RefresherComponent  implements OnInit {

  @Output() refreshed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onRefresh(event: any) {
    this.refreshed.emit();
    event.target.complete()
  }

}
