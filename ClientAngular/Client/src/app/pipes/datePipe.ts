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
import * as moment from 'moment';
//import {DateFormatter} from '@angular/common/src/facade/intl';


@Pipe({
  name: 'dateFormatPipe',
})
/*export class dateFormatPipe implements PipeTransform {
  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }
}*/

export class dateFormatPipe implements PipeTransform {
  transform(date: any, args?: any): any {
    let d = new Date(date);
    return moment(d).format('DD/MM/YYYY');

  }
}

/*export class dateFormatPipe implements PipeTransform {
  transform(value:any):any {
    if (value) {
      var date = value instanceof Date ? value : new Date(value);
      return DateFormatter.format(date, 'pt', 'dd/MM/yyyy');
    }
  }
}*/
