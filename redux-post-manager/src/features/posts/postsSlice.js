import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },

    updatePost: (state, action) => {
      const { id, title } = action.payload;

      const post = state.items.find((post) => post.id === id);

      if (post) {
        post.title = title;
      }
    },

    deletePost: (state, action) => {
      state.items = state.items.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});
export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
