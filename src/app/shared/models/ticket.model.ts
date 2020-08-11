import * as moment from 'jalali-moment';

export class Ticket {
    constructor(
        public ID: string,
        public issuer: string,
        public owner: string,
        public subject: string,
        public content: string,
        public metadata: string,
        public importanceLevel: string,
        public status: string,
        public comments: string,
        public createdAt: string,
        public modifiedAt: string,
    ) { }

    jalaaliCreatedAt() {
        return moment(this.createdAt, 'YYYY-MM-DDTHH:mm:ssZ').locale('fa').format('YYYY/MM/DD HH:mm:ss')
    }

    persianImportanceLevel() {
        switch (this.importanceLevel) {
            case 'LOW':
                return 'کم';
            case 'MEDIUM':
                return 'متوسط';
            case 'HIGH':
                return 'بالا';
            case 'CRITICAL':
                return 'خیلی مهم';

            default:
                return '';
        }
    }
}