import React from "react";
import { FormGroup, Input, Container, Row, Col } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Inputui from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Select } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { resizeFile } from "views/globalfunctions/Base64";

import ButtonBase from "@material-ui/core/ButtonBase";

function Addlisting() {
  const [selectedValue, setSelectedValue] = React.useState();
  const [foridealarray, setforidealarray] = React.useState([]);

  const [occasion, setoccasion] = React.useState([]);
  const [clothstyle, setclothstyle] = React.useState([]);

  const [fabric, setfabric] = React.useState([]);

  const [catlogtype, setcatlogtype] = React.useState([]);

  const [size, setsize] = React.useState([]);

  const [color, setcolor] = React.useState([]);

  const [sleeve, setsleeve] = React.useState([]);
  const [neck, setneck] = React.useState([]);
  const [pkgtype, setpkgtype] = React.useState([]);

  const [stylecode, setstylecode] = React.useState([]);

  const [img1, setimg1] = React.useState("");
  const [img2, setimg2] = React.useState("");
  const [img3, setimg3] = React.useState("");
  const [img4, setimg4] = React.useState("");
  const [img5, setimg5] = React.useState("");

  const [constofset, setconstofset] = React.useState("");

  const [numpieces, setnumpieces] = React.useState("");

  const [listingmoq, setlistingmoq] = React.useState("");

  const [price_piece, setprice_piece] = React.useState("");

  const [mrp, setmrp] = React.useState("");
  const [gst, setgst] = React.useState("");

  const [expireinday, setexpireinday] = React.useState("");

  const [customizelogo, setcustomizelogo] = React.useState("");
  const [customizepkg, setcustomizepkg] = React.useState("");

  const [qty1, setqty1] = React.useState("");

  const [qty2, setqty2] = React.useState("");

  const [qty3, setqty3] = React.useState("");

  const [qty4, setqty4] = React.useState("");

  const [myset1, setmyset1] = React.useState("");

  const [myset2, setmyset2] = React.useState("");
  const [myset3, setmyset3] = React.useState("");
  const [myset4, setmyset4] = React.useState("");

  const [price1, setprice1] = React.useState("");

  const [price2, setprice2] = React.useState("");

  const [price3, setprice3] = React.useState("");

  const [price4, setprice4] = React.useState("");

  const [deliveytime1, setdeliveytime1] = React.useState("");
  const [deliveytime2, setdeliveytime2] = React.useState("");
  const [deliveytime3, setdeliveytime3] = React.useState("");
  const [deliveytime4, setdeliveytime4] = React.useState("");

  const [extradesign, setextradesign] = React.useState("");
  const [packtype, setpacktype] = React.useState("");

  const [lasttitle, setlasttitle] = React.useState("");

  const [description, setdescription] = React.useState("");
  const [forextra, setforextra] = React.useState("");
  const [foradditional, setforadditional] = React.useState("");

  const publishdata = async () => {
    //// alert(picsarray

    var myModule = require("views/config");
    const response = await fetch(myModule.servername + "/api/addlisting", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `pics=${img1}&pics=${img2}&pics=${img3}&pics=${img4}
      &title=${title}&brand=${brand}&category=${category}&itemdesc=${desc}
      &idealfor=${foridealarray}&occasion=${occasion}&clothstyle=${clothstyle}&fabric=${fabric}
      &catlogtype=${catlogtype}&stylecode=${stylecode}&size=${size}&color=${color}
      &sleeve=${sleeve}&neck=${neck}&pkgtype=${pkgtype}&constofset=${constofset}
      &numpieces=${numpieces}&listingmoq=${listingmoq}&price_piece=${price_piece}&mrp=${mrp}
      &gst=${gst}&expireinday=${expireinday}&customizelogo=${customizelogo}&customizepkg=${customizepkg}
      &qty1=${qty1}&qty2=${qty2}&qty3=${qty3}&qty4=${qty4}
      &myset1=${myset1}&myset2=${myset2}&myset3=${myset3}&myset4=${myset4}
      &price1=${price1}&price2=${price2}&price3=${price3}&price4=${price4}
      &deliveytime1=${deliveytime1}&deliveytime2=${deliveytime2}&deliveytime3=${deliveytime3}&deliveytime4=${deliveytime4}
      &packtype=${packtype}&extradesign=${extradesign}&lasttitle=${lasttitle}&description=${description}
      &forextra=${forextra}&foradditional=${foradditional}&uploderid=${
        JSON.parse(localStorage.getItem("wholesaller"))._id
      }`,
      // body: JSON.stringify({
      //   fabric: fabric,

      // })
    });
    const json = await response.json();
  };

  const { Option } = Select;

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },

    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    input1: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return ["Add Picture", "Add Tags", "Add Details", "Review"];
  }

  function GetStepContent(stepIndex) {
    const classes = useStyles();

    const options = [
      { value: "chocolate" },
      { value: "strawberry" },
      { value: "vanilla" },
    ];

    const options1 = [
      { value: "chocolate" },
      { value: "strawberry" },
      { value: "vanilla" },
    ];

    const onChangeHandler1 = async (e) => {
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
      }
    };
    let temp = [];

    const changeideal = async (e) => {
      if (foridealarray.includes(e.target.value)) {
        const index = foridealarray.indexOf(e.target.value);

        if (index > -1) {
          foridealarray.splice(index, 1);
        }
      } else {
        foridealarray.push(e.target.value);
      }
    };

    const changeoccasion = async (e) => {
      if (occasion.includes(e.target.value)) {
        const index = occasion.indexOf(e.target.value);
        if (index > -1) {
          occasion.splice(index, 1);
        }
      } else {
        occasion.push(e.target.value);
      }
    };

    ///   let clothstyle=[];
    const changeclothstyle = async (e) => {
      if (clothstyle.includes(e.target.value)) {
        const index = clothstyle.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          clothstyle.splice(index, 1);
        }
        ///alert("work")
      } else {
        clothstyle.push(e.target.value);
      }

      /// alert(temp)
    };
    //// let fabric=[];
    const changefabric = async (e) => {
      if (fabric.includes(e.target.value)) {
        const index = fabric.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          fabric.splice(index, 1);
        }
        ///alert("work")
      } else {
        fabric.push(e.target.value);
      }

      /// alert(temp)
    };
    ////  let catlogtype=[];
    const changecatlogtype = async (e) => {
      if (catlogtype.includes(e.target.value)) {
        const index = catlogtype.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          catlogtype.splice(index, 1);
        }
        ///alert("work")
      } else {
        catlogtype.push(e.target.value);
      }

      /// alert(temp)
    };
    //let stylecode=[];
    const changestylecode = async (e) => {
      if (stylecode.includes(e.target.value)) {
        const index = stylecode.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          stylecode.splice(index, 1);
        }
        ///alert("work")
      } else {
        stylecode.push(e.target.value);
      }

      /// alert(temp)
    };
    ///=[];
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

      /// alert(temp)
    };
    /// let color=[];
    const changecolor = async (e) => {
      if (color.includes(e.target.value)) {
        const index = color.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          color.splice(index, 1);
        }
        ///alert("work")
      } else {
        color.push(e.target.value);
      }

      /// alert(temp)
    };
    /// let sleeve=[];
    const changesleeve = async (e) => {
      if (sleeve.includes(e.target.value)) {
        const index = sleeve.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          sleeve.splice(index, 1);
        }
        ///alert("work")
      } else {
        sleeve.push(e.target.value);
      }

      /// alert(temp)
    };
    /// let neck=[];
    const changeneck = async (e) => {
      if (neck.includes(e.target.value)) {
        const index = neck.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          neck.splice(index, 1);
        }
        ///alert("work")
      } else {
        neck.push(e.target.value);
      }

      /// alert(temp)
    };
    //  let pkgtype=[];
    const changepkgtype = async (e) => {
      if (pkgtype.includes(e.target.value)) {
        const index = pkgtype.indexOf(e.target.value);
        //// alert(index)
        if (index > -1) {
          pkgtype.splice(index, 1);
        }
        ///alert("work")
      } else {
        pkgtype.push(e.target.value);
      }

      /// alert(temp)
    };

    const onChangeHandler2 = async (e) => {
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

    const onChangeHandler3 = async (e) => {
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

    const onChangeHandler4 = async (e) => {
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

    // document.getElementById("checkbox1");

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    switch (stepIndex) {
      case 0:
        return (
          <>
            <Row>
              <Col lg="3" md="4" sm="5" xs="10">
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
                    <div className={classes.root}>
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
              </Col>

              <Col lg="3" md="3" sm="5" xs="10">
                <div class="avtcontainer">
                  <div class="ui medium rounded image">
                    <img
                      src={
                        img2 == ""
                          ? "https://react.semantic-ui.com/images/wireframe/image.png"
                          : img2
                      }
                      class="avtimage"
                      id="output2"
                    />
                  </div>

                  <div class="avtmiddle">
                    <div className={classes.root}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file2"
                        type="file"
                        onChange={onChangeHandler2}
                        // value={userImage}
                      />
                      <label htmlFor="icon-button-file2">
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
              </Col>

              <Col lg="3" md="3" sm="5" xs="10">
                <div class="avtcontainer">
                  <div class="ui medium rounded image">
                    <img
                      src={
                        img3 == ""
                          ? "https://react.semantic-ui.com/images/wireframe/image.png"
                          : img3
                      }
                      class="avtimage"
                      id="output3"
                    />
                  </div>

                  <div class="avtmiddle">
                    <div className={classes.root}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file3"
                        type="file"
                        onChange={onChangeHandler3}
                        // value={userImage}
                      />
                      <label htmlFor="icon-button-file3">
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
              </Col>

              <Col lg="3" md="3" sm="5" xs="10">
                <div class="avtcontainer">
                  <div class="ui medium rounded image">
                    <img
                      src={
                        img4 == ""
                          ? "https://react.semantic-ui.com/images/wireframe/image.png"
                          : img4
                      }
                      class="avtimage"
                      id="output4"
                    />
                  </div>

                  <div class="avtmiddle">
                    <div className={classes.root}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file4"
                        type="file"
                        onChange={onChangeHandler4}
                        // value={userImage}
                      />
                      <label htmlFor="icon-button-file4">
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
              </Col>
            </Row>

            <br />
            <Card className={classes.root}>
              <CardContent>
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Title</div>
                    <Inputui
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      className={classes.input1}
                      placeholder=""
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col lg="5" md="5" sm="5" xs="5">
                    <div className="blackbold">Brand</div>

                    <Select
                      onSelect={setbrand}
                      value={brand}
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select category"
                      optionFilterProp="children"
                    >
                      {options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.value}
                        </option>
                      ))}
                    </Select>
                  </Col>
                  <Col lg="5" md="5" sm="5" xs="5">
                    <div className="blackbold">select category</div>
                    <Select
                      onSelect={setcategory}
                      value={category}
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select category"
                      optionFilterProp="children"
                    >
                      {options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.value}
                        </option>
                      ))}
                    </Select>
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Description</div>

                    <form class="ui form">
                      <textarea
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}
                        placeholder="Tell us more"
                        style={{ minHeight: "100px" }}
                        rows="3"
                      ></textarea>
                    </form>
                  </Col>
                </Row>
              </CardContent>
            </Card>
          </>
        );
      case 1:
        return (
          <>
            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Ideal for</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5">
                  <div className="">Pick atleast one</div>
                </Col>
              </Row>
              {/* {options.map((o,i) => ( <><h1>{foridealarray.includes(o.value)==false ? <>saeed</>:null}</h1></>))} */}
              <Row>
                {/* <Col lg="1" md="3" sm="3" xs="3"> */}

                <ul className="ks-cboxtags">
                  {options.map((o, i) => (
                    <li>
                      <input
                        type="checkbox"
                        onChange={changeideal}
                        value={o.value}
                        id={"checkbox" + i + 1}
                        defaultChecked={foridealarray.includes(o.value)}
                      />
                      <label htmlFor={"checkbox" + i + 1}>{o.value}</label>
                    </li>
                  ))}

                  {/* <li><input type="checkbox" id="checkbox1" defaultValue="men" /><label htmlFor="checkbox1">#Men</label></li>
            
            <li><input type="checkbox" id="checkbox2" defaultValue="women" /><label htmlFor="checkbox2">#Women</label></li> */}
                </ul>

                {/* </Col> */}
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Occasion</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5">
                  <div className="">Pick atleast one</div>
                </Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={occasion.includes(o.value)}
                          onChange={changeoccasion}
                          value={o.value}
                          id={"checkbox1" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox1" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
                {/* <Col lg="1" md="3" sm="3" xs="3">


<ul className="ks-cboxtags">
  <li><input type="checkbox" id="checkbox4" defaultValue="women" /><label htmlFor="checkbox4">#Women</label></li>

    
</ul>

</Col> */}
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Clothing Design/ Style</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5">
                  <div className="">Pick atleast one</div>
                </Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={clothstyle.includes(o.value)}
                          onChange={changeclothstyle}
                          value={o.value}
                          id={"checkbox2" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox2" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Fabric</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5">
                  <div className="">Pick atleast one</div>
                </Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={fabric.includes(o.value)}
                          onChange={changefabric}
                          value={o.value}
                          id={"checkbox3" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox3" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Catalog Type</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5">
                  <div className="">Pick atleast one</div>
                </Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={catlogtype.includes(o.value)}
                          onChange={changecatlogtype}
                          value={o.value}
                          id={"checkbox4" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox4" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Style Code</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={stylecode.includes(o.value)}
                          onChange={changestylecode}
                          value={o.value}
                          id={"checkbox5" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox5" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Size</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={size.includes(o.value)}
                          onChange={changesize}
                          value={o.value}
                          id={"checkbox6" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox6" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Color</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={color.includes(o.value)}
                          onChange={changecolor}
                          value={o.value}
                          id={"checkbox7" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox7" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Sleeve</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={sleeve.includes(o.value)}
                          onChange={changesleeve}
                          value={o.value}
                          id={"checkbox8" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox8" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Neck</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={neck.includes(o.value)}
                          onChange={changeneck}
                          value={o.value}
                          id={"checkbox9" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox9" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>

            <div className="tags">
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <div className="blackbold">Packaging Type</div>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>

              <Row>
                <Col lg="1" md="3" sm="3" xs="3">
                  <ul className="ks-cboxtags">
                    {options.map((o, i) => (
                      <li>
                        <input
                          type="checkbox"
                          defaultChecked={pkgtype.includes(o.value)}
                          onChange={changepkgtype}
                          value={o.value}
                          id={"checkbox10" + i + 1}
                          defaultValue="men"
                        />
                        <label htmlFor={"checkbox10" + i + 1}>{o.value}</label>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="3" md="5" sm="5" xs="5">
                  <Button color="primary">View All</Button>
                </Col>
                <Col lg="5" md="5" sm="5" xs="5"></Col>
              </Row>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Card className={classes.root}>
              <CardContent>
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Contants of this set</div>
                    <Input
                      value={constofset}
                      onChange={(e) => setconstofset(e.target.value)}
                      className={classes.input1}
                      placeholder="Set of 3 sizes - S M L"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="5" md="5" sm="5" xs="5">
                    <div className="blackbold">Num pieces/sets</div>
                    <Input
                      value={numpieces}
                      onChange={(e) => setnumpieces(e.target.value)}
                      type="number"
                      defaultValue="1"
                      placeholder=""
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>

                  <Col lg="5" md="5" sm="5" xs="5">
                    <div className="blackbold">Listing MOQ</div>
                    <Input
                      value={listingmoq}
                      onChange={(e) => setlistingmoq(e.target.value)}
                      type="number"
                      placeholder=""
                      defaultValue="1"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="5" md="5" sm="5" xs="5">
                    <div className="blackbold">Price/piece (₹)</div>
                    <Input
                      value={price_piece}
                      onChange={(e) => setprice_piece(e.target.value)}
                      type="number"
                      placeholder="250"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>

                  <Col lg="5" md="5" sm="5" xs="5">
                    <div className="blackbold">MRP/piece</div>
                    <Input
                      value={mrp}
                      onChange={(e) => setmrp(e.target.value)}
                      type="number"
                      placeholder="350"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                Total Price:{numpieces * price_piece}
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">GST(%)</div>
                    <Input
                      value={gst}
                      onChange={(e) => setgst(e.target.value)}
                      type="number"
                      className={classes.input1}
                      placeholder="14.5"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Expire in (days)</div>
                    <Input
                      value={expireinday}
                      onChange={(e) => setexpireinday(e.target.value)}
                      type="number"
                      className={classes.input1}
                      placeholder=""
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
              </CardContent>
            </Card>

            {/* --------------------------------------------------------------------------Additional extra customization ----------------------------------------------------------------------------------*/}

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="10">
                <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
                <span className="blackbold">
                  Are you providing customize services
                </span>
              </Col>
            </Row>

            <Row>
              <Col lg="12" md="12" sm="11" xs="11">
                <table class="ui celled table">
                  <tbody class="">
                    <tr class="">
                      <td class="blackbold">
                        Customize Logo
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={customizelogo}
                            onChange={(e) => setcustomizelogo(e.target.value)}
                            placeholder="Minimum Order Required"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                    <tr class="">
                      <td class="blackbold">
                        Customize Packaging
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={customizepkg}
                            onChange={(e) => setcustomizepkg(e.target.value)}
                            placeholder="Minimum Order Required"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>

            <br />

            <Row>
              <Col lg="12" md="12" sm="11" xs="11">
                <table class="ui definition table">
                  <thead class=""></thead>
                  <tbody class="">
                    <tr class="">
                      <td class=""> Quantity</td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={qty1}
                            onChange={(e) => setqty1(e.target.value)}
                            placeholder="1 to 100"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>

                      <td class="">
                        <FormGroup>
                          <Input
                            value={qty2}
                            onChange={(e) => setqty2(e.target.value)}
                            placeholder="100 to 500"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={qty3}
                            onChange={(e) => setqty3(e.target.value)}
                            placeholder="500 to 1000"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={qty4}
                            onChange={(e) => setqty4(e.target.value)}
                            placeholder="1000 to 5000"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                    </tr>

                    <tr class="">
                      <td class="">Set</td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={myset1}
                            onChange={(e) => setmyset1(e.target.value)}
                            placeholder="1 to 100"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>

                      <td class="">
                        <FormGroup>
                          <Input
                            value={myset2}
                            onChange={(e) => setmyset2(e.target.value)}
                            placeholder="100 to 500"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={myset3}
                            onChange={(e) => setmyset3(e.target.value)}
                            placeholder="500 to 1000"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={myset4}
                            onChange={(e) => setmyset4(e.target.value)}
                            placeholder="1000 to 5000"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                    </tr>

                    <tr class="">
                      <td class="">Price</td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={price1}
                            onChange={(e) => setprice1(e.target.value)}
                            placeholder="100"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>

                      <td class="">
                        <FormGroup>
                          <Input
                            value={price2}
                            onChange={(e) => setprice2(e.target.value)}
                            placeholder="95"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={price3}
                            onChange={(e) => setprice3(e.target.value)}
                            placeholder="90"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={price4}
                            onChange={(e) => setprice4(e.target.value)}
                            placeholder="80"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                    </tr>

                    <tr class="">
                      <td class="">Delivery Time</td>

                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={deliveytime1}
                            onChange={(e) => setdeliveytime1(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                          </Input>
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={deliveytime2}
                            onChange={(e) => setdeliveytime2(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                          </Input>
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={deliveytime3}
                            onChange={(e) => setdeliveytime3(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                          </Input>
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={deliveytime4}
                            onChange={(e) => setdeliveytime4(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                          </Input>
                        </FormGroup>
                      </td>
                    </tr>

                    <tr class="">
                      <td class="">Packaging Type</td>
                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={packtype}
                            onChange={(e) => setpacktype(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>1</option>
                            <option>2</option>
                          </Input>
                        </FormGroup>
                      </td>

                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={packtype}
                            onChange={(e) => setpacktype(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>1</option>
                            <option>2</option>
                          </Input>
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={packtype}
                            onChange={(e) => setpacktype(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>1</option>
                            <option>2</option>
                          </Input>
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            type="select"
                            value={packtype}
                            onChange={(e) => setpacktype(e.target.value)}
                            className="input-styl"
                            name="select"
                            id="exampleSelect"
                          >
                            <option>1</option>
                            <option>2</option>
                          </Input>
                        </FormGroup>
                      </td>
                    </tr>

                    <tr class="">
                      <td class="">Extra design</td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={extradesign}
                            onChange={(e) => setextradesign(e.target.value)}
                            placeholder="For an Extra"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>

                      <td class="">
                        <FormGroup>
                          <Input
                            value={extradesign}
                            onChange={(e) => setextradesign(e.target.value)}
                            placeholder="For an Extra"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={extradesign}
                            onChange={(e) => setextradesign(e.target.value)}
                            placeholder="For an Extra"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                      <td class="">
                        <FormGroup>
                          <Input
                            value={extradesign}
                            onChange={(e) => setextradesign(e.target.value)}
                            placeholder="For an Extra"
                            className="input-styl"
                            type="text"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <br />

            <Card className={classes.root}>
              <CardContent>
                <Row>
                  <Col lg="1" md="2" sm="2" xs="2">
                    <span className="blackbold">Title</span>
                  </Col>
                  <Col lg="4" md="3" sm="8" xs="8">
                    <Input
                      value={lasttitle}
                      onChange={(e) => setlasttitle(e.target.value)}
                      className={classes.input1}
                      placeholder="Tile your extra service"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="1" md="2" sm="3" xs="3">
                    <div className="blackbold">Description</div>
                  </Col>
                  <Col lg="6" md="6" sm="7" xs="7">
                    <Input
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      className={classes.input1}
                      placeholder="I will describe your offering"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="1" md="3" sm="4" xs="4">
                    <div className="blackbold">For an extra</div>
                  </Col>
                  <Col lg="2" md="3" sm="6" xs="6">
                    <Input
                      value={forextra}
                      onChange={(e) => setforextra(e.target.value)}
                      type="number"
                      placeholder="₹"
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                  <Col lg="2" md="3" sm="4" xs="4">
                    <div className="blackbold">An Additional</div>
                  </Col>

                  <Col lg="3" md="3" sm="8" xs="8">
                    <FormGroup>
                      <Input
                        value={foradditional}
                        onChange={(e) => setforadditional(e.target.value)}
                        type="select"
                        className="input-styl"
                        name="select"
                        id="exampleSelect"
                      >
                        <option>select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardContent>
            </Card>
            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="10">
                <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
                <span className="blackbold">
                  I agree company term and policy & Above given data is correct{" "}
                </span>
              </Col>
            </Row>
          </>
        );

      case 3:
        return (
          <>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={img1} />
                  </ButtonBase>
                </Grid>

                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Set Of 3 pieces (S, M, L)
                      </Typography>

                      <table class="ui table">
                        <tbody class="">
                          <tr class="">
                            <td class="collapsing">Price/pc</td>
                            <td class="">MRF/pc</td>
                            <td class="">Pieces/set</td>
                            <td class="">Total Price</td>
                          </tr>

                          <tr class="">
                            <td class="collapsing blackbold">
                              ₹{price_piece}{" "}
                            </td>
                            <td class="blackbold">₹{mrp}</td>
                            <td class="blackbold">{numpieces}</td>
                            <td class="blackbold">{numpieces * price_piece}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid>
                    {/*  */}
                  </Grid>

                  <Grid>
                    <IconButton aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const [title, settitle] = React.useState("");

  const [brand, setbrand] = React.useState("");
  const [ideal, setideal] = React.useState([]);

  const [category, setcategory] = React.useState("");

  const [desc, setdesc] = React.useState("");

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep == 3) {
      publishdata();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const classes = useStyles();
  return (
    <div>
      <Container>
        <br />
        <div className="text-center ">
          <h2 className="blackbold">Add Listing</h2>
        </div>

        <br />

        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {GetStepContent(activeStep)}
                </Typography>

                <br />
                <div>
                  <Row>
                    <Col lg="2" md="2" sm="2" xs="2">
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                        variant="contained"
                        color="secondary"
                      >
                        Back
                      </Button>
                    </Col>
                    <Col lg="6" md="6" sm="6" xs="6"></Col>
                    <Col lg="2" md="2" sm="2" xs="2">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Publish" : "Next"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Addlisting;
