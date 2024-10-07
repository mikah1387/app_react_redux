import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
   postsReducer,

   usersReducer,
    
  },
});
