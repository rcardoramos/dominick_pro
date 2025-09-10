function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('flex');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.getElementById(id).classList.remove('flex');
}

const carouselPositions = {};

function nextSlide(id) {
  const container = document.getElementById(id);
  const images = container.querySelectorAll('img');
  if (!carouselPositions[id]) carouselPositions[id] = 0;

  if (carouselPositions[id] < images.length - 1) {
    carouselPositions[id]++;
  } else {
    carouselPositions[id] = 0;
  }

  container.style.transform = `translateX(-${carouselPositions[id] * 100}%)`;
}

function prevSlide(id) {
  const container = document.getElementById(id);
  const images = container.querySelectorAll('img');
  if (!carouselPositions[id]) carouselPositions[id] = 0;

  if (carouselPositions[id] > 0) {
    carouselPositions[id]--;
  } else {
    carouselPositions[id] = images.length - 1;
  }

  container.style.transform = `translateX(-${carouselPositions[id] * 100}%)`;
}

(function () {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = btn.querySelector('.menu-icon-open');
  const iconClose = btn.querySelector('.menu-icon-close');

  function toggleMenu() {
    const isOpen = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    iconOpen.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
  }

  btn.addEventListener('click', toggleMenu);

  // Cerrar menú al navegar (mejor UX)
  menu.addEventListener('click', (e) => {
    const target = e.target.closest('a[href]');
    if (target) toggleMenu();
  });
})();