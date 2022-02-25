const navbar = document.getElementById('input_search');

navbar.addEventListener('focus', on_focus_search);

function on_focus_search(event) {
  const search = document.querySelector(".search")
  const input = document.querySelector(".search input")
  search.style.width = '200px';
  input.style.width = '100%';
}


function toggleVideo() {
  /**
  * Manage the trailor preview
  */
  const trailer = document.querySelector('.trailer');
  const video = document.querySelector('.video');
  trailer.classList.toggle('active');
  video.pause();
}

function create_card(info) {
  /**
  * Create the card of the carroussel
  * @param  {Object JSON} name  object json with all the movie's info
  * @return {String}       html content for the carroussel
  */
  
  let card_html = '<li class="carousel-item">'
  card_html = card_html + '<div class="card"><div class="layer"></div>'
  card_html = card_html + '<div class="content"><div class="content">'
  card_html = card_html + '<div class="imgBx">'
  card_html = card_html + '<img src="' + info.image_url + '">'
  card_html = card_html + '</div><div class="details">'
  card_html = card_html + '<h2>' + info.title + ' <span>' + info.imdb_score + '</span></h2>'
  card_html = card_html + '<span>' + info.directors[0] + ' ' + info.year + '</span></div>'
  card_html = card_html + '<p>' + info.description.substr(0, 50) + ' ...</p></div></div></li>'
  return card_html
}

function get_movie_detail(link, class_name) {
  /**
  * get the detail of a movie
  * @param  {str} link  api link to get the information
  * @param  {str} class_name  css class name
  */
  fetch(link, {method: 'GET'})
  .then(response => response.json())
  .then(result => {
    let card_html = create_card(result)
    document.querySelector(class_name).insertAdjacentHTML('beforeend', card_html)
  });
}

function get_info(link, class_name) {
  /**
  * get the detail of a movie
  * @param  {str} link  api link to get the information
  * @param  {str} class_name  css class name
  */
  fetch(link, {method: 'GET'})
  .then(response => response.json())
  .then(result => {
    for (movie in result.results) {
      link = "http://localhost:8000/api/v1/titles/" + result.results[movie].id
      get_movie_detail(link, class_name)
    }
  })
  .catch(error => console.log('error', error));
  
}

category = {
  'best_movie': { 'url': 'http://localhost:8000/api/v1/titles/?imdb_score_min=9.3',
  'url_2': 'http://localhost:8000/api/v1/titles/?imdb_score_min=9.3&page=2',
  'class': '#slide_top'},
  'categ_1': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Action',
  'url_2': 'http://localhost:8000/api/v1/titles/?genre=Action&page=2',
  'class': '#slide_1'},
  'categ_2': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Horror',
  'url_2': 'http://localhost:8000/api/v1/titles/?genre=Horror&page=2',
  'class': '#slide_2'},
  'categ_3': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Music',
  'url_2': 'http://localhost:8000/api/v1/titles/?genre=Music&page=2',
  'class': '#slide_3'},
}

for (categ in category) {
  get_info(category[categ].url, category[categ].class)
  get_info(category[categ].url_2, category[categ].class)
}








function rain() {
  /**
  * Generate the rain effect for the oppening
  */

  const amount = 100;
  const body = document.querySelector("#loading_screen");
  let i = 0;
  while (i < amount) {
    let drop = document.createElement('i');

    let size = Math.random() * 5;
    let posX = Math.floor(Math.random() * window.innerWidth);
    let delay = Math.random * -20;
    let duration = Math.random() * 5;

    drop.style.width = size +'px';
    drop.style.left = posX + 'px';
    drop.style.animationDelay = delay + 's';
    drop.style.animationDuration = 1 + duration + 's';

    body.appendChild(drop);

    i++;
  }
}

function stop_rain() {
  /**
  * Stop the opening
  */
  drop = document.getElementById("loading_screen");
  drop.parentNode.removeChild(drop);
}



rain();

setTimeout(stop_rain, 3200); 