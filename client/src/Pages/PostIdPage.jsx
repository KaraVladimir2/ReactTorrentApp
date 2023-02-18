import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetching } from "../Hooks/useFetching";
import PostService from "../API/PostsService";
import Loader from "../Components/UI/Loader";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Comment from "../Components/Comment";
import { TokenContext } from "../Context";
import createFileUrl from "../utils/createFileUrl";

const PostIdPage = () => {
  const params = useParams();
  const { isAdmin, username } = useContext(TokenContext);
  const [post, setPost] = useState(null);
  const [titleImageURL, setTitleImageURL] = useState("");
  const [screenshotsURL, setScreenshotsURL] = useState([]);
  const [torrentFileURL, setTorrentFileURL] = useState("");
  const [userComment, setUserComment] = useState("");
  const router = useHistory();

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    setPost(await PostService.getById(id));
  });

  const downloadFile = () => {
    const element = document.createElement("a");
    element.href = torrentFileURL;
    element.download = post.title + ".torrent";
    element.click();
  };

  const deletePost = () => {
    PostService.deletePost(post._id);
    router.push(`/posts`);
  };

  useEffect(() => {
    fetchPostById(params.id);
  }, []);

  useEffect(() => {
    if (post) {
      createFileUrl(post.titleImage, setTitleImageURL);
      createFileUrl(post.screenshots, setScreenshotsURL);
      createFileUrl(post.torrentFile, setTorrentFileURL);
    }
  }, [post]);

  return (
    <div>
      <div className="App">
        <Header />
        <div className="container">
          <div className="content">
            <Navbar />
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
                      <h1 className="post-name">{post.title}</h1>
                    </div>
                    <div className="post-title-down">
                      <p className="postfooter">
                        {post.postDate} | Просмотров: 468
                      </p>
                      {isAdmin && (
                        <button
                          className="delete-button myBtn"
                          onClick={deletePost}
                        >
                          Удалить
                        </button>
                      )}
                      <div className="category">
                        <a href="https://vsetop.org/games/">
                          {post.genre.split(", ")[0]}
                        </a>
                      </div>
                    </div>
                  </div>
                  <img className="post-image" src={titleImageURL} alt="title" />
                  <p className="post-build">{post._id}</p>
                  <p>{post.description}</p>
                  <div className="screenshots">
                    {screenshotsURL.map((screenshot) => {
                      return (
                        <img
                          key={screenshot}
                          className="screenshot"
                          src={screenshot}
                          alt="screenshot"
                        />
                      );
                    })}
                  </div>
                  <p className="margin-top">
                    <b>Системные требования:</b>
                  </p>
                  <div>
                    {post.requirements.split(";").map((requirement, index) => {
                      return <p key={index}>{requirement}</p>;
                    })}
                  </div>
                  <div className="margin-top">
                    {post.shortInfo.split(";").map((info, index) => {
                      return <p key={index}>{info}</p>;
                    })}
                  </div>
                  <p className="margin-top">Размер: {post.size}</p>
                  <b>Скачать {post.title} - торрент</b>
                  <button
                    className="btn btn-1 hover-filled-opacity"
                    onClick={downloadFile}
                    value="download"
                  >
                    <span>Скачать</span>
                  </button>
                </div>
                <Comment
                  username={username}
                  id={post._id}
                  post={post}
                  setPost={setPost}
                  userComment={userComment}
                  setUserComment={setUserComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIdPage;
