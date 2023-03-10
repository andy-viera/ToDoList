import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const listsSlice = createSlice({
  name: "lists",
  initialState: [],

  reducers: {
    addItem(state, action) {
      const { id, text } = action.payload;
      const list = state.find((list) => list.id === id);
      list.itemsList.push({ text, isBought: false });
    },
    removeItem(state, action) {
      const { id, text } = action.payload;
      const list = state.find((list) => list.id === id);
      const itemIndex = list.itemsList.findIndex((item) => item.text === text);
      list.itemsList.splice(itemIndex, 1);
    },

    bougthItem(state, action) {
      const { id, index } = action.payload;
      const item = state.find((list) => list.id === id).itemsList[index];
      item.isBought = !item.isBought;
    },

    addList: {
      reducer: (state, action) => {
        const { newListId, title, color, createdAt } = action.payload;
        return [
          ...state,
          {
            id: newListId,
            title: title,
            color: color,
            createdAt: createdAt,
            itemsList: [],
          },
        ];
      },
      prepare: ({ title, color }) => {
        const createdAt = new Date().toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "numeric",
        });
        const newListId = uuidv4();

        return {
          payload: { title, color, createdAt, newListId },
        };
      },
    },

    // addList(state, action) {
    //   const newListId = uuidv4();

    //   const createdAt = new Date().toLocaleString("en-US", {
    //     weekday: "short",
    //     day: "numeric",
    //     month: "short",
    //     hour: "numeric",
    //     minute: "numeric",
    //   });

    //   return [
    //     ...state,
    //     {
    //       id: newListId,
    //       title: action.payload.title,
    //       createdAt: createdAt,
    //       itemsList: [],
    //     },
    //   ];
    // },

    removeList(state, action) {
      const removedListState = state.filter(
        (list) => list.id !== action.payload.id
      );
      return removedListState;
    },

    modifyListTitle(state, action) {
      const { id, listEditedTitle } = action.payload;
      for (const list of state) {
        if (list.id === id) {
          list.title = listEditedTitle;
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  bougthItem,
  addList,
  removeList,
  modifyListTitle,
} = listsSlice.actions;
export default listsSlice.reducer;
