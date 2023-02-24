import React, { useContext, useEffect, useState } from "react";
import PostService from "../API/PostsService";
import { useFetching } from "../Hooks/useFetching";
import MyButton from "../Components/UI/MyButton";
import PostForm from "../Components/PostForm";
import MyModal from "../Components/MyModal";
import PostFilter from "../Components/PostFilter";
import PostList from "../Components/PostList";
import Pagination from "../Components/Pagination";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { TokenContext } from "../Context";
import { useHistory } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { isAdmin } = useContext(TokenContext);
  const router = useHistory();

  const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
  };

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      search === "" ? setLimit(10) : setLimit(10000000);
      const getAll = await PostService.getPosts(page, limit, search);
      setPosts([...getAll.data]);
      setTotalPages(getPageCount(getAll.totalPostCount, limit));
    }
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit, search]);

  const createPost = async (newPost) => {
    setModal(false);
    await PostService.sendPost(newPost);
    router.go(0);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPosts([]);
    setSearch("");
    window.scrollTo(0, 0);
    setPage(page);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="content">
          <Navbar />
          {isAdmin ? (
            <>
              <MyButton
                style={{ marginTop: 30 }}
                onClick={() => setModal(true)}
              >
                Создать
              </MyButton>
              <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
              </MyModal>
              <hr style={{ margin: "15px 0" }} />
            </>
          ) : null}

          <PostFilter search={search} setSearch={setSearch} />
          {postError && <h1>Произошла ошибка ${postError}</h1>}
          <PostList remove={removePost} posts={posts} />
          <Pagination
            postsLen={posts.length}
            page={page}
            changePage={changePage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export default Posts;
