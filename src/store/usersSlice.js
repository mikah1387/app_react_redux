import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async (url) => {
  const response = await axios.get(url);
  return response.data; // Renvoie les données récupérées
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    statusUser: "idle",
    errorUser: null,
  },

  reducers: {

       updateUser: (state, action) => {
      const user = state.users.find(
        (post) => post.id === action.payload.id
      );
     
      user.likes = action.payload.likes;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.statusUser = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.statusUser = "succeeded";
        state.users = action.payload; // Met à jour les utilisateurs avec les données de l'API
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.statusUser = "failed";
        state.errorUser = action.error.message;
      });
  },
});

export const { updateUser } = usersSlice.actions;
export default usersSlice.reducer;
