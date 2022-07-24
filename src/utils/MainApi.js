const BASE_MOVIE_URL = 'https://api.nomoreparties.co';

class Api {
  constructor(options) {
    this._address = options.address;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getCurrentUser() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: BASE_MOVIE_URL + movie.image.url,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: BASE_MOVIE_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      }),
    })
    .then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._address}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}

const MainApi = new Api ({
  address: 'https://api.movies-explorer.nomoredomains.work',
  // address: 'http://localhost:3000',
})

export default MainApi;
