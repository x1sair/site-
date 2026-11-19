const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');

if (menuToggle && siteNav) {
    const label = menuToggle.querySelector('.sr-only');
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        siteNav.classList.toggle('is-open', !expanded);
        if (label) label.textContent = expanded ? 'Открыть меню' : 'Закрыть меню';
    });
    siteNav.addEventListener('click', (event) => {
        if (!event.target.closest('a')) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
        if (label) label.textContent = 'Открыть меню';
    });
}

document.querySelectorAll('[data-accordion] .process-item__toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const panel = document.getElementById(toggle.getAttribute('aria-controls'));
        const item = toggle.closest('.process-item');
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
        if (item) item.classList.toggle('is-open', !expanded);
        const symbol = toggle.querySelector('.process-item__symbol');
        if (symbol) symbol.textContent = expanded ? '+' : '−';
    });
});

const reviewTrack = document.querySelector('[data-review-track]');
const reviewCards = reviewTrack ? [...reviewTrack.querySelectorAll('.review-card')] : [];
const reviewCount = document.querySelector('[data-review-count]');
let activeReview = 0;

function moveReview(direction) {
    if (!reviewTrack || reviewCards.length < 2) return;
    activeReview = (activeReview + direction + reviewCards.length) % reviewCards.length;
    reviewTrack.scrollTo({ left: reviewCards[activeReview].offsetLeft - reviewTrack.offsetLeft, behavior: 'smooth' });
    if (reviewCount) reviewCount.textContent = `${String(activeReview + 1).padStart(2, '0')} / ${String(reviewCards.length).padStart(2, '0')}`;
}

document.querySelector('[data-review-prev]')?.addEventListener('click', () => moveReview(-1));
document.querySelector('[data-review-next]')?.addEventListener('click', () => moveReview(1));
document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('[data-form-status]');
    if (status) status.textContent = 'Форма подготовлена для подключения обработчика WordPress. Данные не отправлены.';
});
document.querySelector('[data-current-year]')?.replaceChildren(String(new Date().getFullYear()));
