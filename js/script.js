// Menu toggle for mobile
document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            // Calculate position to scroll to
            const headerOffset = 90;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Smooth scroll
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
}

// Referral program button
const referralBtn = document.querySelector('#referidos button');
if (referralBtn) {
    referralBtn.addEventListener('click', function () {
        alert('Serás redirigido al formulario de registro del programa de referidos.');
    });
}

(function () {
    const v = document.getElementById('heroVideo');
    const btn = document.getElementById('playToggle');
    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');

    function setIcons(isPlaying) {
        iconPlay.classList.toggle('hidden', isPlaying);
        iconPause.classList.toggle('hidden', !isPlaying);
    }

    btn.addEventListener('click', async () => {
        if (v.paused) { try { await v.play(); } catch (_) { } setIcons(true); }
        else { v.pause(); setIcons(false); }
    });

    // Autoplay silencioso al entrar en viewport
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { v.play().then(() => setIcons(true)).catch(() => { }); }
            else { v.pause(); setIcons(false); }
        });
    }, { threshold: 0.4 });
    io.observe(v);
})();
