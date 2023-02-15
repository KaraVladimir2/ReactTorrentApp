import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../Hooks/useFetching";
import PostService from "../API/PostsService";
import Loader from "../Components/UI/Loader";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [titleImageURL, setTitleImageURL] = useState("");
  const [screenshotsURL, setScreenshotsURL] = useState([]);
  const [torrentFileURL, setTorrentFileURL] = useState("");

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    setPost(await PostService.getById(id));
    PostService.getTitleImage(id, setTitleImageURL);
    PostService.getScreenshots(id, setScreenshotsURL);
    PostService.getTorrentFile(id, setTorrentFileURL);
    //setComments(...post.comments);
  });

  const downloadFile = () => {
    const element = document.createElement("a");
    element.href = torrentFileURL;
    element.download = post.title + ".torrent";
    element.click();
  };

  useEffect(() => {
    fetchPostById(params.id);
  }, []);

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
                        {post.postDate} | автор:
                        <a href="https://vsetop.org/user/pyau/">pyau</a> |
                        Просмотров: 468
                      </p>
                      <div className="category">
                        <a href="https://vsetop.org/games/">
                          {post.genre.split(", ")[0]}
                        </a>
                      </div>
                    </div>
                  </div>
                  <img className="post-image" src={titleImageURL} alt="img" />
                  <p className="post-build">{post._id}</p>
                  <p>{post.description}</p>
                  <div className="screenshots">
                    <img
                      className="screenshot"
                      src={screenshotsURL[0]}
                      alt="kek"
                    />
                    <img
                      className="screenshot"
                      src={screenshotsURL[1]}
                      alt="kek"
                    />
                    <img
                      className="screenshot"
                      src={screenshotsURL[2]}
                      alt="kek"
                    />
                    <img
                      className="screenshot"
                      src={screenshotsURL[3]}
                      alt="kek"
                    />
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIdPage;
