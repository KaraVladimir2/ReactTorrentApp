import React, { useContext, useEffect, useRef, useState } from "react";
import PostService from "../API/PostsService";
import { usePosts } from "../Hooks/usePosts";
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

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  const { isAdmin } = useContext(TokenContext);

  const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
  };

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(page);
      setPosts([...response]);
    }
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = async (newPost) => {
    setModal(false);
    PostService.sendPost(newPost);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
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

          <PostFilter filter={filter} setFilter={setFilter} />
          {postError && <h1>Произошла ошибка ${postError}</h1>}
          <PostList remove={removePost} posts={sortedAndSearchedPosts} />
          <Pagination
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
