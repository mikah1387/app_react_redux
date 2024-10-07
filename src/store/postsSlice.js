import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Action asynchrone pour récupérer les posts via axios
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (url) => {
  const response = await axios.get(url);
  return response.data; // Renvoie les données récupérées
});
export const AddNewPost = createAsyncThunk("posts/AddNewPost", async (datas) => {
  const response = await axios.post("http://localhost:3000/posts", datas);
  return response.data; // Renvoie les données récupérées
});

// Slice pour gérer les posts
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    articles: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addPost: (state, action) => {
      const newarticle = {
        id: state.articles.length + 1,
        title: action.payload.title,
        content: action.payload.content,
        author: action.payload.author,
        likes: 0,
      };
      state.articles.push(newarticle);
      // AddNewPost("http://localhost:3000/posts",newarticle);

      

    },

    deletePost: (state, action) => {
      state.articles = state.articles.filter(
        (post) => post.id !== action.payload
      );
    },
    updatePost: (state, action) => {
      const article = state.articles.find(
        (post) => post.id === action.payload.id
      );
     
      article.content = action.payload.content;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload; // Met à jour les articles avec les données de l'API
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPost, deletePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
// export const store = configureStore({
//   reducer: {
//     myposts: postsSlice.reducer,
//   },
// });
