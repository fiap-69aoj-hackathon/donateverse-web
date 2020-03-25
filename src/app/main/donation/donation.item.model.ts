export class DonationItem {
    constructor(
        public id: number,
        public userId: number,
        public userName: string,
        public userLocation: string,
        public date: string,
        public status: number,
        public itens?: string
    ) {}
}