export class Comment {
    constructor(
        public ticketID: number,
        public owner: string,
        public content: string,
        public metadata: string,
        public createdAt: string,
        public modifiedAt: string
    ) { }
}
