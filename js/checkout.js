import { Cart } from './modules/Cart.js';
import { showToast } from './modules/toast.js';
import { books } from './modules/data.js';
import { updateCartCount } from './main.js';
let nameInput = document.querySelector('#name');
let tel = document.querySelector('#tel');
let email = document.querySelector('#email');
let address = document.querySelector('#address');
let city = document.querySelector('#city');
let errorTel = document.querySelector('.error-tel');
let errorName = document.querySelector('.error-name');
let errorEmail = document.querySelector('.error-email');
let errorAddress = document.querySelector('.error-address');

function nameValidate() {
    let regixName = /^[a-zا-ي\s]{3,40}$/i;
    if (regixName.test(nameInput.value.trim())) {
        errorName.textContent = '';
        nameInput.style.borderColor = 'transparent';
        return true;
    } else {
        errorName.textContent = 'please enter a validate name';
        nameInput.style.borderColor = 'var(--danger)';
        return false;
    }
}
nameInput.addEventListener('blur', nameValidate);
function emailValidate() {
    let regixEmail = /^[a-z0-9_.-]{3,}@[a-z0-9-]{3,}(\.[a-z]{2,})+$/i;
    if (regixEmail.test(email.value.trim())) {
        errorEmail.textContent = '';
        email.style.borderColor = 'transparent';
        return true;
    } else {
        errorEmail.textContent = 'please enter a validate email';
        email.style.borderColor = 'var(--danger)';
        return false;
    }
}
email.addEventListener('blur', emailValidate);
function telValidate() {
    let regixTel = /^01[0125][0-9]{8}$/;
    if (regixTel.test(tel.value.trim())) {
        errorTel.textContent = '';
        tel.style.borderColor = 'transparent';
        return true;
    } else {
        errorTel.textContent = 'please enter a validate telphone';
        tel.style.borderColor = 'var(--danger)';
        return false;
    }
}
tel.addEventListener('blur', telValidate);
function addressValidate() {
    let regixAddress = /^[a-z\s0-9ا-ي]+$/i;

    if (regixAddress.test(address.value.trim())) {
        errorAddress.textContent = '';
        address.style.borderColor = 'transparent';
        return true;
    } else {
        errorAddress.textContent = 'please enter a validate address';
        address.style.borderColor = 'var(--danger)';

        return false;
    }
}
address.addEventListener('blur', addressValidate);
let form = document.querySelector('.form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameOk = nameValidate();
    const emailOk = emailValidate();
    const telOk = telValidate();
    const addressOk = addressValidate();
    let isValid = nameOk && emailOk && telOk && addressOk;
    if (isValid) {
        let cart = new Cart();
        if (cart.totalItems() === 0) {
            showToast('Your cart is empty');
            return;
        }
        let checkoutLayout = document.querySelector('.checkout-layout');
        checkoutLayout.classList.add('hidden');
        let summaryInfo = document.querySelector('.summary-info');
        summaryInfo.classList.remove('hidden');
        let orderNumber = document.querySelector('.order-number');
        let oldNum = Number(localStorage.getItem('last-order'));
        let newNum = oldNum + 1;
        localStorage.setItem('last-order', newNum);
        orderNumber.textContent = newNum;

        let now = new Date().toLocaleDateString('en-GB');
        let orderDate = document.querySelector('.order-date');
        orderDate.textContent = now;

        cart.clear();
        sessionStorage.removeItem('draft');
        updateCartCount();
    }
});

form.addEventListener('input', function () {
    const draft = {
        nameInput: nameInput.value,
        email: email.value,
        tel: tel.value,
        address: address.value,
        city: city.value,
    };
    sessionStorage.setItem('draft', JSON.stringify(draft));
});
let saved = sessionStorage.getItem('draft');
if (saved !== null) {
    const draft = JSON.parse(saved);
    nameInput.value = draft.nameInput;
    email.value = draft.email;
    tel.value = draft.tel;
    address.value = draft.address;
    city.value = draft.city;
}
let totalBooks = document.querySelector('.total-books');
let cart = new Cart();
totalBooks.textContent = cart.totalItems();
let totalPrice = document.querySelector('.price');
const subTotal = cart.total(books);

const delivery = subTotal >= 500 ? 0 : 40;
totalPrice.textContent = (subTotal + delivery).toFixed(2);
