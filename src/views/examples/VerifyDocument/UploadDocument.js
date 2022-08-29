import React, { useState } from "react";
import { useParams } from "react-router-dom"

import Footer from "components/Footers/DemoFooter.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import { Container } from "reactstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import successGif from "../../../assets/img/updatedocument/782-check-mark-success.gif";

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

const getTime = () => {
  const date = new Date();
  const dd = ("00" + date.getDate()).slice(-2);
  const month = ("00" + String(parseInt(date.getMonth()) + 1)).slice(-2);
  const yyyy = date.getFullYear();

  const hh = ("00" + date.getHours()).slice(-2);
  const mm = ("00" + date.getMinutes()).slice(-2);
  const ss = ("00" + date.getSeconds()).slice(-2);

  return dd + "/" + month + "/" + yyyy + " " + hh + ":" + mm + ":" + ss;
}

function UploadDocument() {
  const { documentType } = useParams();      
  const config = require("views/config");

  const classes = useStyles();
  const [showSuccess, setShowSuccess] = useState(false);

  const onChangeHandler = e => {

    const file = e.target.files[0];
    if (file) {
      const user = JSON.parse(localStorage.getItem("wholesaller"));

      const data = new FormData();
      data.append("document", file);
      data.append("type", documentType);
      data.append("status", "pending");
      data.append("upload_time", getTime());
      
      axios.post(`${config.servername}/uploadDocument/${user._id}`, data)
        .then((response) => {
          setTimeout(function () {
            setShowSuccess(true);
            localStorage.setItem("wholesaller", JSON.stringify({...user, document: response.data?._id}))
          }, 2000);

          setTimeout(() => {
            window.location.href = "/";
          }, 5000);

        })
        .catch(err => console.log(err))

    }
  };

  return (
    <div>
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
            }}
          >
            <img src={successGif} alt="success gif" width={200} height={200} />
          </div>
        </div>
      )}
      <MainNavbar />
      <Container>
        <div className="topmargin">
          <div class="ui placeholder segment">
            <div class="ui icon header">
              <i aria-hidden="true" class="pdf file outline icon"></i>
              upload {documentType} photo/pdf
            </div>

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
                Upload document
              </Button>
            </label>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default UploadDocument;
