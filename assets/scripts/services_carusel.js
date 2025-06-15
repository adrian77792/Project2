// Array of objects, each representing a single slide with:
// - a "before" image
// - an "after" image
// - the ID of the associated comparison table to display
const images = [
    { before: "assets/after_before/Construction1.jpg", after: "assets/after_before/Construction01.jpg", table: "table1" },
    { before: "assets/after_before/Construction2.jpg", after: "assets/after_before/Construction02.jpg", table: "table2" },
    { before: "assets/after_before/Construction3.jpg", after: "assets/after_before/Construction03.jpg", table: "table3" },
    { before: "assets/after_before/Construction4.jpg", after: "assets/after_before/Construction04.jpg", table: "table4" },
    { before: "assets/after_before/Construction5.jpg", after: "assets/after_before/Construction05.jpg", table: "table5" },
    { before: "assets/after_before/Construction6.jpg", after: "assets/after_before/Construction06.jpg", table: "table6" },
    { before: "assets/after_before/Construction7.jpg", after: "assets/after_before/Construction07.jpg", table: "table7" }
];

// Keeps track of the currently active slide index
let currentIndex = 0;

// DOM references to the "before" and "after" image elements
const beforeImage = document.getElementById("beforeImage");
const afterImage = document.getElementById("afterImage");

// DOM references to navigation buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/**
 * Updates the current view by:
 * - Replacing both image sources with the new ones
 * - Hiding all tables
 * - Displaying the one table associated with the current image index
 */
function updateContent() {
    // Update image sources
    beforeImage.src = images[currentIndex].before;
    afterImage.src = images[currentIndex].after;

    // Hide all comparison tables
    document.querySelectorAll(".comparison-table").forEach(table => table.style.display = "none");

}

// Event listener for the "Previous" button
// Decrements index and wraps around if it goes below 0
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateContent();
});

// Event listener for the "Next" button
// Increments index and wraps around if it exceeds the array length
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateContent();
});

/**
 * Initial setup on DOM ready:
 * - Hides all comparison tables
 * - Displays only the table associated with the initial slide
 */
document.addEventListener("DOMContentLoaded", () => {
    
    // Hide all tables initially
    document.querySelectorAll(".comparison-table").forEach(table => table.style.display = "none");
    
    // Safely check and show the first relevant table
    if (images && images[currentIndex] && images[currentIndex].table) {
        const element = document.getElementById(images[currentIndex].table);
        if (element) {
            element.style.display = "table";
        }
    }
});
