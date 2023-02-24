import Notify from "../utils/Toaster";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

export default class PostService {
  static async getPosts(page, limit, query) {
    return await fetch("http://localhost:5000/posts/getPosts", {
      ...options,
      body: JSON.stringify({ page, limit, query }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
  }

  static async getPostById(id) {
    return await fetch("http://localhost:5000/posts/getPostById", {
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
    formData.append("files", newPost.titleImage);
    [...newPost.screenshots].forEach((element) => {
      formData.append("files", element);
    });
    formData.append("files", newPost.torrentFile);

    await fetch("http://localhost:5000/posts/postSend", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return Notify(data.message);
      });
  }

  static async deletePost(id) {
    await fetch("http://localhost:5000/posts/deletePost", {
      ...options,
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        Notify(data.message);
      });
  }

  static async postComment(text, username, id) {
    await fetch("http://localhost:5000/posts/postComment", {
      ...options,
      body: JSON.stringify({ text, username, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        Notify(data.message);
      });
  }

  static async deleteComment(comment, id) {
    await fetch("http://localhost:5000/posts/deleteComment", {
      ...options,
      body: JSON.stringify({ comment, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        Notify(data.message);
      });
  }
}
