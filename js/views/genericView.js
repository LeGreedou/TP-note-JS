export function setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "100px", threshold: 0.1 });

        images.forEach(img => observer.observe(img));
    } else {
        images.forEach(img => img.src = img.dataset.src);
    }
}