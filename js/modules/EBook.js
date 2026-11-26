import { Product } from './Product.js';
export class EBook extends Product {
    isAvailable() {
        return true;
    }
    StockText() {
        return 'Instant Download';
    }
}
