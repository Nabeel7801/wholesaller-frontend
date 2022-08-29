const initialState = {
  isload: false,
  adminVerify: null,
};

const adminReducer = (state = initialState, action) => {
  if (action.type === 'verifyAdmin') {
    return {
      ...state,
      adminVerify: action.payload,
      isload: true,
    };
  } else {
    return state;
  }
};

export default adminReducer;
