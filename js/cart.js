import { Cart } from './modules/Cart.js';
import { books } from './modules/data.js';
import { updateCartCount } from './main.js';

let cartItemWrapper = document.querySelector('.cart-item-wrapper');

function renderCart() {
    let cart = new Cart();
    let items = cart.getItems();

    cartItemWrapper.innerHTML = items
        .map(([id, quantity]) => {
            let book = books.find(function (item) {
                return id === item.id;
            });
            return `<div class="cart-item flex-row flex-center">
                        <div class="book-cover book-cover--${book.cover} flex-column flex-center">
                            <h4>${book.title}</h4>
                            <p>${book.author}</p>
                        </div>
                        <div class="cart-item-info flex-column">
                            <p class="cart-item-price">price: <span class="price-num">${book.formattedPrice()}</span></p>
                            <p class="cart-item-quantity">
                                quantity: <button class="cart-plus" data-id='${book.id}'>+</button> <span class="cart-item-qty-num">${quantity}</span>
                                <button class="cart-minus" data-id='${book.id}'>-</button>
                            </p>
                            <p class="cart-item-totalprice">total price: <span class="cart-item-totalvalue">${(book.price * quantity).toFixed(2)}</span></p>
                            <button data-id='${book.id}'class="cart-delete btn">delete</button>
                        </div>
                    </div>`;
        })
        .join('');
    let summaryTotal = document.querySelector('.summary-total');
    let summaryDelivery = document.querySelector('.summary-delivery');
    let summaryTotalPrice = document.querySelector('.summary-total-price');
    const subtotal = cart.total(books);
    const delivery = subtotal >= 500 ? 0 : 40;
    const totalPrice = subtotal + delivery;
    summaryTotal.textContent = subtotal.toFixed(2);
    summaryDelivery.textContent = delivery.toFixed(2);
    summaryTotalPrice.textContent = totalPrice.toFixed(2);
    let cartList = document.querySelector('.cart-list');
    let emptyCard = document.querySelector('.empty-card');
    if (items.length === 0) {
        cartList.classList.add('hidden');
        emptyCard.classList.remove('hidden');
    } else {
        cartList.classList.remove('hidden');
        emptyCard.classList.add('hidden');
    }
}
renderCart();

cartItemWrapper.addEventListener('click', function (e) {
    const id = +e.target.dataset.id;
    const cart = new Cart();

    if (e.target.classList.contains('cart-plus')) {
        cart.setQuantity(id, cart.howMany(id) + 1);
    }
    if (e.target.classList.contains('cart-minus')) {
        cart.setQuantity(id, cart.howMany(id) - 1);
    }

    if (e.target.classList.contains('cart-delete')) {
        cart.remove(id);
    }
    renderCart();
    updateCartCount();
});
