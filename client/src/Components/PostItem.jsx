import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PostService from "../API/PostsService";
import { useFetching } from "../Hooks/useFetching";
import Loader from "./UI/Loader";

const PostItem = (props) => {
  const router = useHistory();
  const [titleImageURL, setTitleImageURL] = useState("");
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    await PostService.getTitleImage(id, setTitleImageURL);
  });

  useEffect(() => {
    fetchPostById(props.post._id);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="post">
          <div className="post-content">
            <div className="post-title">
              <img
                src="https://vsetop.org/templates/vsetop/images/news.png"
                alt="Новости"
                className="news"
              />
              <div className="post-title-up">
                <h1 onClick={() => router.push(`/posts/${props.post._id}`)}>
                  {props.post.title}
                </h1>
              </div>
              <div className="post-title-down">
                <p className="postfooter">
                  {props.post.postDate} | автор:
                  <a href="https://vsetop.org/user/pyau/">pyau</a> | Просмотров:
                  468
                </p>
                <div className="category">
                  <a href="https://vsetop.org/games/">
                    {props.post.genre.split(", ")[0]}
                  </a>
                </div>
              </div>
            </div>
            <img className="post-image" src={titleImageURL} alt="img" />
            <p className="post-build">{props.post._id}</p>
            <p>{props.post.description}</p>
            <div className="post-detail-buttons">
              <a
                className="post-detail"
                onClick={() => router.push(`/posts/${props.post.id}`)}
              >
                Подробнее
              </a>
              <a
                className="post-detail"
                onClick={() => router.push(`/posts/${props.post.id}`)}
              >
                Комментарии ({props.post.comments.lenght || 0})
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
