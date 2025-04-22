document.addEventListener("DOMContentLoaded", function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        const elements = document.querySelectorAll('.taratortextbox, .taratorflexbox1 img, .taratorflexbox2 img');
        elements.forEach((el) => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
