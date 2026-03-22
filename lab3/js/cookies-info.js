// Aplicare tema
document.body.className = CookieManager.get('theme') || 'light';

// Utilitar dimensiune 
function byteSize(str) {
    return new Blob([str]).size + ' B';
}

function renderAll() {
    // Cookies
    document.getElementById('rawCookie').textContent = document.cookie || '(gol)';
    const allCookies = CookieManager.getAll();
    const cKeys = Object.keys(allCookies);
    document.getElementById('cookieBody').innerHTML = cKeys.length === 0
        ? '<tr class="empty-row"><td colspan="4">Niciun cookie.</td></tr>'
        : cKeys.map(function(k) {
            return '<tr>' +
                '<td><strong>' + k + '</strong></td>' +
                '<td>' + allCookies[k] + '</td>' +
                '<td>' + byteSize(allCookies[k]) + '</td>' +
                '<td><button class="btn btn-danger" onclick="delCookie(\'' + k + '\')">Șterge</button></td>' +
                '</tr>';
        }).join('');

    // localStorage
    const allLocal = StorageManager.getAllLocal();
    document.getElementById('rawLocal').textContent =
        Object.keys(allLocal).length ? JSON.stringify(allLocal, null, 2) : '(gol)';
    const lKeys = Object.keys(allLocal);
    document.getElementById('localBody').innerHTML = lKeys.length === 0
        ? '<tr class="empty-row"><td colspan="4">localStorage este gol.</td></tr>'
        : lKeys.map(function(k) {
            return '<tr>' +
                '<td><strong>' + k + '</strong></td>' +
                '<td>' + JSON.stringify(allLocal[k]) + '</td>' +
                '<td>' + byteSize(JSON.stringify(allLocal[k])) + '</td>' +
                '<td><button class="btn btn-danger" onclick="delLocal(\'' + k + '\')">Șterge</button></td>' +
                '</tr>';
        }).join('');

    // sessionStorage
    const allSession = StorageManager.getAllSession();
    document.getElementById('rawSession').textContent =
        Object.keys(allSession).length ? JSON.stringify(allSession, null, 2) : '(gol)';
    const sKeys = Object.keys(allSession);
    document.getElementById('sessionBody').innerHTML = sKeys.length === 0
        ? '<tr class="empty-row"><td colspan="4">sessionStorage este gol.</td></tr>'
        : sKeys.map(function(k) {
            return '<tr>' +
                '<td><strong>' + k + '</strong></td>' +
                '<td>' + JSON.stringify(allSession[k]) + '</td>' +
                '<td>' + byteSize(JSON.stringify(allSession[k])) + '</td>' +
                '<td><button class="btn btn-danger" onclick="delSession(\'' + k + '\')">Șterge</button></td>' +
                '</tr>';
        }).join('');
}

function delCookie(name) { CookieManager.delete(name); renderAll(); }
function delLocal(key) { StorageManager.removeLocal(key); renderAll(); }
function delSession(key) { StorageManager.removeSession(key); renderAll(); }

renderAll();