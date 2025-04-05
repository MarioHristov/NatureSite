document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
    const sortOptions = document.getElementById("sort-options");
    const filterName = document.getElementById("filter-name");
    const filterPlace = document.getElementById("filter-place");
    const filterHours = document.getElementById("filter-hours");
    const hoursValue = document.getElementById("hours-value");

    // Update hours display
    filterHours.addEventListener("input", () => {
        const sliderValue = parseInt(filterHours.value, 10);
        hoursValue.textContent = `00-${sliderValue < 10 ? "0" : ""}${sliderValue}`;
        applyFilters();
    });

    // Apply sorting
    sortOptions.addEventListener("change", applySorting);

    // Apply filters
    filterName.addEventListener("input", applyFilters);
    filterPlace.addEventListener("change", applyFilters);

    function applySorting() {
        const sortValue = sortOptions.value;
        const imageCards = Array.from(imageContainer.querySelectorAll(".image-card"));

        const sortedCards = imageCards.sort((a, b) => {
            if (sortValue.includes("date")) {
                const dateA = new Date(a.dataset.date);
                const dateB = new Date(b.dataset.date);
                return sortValue === "date-new" ? dateB - dateA : dateA - dateB;
            } else if (sortValue.includes("name")) {
                const nameA = a.dataset.name.toLowerCase();
                const nameB = b.dataset.name.toLowerCase();
                return sortValue === "name-az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            }
        });

        // Re-render sorted cards
        imageContainer.innerHTML = "";
        sortedCards.forEach(card => imageContainer.appendChild(card));
    }

    function applyFilters() {
        const nameFilter = filterName.value.toLowerCase();
        const placeFilter = filterPlace.value;
        const hoursFilter = parseInt(filterHours.value, 10);

        const imageCards = imageContainer.querySelectorAll(".image-card");

        imageCards.forEach(card => {
            const cardName = card.dataset.name.toLowerCase();
            const cardPlace = card.dataset.place;
            const cardHours = parseInt(card.dataset.hours, 10);

            const matchesName = cardName.includes(nameFilter);
            const matchesPlace = placeFilter === "all" || cardPlace === placeFilter;
            const matchesHours = cardHours <= hoursFilter;

            card.style.display = matchesName && matchesPlace && matchesHours ? "block" : "none";
        });
    }
});
function showFilters(){
    const div = document.querySelector(".filter-container");
    if(div.classList.contains("inactive")){
        div.classList.remove("inactive");
    }
    else{
        div.classList.add("inactive");
    }
}


const galleryImages = document.querySelectorAll(".img-container img");
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlay-image");
const closeOverlay = document.getElementById("close-overlay");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

let currentScale = 1;
let isDragging = false;
let startX, startY, currentX, currentY, translateX = 0, translateY = 0;

// Open overlay on image click
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    overlay.style.display = "flex";
    overlayImage.src = img.src;
    currentScale = 1; // Reset scale
    translateX = 0; // Reset position
    translateY = 0;
    overlayImage.style.transform = `scale(${currentScale}) translate(0px, 0px)`;
  });
});

// Close overlay
closeOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Zoom in
zoomInButton.addEventListener("click", () => {
  currentScale += 0.5; // Increase scale
  overlayImage.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
});

// Zoom out
zoomOutButton.addEventListener("click", () => {
  if (currentScale > 0.5) { // Prevent zooming out too much
    currentScale -= 0.5;
    overlayImage.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
  }
});

// Drag functionality
overlayImage.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  overlayImage.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  currentY = e.clientY;

  translateX = currentX - startX;
  translateY = currentY - startY;

  overlayImage.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  overlayImage.style.cursor = "grab";
});

// Close overlay on clicking outside the image
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
});
