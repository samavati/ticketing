import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    const MomentDate = moment(value, 'YYYY-MM-DDTHH:mm:ssZ');
    return MomentDate.locale('fa').format('YYYY/MM/DD HH:mm:ss');
  }
}
