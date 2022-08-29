const initialState = {
  isload: false,
  allproductarray: [],
  filteredproductarray: [],
};
 
const productsdata = (state = initialState, action) => {
  if (action.type === "changeproduct") {
    return {
      ...state,
      allproductarray: action.payload,
      isload: true,
    };
  } else if (action.type === "filteredproductarray") {
    return {
      ...state,
      filteredproductarray: action.payload,
      isload: true,
    };
  } else {
    return state;
  }
};

export default productsdata;
