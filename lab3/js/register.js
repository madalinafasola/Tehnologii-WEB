document.body.className = CookieManager.get('theme') || 'light';

function showError(msg) {
    var el = document.getElementById('alertError');
    el.textContent = msg;
    el.style.display = 'block';
    document.getElementById('alertSuccess').style.display = 'none';
}

function doRegister() {
    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var alertSuccess = document.getElementById('alertSuccess');

    document.getElementById('alertError').style.display = 'none';

    // Validari
    if (!username || !email || !password || !confirmPassword) {
        showError('⚠ Toate câmpurile sunt obligatorii.');
        return;
    }
    if (username.length < 3) {
        showError('⚠ Username-ul trebuie să aibă minim 3 caractere.');
        return;
    }
    // Validare email simpla
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        showError('⚠ Adresa de email nu este validă.');
        return;
    }
    if (password.length < 6) {
        showError('⚠ Parola trebuie să aibă minim 6 caractere.');
        return;
    }
    if (password !== confirmPassword) {
        showError('⚠ Parolele nu coincid.');
        return;
    }

    // Verificare unicitate
    var users = StorageManager.getLocal('users') || [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            showError('⚠ Username-ul este deja folosit.');
            return;
        }
        if (users[i].email === email) {
            showError('⚠ Adresa de email este deja folosită.');
            return;
        }
    }

    // Adaugare utilizator nou
    var newUser = {
        id: users.length + 1,
        username: username,
        password: password,
        email: email
    };
    users.push(newUser);
    StorageManager.setLocal('users', users);

    alertSuccess.textContent = '✔ Cont creat cu succes! Redirecționare către login...';
    alertSuccess.style.display = 'block';

    setTimeout(function() {
        window.location.href = 'login.html';
    }, 1500);
}