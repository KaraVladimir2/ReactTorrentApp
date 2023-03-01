import Notify from "../utils/Toaster";

export default class PostService {
  static async getInfoFromToken(token) {
    return await fetch("http://localhost:5000/users/getInfoFromToken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
      mode: "cors",
    });
  }

  static async getUser(token) {
    return await fetch("http://localhost:5000/users/getUser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "GET",
      mode: "cors",
    });
  }

  static async setUser(updatedUser) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedUser));
    formData.append("avatar", updatedUser.avatar);

    await fetch("http://localhost:5000/users/setUser", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return Notify(data.message);
      });
  }
}
