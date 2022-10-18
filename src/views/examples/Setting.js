import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Label, FormGroup} from "reactstrap";

import MainNavbar from "components/Navbars/MainNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
}));

function Setting() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <MainNavbar />

      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={6}>
            <Grid item lg={5} md={6} xs={12} sm={12}>
              <Label>Primary Address</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <input type="text" placeholder="" />
                </div>
              </FormGroup>
            </Grid>
          </Grid>

          <h3>Bank Details</h3>
          <Grid container spacing={6}>
            <Grid item lg={5} md={6} xs={12} sm={12}>
              <Label>Account Number</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <input type="text" placeholder="" />
                </div>
              </FormGroup>
            </Grid>

            <Grid item lg={5} md={6} xs={12} sm={12}>
              <Label>Confirm Account Number</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <input type="text" placeholder="" />
                </div>
              </FormGroup>
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid item lg={5} md={6} xs={12} sm={12}>
              <Label>Account Name</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <input type="text" placeholder="" />
                </div>
              </FormGroup>
            </Grid>

            <Grid item lg={5} md={6} xs={12} sm={12}>
              <Label>IFSC code</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <input type="number" placeholder="" />
                </div>
              </FormGroup>
            </Grid>
          </Grid>

          <Grid container spacing={10}>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>

      <DemoFooter />
    </div>
  );
}

export default Setting;
