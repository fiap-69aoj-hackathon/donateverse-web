export class Address {
    constructor(
        public zipCode: string,
        public street: string,
        public number: string,
        public district: string,
        public city: string,
        public state: string,
        public additionalInfo: string
    ) { }
}