import React, { useState, useEffect } from "react";
import {
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Steps } from "antd";
import { Upload } from "antd";

import Resizer from "react-image-file-resizer";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { updatelisting } from "views/action/updatelisting";

import { resizeFile } from "views/globalfunctions/Base64";

import Grid from "@material-ui/core/Grid";

import history from "views/history";
const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  avtstyl: {
    backgroundColor: "deepskyblue",
  },
  input: {
    display: "none",
  },
}));

const { Step } = Steps;

function Newlisting() {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [img1, setimg1] = React.useState("");
  const [img2, setimg2] = React.useState("");
  const [img3, setimg3] = React.useState("");
  const [img4, setimg4] = React.useState("");
  const [img5, setimg5] = React.useState("");

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // const onPreview = async file => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  // const resizeFile = file =>
  //   new Promise(resolve => {
  //     Resizer.imageFileResizer(
  //       file,
  //       300,
  //       300,
  //       "JPEG",
  //       85,
  //       0,
  //       uri => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });

  const onChangeHandler1 = async e => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output1");
      output.src = reader.result;
      ////console.log(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];

      const image = await resizeFile(file);

      setimg1(image);

      ////////console.log(img1)
      ////SaveDetails();
    }
  };

  const onChangeHandler2 = async e => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output2");
      output.src = reader.result;
      ////////console.log(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];

      const image = await resizeFile(file);

      setimg2(image);
      ////SaveDetails();
    }
  };

  const onChangeHandler3 = async e => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output3");
      output.src = reader.result;
      // ////console.log(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];

      const image = await resizeFile(file);

      setimg3(image);
      ////SaveDetails();
    }
  };

  const nextpage = async e => {
    dispatch(updatelisting("mainimage", img1));
    history.push("/saller/createsets");
  };

  const onChangeHandler4 = async e => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("output4");
      output.src = reader.result;
      ///   ////console.log(reader.result);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];

      const image = await resizeFile(file);

      setimg4(image);
      ////SaveDetails();
    }
  };

  return (
    <div>
      <br />
      <Container>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="1" className={classes.avtstyl} src="s" />
            </ListItemAvatar>
            <ListItemText
              primary="Add Images"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Add All Images for this listing
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {/* <ListItem> 
          <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        
          showUploadList={true}
         
        fileList={fileList}
        accept="image/*"
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 4 && '+ Upload'}
      </Upload> */}

          <ListItem>
            <div class="avtcontainer">
              <div class="ui medium rounded image">
                <a class="ui red ribbon label">Cover</a>
                <img
                  src={
                    img1 == ""
                      ? "https://react.semantic-ui.com/images/wireframe/image.png"
                      : img1
                  }
                  class="avtimage"
                  id="output1"
                />
              </div>

              <div class="avtmiddle">
                <div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={onChangeHandler1}
                    ///  value={img1}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </label>
                </div>
              </div>
            </div>
          </ListItem>

          <Divider variant="inset" component="li" />

          <Link onClick={nextpage} color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="2" className={classes.avtstyl} src="s" />
              </ListItemAvatar>
              <ListItemText
                primary="Create sets"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Create set for Buying options
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Link>
          <Divider variant="inset" component="li" />

          <Link href="#" color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="3" className={classes.avtstyl} src="s" />
              </ListItemAvatar>
              <ListItemText
                primary="Product Details"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Set specification for this listing
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Link>

          <Divider variant="inset" component="li" />

          <Link href="#" color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="4" className={classes.avtstyl} src="s" />
              </ListItemAvatar>
              <ListItemText
                primary="Additional Details"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Edit Title, MOQ, GST, etc
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Link>
          {/* 
            <Divider variant="inset" component="li" />
      
      <Link href="#" color="inherit">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
              <Avatar alt="4"  className={classes.avtstyl}src="s" />
              </ListItemAvatar>
              <ListItemText
                primary="Geo Restriction"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Limit sale of listion in some cities
                    </Typography>
                   
                  </React.Fragment>
                }
              />
            </ListItem>
            </Link> */}
        </List>
        <br />
        <Grid container spacing={10}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/saller/producttype")}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Button variant="contained" color="primary" onClick={nextpage}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Newlisting;
