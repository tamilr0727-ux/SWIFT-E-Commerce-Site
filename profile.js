// GET USER
let user = JSON.parse(localStorage.getItem("loggedInUser"));

// IF NOT LOGGED IN → REDIRECT
if (!user) {
    window.location.href = "login.html";
} else {
    // DISPLAY USER DATA
    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
}

// GO HOME
function goHome() {
    window.location.href = "index.html";
}

// CREATE NEW ACCOUNT
function createNew() {
    window.location.href = "login.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}