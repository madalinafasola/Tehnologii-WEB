document.body.className = CookieManager.get('theme') || 'light';

// Verificare autentificare
var session = StorageManager.getSession('session');
if (!session) {
    window.location.href = 'login.html';
}

// Produse disponibile
var products = {
    laptop:  { name: 'Laptop',  price: 2500 },
    telefon: { name: 'Telefon', price: 1200 },
    tableta: { name: 'Tabletă', price: 800  },
    casti:   { name: 'Căști',   price: 150  }
};

function getCart() {
    return StorageManager.getSession('cart') || {};
}

function saveCart(cart) {
    StorageManager.setSession('cart', cart);
}

function addToCart() {
    var productKey = document.getElementById('productSelect').value;
    var qty = parseInt(document.getElementById('quantity').value);
    var alertSuccess = document.getElementById('alertSuccess');

    if (isNaN(qty) || qty < 1 || qty > 10) {
        qty = 1;
    }

    var cart = getCart();
    cart[productKey] = (cart[productKey] || 0) + qty;
    saveCart(cart);
    renderCart();

    alertSuccess.textContent = '✔ ' + products[productKey].name + ' (x' + qty + ') adăugat în coș!';
    alertSuccess.style.display = 'block';
    setTimeout(function() { alertSuccess.style.display = 'none'; }, 2000);
}

function removeFromCart(key) {
    var cart = getCart();
    delete cart[key];
    saveCart(cart);
    renderCart();
}

function clearCart() {
    saveCart({});
    renderCart();
}

function renderCart() {
    var cart = getCart();
    var keys = Object.keys(cart);
    var body = document.getElementById('cartBody');
    var totalEl = document.getElementById('cartTotal');

    if (keys.length === 0) {
        body.innerHTML = '<tr class="empty-row"><td colspan="5">Coșul este gol.</td></tr>';
        totalEl.textContent = '';
        return;
    }

    var total = 0;
    body.innerHTML = keys.map(function(k) {
        var product = products[k];
        if (!product) return '';
        var subtotal = product.price * cart[k];
        total += subtotal;
        return '<tr>' +
            '<td><strong>' + product.name + '</strong></td>' +
            '<td>' + product.price + ' RON</td>' +
            '<td>' + cart[k] + '</td>' +
            '<td>' + subtotal + ' RON</td>' +
            '<td><button class="btn btn-danger" onclick="removeFromCart(\'' + k + '\')">Șterge</button></td>' +
            '</tr>';
    }).join('');

    totalEl.textContent = 'TOTAL: ' + total + ' RON';
}

renderCart();