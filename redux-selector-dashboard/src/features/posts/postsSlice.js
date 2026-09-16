import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: 1, title: "React Basics" },
    { id: 2, title: "Redux Toolkit" },
    { id: 3, title: "JavaScript ES6" },
    { id: 4, title: "Node.js" },
    { id: 5, title: "MongoDB" },
    { id: 6, title: "Express.js" },
    { id: 7, title: "HTML & CSS" },
    { id: 8, title: "Full Stack Development" },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
