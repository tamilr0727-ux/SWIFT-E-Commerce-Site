let slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

// AUTO SLIDE
setInterval(() => {
    nextSlide();
}, 6000);

// INITIAL LOAD
showSlide(current);

function goToCategory(category) {
    window.location.href = "shop.html?category=" + category;
}

// LOAD CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price, img) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    let cartKey = "cart_" + user.email;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // CHECK IF ITEM ALREADY EXISTS
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            img: img,
            quantity: 1
        });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert(name + " added to bag 🛍️");
}
// TOGGLE CART
function toggleCart() {
    let menu = document.getElementById("cartMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
        displayCart();
    }
}

// DISPLAY CART ITEMS
function displayCart() {
    let cartItemsDiv = document.getElementById("cartItems");
    let total = 0;

    cartItemsDiv.innerHTML = "";

    cart.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerText = item.name + " - ₹" + item.price;
        cartItemsDiv.appendChild(div);

        total += item.price;
    });

    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}

function handleAccountClick() {
    let user = localStorage.getItem("loggedInUser");

    console.log("DEBUG user:", user); // check in console

    if (user && user !== "null" && user !== "undefined") {
        window.location.href = "profile.html";
    } else {
        window.location.href = "login.html";
    }
}

// GET LOGGED USER
let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

// SHOW USERNAME
window.onload = function() {
    if (currentUser) {
        document.getElementById("usernameDisplay").innerText = currentUser.name;
    }
};

// TOGGLE DROPDOWN
function toggleDropdown() {
    let menu = document.getElementById("dropdownMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out!");
    window.location.href = "login.html";
}

function goToLogin() {
    let email = document.getElementById("footerEmail").value;

    if (email) {
        alert("You Will Receive Mail From Us!!!");
    }else{
        alert("Please Enter Your Email.")
    }
}