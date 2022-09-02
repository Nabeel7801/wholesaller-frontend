import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { toast, ToastContainer } from "react-toastify";

import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

function Signin() {

  const [ph, setph] = useState("");
  const [Eph, setEph] = useState("");
  const [otp, setotp] = useState("");

  const [tempuserdata, settempuserdata] = useState("");
  const navigate = useNavigate();
  const config = require("views/config");

  const confirmuser = async () => {

    if (tempuserdata.otp == otp) {
      localStorage.setItem("wholesaller", JSON.stringify(tempuserdata));

      navigate("/");
    } else {
      alert("Wrong Otp");
    }
  };

  const handlebyotp = async () => {
    
    const response = await fetch(config.servername + "/api/signinbyph", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `ph=${ph}`,
    });
    const json = await response.json();
    if (json == "fail") {
      alert("Account  not exist");
    } else {
      settempuserdata(json);

      handleClickOpen();

      ///localStorage.setItem("wholesaller", JSON.stringify(json))
      //navigate("/")
    }
  };
  
  const handlesigin = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${config.servername}/signin`, {email: email, password: password})
      .then(response => {
        if (response.data?.length > 0) {
          toast.success('Logged in successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          localStorage.setItem("wholesaller", JSON.stringify(response.data[0]));

          setTimeout(() => {
            window.location.href = "/";
          }, 200);
          
        }else {
          toast.error('Invalid credentials entered', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          
        }
      }).catch(err => console.log(err))
      
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  return (
    <div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <IndexNavbar />

      <div className="container formArea">
        <div className="row">
          <div className="col-md-8 col-lg-5 mx-auto">

            <div className="myform">

              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h2 className="loginfont-styl">Login</h2>
                </div>
              </div>

              <form onSubmit={handlesigin}>
                <div className="form-group">
                  <input
                    id="email"
                    type="email"
                    required
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <input
                    id="password"
                    type="password"
                    required
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                </div>

                <div className="col-md-12 text-center ">
                  <button
                    type="submit"
                    className=" btn  btn-block mybtn tx-tfm"
                  >
                    Login
                  </button>
                </div>

              </form>

              <div className="col-md-12 ">
                <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or">or</span>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <input
                    onChange={(e) => setph(e.target.value)}
                    type="number"
                    name="number"
                    className="form-control"
                    id="number"
                    aria-describedby="emailHelp"
                    placeholder="Phone"
                  />
                  <span style={{ color: "red" }}>{Eph}</span>
                </div>
              </div>

              <div className="col-md-12 ">
                <p className="text-center">
                  <a
                    className="google mybtn signin-btn inline-block"
                    onClick={handlebyotp}
                  >
                    <span className="whitebold">&nbsp;SignIn using OTP</span>
                  </a>
                </p>
              </div>

              <div className="form-group mt-4">
                <p className="text-center">
                  Don't have account?
                  <a href="/signup" id="signup">
                    Sign up here
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <DemoFooter />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">OTP Confim</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter OTP send to your number</DialogContentText>
          <TextField
            onChange={(e) => setotp(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmuser} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signin;
