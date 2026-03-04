const btn = document.getElementById('hamburgerBtn');
const menu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

// Deschide/Închide meniul la click pe hamburger
btn.addEventListener('click', () => {
    menu.classList.toggle('open');
});

// Închide meniul când se dă click pe un link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
    });
});

// Închide meniul la click în exterior
document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
    }
});