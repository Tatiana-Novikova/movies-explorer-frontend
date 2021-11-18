class Api {
  constructor(options) {
    this._address = options.address;
    this._token = options.token;
    this._cohortId = options.cohortId;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  _makeRequest ({ endpoint, method, body }) {
    const fetchInit = {
      method: method,  
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    };
    return fetch (
      `${this._address}/${this._cohortId}/${endpoint}`,
      body 
        ? { ...fetchInit, body: JSON.stringify(body) } 
        : fetchInit
    )
    .then (
      this._checkResponse
    )
  }

  getCurrentUser () {
    return this._makeRequest({
      endpoint: 'users/me', 
      method: 'GET'
    });
  }

  updateProfile (user) {
    return this._makeRequest({
      endpoint: 'users/me', 
      method: 'PATCH',
      body: user
    });
  }
  
  getMoviesCards () {
    return this._makeRequest({
      endpoint: 'movies', 
      method: 'GET'
    });
  }

  search(query) {
    return this._makeRequest({
      endpoint: `movies/search/${query}`,
      method: 'GET'
    })
  }

  deleteCard (cardID) {
    return this._makeRequest({
      endpoint: `movies/${cardID}`, 
      method: 'DELETE'
    });
  }
}

const api = new Api ({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'c846985c-30b9-4d91-bdf7-4d0b3c99bbf7',
  cohortId: 'cohort-24',
})

export default api;
