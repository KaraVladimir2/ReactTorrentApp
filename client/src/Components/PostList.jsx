import React, { useEffect } from "react";
import PostItem from "./PostItem";
import Loader from "./UI/Loader";

const PostList = ({ posts, remove }) => {
  if (!posts.length) {
    return <Loader />;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <PostItem
          key={post._id}
          remove={remove}
          number={index + 1}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostList;
