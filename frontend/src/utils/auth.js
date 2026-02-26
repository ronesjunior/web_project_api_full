class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/users/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleServerResponse);
  }

  getUserAuth(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleServerResponse);
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/users/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleServerResponse);
  }
}

/// Cria e exporta uma constante 'api' que contém uma instância da classe 'Api' acima para buscar dados de uma API
export const auth = new AuthApi({
  // baseUrl: "https://backend-2xrp.onrender.com",
  baseUrl: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});
