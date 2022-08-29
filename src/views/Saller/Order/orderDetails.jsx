import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cx from "classnames";
// Components
import {
  Grid,
  Button,
  Paper,
  Box,
  makeStyles,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { MenuItem } from "rc-menu";

const useStyles = makeStyles((theme) => ({
  h2: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  h3: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: "14px",
  },
  p: {
    fontSize: "14px",
    fontWeight: "medium",
  },

  bold: {
    fontWeight: "bold",
  },
  orderId: {
    color: "#fff",
    backgroundColor: "rgb(63,81,181)",
    fontSize: "22px",
    fontWeight: "bold",
    padding: "10px 16px",
  },
  detailsPaper: {
    borderRadius: "8px",
  },
  container: {
    padding: "20px 16px",
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detail: {
    marginBottom: "10px",
  },
  customerDetails: {
    marginBottom: "12px",
  },
  actionPaper: {
    padding: "32px 16px",
    borderRadius: "8px",
  },
  pin: {
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelBtn: {
    background: "red",
    color: "#fff",
    "&:hover": {
      opacity: ".8",
    },
  },
  deliveryBtn: {
    background: "green",
    color: "#fff",
    // "&:hover": {
    //   opacity: ".8",
    // },
    "&:hover": {
      background: "#f00",
    },
  },
  btn: {
    display: "flex",
    maxWidth: "200px",
    margin: "auto",
  },
  select: {
    paddingBottom: "12px",
  },
}));

const OrderDetails = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [select, setSelect] = React.useState("");

  let navigate = useNavigate();
  let location = useLocation();

  const fetchallorders = async () => {
    var myModule = require("views/config");
    try {
      const response = await fetch(myModule.servername + "/api/sellerorder", {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
      });
      const json = await response.json();
      const filtered = json.filter((item) => {
        return location.pathname.includes(item._id);
      });
      if (filtered.length < 1) {
        navigate("/saller/ordersaller");
        return;
      }
      setData(...filtered);
    } catch (error) {}
  };

  useEffect(() => {
    fetchallorders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.detailsPaper}>
            <Box className={classes.orderId}>jccjdj-fjejf-fjrfj</Box>
            <Box className={classes.container}>
              <Box className={classes.dateContainer}>
                <h2 className={classes.h2}>Le Arabia</h2>
                <p className={classes.orderDate}>
                  <span className={classes.bold}>Order Date: </span>
                  2021-07-22 - 04:24 AM
                </p>
              </Box>
              <Box mt={6} mb={2}>
                <Divider />
              </Box>
              <Box>
                <h3 className={cx(classes.h3, classes.customerDetails)}>
                  Customer Details
                </h3>
                <p className={cx(classes.p, classes.detail)}>
                  <span className={classes.bold}>Name: </span>
                  Prayash
                </p>
                <p className={cx(classes.p, classes.detail)}>
                  <span className={classes.bold}>Email: </span>
                  Prayashmeher99@gmail.com
                </p>
                <p className={cx(classes.p, classes.detail)}>
                  <span className={classes.bold}>Contact Number: </span>
                  +919333433333
                </p>
                <p className={cx(classes.p, classes.detail)}>
                  <span className={classes.bold}>Delivery Address: </span>
                  3rd wave case, ahmedabad
                </p>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.actionPaper}>
            <p className={cx(classes.p, classes.pin)}>Delivery Pin: 39939</p>
            <Box py={2}>
              <Divider />
            </Box>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              fullWidth
            >
              Pickup
            </Button>
            <Box py={2}>
              <Divider />
            </Box>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              fullWidth
            >
              On Hold
            </Button>
            <Box py={2}>
              <Divider />
            </Box>
            <Button
              variant="contained"
              className={cx(classes.cancelBtn, classes.btn)}
              fullWidth
            >
              Cancel Order
            </Button>
            <Box pt={2}>
              <p className={cx(classes.p, classes.bold, classes.pin)}>
                Assigned Delivery Guy: Jane Smith
              </p>
            </Box>
            <Box>
              <FormControl
                sx={{ m: 1, minWidth: 80 }}
                fullWidth
                className={classes.select}
              >
                <InputLabel id="demo-simple-select-autowidth-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={select}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="contained"
                className={cx(classes.deliveryBtn, classes.btn)}
                fullWidth
              >
                Re Assign Delivery
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
