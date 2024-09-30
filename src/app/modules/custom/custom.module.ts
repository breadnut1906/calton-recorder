import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from 'src/app/components/infinite-scroll/infinite-scroll.component';
import { RefresherComponent } from 'src/app/components/refresher/refresher.component';
import { SkeletonLoadingComponent } from 'src/app/components/skeleton-loading/skeleton-loading.component';
import { DeviceDetailsComponent } from 'src/app/components/device-details/device-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InfiniteScrollComponent,
    RefresherComponent,
    SkeletonLoadingComponent,
    DeviceDetailsComponent
  ],
  exports: [
    InfiniteScrollComponent,
    RefresherComponent,
    SkeletonLoadingComponent,
    DeviceDetailsComponent
  ]
})
export class CustomModule { }
