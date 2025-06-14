// Element references
const slider = document.getElementById('slider');
const before = document.querySelector('.before');
const container = document.querySelector('.container-services');
let autoMove; // Reference to interval timer for automated sliding
let isUserInteracting = false; // Flag to track manual interaction

/**
 * Initializes the visual state of the before/after comparison slider.
 * Sets the "before" image to be fully hidden initially,
 * and starts the automatic animation.
 */
function setInitialState() {
    before.style.clipPath = 'inset(0 100% 0 0)';
    slider.style.left = '0%';
    startAutoMove();
}

/**
 * Enables manual dragging of the slider via mouse.
 * On mousedown, attaches move listeners; removes them on mouseup.
 */
slider.addEventListener('mousedown', (e) => {
     // Ignore touch interactions here; pointerType exists on PointerEvent, not MouseEvent
    if (e.pointerType === 'touch') return;
    e.preventDefault();
    isUserInteracting = true;
    document.addEventListener('mousemove', moveSlider);
    document.addEventListener('mouseup', () => {
        isUserInteracting = false;
        document.removeEventListener('mousemove', moveSlider);
    });
});

/**
 * Dynamically adjusts the clipPath of the "before" layer based on cursor position.
 * Updates slider position accordingly, within 0–99% bounds.
 */
function moveSlider(e) {
    let rect = container.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width * 100;
    if (pos < 0) pos = 0;
    if (pos > 99) pos = 99;
    before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    slider.style.left = pos + '%';
}

/**
 * Starts the automated sliding effect.
 * If user is not interacting, moves the slider gradually.
 * Once 99% is reached, resets to 0% to loop the animation.
 */
function startAutoMove() {
    clearInterval(autoMove);
    autoMove = setInterval(() => {
        if (!isUserInteracting) {
            let currentPos = parseFloat(slider.style.left) || 0;
            let newPos = currentPos + 0.1;
            if (newPos > 99)
               {
                const nextBtn = document.getElementById("nextBtn");
                nextBtn.click();
                
                newPos = 0;
            } 
            before.style.clipPath = `inset(0 ${100 - newPos}% 0 0)`;
            slider.style.left = newPos + '%';
        }
    }, 5); // ~2000ms for full cycle (100 / 0.1 * 5ms)
}
/**
 * Utility function to detect mobile screen widths (responsive breakpoint)
 */
function isMobileScreen() {
    return window.matchMedia('(max-width: 768px)').matches;
}
/**
 * Pauses the automatic slider when the user hovers over the container (desktop only).
 * Improves UX and prevents interference while interacting.
 */
container.addEventListener('mouseenter', () => {
    if (!isMobileScreen()) clearInterval(autoMove);
});

/**
 * Resumes automatic slider when the mouse leaves the container.
 */
container.addEventListener('mouseleave', () => {
    startAutoMove();
});

// Trigger initial animation and layout state
setInitialState();
