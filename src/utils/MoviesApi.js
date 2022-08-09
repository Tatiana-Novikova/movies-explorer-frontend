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

  getMovies() {
    return fetch(this._address, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}
  
const MoviesApi = new Api ({
  address: 'https://api.nomoreparties.co/beatfilm-movies',
})
  
export default MoviesApi;
