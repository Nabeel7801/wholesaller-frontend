const reducer1 = (state = [], action) => {
  if (action.type === "changeneeame") {
    return action.payload;
  } else {
    return "";
  }
};
export default reducer1;
