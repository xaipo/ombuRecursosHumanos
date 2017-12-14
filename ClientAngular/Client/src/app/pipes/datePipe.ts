/**
 * Created by VICTOR OQUENDO on 12/13/2017.
 */
/*import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class DatePipe implements PipeTransform {
  transform(date: any, args?: any): any {
    let d = new Date(date);
    return moment(d).format('yy-mm-dd');

  }
}*/
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }
}
