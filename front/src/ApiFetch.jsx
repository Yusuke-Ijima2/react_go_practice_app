import React, { useState, useEffect } from "react";

const ApiFetch = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/user/id", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiFetch;
