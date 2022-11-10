import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MainNavbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footers/DemoFooter.js";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    padding: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  links: {
    cursor: "pointer"
  }
}));

function Account() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <MainNavbar />

      <Container maxWidth="lg">

        <div className="mt-5 w-full">
          <div className={classes.links} onClick={() => navigate("/business")}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg">
                    P
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <span className="blackbold">Your Profile</span>
                  <div className="subtitle-styl">Modify Your Profile</div>
                </Grid>

                <Grid item xs={12}>
                  <Typography></Typography>
                </Grid>

                <Grid item xs zeroMinWidth>
                  <i
                    aria-hidden="true"
                    class="angle right big icon floatright"
                  ></i>
                </Grid>
              </Grid>
            </Paper>
          </div>
          <br />
        </div>

        <div className={classes.links} onClick={() => navigate("/setting")}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar src="https://image.freepik.com/free-vector/businessman-with-audit-elements-web-template_108855-1663.jpg">
                  A
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <span className="blackbold">Account Setting</span>
                <div className="subtitle-styl">Address, Bank details,etc</div>
              </Grid>

              <Grid item xs={12}>
                <Typography></Typography>
              </Grid>

              <Grid item xs={12}>
                <i
                  aria-hidden="true"
                  class="angle right big icon floatright"
                ></i>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <br />

      </Container>

      <Footer />
    </>
  );
}

export default Account;
