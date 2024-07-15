import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./Pages/SignUp";
import Footer from "./components/Footer";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import OnlyAdminPrivateRoute from "./components/OlyAdminPrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
