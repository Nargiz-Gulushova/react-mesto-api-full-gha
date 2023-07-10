// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://api.mesto.nomoredomains.work";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({ email, password }) => {
  return fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const login = ({ email, password }) => {
  return fetch(BASE_URL + "/signin", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const checkCookie = () => {
  return fetch(BASE_URL + "/users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
};

export const signOut = () => {
  return fetch(BASE_URL + "/signout", {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
};
