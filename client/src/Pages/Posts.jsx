import React, { useContext, useEffect, useState } from "react";
import PostService from "../API/PostsService";
import { useFetching } from "../Hooks/useFetching";
import PostFilter from "../Components/PostFilter";
import PostList from "../Components/PostList";
import Pagination from "../Components/Pagination";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { TokenContext } from "../Context";
import AdminPanel from "../Components/AdminPanel";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchedPostsCount, setSearchedPostsCount] = useState(1);
  const { isAdmin } = useContext(TokenContext);

  const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
  };

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      search === "" ? setLimit(10) : setLimit(10000000);
      const getAll = await PostService.getPosts(page, limit, search, genre);
      setSearchedPostsCount([...getAll.data].length);
      setPosts([...getAll.data]);
      setTotalPages(getPageCount(getAll.totalPostCount, limit));
    }
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit, search, genre]);

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
          <Navbar setGenre={setGenre} />
          {isAdmin ? <AdminPanel /> : null}

          <PostFilter search={search} setSearch={setSearch} />
          {postError && <h1>Произошла ошибка ${postError}</h1>}
          {searchedPostsCount ? (
            <PostList posts={posts} />
          ) : (
            <h1>Постов не найдено</h1>
          )}

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
