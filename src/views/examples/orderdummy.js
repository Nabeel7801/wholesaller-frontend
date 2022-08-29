import React, { useState, useEffect } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import axios from 'axios';
import {
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { Tabs } from 'antd';
import { Image } from 'semantic-ui-react';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function Ordersaller() {
  const [orderid, setorderid] = React.useState(null);
  const classes = useStyles();

  const [open1, setOpen] = React.useState(false);

  const handleClickOpen = (orderid) => {
    setorderid(orderid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { TabPane } = Tabs;

  function callback(key) {
    ////console.log(key);
  }

  const [allorders, setallorders] = React.useState([]);

  const [totalpkg, settotalpkg] = React.useState();

  const [weight, setweightt] = React.useState();
  const [invoiveno, setinvoiveno] = React.useState();
  const [amount, setamount] = React.useState();

  const fetchallorders = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/sellerorder', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `id=${JSON.parse(localStorage.getItem('wholesaller'))._id}`,
    });
    const json = await response.json();
    ////console.log(json)
    setallorders(json);
  };

  useEffect(() => {
    fetchallorders();
  }, []);

  const confirmorder = async () => {
    ////alert(allorders[orderid]._id)

    var object = {
      orderid: allorders[orderid]._id,
      totalpkg: totalpkg,
      weight: weight,
      invoiveno: invoiveno,
      amount: amount,
    };

    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/confirmorder', object)
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
        fetchallorders();
        setOpen(false);
      });
  };
  const holdon = async (orderid) => {
    ////alert(allorders[orderid]._id)

    var object = {
      orderid: allorders[orderid]._id,
    };

    var myModule = require('views/config');
    axios.post(myModule.servername + '/api/holdonorder', object).then((res) => {
      ////console.log(res);
      ////console.log(res.data);
      fetchallorders();
    });
  };
  const cancelorder = async (orderid) => {
    var object = {
      orderid: allorders[orderid]._id,
    };

    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/cancelorderclient', object)
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
        fetchallorders();
      });
  };

  return (
    <div>
      <IndexNavbar />
      <br />
      <div className='mt-20'>
        <Container>
          <TextField
            id='standard-full-width'
            style={{ margin: 8 }}
            placeholder='Search'
            helperText=''
            fullWidth
            margin='normal'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='All' key='1'>
              {allorders.map((s, i) => (
                <>
                  <div className={classes.root}>
                    <Paper className={classes.paper}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <ButtonBase className={classes.image}>
                            {/* <img className={classes.img} alt="No image" src=     {s.carddata.mainimg} /> */}
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction='column'
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography gutterBottom variant='h6'>
                                {/* {s.carddata.productname} */}
                              </Typography>

                              <Typography className='text-red-500'>
                                {/* Order Canceled by you */}
                              </Typography>
                              <Typography className='text-green-700'>
                                Status:{s.status}
                              </Typography>

                              <Typography
                                variant='body'
                                className='mt-2'
                                color='textSecondary'
                              >
                                ₹ {s.totalprice}
                              </Typography>

                              {/* <Typography variant="body2" className="mt-2"  color="textSecondary">
                Order ID: 102
                </Typography>

                <Typography variant="body2" color="textSecondary">
                Invoice ID: 102
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography> */}
                            </Grid>

                            {s.carddata.products.map((productss, producti) => (
                              <>
                                <Grid container spacing={1}>
                                  <Grid item xs={1}>
                                    <img
                                      src={productss.mainimg}
                                      class='ui tiny top aligned image'
                                    />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Typography variant='h6' gutterBottom>
                                      {productss.productname}
                                    </Typography>
                                    <Typography variant='body2' gutterBottom>
                                      1 item
                                    </Typography>
                                    <div class='ui divider'></div>
                                  </Grid>
                                </Grid>

                                {productss.sets.map((setss, setsi) => (
                                  <>
                                    <Grid container spacing={1}>
                                      <Grid item xs={8}>
                                        <div class='ui message'>
                                          <div class='content'>
                                            <div class='header'>
                                              <img
                                                src={setss.pic}
                                                class='ui tiny right floated image'
                                              />
                                              <div className='smalltopmargin'>
                                                Color:{' '}
                                                {setss.setcolor.map((y, u) => (
                                                  <>{y},</>
                                                ))}
                                              </div>

                                              <div className='smalltopmargin'>
                                                Size :{' '}
                                                {setss.sizes.map((y, u) => (
                                                  <>{y},</>
                                                ))}
                                              </div>
                                            </div>
                                            <div className='smalltopmargin'>
                                              Set of 20
                                            </div>

                                            <div class='ui divider'></div>
                                            <div className='float-right  w-20'></div>

                                            <span class=''>
                                              ₹ {setss.priceofset} per set
                                            </span>
                                            <div className='subtitle-styl'>
                                              (₹ 4,400 + 5% GST)
                                            </div>
                                          </div>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </>
                                ))}

                                <br />
                              </>
                            ))}

                            <Grid item>
                              <Button variant='contained' color='primary'>
                                Track
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <IconButton
                              aria-label='more'
                              aria-controls='long-menu'
                              aria-haspopup='true'
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id='long-menu'
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch',
                                },
                              }}
                            >
                              <MenuItem onClick={() => holdon(i)}>
                                On Hold
                              </MenuItem>

                              <MenuItem onClick={() => handleClickOpen(i)}>
                                Pickup
                              </MenuItem>

                              <MenuItem onClick={() => cancelorder(i)}>
                                Cancel
                              </MenuItem>
                            </Menu>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                </>
              ))}

              <br />
            </TabPane>
            <TabPane tab='Pending' key='2'></TabPane>
            <TabPane tab='holdon' key='3'>
              {allorders
                .filter((book) => book.status === 'holdon')
                .map((s, i) => (
                  <>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase className={classes.image}>
                              {/* <img className={classes.img} alt="No image" src=     {s.carddata.mainimg} /> */}
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction='column'
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography gutterBottom variant='h6'>
                                  {/* {s.carddata.productname} */}
                                </Typography>

                                <Typography className='text-red-500'>
                                  {/* Order Canceled by you */}
                                </Typography>
                                <Typography className='text-green-700'>
                                  Status:{s.status}
                                </Typography>

                                <Typography
                                  variant='body'
                                  className='mt-2'
                                  color='textSecondary'
                                >
                                  ₹ {s.totalprice}
                                </Typography>

                                {/* <Typography variant="body2" className="mt-2"  color="textSecondary">
                Order ID: 102
                </Typography>

                <Typography variant="body2" color="textSecondary">
                Invoice ID: 102
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography> */}
                              </Grid>

                              {s.carddata.products.map(
                                (productss, producti) => (
                                  <>
                                    <Grid container spacing={1}>
                                      <Grid item xs={1}>
                                        <img
                                          src={productss.mainimg}
                                          class='ui tiny top aligned image'
                                        />
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Typography variant='h6' gutterBottom>
                                          {productss.productname}
                                        </Typography>
                                        <Typography
                                          variant='body2'
                                          gutterBottom
                                        >
                                          1 item
                                        </Typography>
                                        <div class='ui divider'></div>
                                      </Grid>
                                    </Grid>

                                    {productss.sets.map((setss, setsi) => (
                                      <>
                                        <Grid container spacing={1}>
                                          <Grid item xs={8}>
                                            <div class='ui message'>
                                              <div class='content'>
                                                <div class='header'>
                                                  <img
                                                    src={setss.pic}
                                                    class='ui tiny right floated image'
                                                  />
                                                  <div className='smalltopmargin'>
                                                    Color:{' '}
                                                    {setss.setcolor.map(
                                                      (y, u) => (
                                                        <>{y},</>
                                                      )
                                                    )}
                                                  </div>

                                                  <div className='smalltopmargin'>
                                                    Size :{' '}
                                                    {setss.sizes.map((y, u) => (
                                                      <>{y},</>
                                                    ))}
                                                  </div>
                                                </div>
                                                <div className='smalltopmargin'>
                                                  Set of 20
                                                </div>

                                                <div class='ui divider'></div>
                                                <div className='float-right  w-20'></div>

                                                <span class=''>
                                                  ₹ {setss.priceofset} per set
                                                </span>
                                                <div className='subtitle-styl'>
                                                  (₹ 4,400 + 5% GST)
                                                </div>
                                              </div>
                                            </div>
                                          </Grid>
                                        </Grid>
                                      </>
                                    ))}

                                    <br />
                                  </>
                                )
                              )}

                              <Grid item>
                                <Button variant='contained' color='primary'>
                                  Track
                                </Button>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <IconButton
                                aria-label='more'
                                aria-controls='long-menu'
                                aria-haspopup='true'
                                onClick={handleClick}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id='long-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                  },
                                }}
                              >
                                <MenuItem onClick={() => holdon(i)}></MenuItem>

                                <MenuItem onClick={() => handleClickOpen(i)}>
                                  Pickup
                                </MenuItem>

                                <MenuItem onClick={() => cancelorder(i)}>
                                  Cancel
                                </MenuItem>
                              </Menu>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </>
                ))}
            </TabPane>

            <TabPane tab='Packed' key='4'>
              {allorders
                .filter((book) => book.status === 'packed')
                .map((s, i) => (
                  <>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase className={classes.image}>
                              {/* <img className={classes.img} alt="No image" src=     {s.carddata.mainimg} /> */}
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction='column'
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography gutterBottom variant='h6'>
                                  {/* {s.carddata.productname} */}
                                </Typography>

                                <Typography className='text-red-500'>
                                  {/* Order Canceled by you */}
                                </Typography>
                                <Typography className='text-green-700'>
                                  Status:{s.status}
                                </Typography>

                                <Typography
                                  variant='body'
                                  className='mt-2'
                                  color='textSecondary'
                                >
                                  ₹ {s.totalprice}
                                </Typography>

                                {/* <Typography variant="body2" className="mt-2"  color="textSecondary">
                Order ID: 102
                </Typography>

                <Typography variant="body2" color="textSecondary">
                Invoice ID: 102
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography> */}
                              </Grid>

                              {s.carddata.products.map(
                                (productss, producti) => (
                                  <>
                                    <Grid container spacing={1}>
                                      <Grid item xs={1}>
                                        <img
                                          src={productss.mainimg}
                                          class='ui tiny top aligned image'
                                        />
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Typography variant='h6' gutterBottom>
                                          {productss.productname}
                                        </Typography>
                                        <Typography
                                          variant='body2'
                                          gutterBottom
                                        >
                                          1 item
                                        </Typography>
                                        <div class='ui divider'></div>
                                      </Grid>
                                    </Grid>

                                    {productss.sets.map((setss, setsi) => (
                                      <>
                                        <Grid container spacing={1}>
                                          <Grid item xs={8}>
                                            <div class='ui message'>
                                              <div class='content'>
                                                <div class='header'>
                                                  <img
                                                    src={setss.pic}
                                                    class='ui tiny right floated image'
                                                  />
                                                  <div className='smalltopmargin'>
                                                    Color:{' '}
                                                    {setss.setcolor.map(
                                                      (y, u) => (
                                                        <>{y},</>
                                                      )
                                                    )}
                                                  </div>

                                                  <div className='smalltopmargin'>
                                                    Size :{' '}
                                                    {setss.sizes.map((y, u) => (
                                                      <>{y},</>
                                                    ))}
                                                  </div>
                                                </div>
                                                <div className='smalltopmargin'>
                                                  Set of 20
                                                </div>

                                                <div class='ui divider'></div>
                                                <div className='float-right  w-20'></div>

                                                <span class=''>
                                                  ₹ {setss.priceofset} per set
                                                </span>
                                                <div className='subtitle-styl'>
                                                  (₹ 4,400 + 5% GST)
                                                </div>
                                              </div>
                                            </div>
                                          </Grid>
                                        </Grid>
                                      </>
                                    ))}

                                    <br />
                                  </>
                                )
                              )}

                              <Grid item>
                                <Button variant='contained' color='primary'>
                                  Track
                                </Button>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <IconButton
                                aria-label='more'
                                aria-controls='long-menu'
                                aria-haspopup='true'
                                onClick={handleClick}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id='long-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                  },
                                }}
                              >
                                <MenuItem onClick={() => holdon(i)}></MenuItem>

                                <MenuItem onClick={() => handleClickOpen(i)}>
                                  Pickup
                                </MenuItem>

                                <MenuItem onClick={() => cancelorder(i)}>
                                  Cancel
                                </MenuItem>
                              </Menu>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </>
                ))}
            </TabPane>

            <TabPane tab='Shipped' key='5'>
              Content of Tab Pane 3
            </TabPane>

            <TabPane tab='Token Pending' key='7'>
              {allorders
                .filter((book) => book.status === 'pending')
                .map((s, i) => (
                  <>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase className={classes.image}>
                              {/* <img className={classes.img} alt="No image" src=     {s.carddata.mainimg} /> */}
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction='column'
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography gutterBottom variant='h6'>
                                  {/* {s.carddata.productname} */}
                                </Typography>

                                <Typography className='text-red-500'>
                                  {/* Order Canceled by you */}
                                </Typography>
                                <Typography className='text-green-700'>
                                  Status:{s.status}
                                </Typography>

                                <Typography
                                  variant='body'
                                  className='mt-2'
                                  color='textSecondary'
                                >
                                  ₹ {s.totalprice}
                                </Typography>

                                {/* <Typography variant="body2" className="mt-2"  color="textSecondary">
                Order ID: 102
                </Typography>

                <Typography variant="body2" color="textSecondary">
                Invoice ID: 102
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography> */}
                              </Grid>

                              {s.carddata.products.map(
                                (productss, producti) => (
                                  <>
                                    <Grid container spacing={1}>
                                      <Grid item xs={1}>
                                        <img
                                          src={productss.mainimg}
                                          class='ui tiny top aligned image'
                                        />
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Typography variant='h6' gutterBottom>
                                          {productss.productname}
                                        </Typography>
                                        <Typography
                                          variant='body2'
                                          gutterBottom
                                        >
                                          1 item
                                        </Typography>
                                        <div class='ui divider'></div>
                                      </Grid>
                                    </Grid>

                                    {productss.sets.map((setss, setsi) => (
                                      <>
                                        <Grid container spacing={1}>
                                          <Grid item xs={8}>
                                            <div class='ui message'>
                                              <div class='content'>
                                                <div class='header'>
                                                  <img
                                                    src={setss.pic}
                                                    class='ui tiny right floated image'
                                                  />
                                                  <div className='smalltopmargin'>
                                                    Color:{' '}
                                                    {setss.setcolor.map(
                                                      (y, u) => (
                                                        <>{y},</>
                                                      )
                                                    )}
                                                  </div>

                                                  <div className='smalltopmargin'>
                                                    Size :{' '}
                                                    {setss.sizes.map((y, u) => (
                                                      <>{y},</>
                                                    ))}
                                                  </div>
                                                </div>
                                                <div className='smalltopmargin'>
                                                  Set of 20
                                                </div>

                                                <div class='ui divider'></div>
                                                <div className='float-right  w-20'></div>

                                                <span class=''>
                                                  ₹ {setss.priceofset} per set
                                                </span>
                                                <div className='subtitle-styl'>
                                                  (₹ 4,400 + 5% GST)
                                                </div>
                                              </div>
                                            </div>
                                          </Grid>
                                        </Grid>
                                      </>
                                    ))}

                                    <br />
                                  </>
                                )
                              )}

                              <Grid item>
                                <Button variant='contained' color='primary'>
                                  Track
                                </Button>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <IconButton
                                aria-label='more'
                                aria-controls='long-menu'
                                aria-haspopup='true'
                                onClick={handleClick}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id='long-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                  },
                                }}
                              >
                                <MenuItem onClick={() => holdon(i)}></MenuItem>

                                <MenuItem onClick={() => handleClickOpen(i)}>
                                  Pickup
                                </MenuItem>

                                <MenuItem onClick={() => cancelorder(i)}>
                                  Cancel
                                </MenuItem>
                              </Menu>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </>
                ))}
            </TabPane>

            <TabPane tab='Courier Returned' key='8'>
              Content of Tab Pane 3
            </TabPane>

            <TabPane tab='Delivered' key='9'>
              Content of Tab Pane 3
            </TabPane>

            <TabPane tab='Cancelled' key='10'>
              {allorders
                .filter((book) => book.status.substring(0, 6) === 'cancel')
                .map((s, i) => (
                  <>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase className={classes.image}>
                              {/* <img className={classes.img} alt="No image" src=     {s.carddata.mainimg} /> */}
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                            <Grid
                              item
                              xs
                              container
                              direction='column'
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography gutterBottom variant='h6'>
                                  {/* {s.carddata.productname} */}
                                </Typography>

                                <Typography className='text-red-500'>
                                  {/* Order Canceled by you */}
                                </Typography>
                                <Typography className='text-green-700'>
                                  Status:{s.status}
                                </Typography>

                                <Typography
                                  variant='body'
                                  className='mt-2'
                                  color='textSecondary'
                                >
                                  ₹ {s.totalprice}
                                </Typography>

                                {/* <Typography variant="body2" className="mt-2"  color="textSecondary">
                Order ID: 102
                </Typography>

                <Typography variant="body2" color="textSecondary">
                Invoice ID: 102
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Placed on: 20/02/2020
                </Typography> */}
                              </Grid>

                              {s.carddata.products.map(
                                (productss, producti) => (
                                  <>
                                    <Grid container spacing={1}>
                                      <Grid item xs={1}>
                                        <img
                                          src={productss.mainimg}
                                          class='ui tiny top aligned image'
                                        />
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Typography variant='h6' gutterBottom>
                                          {productss.productname}
                                        </Typography>
                                        <Typography
                                          variant='body2'
                                          gutterBottom
                                        >
                                          1 item
                                        </Typography>
                                        <div class='ui divider'></div>
                                      </Grid>
                                    </Grid>

                                    {productss.sets.map((setss, setsi) => (
                                      <>
                                        <Grid container spacing={1}>
                                          <Grid item xs={8}>
                                            <div class='ui message'>
                                              <div class='content'>
                                                <div class='header'>
                                                  <img
                                                    src={setss.pic}
                                                    class='ui tiny right floated image'
                                                  />
                                                  <div className='smalltopmargin'>
                                                    Color:{' '}
                                                    {setss.setcolor.map(
                                                      (y, u) => (
                                                        <>{y},</>
                                                      )
                                                    )}
                                                  </div>

                                                  <div className='smalltopmargin'>
                                                    Size :{' '}
                                                    {setss.sizes.map((y, u) => (
                                                      <>{y},</>
                                                    ))}
                                                  </div>
                                                </div>
                                                <div className='smalltopmargin'>
                                                  Set of 20
                                                </div>

                                                <div class='ui divider'></div>
                                                <div className='float-right  w-20'></div>

                                                <span class=''>
                                                  ₹ {setss.priceofset} per set
                                                </span>
                                                <div className='subtitle-styl'>
                                                  (₹ 4,400 + 5% GST)
                                                </div>
                                              </div>
                                            </div>
                                          </Grid>
                                        </Grid>
                                      </>
                                    ))}

                                    <br />
                                  </>
                                )
                              )}

                              <Grid item>
                                <Button variant='contained' color='primary'>
                                  Track
                                </Button>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <IconButton
                                aria-label='more'
                                aria-controls='long-menu'
                                aria-haspopup='true'
                                onClick={handleClick}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id='long-menu'
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                  },
                                }}
                              >
                                <MenuItem onClick={() => holdon(i)}>
                                  On Hold
                                </MenuItem>

                                <MenuItem onClick={() => handleClickOpen(i)}>
                                  Pickup
                                </MenuItem>

                                <MenuItem onClick={() => cancelorder(i)}>
                                  Cancel
                                </MenuItem>
                              </Menu>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </>
                ))}
            </TabPane>
            <TabPane tab='Expired' key='11'>
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab='Processing' key='12'>
              Content
            </TabPane>
          </Tabs>
        </Container>
      </div>
      <DemoFooter />

      <div style={{ width: '80%' }}>
        <Dialog
          open={open1}
          onClose={handleClose}
          style={{ minWidth: 1200 }}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Pickup</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              onChange={(e) => settotalpkg(e.target.value)}
              margin='dense'
              id='name'
              label='Number of Package'
              type='email'
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setweightt(e.target.value)}
              margin='dense'
              id='name'
              label='Total weight'
              type='email'
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setinvoiveno(e.target.value)}
              margin='dense'
              id='name'
              label='Invoice no'
              type='email'
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setamount(e.target.value)}
              margin='dense'
              id='name'
              label='Amount'
              type='email'
              fullWidth
            />

            <br />

            <TextField
              margin='dense'
              id='name'
              label='Address'
              type='email'
              fullWidth
            />

            <br />

            <TextField
              margin='dense'
              id='name'
              label='No. of Items'
              type='email'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={confirmorder} color='primary'>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Ordersaller;
