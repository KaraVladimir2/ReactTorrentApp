import About from "../Pages/About";
import Posts from "../Pages/Posts";
import PostIdPage from "../Pages/PostIdPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const privateRoutes = [
  { path: "/about", component: About, exact: true },
  { path: "/posts", component: Posts, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
];

export const publicRoutes = [
  { path: "/about", component: About, exact: true },
  { path: "/posts", component: Posts, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
];
