import Posts from "../Pages/Posts";
import PostIdPage from "../Pages/PostIdPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";

export const privateRoutes = [
  { path: "/posts", component: Posts, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
  { path: "/profile", component: Profile, exact: true },
];

export const publicRoutes = [
  { path: "/posts", component: Posts, exact: true },
  { path: "/posts/:id", component: PostIdPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
  { path: "/profile", component: Profile, exact: true },
];
