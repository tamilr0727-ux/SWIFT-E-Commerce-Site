let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "login.html";
}

let cartKey = "cart_" + user.email;
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

let container = document.getElementById("cartContainer");
let summary = document.getElementById("cartSummary");

function renderCart() {

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty 🛒</h3>";
        summary.style.display = "none";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        let div = document.createElement("div");
        div.classList.add("cart-product");

        div.innerHTML = `
            <img src="${item.img}">
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>

                <div class="qty">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <button class="remove" onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        container.appendChild(div);

        total += item.price * item.quantity;
    });

    summary.innerHTML = `
    <div>
        <p>Total Items: ${cart.length}</p>
        <p>Total Price: ₹${total}</p>
    </div>

    <button class="checkout-btn" onclick="goToCheckout()">
        Shop Now
    </button>
`;
}

// CHANGE QUANTITY
function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    renderCart();
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

// INITIAL LOAD
renderCart();