import React, { useState, useEffect } from 'react';
import DemoFooter from 'components/Footers/DemoFooter.js';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import history from 'views/history';
import { useParams } from 'react-router-dom';
function UpdatePassword() {
  const params = useParams();
  const [email, setemail] = useState('');
  const [ph, setph] = useState('');
  const [pass, setpass] = useState('');
  const [Eemail, setEemail] = useState('');
  const [Eph, setEph] = useState('');
  const [Epass, setEpass] = useState('');
  const [otp, setotp] = useState('');

  const [tempuserdata, settempuserdata] = useState('');

  const validemail = () => {
    if (!email != '' || !email.includes('@')) {
      setEemail('Email is empty or Incorrect');
      return false;
    } else {
      setEemail('');
    }

    return true;
  };

  const validpass = () => {
    if (pass == '') {
      setEpass('Enter Password (Password Should contain atleast 6 Digit)');
      return false;
    } else {
      setEpass('');
    }

    return true;
  };

  const confirmuser = async () => {
    ///////// alert(tempuserdata.otp)

    if (tempuserdata.otp == otp) {
      localStorage.setItem('wholesaller', JSON.stringify(tempuserdata));

      history.push('/');
    } else {
      alert('Wrong Otp');
    }
  };

  const handlebyotp = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/signinbyph', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `ph=${ph}`,
    });
    const json = await response.json();
    if (json == 'fail') {
      alert('Account not exist');
    } else {
      settempuserdata(json);

      handleClickOpen();

      ///localStorage.setItem("wholesaller", JSON.stringify(json))
      //history.push("/")
    }
  };
  const handleforgetPass = async () => {
    validpass();

    /// values.email = decodeURIComponent(params.email);
    //// values.uniqueId = params.id;
    if (validpass()) {
      var myModule = require('views/config');
      const response = await fetch(myModule.servername + '/api/updatepass', {
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: `pass=${pass}&email=${decodeURIComponent(
          params.email
        )}&uniqueId=${params.id}`,
      });
      const json = await response.json();
      alert(json);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IndexNavbar />

      <div className='container margintop-signin'>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            <div id='first'>
              <div className='myform form '>
                <div className='logo mb-3'>
                  <div className='col-md-12 text-center'>
                    <h2 className='loginfont-styl'>Update Password</h2>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>New Password</label>

                  <input
                    onChange={(e) => setpass(e.target.value)}
                    type='password'
                    name='email'
                    className='form-control'
                    id='email'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                  />
                  <span style={{ color: 'red' }}>{Epass}</span>
                </div>

                <div className='col-md-12 text-center '>
                  <button
                    onClick={handleforgetPass}
                    className=' btn btn-block mybtn btn-primary tx-tfm'
                  >
                    Submit
                  </button>
                </div>
                {/* <div className='col-md-12 '>
                  <div className='login-or'>
                    <hr className='hr-or' />
                    <span className='span-or'>or</span>
                  </div>
                </div>
                <div className='col-md-12 mb-3'>
                  <div className='form-group'>
                    <label htmlFor='exampleInputEmail1'>Phone Number</label>
                    <input
                      onChange={(e) => setph(e.target.value)}
                      type='number'
                      name='number'
                      className='form-control'
                      id='number'
                      aria-describedby='emailHelp'
                      placeholder='Phone'
                    />
                    <span style={{ color: 'red' }}>{Eph}</span>
                  </div>
                </div>
                <div className='col-md-12 mb-3'>
                  <p className='text-center'>
                    <a className='google btn mybtn' onClick={handlebyotp}>
                      {' '}
                      <span className='whitebold'>&nbsp;SignIn using OTP</span>
                    </a>
                  </p>
                </div>

                <div className='form-group'>
                  <p className='text-center'>
                    Don't have account?{' '}
                    <a href='/signup' id='signup'>
                      Sign up here
                    </a>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoFooter />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>OTP Confim</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter OTP send to your number</DialogContentText>
          <TextField
            onChange={(e) => setotp(e.target.value)}
            autoFocus
            margin='dense'
            id='name'
            label='OTP'
            type='number'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={confirmuser} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdatePassword;
