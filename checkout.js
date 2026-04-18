document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Payment Successful 🎉");

    // CLEAR CART AFTER PAYMENT
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let cartKey = "cart_" + user.email;

    localStorage.removeItem(cartKey);

    // REDIRECT TO HOME
    window.location.href = "index.html";
});

// SWITCH PAYMENT SECTIONS
function togglePayment() {
    let method = document.getElementById("paymentMethod").value;

    // Hide all
    document.getElementById("cardSection").style.display = "none";
    document.getElementById("upiSection").style.display = "none";
    document.getElementById("codSection").style.display = "none";

    // Remove required
    document.getElementById("cardNumber").required = false;
    document.getElementById("expiry").required = false;
    document.getElementById("cvv").required = false;
    document.getElementById("upiId").required = false;

    // Show selected + set required
    if (method === "card") {
        document.getElementById("cardSection").style.display = "block";

        document.getElementById("cardNumber").required = true;
        document.getElementById("expiry").required = true;
        document.getElementById("cvv").required = true;

    } else if (method === "upi") {
        document.getElementById("upiSection").style.display = "block";

        document.getElementById("upiId").required = true;

    } else {
        document.getElementById("codSection").style.display = "block";
    }
}

// PAYMENT SUBMIT
document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let method = document.getElementById("paymentMethod").value;

    if (method === "card") {
        if (!cardNumber.value || !expiry.value || !cvv.value) {
            alert("Please fill card details");
            return;
        }
    }

    if (method === "upi") {
        if (!upiId.value) {
            alert("Please enter UPI ID");
            return;
        }
    }

    alert("Payment successful using " + method.toUpperCase() + " 🎉");

    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let cartKey = "cart_" + user.email;

    localStorage.removeItem(cartKey);

    window.location.href = "index.html";
});

window.onload = togglePayment;