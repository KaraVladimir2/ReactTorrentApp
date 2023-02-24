import React, { useContext } from "react";
import { TokenContext } from "../Context";
import MyButton from "./UI/MyButton";

const CommentsList = ({ comments, deleteComment }) => {
  const { isAdmin } = useContext(TokenContext);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <table key={comment.date} className="comment">
            <tbody>
              <tr>
                <th colSpan="2">
                  Написал: {comment.owner} | Дата: {comment.date}{" "}
                  {isAdmin && (
                    <MyButton onClick={() => deleteComment(comment)}>
                      Удалить
                    </MyButton>
                  )}
                </th>
              </tr>
              <tr>
                <td className="comment-user-info">
                  <img
                    className="comment-avatar"
                    src="https://vsetop.org/templates/vsetop/dleimages/noavatar.png"
                    alt="Аватар"
                  />
                </td>
                <td className="commentText">
                  <p>{comment.text}</p>
                </td>
              </tr>
              <tr className="comment_bottom">
                <td colSpan="2"></td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default CommentsList;
