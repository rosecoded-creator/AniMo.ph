function showSidebar() {
    document.querySelector('.sidebar').classList.add('active');
}

        function hideSidebar() {
    document.querySelector('.sidebar').classList.remove('active');
}

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'flex';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'flex';
}
