// ============================
// SWITCH FORMS
// ============================
function showLogin() {
    document.getElementById("loginForm").classList.add("active");
    document.getElementById("signupForm").classList.remove("active");
}

function showSignup() {
    document.getElementById("signupForm").classList.add("active");
    document.getElementById("loginForm").classList.remove("active");
}

// ============================
// LOAD USERS
// ============================
let users = JSON.parse(localStorage.getItem("users")) || [];

// ============================
// SIGNUP
// ============================
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert("Account already exists!");
        showLogin();
        return;
    }

    let newUser = { name, email, password };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please login.");
    showLogin();
    
    // Clear signup form
    document.getElementById("signupForm").reset();
});

// ============================
// LOGIN (IMPORTANT PART)
// ============================
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store only necessary user data (excluding password for security)
        let loggedInUser = {
            name: user.name,
            email: user.email
        };
        
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        console.log("Saved user:", loggedInUser); // DEBUG
        console.log("localStorage loggedInUser:", localStorage.getItem("loggedInUser")); // Verify

        alert("Login successful!");
        
        // OPTION 1: Go to profile page directly
        window.location.href = "profile.html";
        
        // OPTION 2: Go to home page (but account icon should still work)
        // window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
});

// ============================
// TOGGLE PASSWORD VISIBILITY
// ============================
function togglePassword() {
    let passwordInput = document.getElementById("loginPassword");
    let eyeIcon = document.querySelector(".password-box i");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// ============================
// CHECK FOR TEMP EMAIL FROM FOOTER
// ============================
window.onload = function() {
    let tempEmail = localStorage.getItem("tempEmail");
    if (tempEmail) {
        document.getElementById("loginEmail").value = tempEmail;
        localStorage.removeItem("tempEmail");
    }
}