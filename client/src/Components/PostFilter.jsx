import React from "react";
import MyInput from "./UI/MyInput";

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div className="filter-wrapper">
      <h3>Поиск</h3>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default PostFilter;
