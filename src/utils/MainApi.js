class Api {
  constructor(options) {
    this._address = options.address;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  _makeRequest({ endpoint, method, body }) {
    const fetchInit = {
      method: method,  
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    };
    return fetch (
      `${this._address}/${endpoint}`,
      body 
        ? { ...fetchInit, body: JSON.stringify(body) } 
        : fetchInit
    )
    .then (
      this._checkResponse
    )
  }

  getCurrentUser() {
    return this._makeRequest({
      endpoint: 'users/me', 
      method: 'GET'
    });
  }

  updateProfile(user) {
    return this._makeRequest({
      endpoint: 'users/me', 
      method: 'PATCH',
      body: user
    });
  }
}

const MainApi = new Api ({
  address: 'https://api.movies-explorer.nomoredomains.work'
})

export default MainApi;
