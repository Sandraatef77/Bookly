import { books } from './modules/data.js';
import { createCards } from './modules/render.js';
import { Cart } from './modules/Cart.js';
import { updateCartCount } from './main.js';
import { showToast } from './modules/toast.js';
let productList = document.querySelector('.products-list');
productList.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
        let cart = new Cart();
        cart.add(+e.target.dataset.id);
        updateCartCount();
        showToast('Added to cart');
    }
});
let search = document.querySelector('#search');

search.addEventListener('input', function () {
    renderFilters();
});
let radio = document.querySelectorAll('.radio');
radio.forEach(function (item) {
    item.addEventListener('change', function () {
        renderFilters();
    });
});

let selectBox = document.querySelector('#select-box');
renderFilters();
selectBox.addEventListener('change', renderFilters);
function renderFilters() {
    let searchValue = search.value.trim().toLowerCase();
    let radioType = document.querySelector('input[name="type"]:checked');
    let radioValue = radioType.value;
    let checked = [...document.querySelectorAll('.filter-categories input:checked')].map((input) => input.value);

    let filteredAll = books.filter((book) => {
        return (
            (book.title.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue)) &&
            (radioValue === 'all' || book.type === radioValue) &&
            (checked.length === 0 || checked.includes(book.category))
        );
    });

    let selectBoxValue = selectBox.value;
    switch (selectBoxValue) {
        case 'price-low-to-high':
            filteredAll.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-to-low':
            filteredAll.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredAll.sort((a, b) => b.rating - a.rating);
            break;
        case 'a-to-z':
            filteredAll.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    let resultsCount = document.querySelector('.results-count');
    resultsCount.textContent = `Showing ${filteredAll.length}  of ${books.length} books`;
    if (filteredAll.length === 0) {
        resultsCount.textContent = `No matching books `;
    }

    productList.innerHTML = filteredAll.length >= 1 ? createCards(filteredAll) : 'No matching books';
}
renderFilters();
let reset = document.querySelector('.reset');
reset.addEventListener('click', function () {
    search.value = '';
    selectBox.value = 'default';
    document.querySelector('#all').checked = true;
    document.querySelector('.filter-categories').forEach((input) => {
        input.checked = false;
    });
    renderFilters();
});
const all = books.map(function (book) {
    return book.category;
});
let uniqe = new Set(all);

const categories = [...uniqe];

let filterCategories = document.querySelector('.filter-categories');
filterCategories.innerHTML = categories
    .map(
        (category) => ` <div class='flex-row gap'>
    <input type='checkbox' id='${category}' value='${category}'>
    <label for='${category}'>${category}</label>
</div>   `,
    )
    .join('');
filterCategories.addEventListener('change', renderFilters);
