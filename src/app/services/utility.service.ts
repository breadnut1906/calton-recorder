import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor() { }

  convertDateTime(value: any, timezone: string = 'Asia/Manila', format: string = 'yyyy/MM/DD') {
    return moment(value).tz(timezone).format(format);
  }
}
