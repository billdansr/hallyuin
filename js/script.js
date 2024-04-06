const login = document.querySelector('#login');
if (login) {
    login.addEventListener('click', () => {
        localStorage.setItem("username", document.querySelector('[name="username"]').value);
    });
}

let un = document.querySelector('#username');
un.innerText = localStorage.getItem("username");

const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', () => {
        localStorage.setItem("username", "Guest");
    });
}

class Merch {
    constructor(id, image, name, price, category, stock) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock
    }

    // index.html
    renderSlide() {
        return `
        <article class="merch" id="merch-${this.id}">
            <a href="merch.html?merch-id=${this.id}" class="merch-image">
                <img src="${this.image}" alt="merch-${this.id}">
            </a>
            <div class="merch-information">
                <h3 class="merch-name"><a href="#">${this.name}</a></h3>
                <div class="merch-price">${this.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</div>
            </div>
        </article>
        `;
    }

    // merch.html
    renderMerchMain() {
        return `
        <form id="merch-${this.id}" action="cart.html" method="get">
            <div>
                <img src="${this.image}" alt="merch-${this.id}">
            </div>
            <div class="merch-info">
                <input type="text" name="merch-id" id="merch-id" value="${this.id}" hidden>
                <h3>${this.name}</h3>
                <div>
                    <span class="price">${this.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</span>
                </div>
                <div>
                    <label for="merch-qty">Quantity</label> <input type="number" name="merch-qty" id="merch-qty" min="1" max="${this.stock}" value="1">
                </div>
                <div>
                    <span>Category</span> <a href="#" class="category-badge">${this.category}</a>
                </div>
                <div class="merch-add">
                    <div>
                        <button type="button" class="add-wishlist">
                            <span class="material-symbols-outlined">favorite</span>
                            ADD TO WISHLIST
                        </button>
                    </div>
                    <div>
                        <button type="submit" class="add-cart">
                            <span class="material-symbols-outlined">add_shopping_cart</span>
                            ADD TO CART
                        </button>
                    <div>
                </div>
            </div>
        </form>
        `;
    }
}

let merchandise = [];
merchandise.push(new Merch(1, "https://kpopmerch.com/cdn/shop/products/bts-album-day-bts-young-forever-in-the-mood-for-love-special-album-32503434805429_1000x.jpg?v=1646658554", "K-Pop Merch 1", 100000, "BTS", 10));
merchandise.push(new Merch(2, "https://kpopmerch.com/cdn/shop/products/bts-md-goods-bts-bts-gq-korea-bts-special-edition-jan-issue-32502357983413_1000x.jpg?v=1646660165", "K-Pop Merch 2", 100000, "BTS", 10));
merchandise.push(new Merch(3, "https://kpopmerch.com/cdn/shop/products/black-pink-album-black-pink-how-you-like-that-special-edition-32488699822261_1000x.jpg?v=1646660708", "K-Pop Merch 3", 100000, "BLACKPINK", 10));
merchandise.push(new Merch(4, "https://kpopmerch.com/cdn/shop/products/black-pink-album-blackpink-jennie-solo-photobook-32488772599989_1000x.jpg?v=1646660538", "K-Pop Merch 4", 100000, "BLACKPINK", 10));
merchandise.push(new Merch(5, "https://kpopmerch.com/cdn/shop/products/g-i-dle-md-goods-txt-official-light-stick-neverbong-33340299608245_1000x.jpg?v=1651121095", "K-Pop Merch 5", 100000, "TWICE", 10));
localStorage.setItem("merchandise", JSON.stringify(merchandise));

const urlParams = new URLSearchParams(window.location.search);
let merchId = urlParams.get('merch-id');
