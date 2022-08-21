import { createSlice } from "@reduxjs/toolkit";

console.log(window.outerWidth > 960);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    leftbar: window.outerWidth > 960,
    rightbar: window.outerWidth > 960,
  },
  reducers: {
    toggleLeftBar: (state) => {
      if (state.leftbar) {
        return {
          leftbar: false,
          rightbar: false,
        };
      } else {
        return {
          leftbar: true,
          rightbar: false,
        };
      }
      //return { ...state, leftbar: !state.leftbar };
    },
    toggleRightBar: (state) => {
      if (state.rightbar) {
        return {
          leftbar: false,
          rightbar: false,
        };
      } else {
        return {
          leftbar: false,
          rightbar: true,
        };
      }
    },
  },
});

export const { toggleLeftBar, toggleRightBar } = themeSlice.actions;
export default themeSlice.reducer;
