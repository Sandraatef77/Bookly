
export class Product {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.price = data.price;
        this.type = data.type;
        this.cover = data.cover;
        this.stock = data.stock;
        this.category = data.category;
        this.rating = data.rating;
    }
    formattedPrice() {
        return `$${this.price.toFixed(2)}`;
    }
    isAvailable() {
        return this.stock >= 1 ? true : false;
    }
    StockText() {
        return this.stock;
    }
}
