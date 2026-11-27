import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, type User } from "../lib/api";

interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  ready: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  ready: false,
  loading: false,
  error: ""
};

export const fetchMe = createAsyncThunk("auth/me", () => api.me());
export const login = createAsyncThunk("auth/login", (c: Credentials) =>
  api.login(c.email, c.password)
);
export const register = createAsyncThunk("auth/register", (c: Credentials) =>
  api.register(c.email, c.password)
);
export const logout = createAsyncThunk("auth/logout", () => api.logout());

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builders) => {
    builders.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.ready = true;
    });
    builders.addCase(fetchMe.rejected, (state) => {
      state.user = null;
      state.ready = true;
    });
    for (const thunk of [login, register]) {
      builders.addCase(thunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      });
      builders.addCase(thunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
      builders.addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
      });
    }
    builders.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
    builders.addCase(logout.rejected, (state) => {
      state.user = null;
    });
  }
});

export const { clearError, setUser } = slice.actions;
export default slice.reducer;
