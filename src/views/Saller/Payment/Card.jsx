import React from "react";

//
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Paper, Typography, Box, Button, IconButton } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const useStyles = makeStyles((theme) => ({
  mobile: {
    display: "none",
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  card: {
    flex: 1,
    minHeight: "400px",
    borderLeft: "5px solid #102037",
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  titleMobile: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "12px",
    color: "#9f9f9f",
    marginTop: "10px",
    lineHeight: 1.5,
  },
  mobileRsContainer: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    padding: "8px",
  },
  arrowRight: {
    width: "16px",
    height: "16px",
  },

  row: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: "8px",
  },

  text: {
    fontSize: "14px",
    color: "#6c6d6f",
    fontWeight: "bold",
    maxWidth: "180px",
  },
  valueMobile: {
    marginLeft: "10px",
    marginBottom: 0,
  },
  value: {
    fontSize: "14px",
    color: "#8c8b8c",
    fontWeight: "bold",
  },
  btn: {
    flex: 1,

    marginLeft: "auto",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  [theme.breakpoints.down("sm")]: {
    mobile: {
      display: "flex",
    },
    rowMobile: {
      display: "flex",
      flex: "1",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      minHeight: "70px",
      borderLeft: "0px",
      borderRadius: "0",
      borderBottom: "1px solid #e0e0e0",
    },
    description: {
      display: "none",
    },
    title: {
      display: "none",
    },
    row: {
      display: "none",
    },
    btn: {
      display: "none",
    },
  },
}));
const Card = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.card}>
        <Typography variant="h2" className={classes.title}>
          {data?.title}
        </Typography>
        <Box className={cx(classes.mobile, classes.rowMobile)}>
          <Typography
            variant="h2"
            className={cx(classes.mobile, classes.titleMobile)}
          >
            {data?.title}
          </Typography>
          <Box className={classes.mobileRsContainer}>
            <p
              className={cx(classes.value, classes.mobile, classes.valueMobile)}
            >
              Rs {data?.total}
            </p>
            <IconButton className={classes.iconButton}>
              <ArrowForwardIos className={classes.arrowRight} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="p" className={classes.description}>
          {data?.description}
        </Typography>
        <Box mt={2}>
          {data.amount && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Amount
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.amount}
              </Typography>
            </Box>
          )}
          {data.otherCharges && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Other Support Service Charges
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.otherCharges}
              </Typography>
            </Box>
          )}
          {data.otherChargesPending && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Other Support Service Charges Pending
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.otherChargesPending}
              </Typography>
            </Box>
          )}
          {data.otherPaidCharges && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Other Paid Support Service Charges
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.otherPaidCharges}
              </Typography>
            </Box>
          )}
          {data.adCost && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Ad Cost
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.adCost}
              </Typography>
            </Box>
          )}
          {data.total && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Total Charges
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.total}
              </Typography>
            </Box>
          )}
          {data.waivers && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Waivers And Compensation
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.waivers}
              </Typography>
            </Box>
          )}
          {data.netAmount && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Net Amount
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.netAmount}
              </Typography>
            </Box>
          )}
          {data.netSettlements && (
            <Box className={classes.row}>
              <Typography variant="h5" className={classes.text}>
                Net Other Settlements
              </Typography>
              <Typography variant="body1" className={classes.value}>
                Rs {data.netSettlements}
              </Typography>
            </Box>
          )}
        </Box>
        {data.details && (
          <Box className={classes.btn} mt={2}>
            <Link to="/saller/payemnt-details">
              <Button variant="contained" color="primary">
                View Details
              </Button>
            </Link>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default Card;
