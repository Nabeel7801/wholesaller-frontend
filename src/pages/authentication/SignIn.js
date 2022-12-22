import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "store/reducers/auth"

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { toast } from "react-toastify";

import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

function Signin() {

  const [ph, setph] = useState("");
  const [Eph, setEph] = useState("");
  const [otp, setotp] = useState("");

  const [tempuserdata, settempuserdata] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop)
    })
    const { email, password } = params;
    if (email && password) {
      document.getElementById("email").value = email;
      document.getElementById("password").value = password;

      handlesigin();
    }
  }, [])

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const confirmuser = async () => {

    if (tempuserdata.otp == otp) {
      localStorage.setItem("wholesaller", JSON.stringify(tempuserdata));

      navigate("/");
    } else {
      alert("Wrong Otp");
    }
  };

  const handlebyotp = async () => {
    
    const response = await fetch(`${window["apiLocation"]}/api/signinbyph`, {
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

    }
  };
  
  const handlesigin = (e) => {
    e?.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${window["apiLocation"]}/signin`, {email: email, password: password})
      .then(response => {
        if (response.data) {
          toast.success('Logged in successfully!');
          dispatch(setCredentials({ user: response.data, token: null }))
          
        }else {
          toast.error('Invalid credentials entered');
          
        }
      }).catch(err => console.log(err))
      
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  return (
    <div>
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
