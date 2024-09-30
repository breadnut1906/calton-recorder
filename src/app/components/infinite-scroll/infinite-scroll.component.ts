import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicUiModule } from 'src/app/modules/ionic-ui/ionic-ui.module';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  imports: [ IonicUiModule ],
  standalone: true
})
export class InfiniteScrollComponent  implements OnInit {

  @Input() emptyResult: boolean = false;
  @Output() loadMore = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onTriggerLoadMore(event: any) {
    if (!this.emptyResult) this.loadMore.emit();
    event.target.complete();
  }
}
