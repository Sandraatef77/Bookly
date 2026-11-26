import { books } from './modules/data.js';
import { Cart } from './modules/Cart.js';
import { updateCartCount } from './main.js';
import { showToast } from './modules/toast.js';
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const book = books.find((book) => {
    return book.id === Number(id);
});
let main = document.querySelector('.main');
if (!book) {
    main.innerHTML = 'book not found';
} else {
    let detailsCover = document.querySelector('.details-cover');
    detailsCover.className = `details-cover book-cover book-cover--${book.cover} flex-column flex-center `;
    let detailsCoverH3 = document.querySelector('.details-cover h3');
    detailsCoverH3.textContent = book.title;
    let detailsCoverP = document.querySelector('.details-cover p');
    detailsCoverP.textContent = book.author;
    let detailsTitle = document.querySelector('.details-title');
    detailsTitle.textContent = book.title;
    let detailsAuthor = document.querySelector('.details-author');
    detailsAuthor.textContent = book.author;
    let detailsRating = document.querySelector('.details-rating');
    detailsRating.textContent = `Rating: ${book.rating}`;
    let detailsType = document.querySelector('.details-type');
    detailsType.textContent = book.type;
    detailsType.className = `details-type badge badge--${book.type}`;
    let detailsPriceValue = document.querySelector('.details-price-value');
    detailsPriceValue.textContent = book.formattedPrice();
    let detailsStock = document.querySelector('.details-stock');
    detailsStock.textContent = `Stock: ${book.StockText()}`;
    let detailsBtn = document.querySelector('.details-btn');
    detailsBtn.textContent = book.isAvailable() ? 'add to cart' : 'out of stock';
    detailsBtn.disabled = book.isAvailable() ? false : true;
    detailsBtn.addEventListener('click', function () {
        let cart = new Cart();
        cart.add(book.id);
        updateCartCount();
        showToast('Added to cart');
    });
}
