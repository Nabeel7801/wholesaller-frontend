export const updatelisting = (type, data) => {
  return async dispatch => {
    ///  var mycart = JSON.parse(localStorage.getItem("mycart"));

    if (type == "productype") {
      dispatch({ type: "productype", payload: data });
    } else if (type == "mainimage") {
      dispatch({ type: "mainimage", payload: data });
    } else if (type == "allsets") {
      dispatch({ type: "allsets", payload: data });
    } else if (type == "colorformap") {
      dispatch({ type: "colorformap", payload: data });
    } else if (type == "finalarr") {
      dispatch({ type: "finalarr", payload: data });
    } else if (type == "allattribute") {
      dispatch({ type: "allattribute", payload: data });
    } else if (type == "mapsize") {
      dispatch({ type: "mapsize", payload: data });
    }

    /////
    else if (type == "minsetorder") {
      dispatch({ type: "minsetorder", payload: data });
    } else if (type == "priceperpiece") {
      dispatch({ type: "priceperpiece", payload: data });
    } else if (type == "mrpperpiece") {
      dispatch({ type: "mrpperpiece", payload: data });
    } else if (type == "availablesetquantity") {
      dispatch({ type: "availablesetquantity", payload: data });
    } else if (type == "squid") {
      dispatch({ type: "squid", payload: data });
    } else if (type == "setinstock") {
      dispatch({ type: "setinstock", payload: data });
    }

    ///////////////// for update/////////////
    else if (type == "updatecolormap") {
      dispatch({ type: "updatecolormap", payload: data });
    } else if (type == "updateallsets") {
      dispatch({ type: "updateallsets", payload: data });
    } else if (type == "updatefinalarr") {
      dispatch({ type: "updatefinalarr", payload: data });
    } else if (type == "updateallattribute") {
      dispatch({ type: "updateallattribute", payload: data });
    } else if (type == "updatemapsize") {
      dispatch({ type: "updatemapsize", payload: data });
    }

    /////
    else if (type == "updateminsetorder") {
      dispatch({ type: "updateminsetorder", payload: data });
    } else if (type == "updatepriceperpiece") {
      dispatch({ type: "updatepriceperpiece", payload: data });
    } else if (type == "updatemrpperpiece") {
      dispatch({ type: "updatemrpperpiece", payload: data });
    } else if (type == "updateavailablesetquantity") {
      dispatch({ type: "updateavailablesetquantity", payload: data });
    } else if (type == "updatesquid") {
      dispatch({ type: "updatesquid", payload: data });
    } else if (type == "updatesetinstock") {
      dispatch({ type: "updatesetinstock", payload: data });
    } else if (type == "deleteset") {
      dispatch({ type: "deleteset", payload: data });
    } else if (type == "tags") {
      dispatch({ type: "tags", payload: data });
    }

    ////////////////////////selleredit
    else if (type == "listingallsets") {
      dispatch({ type: "listingallsets", payload: data });
    } else if (type == "listingcolorformap") {
      dispatch({ type: "listingcolorformap", payload: data });
    } else if (type == "listingfinalarr") {
      dispatch({ type: "listingfinalarr", payload: data });
    } else if (type == "listingallattribute") {
      dispatch({ type: "listingallattribute", payload: data });
    } else if (type == "listingmapsize") {
      dispatch({ type: "listingmapsize", payload: data });
    }

    /////
    else if (type == "listingminsetorder") {
      dispatch({ type: "listingminsetorder", payload: data });
    } else if (type == "listingpriceperpiece") {
      dispatch({ type: "listingpriceperpiece", payload: data });
    } else if (type == "listingmrpperpiece") {
      dispatch({ type: "listingmrpperpiece", payload: data });
    } else if (type == "listingavailablesetquantity") {
      dispatch({ type: "listingavailablesetquantity", payload: data });
    } else if (type == "listingsquid") {
      dispatch({ type: "listingsquid", payload: data });
    } else if (type == "listingsetinstock") {
      dispatch({ type: "listingsetinstock", payload: data });
    } else if (type == "iseditornew") {
      dispatch({ type: "iseditornew", payload: data });
    } else {
      ///dispatch({type:'mainimage',payload:data})
    }
  };
};
