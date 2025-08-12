
document.addEventListener('DOMContentLoaded', () => {
    // === Menú móvil ===
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // === Scroll suave en enlaces con ancla ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;

            // Cierra el menú móvil si está abierto
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            const headerOffset = 90;
            const elementPosition = document.querySelector(targetId).getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // === Botón de referidos ===
    const referralBtn = document.querySelector('#referidos button');
    if (referralBtn) {
        referralBtn.addEventListener('click', () => {
            window.location.href = '#contacto';
        });
    }

    // === Reproductor de video (hero section) ===
    const v = document.getElementById('heroVideo');
    const btn = document.getElementById('playToggle');
    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');

    if (v && btn && iconPlay && iconPause) {
        function setIcons(isPlaying) {
            iconPlay.classList.toggle('hidden', isPlaying);
            iconPause.classList.toggle('hidden', !isPlaying);
        }

        btn.addEventListener('click', async () => {
            if (v.paused) {
                try { await v.play(); } catch (_) { }
                setIcons(true);
            } else {
                v.pause();
                setIcons(false);
            }
        });

        // Autoplay silencioso al entrar en viewport
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    v.play().then(() => setIcons(true)).catch(() => { });
                } else {
                    v.pause();
                    setIcons(false);
                }
            });
        }, { threshold: 0.4 });

        io.observe(v);
    }

    // === Formulario + Getform + Toast ===
    const contactForm = document.querySelector('form');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    if (contactForm && toast && toastMsg) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    showToast("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
                    this.reset();
                } else {
                    showToast("Hubo un error al enviar tu mensaje. Intenta nuevamente.");
                }
            }).catch(error => {
                showToast("Error de red. Por favor, intenta más tarde.");
            });
        });

        function showToast(message) {
            toastMsg.textContent = message;
            toast.classList.remove("hidden");
            toast.classList.add("flex");

            setTimeout(() => {
                toast.classList.remove("flex");
                toast.classList.add("hidden");
            }, 5000);
        }
    }
});
