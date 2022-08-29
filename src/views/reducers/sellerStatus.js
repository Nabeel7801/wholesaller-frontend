const initialState = {
  isload: false,
  sellerStatus: null,
  buyerStatus: null,
};

const userStatus = (state = initialState, action) => {
  if (action.type === "updatesellerStatus") {
    // dummy=action.payload;
    // return {
    //     ...state,
    //     dummy

    // }

    return {
      ...state,
      sellerStatus: action.payload,
      isload: true,
    };
  } else if (action.type === "updatebuyerStatus") {
    // dummy=action.payload;
    // return {
    //     ...state,
    //     dummy

    // }

    return {
      ...state,
      buyerStatus: action.payload,
      isload: true,
    };
  }

  // else if(action.type==='filteredproductarray'){
  //   return {
  //     ...state,
  //     filteredproductarray: action.payload,
  //     isload:true
  //   };

  // }
  else {
    return state;
  }
};

export default userStatus;
