document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile nav toggle ──
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ── Typing animation (index.html only) ──
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const roles = ['AI Researcher', 'Medical Imaging ML', 'Deep Learning', 'Doctoral Researcher @ AUB'];
        let ri = 0, ci = 0, del = false;
        function type() {
            const r = roles[ri];
            typedEl.textContent = del ? r.substring(0, ci--) : r.substring(0, ci++);
            if (!del && ci === r.length + 1) { del = true; return setTimeout(type, 2200); }
            if (del && ci < 0)               { del = false; ri = (ri + 1) % roles.length; ci = 0; }
            setTimeout(type, del ? 45 : 95);
        }
        type();
    }

    // ── Scroll reveal ──
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ── Nav hide/show on scroll ──
    const nav = document.querySelector('.nav');
    let lastY = 0;
    window.addEventListener('scroll', function () {
        const y = window.scrollY;
        if (nav) nav.style.transform = (y > lastY && y > 240) ? 'translateY(-100%)' : 'translateY(0)';
        lastY = y <= 0 ? 0 : y;
    }, { passive: true });

    // ── Image error handling ──
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => { img.style.opacity = '0'; });
    });
});
