import React from "react";
import Footer from "components/Footers/DemoFooter.js";
import MainNavbar from "components/Navbars/MainNavbar.js";

import { Container } from "reactstrap";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function GST() {
  var url = window.location.pathname;

  const classes = useStyles();

  const onChangeHandler = async (e) => {
    alert("hadskfp");
  };

  return (
    <div>
      <MainNavbar />
      <Container>
        <div className="topmargin">
          <div class="ui placeholder segment">
            <span className="text-lg font-semibold">
              GST REG 06 (Registration Certificate)
            </span>
            <div className=" font-semibold mt-2"> Certificate must show</div>
            <ul class="list-disc mx-8 mt-2">
              <li>Registration Number </li>
              <li>Legal Name </li>
              <li>Trade Name </li>
            </ul>

            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              onChange={onChangeHandler}
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                class="ui primary button"
              >
                Upload
              </Button>
            </label>
          </div>

          <br />

          <div class="ui placeholder segment">
            <span className="text-lg font-semibold">
              GST REG 25 (Provisional Registration Certificate)
            </span>
            <div className=" font-semibold mt-2"> Certificate must show</div>
            <ul class="list-disc mx-8 mt-2">
              <li>GSTIN </li>
              <li>PAN </li>
              <li>Legal Name</li>
              <li>Trade Name</li>
            </ul>

            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              onChange={onChangeHandler}
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                class="ui primary button"
              >
                Upload
              </Button>
            </label>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default GST;
