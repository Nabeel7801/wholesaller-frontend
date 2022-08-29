import React, { useState, useEffect } from "react";
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
} from "reactstrap";

import { makeStyles } from '@material-ui/core/styles';
import { Box, Table, TableCell, TableContainer, TableRow, TableBody, TableHead, Container as MUIContainer, Divider } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { updatelisting } from 'views/action/updatelisting';
import axios from 'axios';
import history from 'views/history';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 650,
  },
  image: {
    width: 128,
    height: 128,
    [theme.breakpoints.down("xs")]: {
      width: 59,
      height: 55,
    }
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  setOfSizes: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px"
    }
  },
  tableTextHead: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px"
    }
  },
  tableTextData: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px"
    }
  }
}));

function Previewset() {
  const classes = useStyles();
  const dispatch = useDispatch()

  var datafromstore = useSelector(state => state.addlisting.finalarr);
  var colorformap = useSelector(state => state.addlisting.colorformap);
  var storeminsetorderr = useSelector(state => state.addlisting.minsetorder);
  var storepriceperpiece = useSelector(state => state.addlisting.priceperpiece);
  var storemrpperpiecer = useSelector(state => state.addlisting.mrpperpiece);
  var storeavailablesetquantity = useSelector(state => state.addlisting.availablesetquantity);
  var storesquid = useSelector(state => state.addlisting.squid);
  var storemapsize = useSelector(state => state.addlisting.mapsize);
  /////alert('length '+datafromstore.legth)

  ////console.log("------prview ------------------")
  ////console.log(datafromstore)

  ////alert(datafromstore[0].priceperpiece)
  ////const [img1, setimg1] = React.useState("");


  const sendtomongo = async (i) => {
    const shm = { datafromstore };

    ////console.log(shm)
    var myModule = require('views/config');
    // const response= await fetch(myModule.servername+"/api/addsets", {

    var color = [1, 2, 3, 4];

    ///datafromstore.'color'=color;
    datafromstore["color"] = color;

    // })

    axios.post(myModule.servername + "/api//addsets", { datafromstore })
      .then(res => {
        ////console.log(res);
        ////console.log(res.data);
      })


    // let res = await axios.post(
    //   myModule.servername + "/api/addsets",
    //   shm,
    //   {
    //     // receive two    parameter endpoint url ,form data
    //   }
    // );
    // let respo = res.data;


  }


  const deleteset = async (i) => {
    /////alert(i)
    dispatch(updatelisting('deleteset', i))

  }


  return (
    <>
      <br /><br />
      <Container>
        <Button variant="outlined" color="primary" onClick={() => history.push('/saller/createsets')}>
          Add New SET
        </Button>
      </Container>
      {datafromstore.map((s, i) => {
        const rowLen = storemapsize[i].length;
        return (
          <Box mt={2} key={s}>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>

                        <Grid item >

                        </Grid>
                        {/* <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell colSpan={4}>
                                  <Typography  className={classes.setOfSizes} gutterBottom variant="subtitle1">
                                    Set of {storemapsize[i].length} {storemapsize[i].length <= 1 ? "piece" : "pieces"}
                                    <span> ({storemapsize[i].map((s, i) => {
                                      console.log("storemapsize[i]", storemapsize[i])
                                      if (rowLen <= 1) {
                                        // first one
                                        return <>{s}</>
                                      }
                                      else if (!(rowLen === i + 1)) {
                                        // not last one
                                        return <>{s},</>
                                      } else {
                                        // last one
                                        return <> and {s}</>
                                      }
                                    })
                                    })
                                    </span>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.tableTextHead}>Item</TableCell >
                                <TableCell className={classes.tableTextHead}>Price / pc</TableCell >
                                <TableCell className={classes.tableTextHead}>MRP / pc</TableCell >
                                <TableCell className={classes.tableTextHead}>Pieces (sets)</TableCell>
                              </TableRow>
                            </TableHead>
                            <Divider />
                            <TableBody>
                              <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="left" className={classes.tableTextData}>
                                  <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={s[0].img} />
                                  </ButtonBase>
                                </TableCell>
                                <TableCell align="right" className={classes.tableTextData}>₹{storepriceperpiece[i]}</TableCell>
                                <TableCell align="right" className={classes.tableTextData}>₹{storemrpperpiecer[i]}</TableCell>
                                <TableCell align="right" className={classes.tableTextData}>{storeavailablesetquantity[i]}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer> */}
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left" className={classes.tableTextData}>
                                  <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={s[0].img} />
                                  </ButtonBase>
                                </TableCell>
                                <TableCell colSpan={2}>
                                  <Typography className={classes.setOfSizes} gutterBottom variant="subtitle1">
                                    Set of {storemapsize[i].length} {storemapsize[i].length <= 1 ? "piece" : "pieces"}
                                    <span> ({storemapsize[i].map((s, i) => {
                                      console.log("storemapsize[i]", storemapsize[i])
                                       if (rowLen <= 1) {
                                        // first one
                                        return <>{s}</>
                                      }
                                      else if (!(rowLen === i + 1)) {
                                        // not last one
                                        return <>{s}, </>
                                      } else {
                                        // last one
                                        return <> and {s}</>
                                      }
                                    })
                                    })
                                    </span>
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.tableTextHead}>Price / pc</TableCell >
                                <TableCell className={classes.tableTextHead}>MRP / pc</TableCell >
                                <TableCell className={classes.tableTextHead}>Pieces (sets)</TableCell>
                              </TableRow>
                            </TableHead>
                            <Divider />
                            <TableBody>
                              <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell align="center" className={classes.tableTextData}>₹{storepriceperpiece[i]}</TableCell>
                                <TableCell align="center" className={classes.tableTextData}>₹{storemrpperpiecer[i]}</TableCell>
                                <TableCell align="center" className={classes.tableTextData}>{storeavailablesetquantity[i]}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                          <IconButton onClick={() => history.push("/saller/createsets/" + i)} aria-label="delete" >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteset(i)} aria-label="delete" >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>

            </div>
          </Box>
        )
      }
      )
      }
      <br />
      <MUIContainer maxWidth="sm" margin="auto">
        <Box my={1} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Button variant="contained" color="secondary" onClick={() => history.push("/saller/Createsets")}>
            Back
          </Button>
          <Button style={{ backgroundColor: "rgb(40, 121, 255)" }} variant="contained" color="primary" onClick={() => history.push('/saller/details')}>
            Next
          </Button>
        </Box>
      </MUIContainer >









    </>
  )
}

export default Previewset