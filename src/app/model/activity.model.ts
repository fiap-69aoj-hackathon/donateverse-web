import { Comment } from "./comment.model"

export class Activity {
    constructor(
        public id: number,
        public title: string,
        public date: string,
        public url: string,
        public countLikes: number,
        public countComments: number,
        public countJoined: number,
        public comments: Comment[]) {
    }
}