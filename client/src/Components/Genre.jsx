import React, { useEffect, useState } from "react";
import GenreService from "../API/GenreService";
import MyButton from "./UI/MyButton";

const Genre = ({ setQueryGenre, setVisible }) => {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const getAllGenre = await GenreService.getGenre();
      setGenre([...getAllGenre]);
    };
    fetchGenre();
  }, []);

  return (
    <div>
      {genre.map((element) => {
        return (
          <MyButton
            onClick={(e) => {
              setVisible(false);
              setQueryGenre(e.target.innerHTML);
            }}
            key={element._id}
            style={{ margin: "0 7px" }}
          >
            {element.title}
          </MyButton>
        );
      })}
    </div>
  );
};

export default Genre;
