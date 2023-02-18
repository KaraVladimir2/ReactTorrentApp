import { Buffer } from "buffer";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

export default class PostService {
  static async getAll(page, limit) {
    return await fetch("http://localhost:5000/getPosts", {
      ...options,
      body: JSON.stringify({ page, limit }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
  }

  static async getById(id) {
    return await fetch("http://localhost:5000/getPostById", {
      ...options,
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
  }

  static async sendPost(newPost) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(newPost));
    formData.append("myImage", newPost.titleImage);
    [...newPost.screenshots].forEach((element) => {
      formData.append("myImage", element);
    });
    formData.append("myImage", newPost.torrentFile);

    await fetch("http://localhost:5000/postSend", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return alert(data.message);
      });
  }

  static async deletePost(id, notify) {
    await fetch("http://localhost:5000/deletePost", {
      ...options,
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        notify(data.message);
      });
  }

  static async postComment(text, username, id, notify) {
    await fetch("http://localhost:5000/postComment", {
      ...options,
      body: JSON.stringify({ text, username, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        notify(data.message);
      });
  }

  static async getTitleImage(id, setImage) {
    await fetch("http://localhost:5000/getTitleImage?id=" + id, {
      method: "GET",
    })
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const blob = new Blob([data]);
        const objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
      });
  }

  static async getScreenshots(id, setScreenshots) {
    await fetch("http://localhost:5000/getScreenshots?id=" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const buffers = data.map((buf) => Buffer.from(buf.data));
        const objectURL = [];
        buffers.map((buffer) => {
          const blob = new Blob([buffer]);
          return objectURL.push(URL.createObjectURL(blob));
        });
        setScreenshots(objectURL);
      });
  }

  static async getTorrentFile(id, setFile) {
    await fetch("http://localhost:5000/getTorrentFile?id=" + id, {
      method: "GET",
    })
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const blob = new Blob([data]);
        const objectURL = URL.createObjectURL(blob);
        setFile(objectURL);
      });
  }
}
