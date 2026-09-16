import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  selectPosts,
  selectTotalPosts,
  selectShortPosts,
  selectLongPosts,
} from "../features/posts/selectors";

function Dashboard() {
  const posts = useSelector(selectPosts);
  const totalPosts = useSelector(selectTotalPosts);
  const shortPosts = useSelector(selectShortPosts);
  const longPosts = useSelector(selectLongPosts);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  let filteredPosts = posts;

  if (filter === "short") {
    filteredPosts = shortPosts;
  }

  if (filter === "long") {
    filteredPosts = longPosts;
  }

  filteredPosts = filteredPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <h1>📊 Redux Selector Dashboard</h1>

      <input
        type="text"
        placeholder="🔍 Search Posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="stats">

        <div className="card blue">
          <h2>{totalPosts}</h2>
          <p>Total Posts</p>
        </div>

        <div className="card green">
          <h2>{shortPosts.length}</h2>
          <p>Short Posts</p>
        </div>

        <div className="card orange">
          <h2>{longPosts.length}</h2>
          <p>Long Posts</p>
        </div>

      </div>

      <div className="buttons">
        <button onClick={() => setFilter("all")}>All</button>

        <button onClick={() => setFilter("short")}>
          Short
        </button>

        <button onClick={() => setFilter("long")}>
          Long
        </button>
      </div>

      <div className="list">

        {filteredPosts.map((post) => (
          <div key={post.id} className="post">
            {post.title}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;
