const observeElements = () => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('show');
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
};

const setupTabs = () => {
    const buttons = document.querySelectorAll('.tab-btn');
    const panels  = document.querySelectorAll('.tab-panel');

    const activate = (name) => {
        buttons.forEach((btn) => {
            const isActive = btn.dataset.tab === name;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        panels.forEach((panel) => {
            const isActive = panel.id === 'panel-' + name;
            panel.classList.toggle('active', isActive);
            // Reveal elements in a hidden panel are never observed, so
            // force them visible when the panel becomes active.
            if (isActive) {
                panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('show'));
            }
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (history.replaceState) history.replaceState(null, '', '#' + name);
    };

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => activate(btn.dataset.tab));
    });

    // Open a specific tab if referenced in the URL hash.
    const hash = (window.location.hash || '').replace('#', '');
    if (hash && document.getElementById('panel-' + hash)) {
        activate(hash);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    setupTabs();
});
