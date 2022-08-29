import React from 'react';

// reactstrap components
import { Button, Label, FormGroup, Container, Row, Col } from 'reactstrap';

// core components

import DemoFooter from 'components/Footers/DemoFooter.js';
import MainNavbar from 'components/Navbars/MainNavbar.js';
// material ui
import { makeStyles } from '@material-ui/core/styles';
import Buttonui from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function ProfilePage() {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState('1');

  const onChangeHandler = async (e) => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById('output');
      output.src = reader.result;
      ////console.log(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];
      ////SaveDetails();
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('landing-page');
    return function cleanup() {
      document.body.classList.remove('landing-page');
    };
  });
  return (
    <>
      <MainNavbar />
      <br />
      <br />
      <br />
      <div className='section profile-content topmargin'>
        <Container>
          <div className='owner'>
            <div className='avatar'>
              <img
                id='output'
                alt='...'
                className='img-circle img-no-padding img-responsive'
                src={require('assets/img/faces/joe-gardner-2.jpg')}
              />
            </div>
          </div>
          <Row>
            <Col className='ml-auto mr-auto text-center' md='6'>
              <div className={classes.root}>
                <input
                  accept='image/*'
                  className={classes.input}
                  id='contained-button-file'
                  multiple
                  type='file'
                />
                <label htmlFor='contained-button-file'>
                  <Buttonui
                    variant='contained'
                    color='default'
                    onChange={onChangeHandler}
                    style={{ backgroundColor: 'black' }}
                    component='span'
                  >
                    <span className='whitebold'>Add</span>
                  </Buttonui>
                </label>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <Label>Name</Label>
              <FormGroup>
                <div class='ui left icon input input-styl'>
                  <i aria-hidden='true' class='user circle icon'></i>
                  <input type='text' placeholder='Name' />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <Label>Mobile Number</Label>
              <FormGroup>
                <div class='ui left icon input input-styl'>
                  <i aria-hidden='true' class='mail icon'></i>
                  <input type='number' placeholder='+4 78545461231' />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='6' md='6' sm='8' xs='8'>
              <Label>Email Account</Label>
              <FormGroup>
                <div class='ui left icon input input-styl'>
                  <i aria-hidden='true' class='user circle icon'></i>
                  <input type='email' placeholder='Add Email Id' />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg='2' md='2' sm='2' xs='2'>
              <Button className='btn-round mr-1' color='danger' type='button'>
                Back
              </Button>
            </Col>
            <Col lg='4' md='4' sm='2' xs='2'></Col>
            <Col lg='2' md='2' sm='2' xs='2'>
              <Button className='btn-round mr-1' color='info' type='button'>
                Save
              </Button>
            </Col>
          </Row>
          <br /> <br />
          <Row>
            <Col className='ml-auto mr-auto text-center' md='6'>
              <Button className='btn' color='warning'>
                Close my account
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePage;
