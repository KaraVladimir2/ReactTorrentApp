import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import GenreForm from "./GenreForm";
import MyModal from "./MyModal";
import PostForm from "./PostForm";
import MyButton from "./UI/MyButton";
import GenreService from "../API/GenreService";
import PostService from "../API/PostsService";

const AdminPanel = () => {
  const [modalPost, setModalPost] = useState(false);
  const [modalGenre, setModalGenre] = useState(false);
  const router = useHistory();

  const createPost = async (newPost) => {
    setModalPost(false);
    await PostService.sendPost(newPost);
    router.go(0);
  };

  const createGenre = async (newGenre) => {
    setModalGenre(false);
    await GenreService.addGenre(newGenre);
    router.go(0);
  };

  return (
    <div className="admin-panel">
      <MyButton onClick={() => setModalPost(true)}>Добавить пост</MyButton>
      <MyModal visible={modalPost} setVisible={setModalPost}>
        <PostForm create={createPost} />
      </MyModal>
      <MyButton onClick={() => setModalGenre(true)}>Добавить жанр</MyButton>
      <MyModal visible={modalGenre} setVisible={setModalGenre}>
        <GenreForm create={createGenre} />
      </MyModal>
    </div>
  );
};

export default AdminPanel;
