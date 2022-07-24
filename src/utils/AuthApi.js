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
 
  register(name, email, password) { 
    return fetch(`${this._address}/signup`, { 
      method: 'POST', 
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    })
    .then(this._checkResponse)
  }
  
  login(email, password) { 
    return fetch(`${this._address}/signin`, { 
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }) 
    }) 
    .then(this._checkResponse)
  }

  logout() {
    return fetch(`${this._address}/signout`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(this._checkResponse)
    .catch((error) => {
      console.log(error);
    });
  };

  getCurrentUser() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  editProfile(userInfo) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
      }),
    })
      .then(this._checkResponse);
  }
}

const AuthApi = new Api ({
  address: 'https://api.movies-explorer.nomoredomains.work',
  // address: 'http://localhost:3000',
})

export default AuthApi;
