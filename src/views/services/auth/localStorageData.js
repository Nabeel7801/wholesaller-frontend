export function localStorageData(value) {
  let finalValue = null;

  let localData = JSON.parse(localStorage.getItem("wholesaller"));

  if (localData && localData.hasOwnProperty("_id")) {
    Object.keys(localData).forEach(function (key) {
      if (key === value) {
        finalValue = localData[key];
      }
    });
  }

  return finalValue;

}

export function getLocalUserdata() {
  return JSON.parse(localStorage.getItem("wholesaller"));
}

export function updatelocalData(value) {

  const localData = JSON.parse(localStorage.getItem("wholesaller"));

  localData.fname = value.fname;
  localData.lname = value.lname;
  localData.address = value.address;
  localData.contactNo = value.contactNo;

  localStorage.setItem("wholesaller", JSON.stringify(localData));

  return localData;
}

export function Logout() {
  localStorage.removeItem("wholesaller");

  window.location.href = "/";

  return true;
}
