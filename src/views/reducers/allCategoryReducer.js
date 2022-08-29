const initialState = {
  isLoad: false,
  allCategories: [],
};

const allcategories = (state = initialState, action) => {
  if (action.type === "getAllCategories") {
    return {
      ...state,
      allCategories: action.payload,
    };
  }
  return state;
};

export default allcategories;
