import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DemoFooter from 'components/Footers/DemoFooter.js';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
function ForgetPass() {

  const navigate = useNavigate();

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

    if (tempuserdata.otp == otp) {
      localStorage.setItem('wholesaller', JSON.stringify(tempuserdata));
      navigate('/')
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

    }
  };
  const handleforgetPass = async () => {
    validemail();

    if (validemail()) {
      var myModule = require('views/config');
      const response = await fetch(
        myModule.servername + '/api/applyforgetpass',
        {
          method: 'post',
          headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          },
          body: `email=${email}`,
        }
      );
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
                    <h2 className='loginfont-styl'>Forget Password</h2>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email address</label>

                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type='email'
                    name='email'
                    className='form-control'
                    id='email'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                  />
                  <span style={{ color: 'red' }}>{Eemail}</span>
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

export default ForgetPass;
