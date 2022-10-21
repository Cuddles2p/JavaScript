"use strict"

function Item(product, image, description, price, discount = 0) {
    this.product = product;
    this.image = `img/${image}.png`;
    this.description = description;
    this.price = price;
    this.discount = discount;
}

let catalogList =[]

catalogList.push(new Item('i3-10100', 'img1', 'Процессор Intel Core i3-10100 OEM имеет 4 ядра.', 8399, 25));
catalogList.push(new Item('R9 Gamer Series', 'img2', '8-гигабайтная оперативная память AMD Radeon R9 Gamer Series', 2050, 10));
catalogList.push(new Item('GeForce RTX 3060 X', 'img3', 'Видеокарта KFA2 GeForce RTX 3060 X BLACK создана для установки в геймерские ПК. ', 34999, 15));
catalogList.push(new Item('Cougar DarkBlader-S', 'img4', 'Черный полноформатный корпус Cougar DarkBlader-S с оранжевыми декоративными вставками.', 15799, 5));
catalogList.push(new Item('GIGABYTE B550 AORUS ELITE V2', 'img5', 'Материнская плата GIGABYTE B550 AORUS ELITE V2 подходит для создания производительного системного блока. ', 11999, 0));
catalogList.push(new Item('GAMDIAS CHIONE P2-360R', 'img6', 'Система охлаждения GAMDIAS CHIONE', 9699, 0));

// создаем отображение каталога
function drowItems() {
    catalogList.forEach(function (item, i) {
        drowItem(item, i);
    })
}

const $catalog = document.querySelector('#catalog');
function drowItem(item, id) {
    $catalog.insertAdjacentHTML('beforeend',
    `<div id="item-${id}" class="prod_item">
        <div class="item">
            <div class="image"><img src="${item.image}"></div>
            <div class="description"><h4>${item.product}</h4>${item.description}
                <div class="price">Цена: 
                    <span>${item.price}</span> руб.
                </div>
            </div>
        </div>
        <div class="sale">
            <span class='offer ${item.discount > 0 ? 'show' : ''}'>Скидка: ${item.discount}%</span>
            <div data-id="${id}" class="button">В корзину</div>
        </div>
    </div>`);
}
drowItems(catalogList);


// ----------- создаем объект корзины -----------
let shoppingCart = [];

let emptyBasket = 'Ваша корзина пуста.';

function basketItem(product, price, discount=0) {
    this.product = product;
    this.price = price;
    this.discount = discount;
    this.finalPrice = function() {
        if (this.discount != 0) {
            return this.price - this.price*this.discount/100;
        } else {
            return this.price;
        }
    }
}

// получаем итоговую сумму
function totalSumm(shoppingCart) {
    return shoppingCart.reduce(function (acc, price) {
        return acc + price.finalPrice();
    }, 0);
}

// создаем отображение корзины
function drowTotal (shoppingCart) {
    const $basket = document.querySelector('#basket');
    $basket.textContent = '';

    if (shoppingCart == 0) {
        $basket.insertAdjacentHTML('beforeend', `<div class="total">${emptyBasket}</div>`);
    } else {
        $basket.insertAdjacentHTML('beforeend', 
        `<div class="total">
            <p>В корзине: ${shoppingCart.length} 
            товар на сумму ${totalSumm(shoppingCart)} рублей.</p>
            <a class="buy" href="#">Купить</a>
        </div>`);
    }
}
drowTotal(shoppingCart);

// событие - добавление объекта в корзину
$catalog.addEventListener('click', function (e) {
    if (e.target.className ==='button' ) {
        const id = Number(e.target.getAttribute('data-id'));
        const choice = catalogList[id];
        shoppingCart.push(new basketItem(choice.product, choice.price, choice.discount));

        drowTotal(shoppingCart);
    } 
});
 
// работаем с #popup
const $popup = document.querySelector('#popup');

$popup.addEventListener('click', function(e) {
    $popup.style.display = 'none';
});

 $catalog.addEventListener('click', function(e) {
    if( e.target.tagName === 'IMG' ) {
        $popup.textContent = '';
        $popup.style.display = 'flex';
        $popup.insertAdjacentHTML('beforeend',
            `<img src="${e.target.getAttribute('src')}" class="scale">`);
    }
});