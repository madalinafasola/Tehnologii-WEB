// Aplicare tema
document.body.className = CookieManager.get('theme') || 'light';

// Utilizatori de test impliciti
var defaultUsers = [
    { id: 1, username: 'admin', password: 'password', email: 'admin@example.com' },
    { id: 2, username: 'student', password: 'student123', email: 'student@example.com' }
];

// Initializare utilizatori daca nu exista
if (!StorageManager.getLocal('users')) {
    StorageManager.setLocal('users', defaultUsers);
}

// Pre-completare username daca a bifat "tine-ma minte"
var savedUsername = StorageManager.getLocal('rememberedUser');
if (savedUsername) {
    document.getElementById('username').value = savedUsername;
    document.getElementById('remember').checked = true;
}

function doLogin() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;
    var remember = document.getElementById('remember').checked;
    var alertError = document.getElementById('alertError');
    var alertSuccess = document.getElementById('alertSuccess');

    alertError.style.display = 'none';
    alertSuccess.style.display = 'none';

    if (!username || !password) {
        alertError.textContent = '⚠ Completați toate câmpurile.';
        alertError.style.display = 'block';
        return;
    }

    var users = StorageManager.getLocal('users') || [];
    var user = null;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            user = users[i];
            break;
        }
    }

    if (!user) {
        alertError.textContent = '❌ Username sau parolă incorecte.';
        alertError.style.display = 'block';
        return;
    }

    // Tine-ma minte
    if (remember) {
        StorageManager.setLocal('rememberedUser', username);
    } else {
        StorageManager.removeLocal('rememberedUser');
    }

    // Creare sesiune in sessionStorage
    var session = {
        userId: user.id,
        username: user.username,
        email: user.email,
        loginTime: new Date().toISOString(),
        sessionId: 'sess_' + Math.random().toString(36).substring(2, 11)
    };
    StorageManager.setSession('session', session);

    alertSuccess.textContent = '✔ Autentificare reușită! Redirecționare...';
    alertSuccess.style.display = 'block';

    setTimeout(function() {
        window.location.href = 'dashboard.html';
    }, 1000);
}