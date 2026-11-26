export function createCard(book) {
    return `
        <div class="card flex-column">
            <a class="book-cover book-cover--${book.cover} flex-column flex-center" href='product.html?id=${book.id}'>
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            </a>
            <div class="card-info flex-row">
                <span class="badge badge--${book.type}">${book.type}</span>
                <span class="price">${book.formattedPrice()}</span>
            </div>
            <button class="btn flex-center add-to-cart" data-id='${book.id}' ${book.isAvailable() ? '' : 'disabled'}>${book.isAvailable() ? 'add to cart' : 'out of stock'}</button>
        </div>
    `;
}

export function createCards(allBook) {
    return allBook.map((book) => createCard(book)).join('');
}
