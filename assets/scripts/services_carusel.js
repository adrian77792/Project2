const images = [
    { before: "assets/after_before/Construction1.jpg", after: "assets/after_before/Construction01.jpg", table: "table1" },
    { before: "assets/after_before/Construction2.jpg", after: "assets/after_before/Construction02.jpg", table: "table2" },
    { before: "assets/after_before/Construction3.jpg", after: "assets/after_before/Construction03.jpg", table: "table3" },
    { before: "assets/after_before/Construction4.jpg", after: "assets/after_before/Construction04.jpg", table: "table4" },
    { before: "assets/after_before/Construction5.jpg", after: "assets/after_before/Construction05.jpg", table: "table5" },
    { before: "assets/after_before/Construction6.jpg", after: "assets/after_before/Construction06.jpg", table: "table6" },
    { before: "assets/after_before/Construction7.jpg", after: "assets/after_before/Construction07.jpg", table: "table7" }
];

let currentIndex = 0;

const beforeImage = document.getElementById("beforeImage");
const afterImage = document.getElementById("afterImage");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateContent() {
    beforeImage.src = images[currentIndex].before;
    afterImage.src = images[currentIndex].after;

    // Ukryj wszystkie tabele i pokaż tylko aktualną
    document.querySelectorAll(".comparison-table").forEach(table => table.style.display = "none");
    document.getElementById(images[currentIndex].table).style.display = "table";
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateContent();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateContent();
});

// Ukryj wszystkie tabele poza pierwszą na starcie
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".comparison-table").forEach(table => table.style.display = "none");
    if (images && images[currentIndex] && images[currentIndex].table) {
        const element = document.getElementById(images[currentIndex].table);
        if (element) {
            element.style.display = "table";
        }
    }
});
