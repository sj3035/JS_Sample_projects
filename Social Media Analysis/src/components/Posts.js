import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://20.208.156.105/test/api/posts/${userId}`)
      .then((response) => setPosts(response.data.posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [userId]);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/comments/${post.id}`}>{post.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
