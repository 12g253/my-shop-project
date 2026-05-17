// Инициализируем корзину. Пытаемся сразу загрузить данные из LocalStorage при старте страницы.
// Если данных в браузере ещё нет, присваиваем пустой массив.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = document.querySelectorAll(".product");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

// Функция для сохранения текущего состояния корзины в LocalStorage
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const applyFilter = (e) => {
    products.forEach(p => {
        p.style.display = (e.target.value === "all" || p.dataset.category === e.target.value) ? "block" : "none";
    });
};

const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => total += item.price);
    return total;
};

const updateCart = () => {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<li>${item.name} - ${item.price} руб. <button onclick="removeItem(${index})">Удалить</button></li>`;
    });
    cartTotal.textContent = calculateTotal();
};

window.removeItem = (index) => {
    cart.splice(index, 1);
    saveCart();   // ОБЯЗАТЕЛЬНО: Сохраняем изменения в LocalStorage после удаления товара
    updateCart();
};

const addToCart = (e) => {
    const product = e.target.closest(".product");
    cart.push({
        name: product.dataset.name,
        price: Number(product.dataset.price)
    });
    saveCart();       // ОБЯЗАТЕЛЬНО: Сохраняем изменения в LocalStorage после добавления товара
    updateCart();
};

const processPayment = () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        saveCart();   // ОБЯЗАТЕЛЬНО: Очищаем LocalStorage после успешной оплаты
        updateCart();
    }
};

const clearCart = () => {
    cart = [];
    saveCart();       // ОБЯЗАТЕЛЬНО: Очищаем LocalStorage после ручной очистки корзины
    updateCart();
};

// Функция инициализации приложения при открытии/перезагрузке страницы
const init = () => {
    // Вызываем отрисовку корзины. Так как при объявлении переменной cart мы уже 
    // проверили LocalStorage, функция render (updateCart) сразу покажет сохраненные товары.
    updateCart(); 
};

document.querySelector("#category-filter").addEventListener("change", applyFilter);
document.querySelectorAll(".add-to-cart-btn").forEach(btn => btn.addEventListener("click", addToCart));
document.querySelector("#pay-btn").addEventListener("click", processPayment);
document.querySelector("#clear-cart-btn").addEventListener("click", clearCart);
let cr = [];
// Запускаем инициализацию при старте страницы
init();