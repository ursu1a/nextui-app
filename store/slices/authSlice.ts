import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { validateToken, refreshToken } from "@/lib/authService";

interface User {
  ID: string;
  Name: string;
  Email: string;
  Picture: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

// Async action for check the token when the app was started
export const initAuth = createAsyncThunk(
  "auth/initAuth",
  async (_, { rejectWithValue }) => {
    const savedToken = localStorage.getItem("authToken");
    if (!savedToken) {
      return rejectWithValue("Token is missing");
    }

    // Check token from local storage
    const isValid = await validateToken(savedToken);

    if (isValid) {
      return savedToken;
    } else {
      localStorage.removeItem("authToken");
      // Token was expired, try to refresh
      // would be taken from browser cookies
      const newToken = await refreshToken();
      if (newToken) {
        localStorage.setItem("authToken", newToken);
        return newToken;
      }

      // Token is invalid and cannot be refreshed
      return rejectWithValue("Invalid token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        initAuth.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.isAuthenticated = false;
          if (action.payload) {
            state.token = action.payload;
            state.isAuthenticated = true;
          }
        }
      )
      .addCase(initAuth.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setAuth, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
