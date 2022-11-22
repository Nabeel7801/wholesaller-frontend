import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Label, FormGroup, Container, Row, Col } from "reactstrap";

import axios from "axios";

import DemoFooter from "components/Footers/DemoFooter.js";
import MainNavbar from "components/Navbars/MainNavbar.js";

import { makeStyles } from "@material-ui/core/styles";
import Buttonui from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { setUser as setStoreUser } from "store/reducers/auth" 

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
  const dispatch = useDispatch();

  const storeUser = useSelector((state) => state.auth.user)
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(storeUser || {})
  }, [storeUser])

  const [currentstatus, setcurrentstatus] = useState([]);
  const [sellerstatus, setsellerstatus] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    axios.put(`${window["apiLocation"]}/admin/users/${user._id}`, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
      phone: user.phone
    })
    .then(() => {
      toast.success("Account details updated!")
    });
  };

  const onAvatarUplaod = (e) => {
    const avatar = e.target.files[0];

    if (avatar) {
      const dataBody = new FormData();  
      dataBody.append("image", avatar);
      axios.put(`${window["apiLocation"]}/admin/users/${user._id}`, dataBody).then(({ data }) => { 
        dispatch(setStoreUser(data))
        toast.success("Account avatar updated!")
      })

    }
        
  }
 
  const onNameChange = (e) => {
    const splittedName = e.target.value.split(" ")
    setUser(prev => ({
      ...prev, 
      first_name: splittedName[0] || "", 
      last_name: splittedName[1] || "" 
    }))
  }

  const fetchcurrentstatus = async () => {
    const response = await fetch(`${window["apiLocation"]}/api/fetchcurrentstatus`,
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${user._id}`
      }
    );
    const json = await response.json();
    setcurrentstatus(json);
  };

  const fetchsellerstatus = async () => {
    const response = await fetch(`${window["apiLocation"]}/api/fetchsellerstatus`,
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${user._id}`,
      }
    );
    const json = await response.json();

    setsellerstatus(json);
  };

  useEffect(() => {
    fetchcurrentstatus();
    fetchsellerstatus();
  }, []);

  return (
    <div>
      <MainNavbar />
      
      <Container style={{ padding: '30px 2.5%' }}>
        <div className="avatar flex justify-center">
          <img 
            className="img-circle img-no-padding img-responsive"
            style={{ minWidth: 60, minHeight: 60 }}
            width={60} height={60}
            src={`${window["apiLocation"]}/file/${user.avatar}`} 
            alt="avatar" 
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${window["apiLocation"]}/file/avatar.png`;
            }}
          />
        </div>

        <Row>
          <Col className="ml-auto mr-auto text-center" md="6">
            <div className={classes.root}>
              <input
                id="contained-button-file"
                accept="image/*"
                className={classes.input}
                type="file"
                onChange={onAvatarUplaod}
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
          <Col lg="6" md="6" sm="8" xs="12">
            <Label>Name</Label>
            <FormGroup>
              <div class="ui left icon input input-styl">
                <i aria-hidden="true" class="user circle icon"></i>
                <input
                  type="text"
                  placeholder="Name"
                  value={`${user.first_name}${user.last_name ? " " : ""}${user.last_name}`}
                  onChange={onNameChange}
                />
              </div>
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="6" md="6" sm="8" xs="12">
            <Label>Mobile Number</Label>
            <FormGroup>
              <div class="ui left icon input input-styl">
                <i aria-hidden="true" class="mail icon"></i>
                <input
                  type="number"
                  placeholder="+4 78545461231"
                  value={user.phone}
                  onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </FormGroup>
          </Col>
        </Row>

        <br />

        <Row>
          <Col lg="6" md="6" sm="8" xs="12">
            <Label>Email Account</Label>
            <FormGroup>
              <div class="ui left icon input input-styl">
                <i aria-hidden="true" class="user circle icon"></i>
                <input
                  type="email"
                  placeholder="Add Email Id"
                  value={user.email}
                  onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </FormGroup>
          </Col>
        </Row>
        <br />

        <Row>
          <Col lg="6" md="6" sm="8" xs="12">
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
            <Button onClick={() => navigate(-1)} className="btn-round mr-1" color="danger" type="button">
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

      <DemoFooter />
    </div>
  );
}

export default BusinessPage;
