document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".timeline-item");
    const sectionIds = ["about-me", "education", "summer-school", "conferences", "videos", "contact-me"];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navItems.forEach(item => item.classList.remove("active"));

                const activeLink = document.querySelector(
                    `.timeline-item[href="#${entry.target.id}"]`
                );
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            });
        },
        {
            root: null,
            threshold: 0.5
        }
    );

    sections.forEach(section => observer.observe(section));
    const toggleButton = document.getElementById("toggle-view");

    document.querySelectorAll(".gallery").forEach(gallery => {
        const items = gallery.querySelector(".gallery-items");
        const leftArrow = gallery.querySelector(".left-arrow");
        const rightArrow = gallery.querySelector(".right-arrow");
        let index = 0;

        function updateGallery() {
            const itemWidth = gallery.offsetWidth;
            if (!items) return;
            items.style.transform = `translateX(-${index * itemWidth}px)`;
        }

        if (leftArrow) {
            leftArrow.addEventListener("click", () => {
                index = (index > 0) ? index - 1 : items.children.length - 1;
                updateGallery();
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener("click", () => {
                index = (index < items.children.length - 1) ? index + 1 : 0;
                updateGallery();
            });
        }

        window.addEventListener("resize", updateGallery);
        updateGallery();
    });

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const metaTag = document.querySelector("meta[name=viewport]");
            if (!metaTag) return;

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

    document.querySelectorAll(".video-preview").forEach(preview => {
        const button = preview.querySelector(".play-button");
        
        const loadVideo = () => {
            const videoId = preview.dataset.videoId;
            if (!videoId) return;

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
            if (container) {
                container.replaceChildren(iframe);
            }
        };

        if (button) {
            button.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                loadVideo();
            });
        }

        preview.addEventListener("click", loadVideo);
    });

    const conferenceModal = document.getElementById("conference-modal");
    const conferenceModalImg = document.getElementById("conference-modal-img");
    const conferenceModalCaption = document.getElementById("conference-modal-caption");
    const conferenceModalClose = document.getElementById("conference-modal-close");

    const summerSchoolModal = document.getElementById("summer-school-modal");
    const summerSchoolModalImg = document.getElementById("summer-school-modal-img");
    const summerSchoolModalCaption = document.getElementById("summer-school-modal-caption");
    const summerSchoolModalClose = document.getElementById("summer-school-modal-close");

    const closeConferenceModal = () => {
        conferenceModal.classList.remove("open");
        conferenceModal.setAttribute("aria-hidden", "true");
        conferenceModalImg.src = "";
        conferenceModalImg.alt = "";
        conferenceModalCaption.textContent = "";
    };

    const closeSummerSchoolModal = () => {
        summerSchoolModal.classList.remove("open");
        summerSchoolModal.setAttribute("aria-hidden", "true");
        summerSchoolModalImg.src = "";
        summerSchoolModalImg.alt = "";
        summerSchoolModalCaption.textContent = "";
    };

    document.querySelectorAll("#conferences .conference-image").forEach(image => {
        image.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const src = image.src;
            const alt = image.alt || "Conference image";
            conferenceModalImg.src = src;
            conferenceModalImg.alt = alt;
            conferenceModalCaption.textContent = alt;
            conferenceModal.classList.add("open");
            conferenceModal.setAttribute("aria-hidden", "false");
        });
    });

    document.querySelectorAll("#summer-school .summer-school-image").forEach(image => {
        image.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const src = image.src;
            const alt = image.alt || "Summer school image";
            summerSchoolModalImg.src = src;
            summerSchoolModalImg.alt = alt;
            summerSchoolModalCaption.textContent = alt;
            summerSchoolModal.classList.add("open");
            summerSchoolModal.setAttribute("aria-hidden", "false");
        });
    });

    conferenceModal.addEventListener("click", event => {
        if (event.target === conferenceModal || event.target === conferenceModalClose) {
            closeConferenceModal();
        }
    });

    summerSchoolModal.addEventListener("click", event => {
        if (event.target === summerSchoolModal || event.target === summerSchoolModalClose) {
            closeSummerSchoolModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (conferenceModal.classList.contains("open")) {
                closeConferenceModal();
            }
            if (summerSchoolModal.classList.contains("open")) {
                closeSummerSchoolModal();
            }
        }
    });
});