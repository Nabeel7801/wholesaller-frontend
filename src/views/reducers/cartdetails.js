const initialState = {
  isload: false,
  cartbadge:
    JSON.parse(localStorage.getItem("mycart")) == null
      ? 0
      : JSON.parse(localStorage.getItem("mycart")).length,
  mycartdetails: JSON.parse(localStorage.getItem("mycart")),
};

const cartdetails = (state = initialState, action) => {
  if (action.type === "updatecart") {
    return {
      ...state,
      mycartdetails: action.payload,
      cartbadge: action.payload.length,
      isload: true,
    };
  }

  return state;
};

export default cartdetails;
