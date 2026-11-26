import { books } from './modules/data.js';
import { createCards } from './modules/render.js';
import { Cart } from './modules/Cart.js';
import { updateCartCount } from './main.js';
import { showToast } from './modules/toast.js';
let featuredList = document.querySelector('.featured-list');
let featuredBooks = createCards(books.slice(0, 4));
featuredList.innerHTML = featuredBooks;

featuredList.addEventListener('click', function (e) {
    const cart = new Cart();
    if (e.target.classList.contains('add-to-cart')) {
        cart.add(+e.target.dataset.id);
        updateCartCount();
        showToast('Added to cart');
    }
});

let now = Date.now();

let threeDays = 3 * 60 * 60 * 24 * 1000;

let end;

const saved = localStorage.getItem('offer-end');
if (!saved) {
    end = now + threeDays;
    localStorage.setItem('offer-end', end);
} else {
    end = Number(saved);
}
let timer = document.querySelector('.timer');
function countDown() {
    let timeLeft = end - Date.now();
    let day = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let days = String(day).padStart(2, '0');
    let hour = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let hours = String(hour).padStart(2, '0');
    let minute = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let minutes = String(minute).padStart(2, '0');
    let second = Math.floor((timeLeft % (1000 * 60)) / 1000);
    let seconds = String(second).padStart(2, '0');
    timer.textContent = `time left: ${days} : ${hours} : ${minutes} : ${seconds}`;
    if (timeLeft <= 0) {
        clearInterval(interval);
        timer.textContent = 'timer has ended';
        return;
    }
}
countDown();
let interval = setInterval(countDown, 1000);


