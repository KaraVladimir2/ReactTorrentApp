const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

export default class PostService {
  static async register(username, password, setToken, notify) {
    await fetch("http://localhost:5000/register", {
      ...options,
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        notify(data.message);
        setToken(data.token);
      });
  }

  static async login(username, password, setToken, notify) {
    await fetch("http://localhost:5000/login", {
      ...options,
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        notify(data.message);
        setToken(data.token);
      });
  }

  static async getUserInfo(token) {
    const data = await fetch("http://localhost:5000/getUserInfo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
    });
    return data;
  }
}