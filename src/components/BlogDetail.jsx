import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [country, setCountry] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));

    axios.get("https://restcountries.com/v3.1/name/india")
      .then((res) => setCountry(res.data[0]))
      .catch((err) => console.error(err));
  }, [id]);

  const handleLike = () => setLikes(prev => prev + 1);

  const handleAddComment = () => {
    if (commentInput.trim() !== "") {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>
      <button onClick={handleLike}>Like ({likes})</button>

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((c, index) => (
          <p key={index}>{c}</p>
        ))}
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>

      {country && (
        <div className="country-info">
          <h3>Country Info (India):</h3>
          <p>Capital: {country.capital[0]}</p>
          <p>Region: {country.region}</p>
          <img src={country.flags.svg} alt="flag" style={{ width: "100px" }} />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;