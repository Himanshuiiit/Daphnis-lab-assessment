import { configureStore } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    throw new Error("Unable to save state");
  } 
};

const initialState = loadState() || {
  user: null,
  selectedCategory: 'All',
  categories: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      const newState = {
        ...state,
        user: action.payload,
      };
      saveState(newState);
      return newState;
    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };
      case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}

const store = configureStore({
  reducer,
});

store.subscribe(() => {
  const toSave = {
    user: store.getState().user,
    selectedCategory: store.getState().selectedCategory,
    categories: store.getState().categories,
  }
  saveState(toSave);
});

export default store;
