class Cart {
    constructor(id, image, name, price, stock, qty) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.qty = qty;
    }
}

function removeCartItem(cartItemId) {
    let curCart = JSON.parse(localStorage.getItem("cart"));
    curCart = curCart.filter(cartItem => cartItem["merch-id"] != cartItemId);
    localStorage.setItem("cart", JSON.stringify(curCart));
    location.reload();
}

function updateCartItem(cartItemId, value) {
    let curCart = JSON.parse(localStorage.getItem("cart"));
    curCart = curCart.map(cartItem => {
        if (cartItem["merch-id"] == cartItemId) {
            return {...cartItem, "merch-qty": value};
        }
        return cartItem;
    });
    localStorage.setItem("cart", JSON.stringify(curCart));
    rerender();
    renderPrice();
    // location.reload();
}


function renderPrice() {
    const subtotal = document.querySelectorAll('.price-subtotal'),
    total = document.querySelector('.price-total');

    let sum = 0;
    
    let curCartItems = JSON.parse(sessionStorage.getItem("cartItems"));

    for (let i = 0; i < subtotal.length; i++) {
        subtotal[i].textContent = (curCartItems[i].price * curCartItems[i].qty).toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
        let numFormat = subtotal[i].textContent.replace(/[^\d]/g, '') / 100;
        sum += parseFloat(numFormat);
    }
    total.textContent = sum.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'});
}

function renderCart(cartItem) {
    return `
    <section id="${cartItem.id}">
        <a href="merch.html?merch-id=${cartItem.id}">
            <img src="${cartItem.image}" alt="merch-${cartItem.id}">
        </a>
        <div class="quantity">
            <h3><a href="merch.html?merch-id=${cartItem.id}">${cartItem.name}</a></h3>
            <div>
                <label for="merch-qty">Quantity</label>
                <input type="number" name="merch-qty" min="1" max="${cartItem.stock}" value="${cartItem.qty}" onchange="updateCartItem(${cartItem.id}, this.value)">
            </div>
        </div>
        <div class="subtotal">
            <h3>Subtotal</h3>
            <span class="price-subtotal">${cartItem.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</span>
            <button type="button" class="cart-remove" onclick="removeCartItem(${cartItem.id})">
                <span class="material-symbols-outlined">remove_shopping_cart</span>
                Remove from cart
            </button>
        </div>
    </section>
    `;
}

function rerender() {
    let currentCart = JSON.parse(localStorage.getItem("cart")),
    currentMerchandise = JSON.parse(localStorage.getItem("merchandise"));
    const cartItems = [];

    if (currentCart) {
        for (item of currentCart) {
            for (merch of currentMerchandise) {
                if (item["merch-id"] == merch.id) {
                    cartItems.push(new Cart(item["merch-id"], merch.image, merch.name, merch.price, merch.stock, item["merch-qty"]));
                }
            }
        }
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    let currentCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    const cartArticle = document.querySelector('.cart');
    if (currentCartItems) {
        if (cartArticle) {
            cartArticle.innerHTML = '';
            for (const item of currentCartItems) {
                cartArticle.innerHTML += renderCart(item);
            }
        }
    }
    renderPrice();
}

rerender();