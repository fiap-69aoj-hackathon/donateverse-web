import { Address } from "./address.model"

export class DonationCenter {
    constructor(
        public address: Address,
        public userId: number,
        public name: string,
        public isActive: boolean,
        public description: string,
        public dateCreation: string,
        public _id?: number,
    ) { }
}