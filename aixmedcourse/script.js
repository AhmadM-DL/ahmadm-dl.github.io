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

const setupCourseSwitch = () => {
    const select = document.getElementById('course-select');
    const panels = document.querySelectorAll('.tab-panel');
    if (!select) return;

    const activate = (name, scroll) => {
        panels.forEach((panel) => {
            const isActive = panel.id === 'panel-' + name;
            panel.classList.toggle('active', isActive);
            // Reveal elements in a hidden panel are never observed, so
            // force them visible when the panel becomes active.
            if (isActive) {
                panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('show'));
            }
        });
        if (select.value !== name) select.value = name;
        if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
        if (history.replaceState) history.replaceState(null, '', '#' + name);
    };

    select.addEventListener('change', () => activate(select.value, true));

    // Open a specific course if referenced in the URL hash.
    const hash = (window.location.hash || '').replace('#', '');
    if (hash && document.getElementById('panel-' + hash)) {
        activate(hash, false);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    setupCourseSwitch();
});
