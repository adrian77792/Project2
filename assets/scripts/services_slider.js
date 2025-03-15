const slider = document.getElementById('slider');
const before = document.querySelector('.before');
const container = document.querySelector('.container');
let autoMove;
let isUserInteracting = false;

function setInitialState() {
    before.style.clipPath = 'inset(0 100% 0 0)';
    slider.style.left = '0%';
    startAutoMove();
}

slider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isUserInteracting = true;
    document.addEventListener('mousemove', moveSlider);
    document.addEventListener('mouseup', () => {
        isUserInteracting = false;
        document.removeEventListener('mousemove', moveSlider);
    });
});

function moveSlider(e) {
    let rect = container.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width * 100;
    if (pos < 0) pos = 0;
    if (pos > 99) pos = 99;
    before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    slider.style.left = pos + '%';
}

// Automatyczne przesuwanie
function startAutoMove() {
    clearInterval(autoMove);
    autoMove = setInterval(() => {
        if (!isUserInteracting) {
            let currentPos = parseFloat(slider.style.left) || 0;
            let newPos = currentPos + 0.1; // Przesuwamy o 0.1% co iterację
            if (newPos > 99) newPos = 0; // Reset do początku
            before.style.clipPath = `inset(0 ${100 - newPos}% 0 0)`;
            slider.style.left = newPos + '%';
        }
    }, 5);
}

// Wstrzymywanie przewijania po najechaniu myszką
container.addEventListener('mouseenter', () => {
    clearInterval(autoMove);
});

// Wznawianie przewijania po opuszczeniu myszką
container.addEventListener('mouseleave', () => {
    startAutoMove();
});

setInitialState();
