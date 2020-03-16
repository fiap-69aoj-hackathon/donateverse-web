export class User {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public birthday: string,
        public age?: number,
        public password?: string,
        public id?: number
        ) {
    }
}