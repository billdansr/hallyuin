const merchSlider = document.querySelector('.merch-slider');
if (merchSlider) {
    for (const merch of merchandise) {
        merchSlider.innerHTML += merch.renderSlide();
    }
}

const merch = document.querySelectorAll('.merch');
let currentIndex = 0;

function changeSlide(index) {
    if (currentIndex + index >= merch.length) {
        currentIndex = 0;
    } else if (currentIndex + index < 0) {
        currentIndex = merch.length - 1;
    } else {
        currentIndex += index;
    }
    scroll();
}

function scroll() {
    merch.forEach(item => {
        item.style.transform = `translateX(-${currentIndex * 400}px)`;
    });
}