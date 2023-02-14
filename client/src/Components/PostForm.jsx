import React, { useState } from "react";
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({
    title: "",
    genre: "",
    description: "",
    features: "",
    requirements: "",
    shortInfo: "",
    installation: "",
    size: "",
    titleImage: "",
    screenshots: [],
    torrentFile: "",
  });

  const addNewPost = (e) => {
    e.preventDefault();
    create(post);
    setPost({
      title: "",
      genre: "",
      description: "",
      features: "",
      requirements: "",
      shortInfo: "",
      installation: "",
      size: "",
      titleImage: "",
      screenshots: [],
      torrentFile: "",
    });
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.genre}
        onChange={(e) => setPost({ ...post, genre: e.target.value })}
        type="text"
        placeholder="Жанр"
      />
      <MyInput
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
        type="text"
        placeholder="Описание"
      />
      <MyInput
        value={post.features}
        onChange={(e) => setPost({ ...post, features: e.target.value })}
        type="text"
        placeholder="Особенности игры"
      />
      <MyInput
        value={post.requirements}
        onChange={(e) => setPost({ ...post, requirements: e.target.value })}
        type="text"
        placeholder="Системные требования"
      />
      <MyInput
        value={post.shortInfo}
        onChange={(e) => setPost({ ...post, shortInfo: e.target.value })}
        type="text"
        placeholder="Короткая информация"
      />
      <MyInput
        value={post.installation}
        onChange={(e) => setPost({ ...post, installation: e.target.value })}
        type="text"
        placeholder="Установка игры"
      />
      <MyInput
        value={post.size}
        onChange={(e) => setPost({ ...post, size: e.target.value })}
        type="text"
        placeholder="Размер"
      />
      <p>Главная картинка</p>
      <MyInput
        onChange={(e) => setPost({ ...post, titleImage: e.target.files[0] })}
        type="file"
        placeholder="Файл"
      />
      <p>Скриншоты</p>
      <MyInput
        onChange={(e) => setPost({ ...post, screenshots: e.target.files })}
        type="file"
        multiple={true}
        placeholder="Файл"
      />
      <p>Торрент файл</p>
      <MyInput
        onChange={(e) => setPost({ ...post, torrentFile: e.target.files[0] })}
        type="file"
        placeholder="Файл"
      />

      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
