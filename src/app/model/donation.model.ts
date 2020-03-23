import { Product } from "./product.model";

export class Donation {
    constructor(
        public idUser: number,
        public products: Product[],
        public status: number,
        public id?: number
    ) {}
}