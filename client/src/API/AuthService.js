import Notify from "../utils/Toaster";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

export default class PostService {
  static async register(username, password, setToken, notify) {
    await fetch("http://localhost:5000/auth/register", {
      ...options,
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        Notify(data.message);
        setToken(data.token);
      });
  }

  static async login(username, password, setToken, notify) {
    await fetch("http://localhost:5000/auth/login", {
      ...options,
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        Notify(data.message);
        setToken(data.token);
      });
  }
}
