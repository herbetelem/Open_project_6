
function toggleVideo() {
    var trailer = document.querySelector('.trailer');
    var video = document.querySelector('.video');
    trailer.classList.toggle('active');
    video.pause();
}

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 25,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
});