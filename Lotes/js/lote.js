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