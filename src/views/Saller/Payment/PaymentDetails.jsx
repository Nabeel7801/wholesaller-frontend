import React from "react";

//
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, Typography, Link, Breadcrumbs } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

// components
import Table from "./Table";
const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: "80px",
    borderLeft: "5px solid #102037",
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  breadcrumbPageText: {
    color: "#b6b6b8",
    fontWeight: "bold",
  },
  breadcrumbLink: {
    color: "#3f51b5",
    fontWeight: "bold",
  },
}));
const PaymentDetails = () => {
  const classes = useStyles();
  function handleClick(event) {
    event.preventDefault();
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/saller/payments"
      onClick={handleClick}
      className={classes.breadcrumbLink}
    >
      Payments
    </Link>,

    <Typography
      key="3"
      color="text.primary"
      className={classes.breadcrumbPageText}
    >
      Breadcrumb
    </Typography>,
  ];
  return (
    <Box>
      <Paper className={classes.card}>
        <Box>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
        <Box mt={2}>
          <Typography variant="h3" className={classes.cardTitle}>
            Previous Invoices
          </Typography>
        </Box>
      </Paper>
      <Box mt={4}>
        <Table />
      </Box>
    </Box>
  );
};

export default PaymentDetails;
