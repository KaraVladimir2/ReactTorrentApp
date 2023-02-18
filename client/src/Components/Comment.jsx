import React, { useContext, useEffect } from "react";
import MyInput from "../Components/UI/MyInput";
import MyButton from "../Components/UI/MyButton";
import PostService from "../API/PostsService";
import { TokenContext } from "../Context";
import CommentsList from "./CommentsList";

const Comment = ({
  username,
  id,
  post,
  setPost,
  userComment,
  setUserComment,
}) => {
  const { isAuth } = useContext(TokenContext);
  let reverseComments = post.comments.reverse();

  const postComment = async () => {
    await PostService.postComment(userComment, username, id);
    setUserComment("");
    const updatedPost = await PostService.getById(post._id);
    setPost({
      ...post,
      comments: updatedPost.comments,
    });
  };

  useEffect(() => {
    reverseComments.reverse();
  }, []);

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
      <CommentsList comments={reverseComments} />
    </div>
  );
};

export default Comment;
