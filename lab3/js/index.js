// Aplicare tema 
const theme = CookieManager.get('theme') || 'light';
document.body.className = theme;
document.getElementById('themeLabel').textContent = theme === 'dark' ? 'Întunecat' : 'Luminos';

// Bun venit + vizite 
const username = CookieManager.get('username') || 'Vizitator';
let visits = parseInt(CookieManager.get('visits') || '0') + 1;
CookieManager.set('visits', visits, 365);

document.getElementById('welcomeMsg').textContent = 'Salut, ' + username + '!';
document.getElementById('welcomeTitle').textContent = 'Bun venit, ' + username + '!';
document.getElementById('visitCount').textContent = visits;

// Randare tabele 
function renderCookies() {
    const body = document.getElementById('cookiesBody');
    const all = CookieManager.getAll();
    const keys = Object.keys(all);
    if (keys.length === 0) {
        body.innerHTML = '<tr class="empty-row"><td colspan="3">Niciun cookie.</td></tr>';
        return;
    }
    body.innerHTML = keys.map(function(k) {
        return '<tr>' +
            '<td><strong>' + k + '</strong></td>' +
            '<td>' + all[k] + '</td>' +
            '<td><button class="btn btn-danger" onclick="deleteCookie(\'' + k + '\')">Șterge</button></td>' +
            '</tr>';
    }).join('');
}

function renderLocal() {
    const body = document.getElementById('localBody');
    const all = StorageManager.getAllLocal();
    const keys = Object.keys(all);
    if (keys.length === 0) {
        body.innerHTML = '<tr class="empty-row"><td colspan="2">localStorage este gol.</td></tr>';
        return;
    }
    body.innerHTML = keys.map(function(k) {
        return '<tr>' +
            '<td><strong>' + k + '</strong></td>' +
            '<td>' + JSON.stringify(all[k]) + '</td>' +
            '</tr>';
    }).join('');
}

function renderSession() {
    const body = document.getElementById('sessionBody');
    const all = StorageManager.getAllSession();
    const keys = Object.keys(all);
    if (keys.length === 0) {
        body.innerHTML = '<tr class="empty-row"><td colspan="2">sessionStorage este gol.</td></tr>';
        return;
    }
    body.innerHTML = keys.map(function(k) {
        return '<tr>' +
            '<td><strong>' + k + '</strong></td>' +
            '<td>' + JSON.stringify(all[k]) + '</td>' +
            '</tr>';
    }).join('');
}

function deleteCookie(name) {
    CookieManager.delete(name);
    renderCookies();
}

function deleteAll() {
    CookieManager.deleteAll();
    StorageManager.clearLocal();
    StorageManager.clearSession();
    renderCookies();
    renderLocal();
    renderSession();
    document.getElementById('welcomeMsg').textContent = 'Salut, Vizitator!';
    document.getElementById('visitCount').textContent = '0';
}

// Initializare
renderCookies();
renderLocal();
renderSession();