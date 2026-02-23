class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Erro HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("Não foi possível carregar os cards", err);
        return [];
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`);
      })
      .catch((error) => {
        console.error("Erro HTTP:", error);
      });
  }

  updateUserInfo(formData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Erro ao atualizar perfil: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(cardData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Erro HTTP ao adicionar card: ${res.status}`);
      })
      .catch((error) => {
        console.error("Erro HTTP:", error);
      });
  }

  handleDeleteClick(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Erro HTTP ao excluir card: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error("Erro ao excluir card:", err);
      });
  }

  // Descurtir um cartão
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao descurtir Api.js: ${res.status}`);
      }
      return res.json();
    });
  }

  // curtir um cartão
  likeCard(cardId) {
    console.log("Clicou no like! CardId:", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao curtir Api.js: ${res.status}`);
      }
      return res.json();
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao curtir Api.js: ${res.status}`);
      }
      return res.json();
    });
  }

  getUserAvatar() {
    return fetch(`${this._baseUrl}/users/me/`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Erro: ${res.status}`);
      })
      .catch((error) => {
        console.error("Erro HTTP:", error); // aqui error já contém a mensagem
      });
  }

  updateUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: avatarUrl.avatar,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro ao atualizar avatar: ${res.status}`);
      }
      return res.json();
    });
  }
}

/// Cria e exporta uma constante 'api' que contém uma instância da classe 'Api' acima para buscar dados de uma API
export const api = new Api({
  baseUrl: "https://backend-2xrp.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
