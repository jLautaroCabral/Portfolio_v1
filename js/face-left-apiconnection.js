let firestoreAPI = axios.create({
    baseURL: 'https://us-central1-portfolio2025-7eba6.cloudfunctions.net/',
    headers: {
      'Content-Type': 'application/json',
    },
});

let moviesContainer = document.querySelector('#tbody-countriesTable');
let searchForm = document.querySelector('#searchForm');
let searchFormInput = document.querySelector('#searchForm input');

let movieDetailTitle = document.querySelector('.movieDetail-title');
let movieDetailDescription = document.querySelector('.movieDetail-description');
let movieDetailScore = document.querySelector('.movieDetail-score');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getMoviesBySearch(searchFormInput.value);
});

getTrendingMovies();


function createMovies(movies, container) {
    container.innerHTML = '';
  
    movies.forEach(movie => {
        let movieRow = document.createElement('tr');
        let movieRowName = document.createElement('th');
        let movieRowScore = document.createElement('th');
        let movieRowReleaseDate = document.createElement('th');
        //
        //th

        movieRowName.innerHTML = movie.title;
        
        movieRowScore.innerHTML = parseFloat(movie.vote_average.toFixed(2));
        movieRowReleaseDate.innerHTML = movie.release_date;
        movieRow.appendChild(movieRowName);
        movieRow.appendChild(movieRowScore);
        movieRow.appendChild(movieRowReleaseDate);
        container.appendChild(movieRow);
      
        movieRow.addEventListener('click', () => {
            getMovieById(movie.id);
        });
    });
}


async function getMoviesBySearch(query) {
    const {data} = await firestoreAPI('getMoviesBySearch?movieName=' + query);
    // console.log("The movies by search are...")
    // console.log(data)
    createMovies(data.results, moviesContainer);
}

async function getTrendingMovies() {
    const { data } = await firestoreAPI('getTrendingMovies');
    // console.log("The trending movies are...")
    // console.log(data)
    createMovies(data, moviesContainer);
}

async function getMovieById(id) {
    const {data: movie} = await firestoreAPI('getMovieByID?movieID=' + id);
    // console.log("The movie details are...")
    // console.log(movie)

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
}