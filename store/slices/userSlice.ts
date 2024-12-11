import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenericState<T> {
  data: T | null;
}

const initialState: GenericState<{ name: string; email: string }> = {
  data: null,
};

const userSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    setData<T>(state: GenericState<T>, action: PayloadAction<T>) {
      state.data = action.payload;
    },
    clearData<T>(state: GenericState<T>) {
      state.data = null;
    },
  },
});

export const { setData, clearData } = userSlice.actions;

export default userSlice.reducer;
