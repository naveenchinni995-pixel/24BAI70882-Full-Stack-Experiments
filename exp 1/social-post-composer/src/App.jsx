import { useState } from "react";
import "./App.css";

function App() {

  const limits = {
    "Twitter (X)": 280,
    Instagram: 2200,
    Facebook: 63206,
    LinkedIn: 3000,
  };

  const [platform, setPlatform] = useState("Twitter (X)");
  const [post, setPost] = useState("");

  const limit = limits[platform];
  const remaining = limit - post.length;
  return (
    <div className="container">

      <h1>Social Media Post <br /> Composer</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {Object.keys(limits).map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <label>Write Your Post</label>

      <textarea
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <p
    style={{
        color:
            post.length > limit
                ? "red"
                : post.length > limit * 0.8
                ? "orange"
                : "green",
    }}
>
    Characters: <strong>{post.length} / {limit}</strong>
</p>
      <p
    style={{
        color: remaining < 0 ? "red" : "black",
    }}
>
    Remaining Characters: <strong>{remaining}</strong>
</p>
     {post.length <= limit ? (
  <p className="success">
    ✅ Ready to Post
  </p>
) : (
  <p className="error">
    ❌ Character Limit Exceeded
  </p>
)}
      <button
    disabled={post.length > limit}
    onClick={() => {
        alert("🎉 Post submitted successfully!");
        setPost("");
    }}
>
    Post
</button>

    </div>
  );
}

export default App;