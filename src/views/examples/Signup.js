import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ReactPhoneInput from "react-phone-input-2";

import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

import { toast, ToastContainer } from "react-toastify";
import { useForm, FormProvider, Controller } from "react-hook-form";

function Signup() {

  const [email, setemail] = useState("");
  const [ph, setph] = useState("");
  const [pass, setpass] = useState("");
  const [otp, setotp] = useState("");
  const [userSetOtp, setuserSetOtp] = useState("");

  const config = require("views/config");

  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();

  const submitForm = data => {
    
    axios.post(`${config.servername}/register`, data)
      .then(response => {
        if (response.data) {
          toast.success('Registered successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          localStorage.setItem("wholesaller", JSON.stringify(response.data));

          setTimeout(() => {
            window.location.href = "/verifydocument";
          }, 200);

        }else {
          toast.error('Account already exist', {
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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  const handlebyotp = async () => {
    if (otp == userSetOtp) {
      toast.success("OTP is correct");

      const response = await fetch(config.servername + "/api/finalsignup", {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `ph=${ph}&email=${email}&pass=${pass}`,
      });
      const json = await response.json();

      if (json == "success") {
        toast.success("Success");
        navigate("/");
      } else {
        toast.error("Something weng wrong");
        ///localStorage.setItem("wholesaller", JSON.stringify(json))
      }
    } else {
      toast.error("OTP is not correct");
    }
  };

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
          <div className="col-md-8 col-lg-6 mx-auto">

            <div className="myform">

              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h2 className="loginfont-styl">Register</h2>
                </div>
              </div>
              
              <FormProvider>
                <form onSubmit={handleSubmit(submitForm)}>

                  <div className="row">
                    
                    <div className="col-6">
                      <div className="form-group">
                        <input
                          type="text"
                          required
                          className="form-control"
                          aria-describedby="First Name"
                          placeholder="First Name"
                          {...register("first_name")}
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <input
                          type="text"
                          required
                          className="form-control"
                          aria-describedby="Last Name"
                          placeholder="Last Name"
                          {...register("last_name")}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      aria-describedby="outletName"
                      placeholder="Outlet name"
                      {...register("outlet_name")}
                    />
                  </div>

                  <Controller
                    control={control}
                    name="phone"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <ReactPhoneInput
                        {...field}
                        inputExtraProps={{ required: true }}
                        country={"in"}
                        style={{ marginBottom: '16px' }}
                        inputProps={{ref, style: {width: '100%'} }}
                      />
                    )}
                  />
                   
                  <div className="form-group">
                    <input
                      type="email"
                      required
                      className="form-control"
                      aria-describedby="email"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      required
                      className="form-control"
                      aria-describedby="password"
                      placeholder="Enter password"
                      {...register("password")}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      aria-describedby="deliveryAddress"
                      placeholder="Delivery address"
                      {...register("address")}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      aria-describedby="city"
                      placeholder="City"
                      {...register("city")}
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      aria-describedby="state"
                      placeholder="State"
                      {...register("state")}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      aria-describedby="pin code"
                      placeholder="Pin code"
                      {...register("pincode")}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="referral code"
                      placeholder="Referral code (optional)"
                      {...register("referral")}
                    />
                  </div>

                  <div className="form-group">
                    <p className="text-center">
                      By signing up you accept our{" "}
                      <a href="#">Terms Of Use</a>
                    </p>
                  </div>

                  <div className="col-md-12 text-center ">
                    <button className=" btn btn-block mybtn btn-primary">
                      Signup
                    </button>
                  </div>

                </form>
              </FormProvider>

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
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            type="number"
            fullWidth
            onChange={(e) => setuserSetOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlebyotp} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Signup;
