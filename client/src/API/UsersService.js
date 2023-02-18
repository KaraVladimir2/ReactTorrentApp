const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

export default class PostService {
  static async getUserInfo(token) {
    return await fetch("http://localhost:5000/users/getUserInfo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
      mode: "cors",
    });
  }
}
