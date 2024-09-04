let currentIndex = 0;

function showImage(index) {
    const gallery = document.querySelector('.gallery');
    const images = document.querySelectorAll('.gallery img');
    const imageWidth = images[0].clientWidth;
    gallery.style.transform = `translateX(${-index * imageWidth}px)`;
}

function prevImage() {
    const images = document.querySelectorAll('.gallery img');
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
}

function nextImage() {
    const images = document.querySelectorAll('.gallery img');
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

window.addEventListener('resize', () => showImage(currentIndex));

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
        const elements = document.querySelectorAll('.taratorrectanglesleft, .taratorrectanglesright');
        elements.forEach((el) => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
