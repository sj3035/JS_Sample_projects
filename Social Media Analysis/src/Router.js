import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Users from "./components/Users";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="/comments/:postId" element={<Comments />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
