const list_group = document.querySelector('[data-list-group]')
const dataPanel = document.querySelector('[data-display-movies]')
const BASE_URL = "https://movie-list.alphacamp.io"
const INDEX_URL = BASE_URL + "/api/v1/movies"
const POSTER_UR = BASE_URL + "/posters/"
const movies_genres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}


// list group
for (let value in movies_genres) {
  let list = `<a href="#" class='list-group-item list-group-item-action' id=${value}>${movies_genres[value]}</a>`
  list_group.innerHTML += list
}

//display movies
list_group.addEventListener("click", function () {
  let thisID = Number(event.target.id)
  let dataPanelHTML = ''
  dataPanel.innerHTML = ''
  axios.get(INDEX_URL)
    .then(response => {
      let data = response.data.results
      for (let index of data) {
        if (index.genres.includes(thisID)) {
          dataPanelHTML += `
          <div class="col-sm-4 float-left">
            <div class="card m-3" style="width: 15rem;">
              <img src="${POSTER_UR + index.image}" class="card-img-top" alt="poster img">
              <div class="card-body" style="height: 8rem">
                <h6 class="card-title">${index.title}</h6>
                ${moviesLabel(index)}
              </div>
            </div>
          </div>  
          `
        }
      }
      dataPanel.innerHTML += dataPanelHTML
    })
})

//display movies label function
function moviesLabel(index) {
  let thisGenres = index.genres
  let labelHTML = ''
  for (let label of thisGenres) {
    labelHTML += `
      <span class="badge badge-pill badge-light">${movies_genres[label]}</span>
    `
  }
  return labelHTML
} 