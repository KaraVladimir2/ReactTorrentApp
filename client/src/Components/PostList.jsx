import React from "react";
import PostItem from "./PostItem";
import Loader from "./UI/Loader";

const PostList = ({ posts, remove }) => {
  if (!posts.length) {
    return <Loader />;
  }

  return (
    <div>
      {posts.reverse().map((post, index) => (
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
