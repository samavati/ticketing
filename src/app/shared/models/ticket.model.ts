import { Comment } from './comment.model';

export class Ticket {
    constructor(
        public ID: number,
        public issuer: string,
        public owner: string,
        public subject: string,
        public content: string,
        public metadata: string,
        public importanceLevel: string,
        public status: string,
        public comments: Comment[] | undefined,
        public createdAt: string,
        public modifiedAt: string,
    ) { }
}
