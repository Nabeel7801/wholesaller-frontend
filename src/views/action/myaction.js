// export const antothername=(name)=>{

//     return{
//         type:'changename',payload:name
//     }
// }

export const updateproductaction = (type, data) => {
  return async (dispatch) => {
    if (type == "changeproduct") {
      var myModule = require("views/config");
      const response = await fetch(myModule.servername + "/api/fetchcards", {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: ``,
        // body: JSON.stringify({
        //   fabric: fabric,
        // })
      });
      const json = await response.json();
      dispatch({ type: "changeproduct", payload: json });
      dispatch({ type: "filteredproductarray", payload: json });
    } else {
      dispatch({ type: "filteredproductarray", payload: data });
    }
  };
};

export const updatesellerStatus = (type, data) => {
  return async (dispatch) => {
    var myModule = require("views/config");
    const response = await fetch(
      myModule.servername + "/api/fetchsellerstatus",
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
        // body: JSON.stringify({
        //   fabric: fabric,

        // })
      }
    );
    const json = await response.json();
    dispatch({ type: "updatesellerStatus", payload: json });
  };
};

export const updateBuyerStatus = (type, data) => {
  ////dispatch({type:'changeproduct',payload:json})

  return async (dispatch) => {
    var myModule = require("views/config");
    const response = await fetch(
      myModule.servername + "/api/fetchcurrentstatus",
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
        // body: JSON.stringify({
        //   fabric: fabric,

        // })
      }
    );
    const json = await response.json();
    dispatch({ type: "updatebuyerStatus", payload: json });
  };
};
