import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, FormGroup, Container, Row, Col } from "reactstrap";

import axios from "axios";

import DemoFooter from "components/Footers/DemoFooter.js";
import MainNavbar from "components/Navbars/MainNavbar.js";

import { makeStyles } from "@material-ui/core/styles";
import Buttonui from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { resizeFile } from "views/globalfunctions/Base64";

import { Tag, message } from "antd";
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    display: "none",
  },
  paper: {
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
  },
}));

function BusinessPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const localStorageUser = JSON.parse(localStorage.getItem("wholesaller"));

  const [name, setname] = useState(localStorageUser.first_name || "")
  const [img, setimg] = useState(localStorageUser.profileImg || "")
  const [phone, setphone] = useState(localStorageUser.phone || "")
  const [email, setemail] = useState(localStorageUser.email || "")
  const [currentstatus, setcurrentstatus] = useState([]);
  const [sellerstatus, setsellerstatus] = useState([]);
   
  const config = require("views/config");

  const submit = async () => {
    axios
      .post(config.servername + "/api/businessedit", {
        name: name,
        email: email,
        img: img,
        phone: phone,
        id: JSON.parse(localStorage.getItem("wholesaller"))._id,
      })
      .then((res) => {
        localStorage.setItem("wholesaller", JSON.stringify(res.data));
      });

    message.success("Updated");
  };

  const onChangeHandler = async (e) => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output");

      output.src = reader.result;
      ////console.log(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];
      const image = await resizeFile(file);

      setimg(image);
    }
  };

  const fetchcurrentstatus = async () => {
    const response = await fetch(
      config.servername + "/api/fetchcurrentstatus",
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`
      }
    );
    const json = await response.json();
    setcurrentstatus(json);
  };

  const fetchsellerstatus = async () => {
    const response = await fetch(
      config.servername + "/api/fetchsellerstatus",
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
      }
    );
    const json = await response.json();

    setsellerstatus(json);
  };
  useEffect(() => {
    fetchcurrentstatus();
    fetchsellerstatus();
  }, []);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <div>
      <MainNavbar />
      <br />
      <div className="section profile-content topmargin">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                id="output"
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={img === null ? require("assets/img/avatar.png") : img}
              />
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <div className={classes.root}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChangeHandler}
                />
                <label htmlFor="contained-button-file">
                  <Buttonui
                    variant="contained"
                    color="default"
                    style={{ backgroundColor: "black" }}
                    component="span"
                  >
                    <span className="whitebold">Add</span>
                  </Buttonui>
                </label>
              </div>
              <br />

              {currentstatus != null ? (
                <>
                  {currentstatus.status === "requested" ? (
                    <>
                      <Tag icon={<SyncOutlined spin />} color="processing">
                        Pending
                      </Tag>
                    </>
                  ) : currentstatus.status === "rejected" ? (
                    <>
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Rejected
                      </Tag>
                    </>
                  ) : currentstatus.status === "approved" ? (
                    <>
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Verified
                      </Tag>
                    </>
                  ) : null}
                </>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Not Approve
                </Tag>
              )}
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="6" md="6" sm="8" xs="8">
              <Label>Name</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <i aria-hidden="true" class="user circle icon"></i>
                  <input
                    type="text"
                    placeholder="Name"
                    defaultValue={
                      JSON.parse(localStorage.getItem("wholesaller")).firstName
                    }
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="6" md="6" sm="8" xs="8">
              <Label>Mobile Number</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <i aria-hidden="true" class="mail icon"></i>
                  <input
                    type="number"
                    placeholder="+4 78545461231"
                    defaultValue={
                      JSON.parse(localStorage.getItem("wholesaller")).phone
                    }
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>

          <br />

          <Row>
            <Col lg="6" md="6" sm="8" xs="8">
              <Label>Email Account</Label>
              <FormGroup>
                <div class="ui left icon input input-styl">
                  <i aria-hidden="true" class="user circle icon"></i>
                  <input
                    type="email"
                    placeholder="Add Email Id"
                    defaultValue={
                      JSON.parse(localStorage.getItem("wholesaller")).email
                    }
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />

          <Row>
            <Col lg="6" md="6" sm="8" xs="8">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5">Verify Your Profile</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Get your business verify to getthe Verifyied Business
                      badge, and access to exclusive product and service
                    </Typography>
                    <br />
                    <Button
                      className="btn"
                      color="warning"
                      onClick={() => navigate("/verifydocument")}
                    >
                      Verify Now
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Col>
          </Row>

          <br />

          <Row>
            {sellerstatus != null ? (
              <>
                {sellerstatus.status === "requested" ? (
                  <>
                    <Typography
                      variant="body2"
                      color="textdanger"
                      component="p"
                    >
                      <p style={{ color: "red" }}>
                        Requested for Seller Verification
                      </p>
                    </Typography>
                  </>
                ) : sellerstatus.status === "rejected" ? (
                  <>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <p style={{ color: "red" }}>
                        Your Request for Seller Verification has been rejected
                        By Admin
                      </p>
                    </Typography>
                  </>
                ) : sellerstatus.status === "approved" ? (
                  <>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <p style={{ color: "red" }}>Verified As Seller</p>
                    </Typography>
                  </>
                ) : null}
              </>
            ) : (
              <Col lg="6" md="6" sm="8" xs="8">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5">Apply for Seller</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Get your business verify to getthe Verifyied Business
                        badge, and access to exclusive product and service
                      </Typography>
                      <br />
                      <Button
                        className="btn"
                        color="danger"
                        onClick={() => navigate("/applyseller")}
                      >
                        Apply Now
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Col>
            )}
          </Row>

          <br />

          <Row>
            <Col lg="2" md="2" sm="2" xs="2">
              <Button className="btn-round mr-1" color="danger" type="button">
                Back
              </Button>
            </Col>
            <Col lg="4" md="4" sm="2" xs="2"></Col>
            <Col lg="2" md="2" sm="2" xs="2">
              <Button
                className="btn-round mr-1"
                color="info"
                onClick={submit}
                type="button"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <DemoFooter />
    </div>
  );
}

export default BusinessPage;
