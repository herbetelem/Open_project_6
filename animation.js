function on_focus_search() {
  /**
  * Create the card of the carroussel
  * @param  {OBJ js} event  object js with the event
  */
  
  const search = document.querySelector(".search")
  const input = document.querySelector(".search input")
  search.style.width = '200px';
  input.style.width = '100%';
}

function toggle_video() {
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
  
  let card_html = `
  <li class="carousel-item">
    <div class="card" onclick="get_information(${info.id})" id="${info.id}">
      <div class="layer"></div>
      <div class="content">
        <div class="imgBx">
          <img src="${info.image_url}">
        </div>
        <div class="details">
          <h2>${info.title} <span>${info.imdb_score}</span></h2>
          <span>${info.directors[0]} ${info.year}</span>
        </div>
        <p>${info.description.substr(0, 50)} ...</p>
      </div>
    </div>
  </li>`
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
    let card_html = create_card(result);
    document.querySelector(class_name).insertAdjacentHTML('beforeend', card_html);
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

function get_information(id) {
  toggle_info()
  const url = "http://localhost:8000/api/v1/titles/" + id
  fetch(url, {method: 'GET'})
  .then(response => response.json())
  .then(result => {
    let icon_clock = document.createElement("SPAN");
    icon_clock.className = "fa-regular fa-clock";
    document.getElementById('title_movie').innerHTML = result.title;
    document.getElementById('desc_movie').innerHTML = result.long_description;
    document.getElementById('img_movie').setAttribute("src", result.image_url);
    document.getElementById('year_movie').innerHTML = result.year;
    document.getElementById('score_movie').innerHTML = result.imdb_score;
    document.getElementById('duration_movie').innerHTML = result.duration + ' <span class="fa-regular fa-clock" />';
    document.getElementById('genre_movie').innerHTML = result.genres.join(", ");
    document.getElementById('actors').innerHTML = result.actors.join(", ");
    document.getElementById('directors').innerHTML = result.directors.join(", ");
    document.getElementById('origin').innerHTML = result.countries.join(", ") + ' <span class="fa-solid fa-earth-europe" />';
  })
  .catch(error => console.log('error', error));
}

function toggle_info() {
  const info = document.getElementById('movie_info');
  info.classList.toggle('active');
}



// Object js with the infos we need for the api
const category = {
  'best_movie': { 'url': 'http://localhost:8000/api/v1/titles/?imdb_score_min=9.3',
  'url_2': 'http://localhost:8000/api/v1/titles/?imdb_score_min=9.3&page=2',
  'class': '#slide_top'},
  'categ_1': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Action&min_year=2015',
  'url_2': 'http://localhost:8000/api/v1/titles/?genre=Action&page=2&min_year=2015',
  'class': '#slide_1'},
  'categ_2': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Crime&min_year=2015',
  'url_2': 'http://localhost:8000/api/v1/titles/?genre=Crime&page=2&min_year=2015',
  'class': '#slide_2'},
  'categ_3': { 'url': 'http://localhost:8000/api/v1/titles/?genre=Fantasy&min_year=2015',
  'url_2': 'http://localhost:8000/api/v1/titles/?genre=Fantasy&page=2&min_year=2015',
  'class': '#slide_3'},
}
// for every category, get the movies
for (categ in category) {
  get_info(category[categ].url, category[categ].class)
  get_info(category[categ].url_2, category[categ].class)
}

// call method rain for the loader
rain();
// stop the rain after 3.5sec
setTimeout(stop_rain, 3500);
// force the scroll top at the reload or load
window.scrollTo(0, 0)
// get the search id for apply the css on focus
const navbar = document.getElementById('input_search');
navbar.addEventListener('focus', on_focus_search);