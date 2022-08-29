import history from "../../history";
export function localStorageData(value) {
  let fialValue = null;

  let localData = JSON.parse(localStorage.getItem("wholesaller"));

  if (localData && localData.hasOwnProperty("_id")) {
    Object.keys(localData).forEach(function (key) {
      if (key == value) {
        fialValue = localData[key];
      }
    });
  }

  return fialValue;
}

export function getLocalUserdata(value) {
  let fialValue = null;

  let localData = JSON.parse(localStorage.getItem("wholesaller"));

  // if (localData && localData.hasOwnProperty('token')) {
  //   Object.keys(localData).forEach(function (key) {
  //     if (key == value) {
  //       fialValue = localData[key];
  //     }
  //   });
  // }

  return localData;
}

export function updatelocalData(value) {
  let fialValue = null;

  let localData = JSON.parse(localStorage.getItem("wholesaller"));

  localData.fname = value.fname;

  localData.lname = value.lname;

  localData.address = value.address;

  localData.contactNo = value.contactNo;

  localStorage.setItem("wholesaller", JSON.stringify(localData));

  // if (localData && localData.hasOwnProperty('token')) {
  //   Object.keys(localData).forEach(function (key) {
  //     if (key == value) {
  //       fialValue = localData[key];
  //     }
  //   });
  // }

  return localData;
}

export function Logout(value) {
  localStorage.removeItem("wholesaller");

  window.location.href = "/";

  return true;
}
