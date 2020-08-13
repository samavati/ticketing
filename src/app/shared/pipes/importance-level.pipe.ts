import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importanceLevel'
})
export class ImportanceLevelPipe implements PipeTransform {

  transform(value: string, args?: any): unknown {
    switch (value) {
      case 'LOW':
        return 'کم';
      case 'MEDIUM':
        return 'متوسط';
      case 'HIGH':
        return 'بالا';
      case 'CRITICAL':
        return 'خیلی مهم';
      default:
        return 'خطا';
    }
  }

}
