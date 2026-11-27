import { createSlice } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

const getInitial = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const slice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitial()
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    }
  }
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;
