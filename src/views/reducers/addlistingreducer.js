const initialState = {
  isload: false,
  iseditornew: "",
  productype: {},
  mainimages: "",
  colors: [],

  sizes: [],
  setimages: [],

  allsets: [],
  setinstock: [],

  minsetorder: [],
  priceperpiece: [],
  mrpperpiece: [],
  availablesetquantity: [],
  squid: [],
  tags: {},

  setcontents: [],

  colorformap: [],
  mapsize: [],
  allattribute: [],
  finalarr: [],
};

const addlistingreducer = (state = initialState, action) => {
  if (action.type === "productype") {
    return {
      ...state,
      productype: action.payload,
    };
  } else if (action.type === "mainimage") {
    return {
      ...state,
      mainimages: action.payload,
    };
  } else if (action.type === "allsets") {
    return {
      ...state,
      allsets: [...state.allsets, action.payload],
    };
  } else if (action.type === "colorformap") {
    return {
      ...state,

      colorformap: [...state.colorformap, action.payload],
    };
  } else if (action.type === "finalarr") {
    return {
      ...state,

      finalarr: [...state.finalarr, action.payload],
    };
  } else if (action.type === "allattribute") {
    return {
      ...state,

      allattribute: [...state.allattribute, action.payload],
    };
  } else if (action.type === "mapsize") {
    return {
      ...state,

      mapsize: [...state.mapsize, action.payload],
    };
  } else if (action.type === "minsetorder") {
    return {
      ...state,

      minsetorder: [...state.minsetorder, action.payload],
    };
  } else if (action.type === "priceperpiece") {
    return {
      ...state,

      priceperpiece: [...state.priceperpiece, action.payload],
    };
  } else if (action.type === "mrpperpiece") {
    return {
      ...state,

      mrpperpiece: [...state.mrpperpiece, action.payload],
    };
  } else if (action.type === "availablesetquantity") {
    return {
      ...state,

      availablesetquantity: [...state.availablesetquantity, action.payload],
    };
  } else if (action.type === "squid") {
    return {
      ...state,

      squid: [...state.squid, action.payload],
    };
  } else if (action.type === "setinstock") {
    return {
      ...state,

      setinstock: [...state.setinstock, action.payload],
    };
  }

  ////////////////////update///////////
  else if (action.type === "updatecolormap") {
    const newArray = [...state.colorformap]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      colorformap: newArray,
    };
  } else if (action.type === "updateallsets") {
    const newArray = [...state.allsets]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      allsets: newArray,
    };
  } else if (action.type === "updatefinalarr") {
    const newArray = [...state.finalarr]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      finalarr: newArray,
    };
  } else if (action.type === "updateallattribute") {
    const newArray = [...state.allattribute]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      allattribute: newArray,
    };
  } else if (action.type === "updatemapsize") {
    const newArray = [...state.mapsize]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      mapsize: newArray,
    };
  }

  ////////////
  else if (action.type === "updateminsetorder") {
    const newArray = [...state.minsetorder]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      minsetorder: newArray,
    };
  } else if (action.type === "updatepriceperpiece") {
    const newArray = [...state.priceperpiece]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      priceperpiece: newArray,
    };
  } else if (action.type === "updatemrpperpiece") {
    const newArray = [...state.mrpperpiece]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      mrpperpiece: newArray,
    };
  } else if (action.type === "updateavailablesetquantity") {
    const newArray = [...state.availablesetquantity]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      availablesetquantity: newArray,
    };
  } else if (action.type === "updatesquid") {
    const newArray = [...state.squid]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      squid: newArray,
    };
  } else if (action.type === "updatesetinstock") {
    const newArray = [...state.setinstock]; //making a new array

    newArray[action.payload[0]] = action.payload[1];

    return {
      ...state,

      setinstock: newArray,
    };
  } else if (action.type === "deleteset") {
    var myallsets = [...state.allsets];

    myallsets.splice(action.payload, 1);

    var myminsetorder = [...state.minsetorder];

    myminsetorder.splice(action.payload, 1);

    var mypriceperpiece = [...state.priceperpiece];

    mypriceperpiece.splice(action.payload, 1);

    var mymrpperpiece = [...state.mrpperpiece];

    mymrpperpiece.splice(action.payload, 1);

    var myavailablesetquantity = [...state.availablesetquantity];

    myavailablesetquantity.splice(action.payload, 1);

    var mysquid = [...state.squid];

    mysquid.splice(action.payload, 1);

    var mycolorformap = [...state.colorformap];

    mycolorformap.splice(action.payload, 1);

    mysquid.splice(action.payload, 1);

    var mycolorformap = [...state.colorformap];

    mycolorformap.splice(action.payload, 1);

    var mymapsize = [...state.mapsize];

    mymapsize.splice(action.payload, 1);

    var myallattribute = [...state.allattribute];

    myallattribute.splice(action.payload, 1);

    var myfinalarr = [...state.finalarr];

    myfinalarr.splice(action.payload, 1);

    return {
      ...state,

      allsets: myallsets,
      //                allsets:myallsets.slice(0,1),

      minsetorder: myminsetorder,
      priceperpiece: mypriceperpiece,
      mrpperpiece: mymrpperpiece,
      availablesetquantity: myavailablesetquantity,
      squid: mysquid,

      colorformap: mycolorformap,
      mapsize: mymapsize,
      allattribute: myallattribute,
      finalarr: myfinalarr,
    };
  } else if (action.type === "tags") {
    return {
      ...state,

      tags: action.payload,
    };
  }

  ////////////sellerlisting
  else if (action.type === "listingallsets") {
    return {
      ...state,
      allsets: action.payload,
    };
  } else if (action.type === "listingcolorformap") {
    return {
      ...state,

      colorformap: action.payload,
    };
  } else if (action.type === "listingfinalarr") {
    return {
      ...state,

      finalarr: action.payload,
    };
  } else if (action.type === "listingallattribute") {
    return {
      ...state,

      allattribute: action.payload,
    };
  } else if (action.type === "listingmapsize") {
    return {
      ...state,

      mapsize: action.payload,
    };

  }else if (action.type === "listingminsetorder") {
    return {
      ...state,

      minsetorder: action.payload,
    };

  }else if (action.type === "listingpriceperpiece") {
    return {
      ...state,

      priceperpiece: action.payload,
    };

  }else if (action.type === "listingmrpperpiece") {
    return {
      ...state,

      mrpperpiece: action.payload,
    };

  }else if (action.type === "listingavailablesetquantity") {
    return {
      ...state,

      availablesetquantity: action.payload,
    };

  }else if (action.type === "listingsquid") {
    return {
      ...state,

      squid: action.payload,
    };

  }else if (action.type === "listingsetinstock") {
    return {
      ...state,

      setinstock: action.payload,
    };

  }else if (action.type === "iseditornew") {
    return {
      ...state,

      iseditornew: action.payload,
    };
  }else {
    return state;
  }
};

export default addlistingreducer;
