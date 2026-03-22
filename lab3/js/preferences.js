const savedTheme = CookieManager.get('theme') || 'light';
document.body.className = savedTheme;

document.getElementById('username').value = CookieManager.get('username') || '';
document.getElementById('theme').value = savedTheme;
document.getElementById('language').value = StorageManager.getLocal('language') || 'ro';
document.getElementById('fontSize').value = StorageManager.getLocal('fontSize') || '16';

// Preview tema în timp real 
document.getElementById('theme').addEventListener('change', function() {
    document.body.className = this.value;
});

// Salvare preferinte
function savePreferences() {
    const username = document.getElementById('username').value.trim();
    const theme = document.getElementById('theme').value;
    const language = document.getElementById('language').value;
    const fontSize = document.getElementById('fontSize').value;

    const alertError = document.getElementById('alertError');
    const alertSuccess = document.getElementById('alertSuccess');

    if (!username) {
        alertError.textContent = '⚠ Introduceți un nume de utilizator.';
        alertError.style.display = 'block';
        setTimeout(function() { alertError.style.display = 'none'; }, 3000);
        return;
    }

    // Salvare în cookies
    CookieManager.set('username', username, 365);
    CookieManager.set('theme', theme, 365);

    // Salvare în localStorage
    StorageManager.setLocal('language', language);
    StorageManager.setLocal('fontSize', fontSize);

    // Aplicare tema imediat
    document.body.className = theme;

    // Mesaj succes + redirect
    alertSuccess.style.display = 'block';
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);
}