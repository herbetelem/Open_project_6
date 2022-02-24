
function toggleVideo() {
  var trailer = document.querySelector('.trailer');
  var video = document.querySelector('.video');
  trailer.classList.toggle('active');
  video.pause();
}

function create_card(info) {
  let card_html = '<div class="swiper-slide">'
  card_html = card_html + '<div class="card"><div class="layer"></div>'
  card_html = card_html + '<div class="content"><div class="content">'
  card_html = card_html + '<div class="imgBx">'
  card_html = card_html + '<img src="' + info.image_url + '">'
  card_html = card_html + '</div><div class="details">'
  card_html = card_html + '<h2>' + info.title + '</h2>'
  card_html = card_html + '<span>' + info.directors[0] + ' ' + info.year + '</span></div>'
  card_html = card_html + '<p>' + info.description.substr(0, 100) + ' ...</p></div></div></div>'
  return card_html
}

function get_movie_detail(link, categ) {
  fetch(link, {method: 'GET'})
  .then(response => response.json())
  .then(result => {
    let card_html = create_card(result)
    document.querySelector(categ).insertAdjacentHTML('beforeend', card_html)
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
    });
  });
}


category = {
  'categ_1': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Action&min_year=2010',
  'class': '#slide_1'},
  'categ_2': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Horror&min_year=2010',
  'class': '#slide_2'},
  'categ_3': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Music&min_year=2010',
  'class': '#slide_3'},
}

for (categ in category) {
  get_info(category[categ].url, category[categ].class)
  
}

function get_info(link, categ) {
  fetch(link, {method: 'GET'})
  .then(response => response.json())
  .then(result => {
    for (movie in result.results) {
      link = "http://localhost:8000/api/v1/titles/" + result.results[movie].id
      get_movie_detail(link, categ)
    }
    
  })
  .catch(error => console.log('error', error));
  
}
