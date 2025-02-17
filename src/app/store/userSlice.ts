import { createSlice } from "@reduxjs/toolkit";
import { Article } from "../../types/article";

export interface UserState {
  clips: Article[];
}

const initialState: UserState = {
  clips: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addClip: (state, action) => {
      const newClip = action.payload;
      state.clips.push(newClip);
    },
    deleteClip: (state, action) => {
      const deleteClip = action.payload;
      const currentClips = state.clips;
      const filteredClips = currentClips.filter(
        (clip) => clip.url !== deleteClip.url
      );
      state.clips = filteredClips;
    },
  },
});

export const { addClip, deleteClip } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
