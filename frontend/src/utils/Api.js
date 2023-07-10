import { apiSettings } from "./apiConfig";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._options = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _fetch(url) {
    if (this._options.method === 'GET' && this._options.body) {
      delete this._options.body;
    }

    return fetch(url, this._options).then(this._checkResponse);
  }

  // получаем все карточки с сервера
  getInitialCards() {
    this._options.method = 'GET';

    return this._fetch(`${this._baseUrl}/cards`);
  }

  // создаем новую карточку (POST)
  addNewCard({ name, link }) {
    this._options.method = 'POST';
    this._options.body = JSON.stringify({ name, link });

    return this._fetch(`${this._baseUrl}/cards`);
  }

  // • получить данные пользователя (GET)
  getUserInfo() {
    this._options.method = 'GET';

    return this._fetch(`${this._baseUrl}/users/me`);
  }
  //
  // • заменить данные пользователя (PATCH)
  changeUserInfo({ name, about }) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({ name, about });

    return this._fetch(`${this._baseUrl}/users/me`);
  }
  // • заменить аватар (PATCH)
  changeAvatar({ avatar }) {
    this._options.method = 'PATCH';
    this._options.body = JSON.stringify({ avatar });

    return this._fetch(`${this._baseUrl}/users/me/avatar`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    this._options.method = isLiked ? "DELETE" : "PUT";

    return this._fetch(`${this._baseUrl}/cards/${cardId}/likes/`);
  }

  // • удалить карточку (DELETE)
  deleteCard(cardId) {
    this._options.method = 'DELETE';

    return this._fetch(`${this._baseUrl}/cards/${cardId}`);
  }
}

const api = new Api(apiSettings);

export default api;