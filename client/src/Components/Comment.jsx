import React, { useContext, useState } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import Notify from "../utils/Toaster";
import PostService from "../API/PostsService";
import { TokenContext } from "../Context";
import CommentsList from "./CommentsList";

const Comment = ({ username, id, post, setPost }) => {
  const [userComment, setUserComment] = useState("");
  const { isAuth } = useContext(TokenContext);

  const postComment = async () => {
    await PostService.postComment(userComment, username, id, Notify);
    setUserComment("");
    const updatedPost = await PostService.getById(post._id);
    setPost({
      ...post,
      comments: updatedPost.comments,
    });
  };

  return (
    <div className="comments">
      {isAuth && (
        <div className="write-comment">
          <p>Оставить комментарий</p>
          <MyInput
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            type="text"
            placeholder="Комментарий"
          />
          <MyButton onClick={postComment}>Отправить</MyButton>
        </div>
      )}
      <CommentsList comments={post.comments} />
    </div>
  );
};

export default Comment;
