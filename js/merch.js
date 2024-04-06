const merchMain = document.querySelector('#merch-main');
if (merchMain) {
    for (const merch of merchandise) {
        if (merchId == merch.id) {
            merchMain.innerHTML += merch.renderMerchMain();
        }
    }
}

let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

const addCart = document.querySelector('.add-cart');

if (addCart) {
    addCart.addEventListener('click', () => {
        const newId = document.querySelector('[name="merch-id"]').value,
        newQty = document.querySelector('[name="merch-qty"]').value,
        newItem = {"merch-id": newId, "merch-qty": newQty};

        cart = cart.map(item => {
            if (item["merch-id"] === newId) {
                return {...item, ...newItem};
            } else {
                return item;
            }
        });

        if (!cart.some(item => item["merch-id"] === newId)) {
            cart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    });
}

let wishlist = JSON.parse(localStorage.getItem("wishlist")) ? JSON.parse(localStorage.getItem("wishlist")) : [];

const addWishlist = document.querySelector('.add-wishlist');

if (addWishlist) {
    const newId = document.querySelector('[name="merch-id"]').value;

    addWishlist.addEventListener('click', () => {
        if (!wishlist.some(item => item["merch-id"] === newId)) {
            wishlist.push({"merch-id": newId});
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        location.reload();
    });

    if (wishlist.some(item => item["merch-id"] === merchId)) {
        addWishlist.innerHTML = '<span class="material-symbols-outlined material-symbols-outlined-filled">favorite</span>REMOVE FROM WISHLIST';
        addWishlist.classList.remove('add-wishlist');
        addWishlist.classList.add('remove-wishlist');
        addWishlist.addEventListener('click', () => {
            if (wishlist.some(item => item["merch-id"] === newId)) {
                wishlist = wishlist.filter(item => item["merch-id"] !== newId);
            }
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            addWishlist.innerHTML = '<span class="material-symbols-outlined">favorite</span>ADD TO WISHLIST';
            addWishlist.classList.remove('remove-wishlist');
            addWishlist.classList.add('add-wishlist');
        });
    }
}