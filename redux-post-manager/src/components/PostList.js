import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  updatePost,
  deletePost,
} from "../features/posts/postsSlice";

function PostList() {
  const [title, setTitle] = useState("");
const posts = useSelector((state) => state.posts.items);
  const dispatch = useDispatch();

  const handleAddPost = () => {
    if (title.trim() === "") return;

    dispatch(
      addPost({
        id: Date.now(),
        title: title,
      })
    );

    setTitle("");
  };

  const handleUpdatePost = (post) => {
    const newTitle = prompt("Enter new title:", post.title);

    if (newTitle) {
      dispatch(
        updatePost({
          id: post.id,
          title: newTitle,
        })
      );
    }
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="container">
      <h1>📚 Redux Content Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Post Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={handleAddPost}>Add Post</button>
      </div>

      {posts.length === 0 ? (
        <p>No Posts Available</p>
      ) : (
        posts.map((post) => (
          <div className="card" key={post.id}>
            <span>{post.title}</span>

            <div>
              <button
                className="edit-btn"
                onClick={() => handleUpdatePost(post)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
