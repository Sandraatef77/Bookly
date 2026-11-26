import { Cart } from './modules/Cart.js';
let cartCount = document.querySelector('.cart-count');

export function updateCartCount() {
    let cart = new Cart();
    cartCount.textContent = cart.totalItems();
}
updateCartCount();
// document.documentElement.setAttribute('data-theme', 'dark');
// document.documentElement.setAttribute('data-theme', 'light');
// let theme = document.querySelector('#theme-switch');
// theme.addEventListener('change', function () {
//     if (data - theme === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'light');
//     } else {
//         document.documentElement.setAttribute('data-theme', 'dark');
//     }
// });
const label = document.createElement('label');
label.className = 'switch-wrapper flex-row gap';
label.innerHTML = ` <span class="switch-text">Dark Mode</span>
<span class="switch">
 <input type="checkbox" class="switch-input"/>
 <span class="slider"></span>
 </span>`;
document.querySelector('.nav').append(label);
let input = label.querySelector('.switch-input');
const saved = localStorage.getItem('theme') || 'light';
input.checked = saved === 'dark';
document.documentElement.dataset.theme = saved;
input.addEventListener('change', function () {
    let theme = input.checked ? (document.documentElement.dataset.theme = 'dark') : (document.documentElement.dataset.theme = 'light');
    localStorage.setItem('theme', theme);
});
