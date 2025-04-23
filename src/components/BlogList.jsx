import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/posts")
      .then((res) => setBlogs(res.data.posts.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-list">
      <input
        type="text"
        placeholder="Search blog by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {filteredBlogs.map(blog => (
        <div key={blog.id} className="blog-card">
          <h2>{blog.title}</h2>
          <p>{blog.body.substring(0, 100)}...</p>
          <Link to={`/blog/${blog.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;