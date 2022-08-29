import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Components
import Card from "./Card";
import { ArrowBackIos, Close } from "@material-ui/icons";
import ModalComponent from "components/Modal";
import ModalChildren from "./ModalChildren";

const useStyles = makeStyles((theme) => ({
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 30px",
    minHeight: "80px",
    boxSizing: "border-box",
  },

  gridItem: {
    // gap: "16px",
    padding: "12px",
  },
  container: {
    paddingTop: "20px",
    paddingBottom: "20px",
    backgroundColor: "#ebe9ea",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
  },
  overViewText: {
    display: "inline-block",
  },
  btnContainer: {
    display: "block",
  },
  arrowLeftIcon: {
    width: "16px",
    height: "16px",
    display: "none",
  },
  iconButton: {
    padding: "8px",
  },
  modalTitle: {
    color: "#686868",
    fontSize: "16px",
  },
  modalFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    borderTop: "1px solid #e7e7e7",
  },
  modalContent: {
    maxWidth: "600px",
    width: "100%",
    margin: "auto",
    minHeight: "400px",
    backgroundColor: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    borderBottom: "1px solid #e7e7e7",
  },
  modalMiddle: {
    flex: 1,
  },
  modalHeaderContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeIcon: {
    color: "#d7d7d7",
  },
  modalHeaderTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  select: {
    minWidth: "250px",
  },
  // formControl: {
  //   padding: "10px",
  // },
  [theme.breakpoints.down("sm")]: {
    gridItem: {
      padding: "0",
    },
    topBar: {
      minHeight: "70px",
      padding: "12px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    overViewText: {
      display: "none",
    },
    btnContainer: {
      display: "none",
    },
    container: {
      padding: 0,
      backgroundColor: "transparent",
    },

    arrowLeftIcon: {
      display: "block",
    },
  },
}));
const Payments = () => {
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const data = [
    {
      title: "Next Payment",
      description:
        "Estimated value of next payment. This may change due to returns that come in before the next payout",
      amount: 10,
      otherCharges: 32,
      // otherChargesPending: 44,
      // otherPaidCharges: 87,
      // adCost: 3,
      // total: 176,
      // waivers: 9,
      // netAmount: 9,
      // netSettlements: 98,
      details: true,
      link: "next-payment",
    },
    {
      title: "Last Payment",
      description:
        "Amount transferred on your account on the last payment date",

      adCost: 3,
      total: 176,
      waivers: 9,
      netAmount: 9,
      netSettlements: 98,
      details: true,
      link: "last-payment",
    },
    {
      title: "Total Outstanding payments",
      description:
        "Estimated value of next payment. This may change due to returns that come in before the next payout",
      amount: 10,
      otherCharges: 32,
      otherChargesPending: 44,
      otherPaidCharges: 87,
      adCost: 3,
      total: 176,
      waivers: 9,
    },
    {
      title: "Previous Payments",
      description: "History of amounts transferred to your account",
      amount: 10,
      otherCharges: 32,
      otherChargesPending: 44,
      otherPaidCharges: 87,

      netSettlements: 98,
      details: true,
    },
  ];

  const [year, setyear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const handleChangeYear = (event) => {
    setyear(event.target.value);
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const years = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000",
    "1999",
  ];
  const months = [
    "January",
    "february",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className="payment-page">
        <ModalComponent
          title={"Download GST Reports"}
          open={openModal}
          handleClose={() => setOpenModal(false)}
        >
          <Box className={classes.modalContent}>
            <Box className={classes.modalHeader}>
              <Box py={1} px={2} className={classes.modalHeaderContent}>
                <Typography variant="h3" className={classes.modalHeaderTitle}>
                  Download GST Report
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <Close className={classes.closeIcon} />
                </IconButton>
              </Box>
            </Box>
            <Box className={classes.modalMiddle}>
              <Box px={2} pt={2} pb={8}>
                <Box mb={2}>
                  <Typography varinant="p" className={classes.modalTitle}>
                    Select a month and year to download GST Reports
                  </Typography>
                </Box>
                <Box className={classes.selectsContainer} mt={2}>
                  <FormControl
                    sx={{ m: 1 }}
                    variant="standard"
                    className={classes.formControl}
                  >
                    <Box>
                      <InputLabel id="year-select-label">
                        Select Year
                      </InputLabel>
                      <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={year}
                        label="Year"
                        onChange={handleChangeYear}
                        className={classes.select}
                      >
                        {years.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </FormControl>
                  <Box mt={1}>
                    <FormControl
                      sx={{ m: 1 }}
                      variant="standard"
                      className={classes.formControl}
                    >
                      <InputLabel id="month-select-label">
                        Select Month
                      </InputLabel>
                      <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={month}
                        label="Month"
                        onChange={handleChangeMonth}
                        className={classes.select}
                      >
                        {months.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.modalFooter} px={2} py={2}>
              <Button variant="contained" color="primary">
                Download
              </Button>
            </Box>
          </Box>
        </ModalComponent>
        <Box>
          <Paper p={4} className={classes.topBar}>
            <Box className={classes.titleContainer}>
              <IconButton className={classes.iconButton}>
                <ArrowBackIos className={classes.arrowLeftIcon} />
              </IconButton>
              <Typography variant="h1" className={classes.title}>
                Payments <span className={classes.overViewText}> Overview</span>
              </Typography>
            </Box>
            <Box className={classes.btnContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Download GST Reports
              </Button>
            </Box>
          </Paper>
        </Box>
        <Grid container className={classes.container}>
          {data.map((data) => (
            <Grid
              item
              xs={12}
              md={4}
              style={{ display: "flex", flexDirection: "column" }}
              className={classes.gridItem}
            >
              <Card data={data} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Payments;
