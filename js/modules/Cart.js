export class Cart {
    #items = new Map();
    constructor() {
        this.load();
    }
    add(id) {
        this.#items.has(id) ? this.#items.set(id, this.#items.get(id) + 1) : this.#items.set(id, 1);
        this.save();
    }

    howMany(id) {
        return this.#items.get(id) || 0;
    }
    remove(id) {
        this.#items.delete(id);
        this.save();
    }

    setQuantity(id, quantity) {
        quantity < 1 ? this.remove(id) : this.#items.set(id, quantity);
        this.save();
    }
    totalItems() {
        return [...this.#items.values()].reduce((sum, qty) => sum + qty, 0);
    }
    save() {
        const arr = [...this.#items.entries()];
        let text = JSON.stringify(arr);
        localStorage.setItem('cart', text);
    }
    load() {
        const saved = localStorage.getItem('cart');
        if (saved === null) {
            return;
        }
        this.#items = new Map(JSON.parse(saved));
    }
    total(books) {
        return [...this.#items.entries()].reduce((total, [id, quantity]) => {
            const book = books.find(function (item) {
                return item.id === id;
            });
            return total + book.price * quantity;
        }, 0);
    }
    getItems() {
        return [...this.#items.entries()];
    }
    clear() {
        this.#items.clear();
        this.save();
    }
}
