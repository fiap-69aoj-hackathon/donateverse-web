export class User {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public birthday: string,
        public state: string,
        public city: string,
        public password?: string,
        public age?: number,
        public id?: number
        ) {
    }
}