import React from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#878787",
    fontSize: "16px",
  },
}));
const ModalChildren = () => {
  const classes = useStyles();

  return (
    <div>
      <Box mb={2}>
        <Typography varinant="p" className={classes.title}>
          Select a month and year to download GST Reports
        </Typography>
      </Box>
      <Box className={classes.footer} variant="contained" color="primary">
        <Button>Download</Button>
      </Box>
    </div>
  );
};

export default ModalChildren;
