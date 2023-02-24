import React, { useContext } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import PostService from "../API/PostsService";
import { TokenContext } from "../Context";
import CommentsList from "./CommentsList";

const Comment = ({ username, post, setPost, userComment, setUserComment }) => {
  const { isAuth } = useContext(TokenContext);

  const postComment = async () => {
    await PostService.postComment(userComment, username, post._id);
    setUserComment("");
    const updatedPost = await PostService.getPostById(post._id);
    setPost({
      ...post,
      comments: updatedPost.comments,
    });
  };

  const deleteComment = async (comment) => {
    await PostService.deleteComment(comment, post._id);
    const updatedPost = await PostService.getPostById(post._id);
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
      <CommentsList comments={post.comments} deleteComment={deleteComment} />
    </div>
  );
};

export default Comment;
