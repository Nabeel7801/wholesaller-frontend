export const updatecart = () => {
  return async (dispatch) => {
    var mycart = JSON.parse(localStorage.getItem("mycart"));
    dispatch({ type: "updatecart", payload: mycart });
  };
};
