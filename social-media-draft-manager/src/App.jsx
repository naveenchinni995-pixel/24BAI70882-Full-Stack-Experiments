import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Instagram");
  const [post, setPost] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {

    const savedDrafts = localStorage.getItem("drafts");

    if(savedDrafts){

        setDrafts(
            JSON.parse(savedDrafts)
        );

    }

}, []);
  useEffect(() => {

    localStorage.setItem(
        "drafts",
        JSON.stringify(drafts)
    );

}, [drafts]);
  const limits = {
    "Twitter (X)": 280,
    Instagram: 2200,
    Facebook: 63206,
    LinkedIn: 3000,
  };

  const limit = limits[platform];

const saveDraft = () => {

    if(post.trim()===""){
        alert("Please enter a post.");
        return;
    }

    if(editIndex !== null){

    const updatedDrafts = [...drafts];

    updatedDrafts[editIndex] = post;

    setDrafts(updatedDrafts);

    setEditIndex(null);

}else{

    setDrafts([...drafts, post]);

}

setPost("");
};
const editDraft = (index) => {

    setPost(drafts[index]);

    setEditIndex(index);

};
const deleteDraft = (index) => {

    if(window.confirm("Delete this draft?")){

        const updatedDrafts = drafts.filter(
            (draft, i) => i !== index
        );

        setDrafts(updatedDrafts);

    }

};
return (
    <div className="container">

      <h1>📱 Social Media Post Composer</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter (X)</option>
        <option>Instagram</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
      </select>

      <label>Write Your Post</label>

      <textarea
        placeholder="Type your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <p className="counter">
    Characters: {post.length}/{limit}
</p>
      {post.length <= limit ? (
        <p className="success">✅ Ready to post</p>
      ) : (
        <p className="error">❌ Character Limit Exceeded</p>
      )}

     <button onClick={saveDraft}>
    {editIndex !== null ? "💾 Update Draft" : "💾 Save Draft"}
</button>
<h2>📂 Saved Drafts</h2>

{
    drafts.map((draft,index)=>(
        <div className="draft-card" key={index}>

            <h3>{draft}</h3>

            <button className="edit-btn"
            onClick={() => editDraft(index)}>
                Edit
            </button>

            <button className="delete-btn"
            onClick={() => deleteDraft(index)}>
                Delete
            </button>

        </div>
    ))
}

    </div>
  );
}

export default App;