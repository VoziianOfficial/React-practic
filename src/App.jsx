import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import NotFound from "./pages/NotFound/NotFound";
// import Users from "./pages/Users/Users";
// import UserDetails from "./pages/UserDerails/UserDetails";
// import PostsByUser from "./components/PostByUser/PostByUser";
// import PostDetails from "./components/PostDetails/PostDetails";
import { lazy, Suspense } from "react";

const About = lazy(() => import("./pages/About/About"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Users = lazy(() => import("./pages/Users/Users"));
const UserDetails = lazy(() => import("./pages/UserDerails/UserDetails"));
const PostsByUser = lazy(() => import("./components/PostByUser/PostByUser"));
const PostDetails = lazy(() => import("./components/PostDetails/PostDetails"));

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<h2>Loading by Suspense</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserDetails />}>
            <Route path="info" element={<h2>lorem ipsum</h2>} />
            <Route path="posts" element={<PostsByUser />}>
              <Route path=":postId/details" element={<PostDetails />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default App;
