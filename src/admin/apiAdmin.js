import { API } from "../config";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const authenticate = (data, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    cb();
  }
};

export const signout = cb => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    cb();
    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => {
        // console.log("signout", response);
      })
      .catch(err => console.error(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  //If jwt undefined in local storage crash !!
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
