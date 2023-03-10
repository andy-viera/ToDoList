import { configureStore } from "@reduxjs/toolkit";
import listsSlice from "./listsReducer";

const store = configureStore({
  reducer: {
    lists: listsSlice,
  },
});

export default store;
