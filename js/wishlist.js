class Wishlist {
    constructor(id, image, name, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
    }
}

function renderWishlist(item) {
    return `
        <article id="merch-${item.id}">
            <a href="merch.html?merch-id=${item.id}">
                <img src="${item.image}" alt="merch-${item.id}">
                <h3>${item.name}</h3>
            </a>
            <div>
                <span class="price">${item.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</span>
            </div>
        </article>
    `;
}

const wishlistMain = document.querySelector('#wishlist-main').querySelector('div');

let wishlist = JSON.parse(localStorage.getItem("wishlist"));

const wishlistItems = [];

if (wishlist) {
    for (const wishItem of wishlist) {
        for (const merch of merchandise) {
            if (merch.id == wishItem["merch-id"]) {
                wishlistItems.push(new Wishlist(merch.id, merch.image, merch.name, merch.price));
            }
        }
    }
    
    if (wishlistMain) {
        for (const wishlistItem of wishlistItems) {
            wishlistMain.innerHTML += renderWishlist(wishlistItem);
        }
    }
}