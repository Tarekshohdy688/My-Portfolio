// Gallery functionality
const toggleButton = document.getElementById("toggle-view");

document.querySelectorAll('.gallery').forEach(gallery => {
    const items = gallery.querySelector('.gallery-items');
    const leftArrow = gallery.querySelector('.left-arrow');
    const rightArrow = gallery.querySelector('.right-arrow');
    let index = 0;

    function updateGallery() {
        const itemWidth = gallery.offsetWidth;
        if (!items) return;
        items.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : items.children.length - 1;
            updateGallery();
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            index = (index < items.children.length - 1) ? index + 1 : 0;
            updateGallery();
        });
    }

    window.addEventListener('resize', updateGallery);
    updateGallery();
});

if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        const metaTag = document.querySelector("meta[name=viewport]");
        if (!metaTag) {
            return;
        }

        const currentContent = metaTag.getAttribute("content") || "";
        if (currentContent.includes("width=device-width")) {
            metaTag.setAttribute("content", "width=1400");
            toggleButton.textContent = "Switch to Mobile View";
        } else {
            metaTag.setAttribute("content", "width=device-width, initial-scale=1");
            toggleButton.textContent = "Switch to Desktop View";
        }
    });
}
// Video preview functionality
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".video-preview").forEach(preview => {
        preview.addEventListener("click", () => {
            const videoId = preview.dataset.videoId;

            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.title = "YouTube video player";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.setAttribute("allowfullscreen", "");
            iframe.style.position = "absolute";
            iframe.style.inset = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "0";

            const container = preview.closest(".video-container");
            container.innerHTML = "";
            container.appendChild(iframe);
        });
    });
});    preview.addEventListener("click", () => {
        const videoId = preview.dataset.videoId;

        const iframe = document.createElement("iframe");

        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        iframe.title = "YouTube video player";

        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        iframe.allowFullscreen = true;
        iframe.loading = "lazy";

        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";

        const container = preview.parentElement;

        container.innerHTML = "";
        container.appendChild(iframe);
    });