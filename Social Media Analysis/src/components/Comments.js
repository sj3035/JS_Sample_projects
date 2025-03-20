import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Comments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://20.208.156.105/test/api/posts/${postId}/comments`)
      .then((response) => setComments(response.data.comments))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
