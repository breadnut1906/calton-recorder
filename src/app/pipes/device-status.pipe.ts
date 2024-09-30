import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'deviceStatus',
  standalone: true
})
export class DeviceStatusPipe implements PipeTransform {

  transform(lastUpdate: Date): string {
    const now = moment();
    const diff = now.diff(lastUpdate, 'minutes');
    return Math.abs(diff) > 10 ? 'Offline' : 'Online';
  }

}
