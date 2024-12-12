import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean | undefined;
}

const initialState: AppState = {
  isLoading: undefined,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;
export default appSlice.reducer;
