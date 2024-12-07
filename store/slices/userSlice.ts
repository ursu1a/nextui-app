import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: {
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["data"]>) {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
