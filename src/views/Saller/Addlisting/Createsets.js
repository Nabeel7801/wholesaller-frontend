import React, { useState, useEffect, useRef } from "react";
import {
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  // Container,
  Row,
  Col,
} from "reactstrap";
import { Tab, Table, Segment, Label, Image, Dropdown } from "semantic-ui-react";

import { Box, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import {
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  Divider,
} from "@material-ui/core";
import { Upload } from "antd";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { updatelisting } from "views/action/updatelisting";
import history from "views/history";
import { YoutubeSearchedForRounded } from "@material-ui/icons";
import { resizeFile } from "views/globalfunctions/Base64";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
function Createsets() {
  // state variables for steps and other stuff of create set
  const [addListing, setAddListing] = useState({
    step: 1,
    quantityOfColors: null,
  });
  console.log("addListing_GS", addListing);

  // Proceed to next step
  const nextStep = () => {
    console.log("addListing in next step", addListing);
    setAddListing({ ...addListing, step: addListing.step + 1 });
  };

  // back to prev step
  const prevStep = () => {
    setAddListing({ ...addListing, step: addListing.step - 1 });
  };

  // state for sizes
  const sizeOpt1 = [
    { size: "3XS" },
    { size: "2XS" },
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "2XL" },
    { size: "3XL" },
    { size: "4XL" },
    { size: "5XL" },
    { size: "6XL" },
  ];
  const sizeOpt2 = [
    { size: 14 },
    { size: 16 },
    { size: 18 },
    { size: 20 },
    { size: 22 },
    { size: 24 },
    { size: 26 },
    { size: 28 },
    { size: 30 },
    { size: 32 },
    { size: 34 },
    { size: 36 },
    { size: 38 },
    { size: 40 },
    { size: 42 },
    { size: 44 },
  ];
  console.log("sizeOpt1", sizeOpt1);
  const textInput = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  var edityes = 0;

  var storecolorformap = useSelector((state) => state.addlisting.colorformap);
  var storeqtyOfColors = 4;
  console.log(
    "storeqtyOfColors",
    useSelector((state) => state.addListing)
  );
  var storemapsize = useSelector((state) => state.addlisting.mapsize);
  var storefinalarr = useSelector((state) => state.addlisting.finalarr);

  var storeminsetorderr = useSelector((state) => state.addlisting.minsetorder);
  var storepriceperpiece = useSelector(
    (state) => state.addlisting.priceperpiece
  );
  var storemrpperpiecer = useSelector((state) => state.addlisting.mrpperpiece);
  var storeavailablesetquantity = useSelector(
    (state) => state.addlisting.availablesetquantity
  );
  var storesquid = useSelector((state) => state.addlisting.squid);

  var storesetinstock = useSelector((state) => state.addlisting.setinstock);

  var decidecolor = [];
  var decidesize = [];
  var decideqtyOfColors = null;
  var decidefinalarr = [];

  var decideminsetorder = "";
  var decidepriceperpiece = "";
  var decidemrpperpiece = "";
  var decideavailablesetquantity = "";
  var decidesquid = "";
  var decidesetinstock = true;

  var url = window.location.pathname;
  var array = url.split("/");

  var lastsegment = array[array.length - 1];

  if (lastsegment >= "0" && lastsegment <= "9") {
    decidecolor = storecolorformap[lastsegment];
    decideqtyOfColors = storeqtyOfColors[lastsegment];
    decidesize = storemapsize[lastsegment];
    // decideallattributes=storeallattributep[lastsegment];
    decidefinalarr = storefinalarr[lastsegment];

    decideminsetorder = storeminsetorderr[lastsegment];
    decidepriceperpiece = storepriceperpiece[lastsegment];

    decidemrpperpiece = storemrpperpiecer[lastsegment];

    decideavailablesetquantity = storeavailablesetquantity[lastsegment];
    decidesquid = storesquid[lastsegment];

    decidesetinstock = storesetinstock[lastsegment];

    edityes = 1;
  }

  const [arrcolor, setarrcolor] = React.useState(decidecolor);

  const [finalarr, setfinalarr] = React.useState(decidefinalarr);
  const [numberOfColors, setNumberOfColors] = useState(decideqtyOfColors);
  const [size, setsize] = React.useState(decidesize);
  const [allattribute, setallattribute] = React.useState([]);
  const [minsetorder, setminsetorder] = React.useState(100000);
  const [priceperpiece, setpriceperpiece] = React.useState(100000);
  const [mrpperpiece, setmrpperpiece] = React.useState(100000);
  const [availablesetquantity, setavailablesetquantity] =
    React.useState(100000);
  const [squid, setsquid] = React.useState(2222);

  ////const  datafromstore=useSelector(state => state.addlisting.);
  /////alert(datafromstore)

  const [ischecked, setischecked] = React.useState(decidesetinstock);

  const [sizesoptions, setsizesoptions] = useState([]);

  const [colorsoption, setcolorsoption] = useState([]);

  const fetchsizes = async () => {
    var myModule = require("views/config");
    const response = await fetch(myModule.servername + "/api/fetchsizes", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: ``,
      // body: JSON.stringify({
      //   fabric: fabric,

      // })
    });
    const json = await response.json();
    if (json != null) {
      setsizesoptions(json.itemssize);
    } else {
      setsizesoptions([]);
    }

    //// setitemssize(json.itemssize)
  };

  const fetchcolors = async () => {
    var myModule = require("views/config");
    const response = await fetch(myModule.servername + "/api/fetchcolors", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: ``,
      // body: JSON.stringify({
      //   fabric: fabric,

      // })
    });
    const json = await response.json();

    if (json != null) {
      setcolorsoption(json.itemscolor);
    } else {
      setsizesoptions([]);
    }
  };

  useEffect(() => {
    fetchcolors();
    fetchsizes();
  }, []);

  const onChangeHandler1 = async (e, i) => {
    /// alert(i)
    console.log("onchange", i);
    if (e.target.files[0]) {
      const file = e.target.files[0];
      console.log("file taken", file);
      const image = await resizeFile(file);
      console.log("image taken", file);

      /////setimg1(image);

      var temp = finalarr;
      temp[i].img = image;
      setfinalarr([]);
      setfinalarr(temp);
      ///////console.log(arrcolor)
    }
  };

  function checkqty(size, color, img) {
    for (var i = 0; i < allattribute.length; i++) {
      if (
        allattribute[i].img == img &&
        allattribute[i].color == color &&
        allattribute[i].size == size
      ) {
        return allattribute[i].qty;
      }
    }
    return 1;
  }

  const saveandnext = async () => {
    console.log("save and next is being called");

    if (finalarr.length < 1 || size.length < 1) {
      alert("please at least choose one color and one size");
    } else if (arrcolor.length !== numberOfColors) {
      window.alert(
        `Please select ${numberOfColors} ${
          numberOfColors > 1 ? "colors" : "color"
        }`
      );
    } else {
      var finalobject = [];
      for (var i = 0; i < finalarr.length; i++) {
        var mysize = [];
        var myqty = [];
        for (var j = 0; j < size.length; j++) {
          var temp = checkqty(size[j], finalarr[i].color, finalarr[i].img);
          mysize.push(size[j]);
          myqty.push(temp);
        }

        var myObj = {
          color: finalarr[i].color,
          img: finalarr[i].img,
          sizes: mysize,
          qty: myqty,
        };

        finalobject.push(myObj);
      }

      //// setfinalarr([])
      if (
        minsetorder == "" ||
        priceperpiece == "" ||
        mrpperpiece == "" ||
        availablesetquantity == "" ||
        squid == ""
      ) {
        alert("please Fill all fields");
      } else {
        // to move the create set back to 1st step
        setAddListing({
          ...addListing,
          step: 1,
        });

        dispatch(updatelisting("colorformap", arrcolor));

        dispatch(updatelisting("quantityOfColors", numberOfColors));

        dispatch(updatelisting("allsets", finalobject));

        dispatch(updatelisting("finalarr", finalarr));
        // dispatch(updatelisting('allattribute',allattribute))
        dispatch(updatelisting("mapsize", size));

        dispatch(updatelisting("minsetorder", minsetorder));
        dispatch(updatelisting("priceperpiece", priceperpiece));

        dispatch(updatelisting("mrpperpiece", mrpperpiece));
        dispatch(updatelisting("availablesetquantity", availablesetquantity));
        dispatch(updatelisting("squid", squid));
        dispatch(updatelisting("setinstock", ischecked));

        history.push("/saller/previewset");
      }
    }
  };

  const update = async () => {
    // to move the create set back to 1st step
    setAddListing({
      ...addListing,
      step: 1,
    });
    var finalobject = [];
    for (var i = 0; i < finalarr.length; i++) {
      var mysize = [];
      var myqty = [];
      for (var j = 0; j < size.length; j++) {
        var temp = checkqty(size[j], finalarr[i].color, finalarr[i].img);
        mysize.push(size[j]);
        myqty.push(temp);
      }

      var myObj = {
        color: finalarr[i].color,
        img: finalarr[i].img,
        sizes: mysize,
        qty: myqty,
      };

      finalobject.push(myObj);
    }

    dispatch(updatelisting("updatecolormap", [lastsegment, arrcolor]));
    dispatch(updatelisting("quantityOfColors", [lastsegment, numberOfColors]));

    dispatch(updatelisting("updateallsets", [lastsegment, finalobject]));

    dispatch(updatelisting("updatefinalarr", [lastsegment, finalarr]));
    // dispatch(updatelisting('updateallattribute',[lastsegment,allattribute]))
    dispatch(updatelisting("updatemapsize", [lastsegment, size]));

    dispatch(updatelisting("updateminsetorder", [lastsegment, minsetorder]));
    dispatch(
      updatelisting("updatepriceperpiece", [lastsegment, priceperpiece])
    );
    dispatch(updatelisting("updatemrpperpiece", [lastsegment, mrpperpiece]));

    dispatch(
      updatelisting("updateavailablesetquantity", [
        lastsegment,
        availablesetquantity,
      ])
    );
    dispatch(updatelisting("updatesquid", [lastsegment, squid]));

    dispatch(updatelisting("updatesetinstock", [lastsegment, ischecked]));

    history.push("/saller/previewset");
  };

  const datafromstore = useSelector((state) => state.addlisting.mainimages);

  const handlecolor = (event, data) => {
    ///alert(event.type);

    if (arrcolor.length > data.value.length) {
      var difference = arrcolor.filter((x) => data.value.indexOf(x) === -1);

      ////   alert(finalarr.length)
      ////console.log(finalarr)
      for (var i = 0; i < finalarr.length; i++) {
        // alert(finalarr[i].color)
        /// alert(difference[0]);

        if (finalarr[i].color == difference[0]) {
          ////   alert(i)
          finalarr.splice(i, 1);
          /// ////console.log(finalarr)
        }
      }
    } else {
      var difference = data.value.filter((x) => arrcolor.indexOf(x) === -1);

      ////finalarr.push({ "color":difference,"img":''  });

      var myObj = { color: difference, img: "" };
      setfinalarr((finalarr) => [...finalarr, myObj]);

      //////console.log(finalarr)
      ///setfinalarr(data.value)
      // var temp=finalarr;
      // temp.push({ "color":difference,"img":''  })
      // setfinalarr([]);
      // ////console.log(temp)
      // setfinalarr(temp)
    }

    console.log(finalarr);
    // var myObj=[];
    //   for (var i = 0; i < data.value.length; i++) {

    //     var temp = { "color":data.value[i]  };

    //     myObj.push(temp)
    //      }
    setarrcolor(data.value);
    // ///////console.log(arrcolor)
    setsize([]);
  };

  const instock = (e) => {
    if (ischecked == true) {
      setischecked(false);
    } else {
      setischecked(true);
    }
  };

  const changesize = async (e) => {
    if (size.includes(e.target.value)) {
      const index = size.indexOf(e.target.value);
      //// alert(index)
      if (index > -1) {
        size.splice(index, 1);
      }
      ///alert("work")
    } else {
      size.push(e.target.value);
    }

    var temp = await size;
    if (temp.length > 0) {
      var qty = [];
      for (var i = 0; i < temp.length; i++) {
        qty.push(1);
      }

      for (var i = 0; i < finalarr.length; i++) {
        finalarr[i].sizes = temp;
        finalarr[i].qty = qty;
      }
    }
    ////console.log(finalarr)
  };

  const [updateState, setUpdateState] = useState(0);
  const changesize2 = async (e) => {
    if (size.includes(e)) {
      const index = size.indexOf(e);
      //// alert(index)
      if (index > -1) {
        console.log("if is running");
        size.splice(index, 1);
        setUpdateState(Math.random() * Math.random());
      }

      ///alert("work")
    } else {
      if (size.length < 1) {
        size.push(e);
      } else if (typeof e == typeof size[0]) {
        console.log("else if is running");
        size.push(e);
      } else {
        size.splice(0, size.length);
        size.push(e);
      }
      setUpdateState(Math.random() * Math.random());

      console.log("else is running");
    }
    console.log("type of new size", typeof e);
    console.log("typeof size[0]", typeof size[0]);
    console.log("size", size);
    // if (size.length < 1) {
    //   setsize([...size, e]);
    // }
    var temp = await size;
    if (temp.length > 0) {
      var qty = [];
      for (var i = 0; i < temp.length; i++) {
        qty.push(1);
      }

      for (var i = 0; i < finalarr.length; i++) {
        finalarr[i].sizes = temp;
        finalarr[i].qty = qty;
      }
    }

    var temp = await size;
    if (temp.length > 0) {
      var qty = [];
      for (var i = 0; i < temp.length; i++) {
        qty.push(1);
      }

      for (var i = 0; i < finalarr.length; i++) {
        finalarr[i].sizes = temp;
        finalarr[i].qty = qty;
      }
    }
    ////console.log(finalarr)
  };
  const increaseqtysize = async (e, color, img, size) => {
    console.log("value in increseqty", e.target.value);
    console.log("size in increaseqtysize", size);
    for (var i = 0; i < finalarr.length; i++) {
      if (finalarr[i].color[0] == color && finalarr[i].img == img) {
        console.log("1st if passed");
        if (typeof finalarr[i].sizes === "undefined") {
          console.log("2nd if failed");
          console.log(finalarr[i]);
          alert("undefined call");
        } else {
          console.log("2nd if passed");
          var index = finalarr[i].sizes.indexOf(size);
          var temparr = finalarr[i].qty;
          var finalarray = [];
          for (var j = 0; j <= temparr.length; j++) {
            console.log("j", j);
            console.log("index", index);
            if (j == index) {
              console.log("3rd if failed");
              finalarray.push(parseInt(e.target.value));
            } else {
              console.log("3rd if passed");
              finalarray.push(temparr[j]);
            }
          }
          // temparr[index]=parseInt(e.target.value)

          finalarr[i].qty = finalarray;
        }
      }
    }

    ////console.log(finalarr)
    var tempy = await finalarr;
    setfinalarr([]);
    setfinalarr(tempy);

    // var chk=0;

    // var abc=e.target.value;
    //   ///alert(size)

    //   for (var i = 0; i < allattribute.length; i++) {

    //     if(allattribute[i].color==color && allattribute[i].size==size && allattribute[i].img==img){
    //       chk=1;
    // /////alert("already")

    // /////setallattribute(temp);
    // //var  temp=allattribute;
    // ///temp[i].qty=e.target.value;

    // var cloneArrayone = allattribute;
    // cloneArrayone[i].qty =e.target.value;
    // setallattribute([])
    // setallattribute(await cloneArrayone)

    // setallattribute(allattribute => [...allattribute, allattribute[i].qty=abc]);

    ///////console.log(temp)
    //setallattribute([])
    // setallattribute([])
    // setallattribute([])
    // setallattribute(temp)

    /////dispatch(updatelisting('allattribute',temp))
    ////setallattribute(allattribute);

    //     }
    //   }

    //   if(chk==0){
    //     var myObj = { 'qty':e.target.value,"color":color ,"img":img,'size':size};
    //     setallattribute(allattribute => [...allattribute, myObj]);
    //   }

    // ////console.log(allattribute)

    // if(size.includes(e.target.value)){
    //   const index = size.indexOf(e.target.value);
    //  //// alert(index)
    //   if (index > -1) {
    //     size.splice(index, 1);
    //   }
    //   ///alert("work")
    // }
    // else{
    //   size.push(e.target.value)
    // }

    ///////console.log(allattribute)

    /// alert(temp)

    document.getElementById(color + img + size).focus();
  };

  const colorOptions = [];

  for (var i = 0; i < colorsoption.length; i++) {
    var myobj = {
      key: colorsoption[i],
      text: colorsoption[i],
      value: colorsoption[i],
      label: { color: colorsoption[i] },
    };
    colorOptions.push(myobj);
  }

  const colors = ["red"];

  function myfun(inputsize, inputcolor, inputimg) {
    //// var abc=  allattribute.map((m,n) =>m.color==inputcolor&& m.size==inputsize && m.img==inputimg? m.qty:null)

    //     for (var i = 0; i < allattribute.length; i++) {

    //       if(allattribute[i].size==inputsize && allattribute[i].color==inputcolor && allattribute[i].img==inputimg){
    // return allattribute[i].qty
    //       }
    //     }

    for (var i = 0; i < finalarr.length; i++) {
      if (finalarr[i].color[0] == inputcolor && finalarr[i].img == inputimg) {
        console.log("1st if passed in fun");
        /////  alert()
        if (typeof finalarr[i].sizes === "undefined") {
          console.log("2nd if failed in fun");
        } else {
          console.log("2nd if passed in fun");

          var index = finalarr[i].sizes.indexOf(inputsize);
          var abc = finalarr[i].qty[index];
          return abc;
        }
      }
    }
  }

  const [activeIndex, setactiveIndex] = React.useState();

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const number = [1, 2, 3, 4, 5, 6, 7, 8];
  const panes = [
    {
      menuItem: "Colors",
      render: () => (
        <Tab.Pane style={{ flexShrink: 0 }}>
          <Box className="text-center">
            <Box mb={3}>
              <p className="text-primary_CS text-bold">
                How many colors this set has?
              </p>
            </Box>
            <Box>
              <Grid container spacing={1}>
                {number.map((number) => {
                  return (
                    <Grid item xs={3} key={number}>
                      <Box mb={2}>
                        <button
                          className="selection-btn"
                          onClick={() => setNumberOfColors(number)}
                          style={{
                            maxWidth: "40px",
                            backgroundColor:
                              number === numberOfColors && "rgb(1,158,235)",
                            color: number === numberOfColors && "#fff",
                          }}
                        >
                          {number}
                        </button>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Divider />
            <Dropdown
              multiple
              placeholder="Select color"
              onChange={handlecolor}
              value={arrcolor}
              fluid
              search
              selection
              options={colorOptions}
            />
          </Box>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Size",
      render: () => (
        <Tab.Pane>
          <ul className="ks-cboxtags">
            {sizesoptions.map((s, i) => (
              <li>
                <input
                  type="checkbox"
                  defaultChecked={size.includes(s)}
                  onChange={changesize}
                  value={s}
                  id={"checkbox6" + i + 1}
                  defaultValue="men"
                />
                <label htmlFor={"checkbox6" + i + 1}>{s}</label>
              </li>
            ))}
          </ul>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Images",
      render: () => (
        <Tab.Pane>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              {finalarr.map((s, i) => (
                <Label>
                  {s.color}
                  {colors.map((color) => (
                    <Label circular color={s.color} key={color}></Label>
                  ))}

                  {/* {s.color} */}

                  <ListItem>
                    <div class="avtcontainer">
                      <div class="ui medium rounded image">
                        <img
                          src={
                            s.img == ""
                              ? "https://react.semantic-ui.com/images/wireframe/image.png"
                              : s.img
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
                            id={"icon-button-file" + i}
                            type="file"
                            onChange={(e) => onChangeHandler1(e, i)}

                            ///  value={img1}
                          />
                          <label htmlFor={"icon-button-file" + i}>
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
                </Label>
              ))}
            </Grid>
            {/* <Grid item xs={5}>
        <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        className="avatar-uploader"
          showUploadList={false}

        fileList={fileList}
        accept="image/*"
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 4 && '+ Upload'}
      </Upload>
        </Grid> */}
          </Grid>
          <Divider component="li" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Price, MOQ",
      render: () => (
        <Tab.Pane>
          <Row>
            <Col lg="8" md="10" sm="10" xs="10">
              <div className="blackbold">Min. set to order</div>
              <Input
                value={minsetorder}
                onChange={(e) => setminsetorder(e.target.value)}
                type="number"
                inputProps={{ "aria-label": "description" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="8" md="10" sm="10" xs="10">
              <div className="blackbold">Price per Piece</div>
              <Input
                value={priceperpiece}
                onChange={(e) => setpriceperpiece(e.target.value)}
                pplaceholder="0"
                type="number"
                min="1"
                inputProps={{ "aria-label": "description" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="8" md="10" sm="10" xs="10">
              <div className="blackbold">MPR per Piece</div>
              <Input
                value={mrpperpiece}
                onChange={(e) => setmrpperpiece(e.target.value)}
                placeholder="0"
                type="number"
                min="1"
                inputProps={{ "aria-label": "description" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="8" md="10" sm="10" xs="10">
              <div className="blackbold">Available Quantity (sets)</div>
              <Input
                value={availablesetquantity}
                onChange={(e) => setavailablesetquantity(e.target.value)}
                placeholder="0"
                type="number"
                min="1"
                inputProps={{ "aria-label": "description" }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="8" md="10" sm="10" xs="10">
              <div className="blackbold">SQU ID</div>
              <Input
                value={squid}
                onChange={(e) => setsquid(e.target.value)}
                placeholder="0"
                type="number"
                min="1"
                inputProps={{ "aria-label": "description" }}
              />
            </Col>
          </Row>

          <Row>
            <Col lg="8" md="10" sm="10" xs="10">
              <br></br> <br></br>
              <div class="ui toggle checkbox">
                <input
                  onClick={instock}
                  type="checkbox"
                  defaultChecked={ischecked}
                  name="public"
                />
                <label>Present In Stock</label>
              </div>
            </Col>
          </Row>
        </Tab.Pane>
      ),
    },

    {
      menuItem: "Set Contents",
      render: () => (
        <Tab.Pane>
          <Table celled>
            {finalarr.map((s, i) => (
              <>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Image src={s.img} avatar />
                      {colors.map((color) => (
                        <Label color={s.color} key={color}></Label>
                      ))}
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {size.map((k, t) => (
                    <>
                      <Table.Row>
                        <Table.Cell>
                          <div className="blackbold">{k}</div>
                        </Table.Cell>
                        <Table.Cell>
                          <Input
                            style={{ width: "30%" }}
                            id={s.color + s.img + k}
                            placeholder="0"
                            onChange={(e) =>
                              increaseqtysize(e, s.color, s.img, k)
                            }
                            value={myfun(k, s.color, s.img)}
                            type="number"
                            min="1"
                          />
                        </Table.Cell>
                      </Table.Row>
                    </>
                  ))}
                </Table.Body>
              </>
            ))}
          </Table>
        </Tab.Pane>
      ),
    },
  ];

  const fieldText = [
    { step: 1, text: "Colors" },
    { step: 2, text: "Sizes" },
    { step: 3, text: "Images" },
    { step: 4, text: "Price, MOQ" },
    { step: 5, text: "Set Contents" },
  ];

  // functions for color components
  // validating the color buttons
  const validateColors = async () => {
    if (arrcolor.length !== numberOfColors) {
      window.alert(
        `Please select ${numberOfColors} ${
          numberOfColors > 1 ? "colors" : "color"
        }`
      );
    } else {
      setAddListing({
        ...addListing,
        quantityOfColors: numberOfColors,
        colors: arrcolor,
      });
      nextStep();
    }
  };
  // functions for color components

  // functions for sizes components

  // validating the sizes buttons
  const validateSizes = async () => {
    if (size.length < 1) {
      window.alert(`Please select sizes from either options`);
    } else {
      nextStep();
    }
  };
  // functions for sizes components

  // functions for images component

  const validateImages = () => {
    nextStep();
  };
  // functions for images component

  // right side components
  const COLORS = (
    <Box className="text-center" mb={{ xs: 15, sm: 5 }}>
      <Box mb={3}>
        <p className="text-primary_CS text-bold">
          How many colors this set has?
        </p>
      </Box>
      <Box>
        <Grid container spacing={1}>
          {number.map((number) => {
            return (
              <Grid item xs={3} key={number}>
                <Box mb={2}>
                  <button
                    className="selection-btn text-bold"
                    onClick={() => setNumberOfColors(number)}
                    style={{
                      maxWidth: "40px",
                      backgroundColor:
                        number === numberOfColors && "rgb(1,158,235)",
                      color: number === numberOfColors && "#fff",
                    }}
                  >
                    {number}
                  </button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Divider />
      {numberOfColors && (
        <Box>
          <Box style={{ position: "relative", zIndex: "25" }}>
            <Dropdown
              multiple
              placeholder="Select color"
              onChange={handlecolor}
              value={arrcolor}
              fluid
              search
              selection
              options={colorOptions}
            />
          </Box>
          <Box style={{ display: "flex", justifyContent: "flex-end" }} mt={1}>
            <Button
              style={{ backgroundColor: "rgb(40, 121, 255)" }}
              color="primary"
              variant="contained"
              onClick={validateColors}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );

  const SIZES = (
    <Box mb={{ xs: 15, sm: 5 }}>
      <Box mb={3}>
        <p className="text-primary_CS text-bold text-center">
          Select multiple sizes from any of the size option
        </p>
      </Box>
      <Box>
        <p className="color-dark-gray medium_LP">Size Option 1</p>
        <Box mt={2}>
          <Grid container spacing={1} justifyContent="space-between">
            {sizeOpt1.map((s) => {
              return (
                <Grid item xs={3} key={s.size}>
                  <Box mb={2} className="text-center">
                    <button
                      className="selection-btn text-bold"
                      style={{
                        maxWidth: "60px",
                        backgroundColor:
                          size.includes(s.size) && "rgb(1,158,235)",
                        color: size.includes(s.size) && "#fff",
                      }}
                      onClick={() => changesize2(s.size)}
                    >
                      {s.size}
                    </button>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <Box>
        <p className="color-dark-gray medium_LP">Size Option 2</p>
        <Box mt={2}>
          <Grid container spacing={1}>
            {sizeOpt2.map((s) => {
              console.log("includes?", size.includes(s.size));
              return (
                <Grid item xs={3} key={s.size}>
                  <Box mb={2} className="text-center">
                    <button
                      className="selection-btn text-bold "
                      style={{
                        maxWidth: "60px",
                        backgroundColor:
                          size.includes(s.size) && "rgb(1,158,235)",
                        color: size.includes(s.size) && "#fff",
                      }}
                      onClick={() => changesize2(s.size)}
                    >
                      {s.size}
                    </button>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <Box
        my={1}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button color="secondary" variant="contained" onClick={prevStep}>
          Back
        </Button>
        <Button
          style={{ backgroundColor: "rgb(40, 121, 255)" }}
          color="primary"
          variant="contained"
          onClick={validateSizes}
        >
          Next
        </Button>
      </Box>
    </Box>
  );

  const IMAGES = (
    <Box mb={{ xs: 15, sm: 5 }}>
      <Box>
        <p className="text-primary_CS text-bold text-center">
          Provide image for every color
        </p>
      </Box>
      <Box>
        <Box my={3}>
          {finalarr.map((data, index) => (
            <Box
              className="imageContainer"
              mt={6}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxHeight: "100px",
              }}
              key={data.color}
            >
              <Box>
                <h4 className="medium_LP">{index + 1}.</h4>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: `${data.color}`,
                    borderRadius: "50%",
                    marginTop: "10px",
                    border: data.color === "white" && "1px solid black",
                  }}
                ></div>
                <p
                  className="medium_LP"
                  style={{ textTransform: "capitalize" }}
                >
                  {data.color}
                </p>
              </Box>
              <Box>
                <label htmlFor={`upload-photo${index}`}>
                  <input
                    style={{ display: "none" }}
                    id={`upload-photo${index}`}
                    name="upload-photo"
                    accept="image/*"
                    className={classes.input}
                    type="file"
                    onChange={(e) => onChangeHandler1(e, index)}
                    // onChange={fileSelectedHandler}
                  />
                  <br />
                  <br />
                  {data.img ? (
                    <img
                      src={data.img}
                      className="images_CS"
                      style={{ borderRadius: "10px" }}
                    />
                  ) : (
                    <Box
                      className="images_CS"
                      style={{
                        backgroundColor: "rgb(247,247,247)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Fab
                        color="primary"
                        size="small"
                        component="span"
                        aria-label="add"
                      >
                        <AddIcon />
                      </Fab>
                    </Box>
                  )}
                  <br />
                  <br />
                </label>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        my={1}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button color="secondary" variant="contained" onClick={prevStep}>
          Back
        </Button>
        <Button
          style={{ backgroundColor: "rgb(40, 121, 255)" }}
          color="primary"
          variant="contained"
          onClick={validateImages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );

  const PRICE = (
    <Box mb={{ xs: 15, sm: 5 }}>
      <Box>
        <Box my={2}>
          <Box>
            <p className={"priceText_CS p text-bold color-dark-gray"}>
              Min. sets to order
            </p>
            <input
              className="priceField_CS"
              type="number"
              min="1"
              value={minsetorder}
              onChange={(e) => setminsetorder(e.target.value)}
            />
          </Box>

          <Box my={2}>
            <p className={"priceText_CS p text-bold color-dark-gray"}>
              Price per piece
            </p>
            <input
              className={"priceField_CS"}
              type="number"
              min="1"
              value={priceperpiece}
              onChange={(e) => setpriceperpiece(e.target.value)}
            />
          </Box>
          <Box my={2}>
            <p className={"priceText_CS p text-bold color-dark-gray"}>
              MPR per piece
            </p>
            <input
              className={"priceField_CS"}
              type="number"
              min="1"
              value={mrpperpiece}
              onChange={(e) => setmrpperpiece(e.target.value)}
            />
          </Box>
          <Box my={2}>
            <p className={"priceText_CS p text-bold color-dark-gray"}>
              Available quantity (sets)
            </p>
            <input
              className={"priceField_CS"}
              type="number"
              min="1"
              value={availablesetquantity}
              onChange={(e) => setavailablesetquantity(e.target.value)}
            />
          </Box>
          <Box my={2}>
            <p className={"priceText_CS p text-bold color-dark-gray"}>SQU ID</p>
            <input
              className={"priceField_CS"}
              type="number"
              min="0"
              value={squid}
              onChange={(e) => setsquid(e.target.value)}
            />
          </Box>
        </Box>
        <Row>
          <Col lg="8" md="10" sm="10" xs="10">
            <br></br> <br></br>
            <div className="ui toggle checkbox">
              <input
                onClick={instock}
                type="checkbox"
                defaultChecked={ischecked}
                name="public"
              />
              <label>Present In Stock</label>
            </div>
          </Col>
        </Row>
        <Box
          my={1}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button color="secondary" variant="contained" onClick={prevStep}>
            Back
          </Button>
          <Button
            style={{ backgroundColor: "rgb(40, 121, 255)" }}
            color="primary"
            variant="contained"
            onClick={nextStep}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const SETCONTENTS = (
    <Box mb={{ xs: 15, sm: 5 }}>
      <Table celled style={{ backgroundColor: "whitesmoke" }}>
        {finalarr.map((s, i) => (
          <>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Image src={s.img} avatar />
                  {colors.map((color) => (
                    <Label
                      style={{ backgroundColor: s.color }}
                      color={s.color}
                      key={color}
                    ></Label>
                  ))}
                </Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {size.map((k, t) => (
                <>
                  <Table.Row>
                    <Table.Cell>
                      <div className="blackbold">{k}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        style={{ width: "30%" }}
                        id={s.color + s.img + k}
                        placeholder="0"
                        onChange={(e) => increaseqtysize(e, s.color, s.img, k)}
                        value={myfun(k, s.color, s.img)}
                        type="number"
                        min="1"
                      />
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
            </Table.Body>
          </>
        ))}
      </Table>
      <Box style={{ display: "flex", justifyContent: "space-between" }} mt={1}>
        <Button color="secondary" variant="contained" onClick={prevStep}>
          Back
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <br />
      <br />
      <Container maxWidth="md" style={{ padding: 0 }}>
        {/* <Tab
          style={{ display: "flex", width: "100%" }}
          menu={{ vertical: true }}
          panes={panes}
          activeIndex={activeIndex}
        /> */}
        <Box className="createSet">
          {/* <Container maxWidth="lg"> */}
          <Grid container>
            <Grid item xs={4}>
              <Box style={{ position: "relative" }}>
                <Box className={"fieldsContainer_CS bg-white-smoke"}>
                  <Box
                    className={"fields_CS"}
                    style={{ backgroundColor: "#fff" }}
                  >
                    <p
                      className={"fieldsText_CS text-bold"}
                      style={{ color: "rgb(1,158,235)" }}
                    >
                      Mandatory Field
                    </p>
                  </Box>
                  {fieldText.map((fieldText) => (
                    <Box
                      className={"fields_CS"}
                      key={fieldText.step}
                      style={{
                        backgroundColor:
                          addListing.step === fieldText.step
                            ? "#fff"
                            : "transparent",
                      }}
                      onClick={() =>
                        setAddListing({ ...addListing, step: fieldText.step })
                      }
                    >
                      <p className={"fieldsText_CS color-dark-gray text-bold"}>
                        {fieldText.text}
                      </p>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box className="createSetItems" px={{ xs: 2, sm: 3 }}>
                {/* <MemorizedListingForm step={addListing.step} />
                 */}
                {addListing.step === 1 && COLORS}
                {addListing.step === 2 && SIZES}
                {addListing.step === 3 && IMAGES}
                {addListing.step === 4 && PRICE}
                {addListing.step === 5 && SETCONTENTS}
              </Box>
            </Grid>
          </Grid>

          {edityes == 0 ? (
            <>
              <Box style={{ position: "relative" }}>
                <Box className="saveButton_CS" p={2}>
                  <button
                    onClick={saveandnext}
                    className="text-bold"
                    style={{
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      padding: "20px 0",
                      minWidth: "90%",
                      backgroundColor: "rgb(40, 121, 255)",
                      color: "#fff",
                    }}
                  >
                    Save And Next
                  </button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box style={{ position: "relative" }}>
                <Box className="saveButton_CS" p={2}>
                  <button
                    onClick={update}
                    className="text-bold"
                    style={{
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      padding: "20px 0",
                      minWidth: "90%",
                      backgroundColor: "rgb(40, 121, 255)",
                      color: "#fff",
                    }}
                  >
                    Save And Edit
                  </button>
                </Box>
              </Box>
            </>
          )}
        </Box>

        <br />

        {/* <Grid container spacing={10}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/saller/NewListing")}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3} sm={3}>
         
          </Grid>
        </Grid> */}
      </Container>
    </div>
  );
}

export default Createsets;
