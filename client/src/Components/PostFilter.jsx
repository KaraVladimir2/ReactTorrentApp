import React from "react";
import MyInput from "./UI/MyInput";

const PostFilter = ({ search, setSearch }) => {
  return (
    <div className="filter-wrapper">
      <h3>Поиск</h3>
      <MyInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default PostFilter;
