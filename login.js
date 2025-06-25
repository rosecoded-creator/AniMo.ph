function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    icon.classList.toggle("bx-show");
    icon.classList.toggle("bx-low-vision");
}

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const fullName = document.getElementById("full-name").value;
    const rsbsaId = document.getElementById("rsbsa-id").value;
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("rsbsaId", rsbsaId);
    localStorage.setItem("password", password); 

    alert("Registered successfully!");

});

document.getElementById("login-button").addEventListener("click", function () {
    const rsbsaInput = document.getElementById('login-rsbsa-id');
    const passwordInput = document.getElementById('login-password');
    const rsbsaValue = rsbsaInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    
    let error = document.getElementById('login-error');
    if (error) error.remove();

    
    if (!/^\d{12}$/.test(rsbsaValue)) {
        showPopupError('RSBSA ID must be exactly 12 digits.');
        return;
    }
    if (!passwordValue) {
        showPopupError('Password is required.');
        return;
    }

    const enteredId = document.getElementById("login-rsbsa-id").value;
    const enteredPassword = document.getElementById("login-password").value;

    const storedId = localStorage.getItem("rsbsaId");
    const storedPassword = localStorage.getItem("password");

    if (enteredId === storedId && enteredPassword === storedPassword) {
        
        const fullName = localStorage.getItem("fullName");
        const rsbsaId = localStorage.getItem("rsbsaId");
    
        localStorage.setItem("loggedInName", fullName);
        localStorage.setItem("loggedInRSBSA", rsbsaId);
    
        alert("Login successful!");
        window.location.href = "./agriActivity.html";
    }
     else {

        alert("Invalid RSBSA ID or Password.");
    }
});

function showError(msg) {
    const error = document.createElement('div');
    error.id = 'login-error';
    error.style.color = 'red';
    error.style.marginTop = '10px';
    error.textContent = msg;
    document.getElementById('login-form').appendChild(error);
}

function showPopupError(msg) {
  
    let existing = document.getElementById('popup-error');
    if (existing) existing.remove();

   
    const overlay = document.createElement('div');
    overlay.id = 'popup-error';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.4)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;

  
    const box = document.createElement('div');
    box.style.background = '#fff';
    box.style.padding = '24px 32px';
    box.style.borderRadius = '10px';
    box.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
    box.style.textAlign = 'center';

    
    const message = document.createElement('div');
    message.textContent = msg;
    message.style.color = 'red';
    message.style.marginBottom = '16px';
    message.style.fontWeight = 'bold';

   
    const btn = document.createElement('button');
    btn.textContent = 'OK';
    btn.style.padding = '6px 18px';
    btn.style.background = '#388e3c';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '5px';
    btn.style.cursor = 'pointer';
    btn.onclick = () => overlay.remove();

    box.appendChild(message);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}