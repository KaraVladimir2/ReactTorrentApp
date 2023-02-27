const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

export default class PostService {
  static async getGenre() {
    return await fetch("http://localhost:5000/genre/getGenre", {
      ...options,
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
  }

  static async addGenre(newGenre) {
    await fetch("http://localhost:5000/genre/addGenre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ newGenre }),
    });
  }
}
