import React from "react";
import PostItem from "./PostItem";
import Loader from "./UI/Loader";

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <Loader />;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <PostItem key={post._id} number={index + 1} post={post} />
      ))}
    </div>
  );
};

export default PostList;
