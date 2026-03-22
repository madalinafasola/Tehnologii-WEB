document.body.className = CookieManager.get('theme') || 'light';

// Verificare autentificare
var session = StorageManager.getSession('session');
if (!session) {
    window.location.href = 'login.html';
}

// Afisare informatii sesiune
document.getElementById('dashTitle').textContent = 'Bun venit, ' + session.username + '!';
document.getElementById('sessionIdLabel').textContent = session.sessionId;
document.getElementById('infoUsername').textContent = session.username;
document.getElementById('infoEmail').textContent = session.email;

var loginTime = new Date(session.loginTime);
document.getElementById('infoLogin').textContent = loginTime.toLocaleTimeString('ro-RO');

// Date brute sessionStorage
document.getElementById('rawSession').textContent = JSON.stringify(StorageManager.getAllSession(), null, 2);

// Durata sesiunii - actualizata in timp real
function updateDuration() {
    var now = new Date();
    var diff = Math.floor((now - loginTime) / 1000);
    var ore = Math.floor(diff / 3600);
    var minute = Math.floor((diff % 3600) / 60);
    var secunde = diff % 60;
    document.getElementById('infoDuration').textContent =
        (ore > 0 ? ore + 'h ' : '') +
        (minute > 0 ? minute + 'm ' : '') +
        secunde + 's';
}
updateDuration();
setInterval(updateDuration, 1000);

function doLogout() {
    StorageManager.clearSession();
    window.location.href = 'login.html';
}

function openNewTab() {
    window.open('dashboard.html', '_blank');
}