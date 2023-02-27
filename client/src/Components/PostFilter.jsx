import React, { useRef } from "react";
import MyButton from "./UI/MyButton";
import MyInput from "./UI/MyInput";

const PostFilter = ({ search, setSearch }) => {
  const searchQuery = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(searchQuery.current.value);
    searchQuery.current.value = "";
  };

  return (
    <form onSubmit={submitHandler} className="filter-wrapper">
      <h3>Поиск</h3>
      <MyInput ref={searchQuery} defaultValue={search} placeholder="Поиск..." />
      <MyButton>Поиск</MyButton>
    </form>
  );
};

export default PostFilter;
