import React, { useState } from "react";
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";

const GenreForm = ({ create }) => {
  const [genre, setGenre] = useState("");

  const addNewGenre = (e) => {
    e.preventDefault();
    create(genre);
    setGenre("");
  };

  return (
    <form>
      <MyInput
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        type="text"
        placeholder="Жанр"
      />
      <MyButton onClick={addNewGenre}>Добавить жанр</MyButton>
    </form>
  );
};

export default GenreForm;
