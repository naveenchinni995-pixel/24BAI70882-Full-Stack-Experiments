import { createSelector } from "@reduxjs/toolkit";

// Basic Selector
export const selectPosts = (state) => state.posts.items;

// Memoized Selector - Total Posts
export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);

// Memoized Selector - Short Posts (Title length < 12)
export const selectShortPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.title.length < 12)
);
// Memoized Selector - Long Posts (Title length >= 12)
export const selectLongPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.title.length >= 12)
);
