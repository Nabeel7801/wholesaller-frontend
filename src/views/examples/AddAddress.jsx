import React, { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";
import { TextField, Container, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const AddAddress = () => {
  const [address, setAddress] = useState();
  const defaultAddress = localStorage.getItem("address") || "";

  const navigate = useNavigate();
  const handleClick = () => {
    if (!address && !defaultAddress) {
      window.alert("Please add your address");
    } else {
      localStorage.setItem("address", address);
      navigate("/cart");
    }
  };

  return (
    <div>
      <div>
        {localStorage.getItem("wholesaller") != null ? (
          <>
            <MainNavbar />
          </>
        ) : (
          <IndexNavbar />
        )}
        <br />
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold mt-5">Address</h2>
          <div className="mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              defaultValue={defaultAddress}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="fixed right-0 left-0 bottom-0">
            <div className="text-base bg-white text-white  shadow-lg ">
              <div className=" rounded-lg px-4 py-2 py-1 flex items-center justify-between">
                {/* <div className=""></div> */}
                <div className="flex-1">
                  <Button
                    fullWidth
                    type="button"
                    variant="contained"
                    className="text-sm px-4 py-3 uppercase font-medium text-white bg-blue-700 rounded-lg w-full"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#3f51b5",
                    }}
                    onClick={handleClick}
                  >
                    <span className="block">Save and continue</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddAddress;
