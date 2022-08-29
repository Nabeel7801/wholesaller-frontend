import React from "react";

import { Button, FormGroup, Input, Container, Row, Col } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useSelector } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

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

function Additional() {
  const classes = useStyles();

  const [gst, setgst] = React.useState("");

  const [expireinday, setexpireinday] = React.useState("");

  const [customizelogo, setcustomizelogo] = React.useState("");
  const [customizepkg, setcustomizepkg] = React.useState("");

  const [qty1, setqty1] = React.useState("");

  const [checkservice, setcheckservice] = React.useState(false);
  const [loder, setloder] = React.useState(false);

  const [qty2, setqty2] = React.useState("");

  const [qty3, setqty3] = React.useState("");

  const [qty4, setqty4] = React.useState("");

  const [pricetodisplay, setpricetodisplay] = React.useState();

  const [myset1, setmyset1] = React.useState("");

  const [myset2, setmyset2] = React.useState("");
  const [myset3, setmyset3] = React.useState("");
  const [myset4, setmyset4] = React.useState("");

  const [price1, setprice1] = React.useState();

  const [price2, setprice2] = React.useState();

  const [price3, setprice3] = React.useState();

  const [price4, setprice4] = React.useState();

  const [moqprice, setmoqprice] = React.useState();

  const [deliveytime1, setdeliveytime1] = React.useState();
  const [deliveytime2, setdeliveytime2] = React.useState();
  const [deliveytime3, setdeliveytime3] = React.useState();
  const [deliveytime4, setdeliveytime4] = React.useState();

  const [extradesign, setextradesign] = React.useState("");
  const [packtype, setpacktype] = React.useState("");

  const [lasttitle, setlasttitle] = React.useState("");

  const [description, setdescription] = React.useState("");
  const [forextra, setforextra] = React.useState("");
  const [foradditional, setforadditional] = React.useState("");

  const [title, settitle] = React.useState("");
  var storeallsets = useSelector((state) => state.addlisting.allsets);
  var colorformap = useSelector((state) => state.addlisting.colorformap);

  var finalarr = useSelector((state) => state.addlisting.finalarr);
  var mapsize = useSelector((state) => state.addlisting.mapsize);

  var iseditornew = useSelector((state) => state.addlisting.iseditornew);

  const stormainimages = useSelector((state) => state.addlisting.mainimages);
  const storproductypes = useSelector((state) => state.addlisting.productype);

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
  var isChecked = false;

  var tags = useSelector((state) => state.addlisting.tags);
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const saveme = async (e) => {
    var myModule = require("views/config");
    setloder(true);

    for (var i = 0; i < storeallsets.length; i++) {
      for (var j = 0; j < storeallsets[i].length; j++) {
        let data = new FormData();
        if (storeallsets[i][j].img != "") {
          let img =
            Math.floor(100000 + Math.random() * 900000) +
            "-" +
            Date.now() +
            ".png";
          data.append("file", await dataURLtoFile(storeallsets[i][j].img, img));
          storeallsets[i][j].img = img;
          finalarr[i][j].img = img;
          let res = await axios({
            method: "POST",
            url: myModule.servername + "/api/uploddata",
            data: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          let respo = res.data;
        }
      }
    }
    var setdetails = [];
    for (var i = 0; i < finalarr.length; i++) {
      var details = {
        minsettoorder: storeminsetorderr[i],
        priceperpiece: storepriceperpiece[i],
        mrpperpiece: storemrpperpiecer[i],
        availablesetquantity: storeavailablesetquantity[i],
        squid: storesquid[i],
        instock: storesetinstock[i],
      };
      setdetails.push(details);
    }

    var foredit = {
      allsets: storeallsets,
      colorformap: colorformap,
      finalarr: finalarr,

      mapsize: mapsize,
      minsetorder: storeminsetorderr,
      priceperpiece: storepriceperpiece,
      mrpperpiece: storemrpperpiecer,
      availablesetquantity: storeavailablesetquantity,
      squid: storesquid,
      setinstock: storesetinstock,
    };

    var uploderid = JSON.parse(localStorage.getItem("wholesaller"))._id;
    var maindetails = {
      mainimage: stormainimages,
      title: title,
      moqprice: moqprice,
      producttype: storproductypes,
      uploderid: uploderid,
      tags: tags,
      instock: "yes",
      pricetodisplay: pricetodisplay,

      // idealfor:foridealarray,
    };

    if (iseditornew == "") {
      axios
        .post(myModule.servername + "/api/addsets", { maindetails })
        .then((res) => {
          var mainid = res.data;
          ////console.log(res);
          ////console.log(res.data);

          axios
            .post(myModule.servername + "/api/storeallsets", {
              storeallsets,
              mainid,
            })
            .then((res) => {
              ////console.log(res);
              ////console.log(res.data);
              axios
                .post(myModule.servername + "/api/setdetails", {
                  setdetails,
                  mainid,
                })
                .then((res) => {
                  axios
                    .post(myModule.servername + "/api/foredit", {
                      foredit,
                      mainid,
                    })
                    .then((res) => {
                      setloder(false);
                      alert("Product Uploded");
                    });
                });
            });
        });
    } else {
      alert(storeallsets);
      var myModule = require("views/config");

      axios
        .post(myModule.servername + "/api/editaddsets", {
          maindetails,
          iseditornew,
        })
        .then((res) => {
          axios
            .post(myModule.servername + "/api/editstoreallsets", {
              storeallsets,
              iseditornew,
            })
            .then((res) => {
              axios
                .post(myModule.servername + "/api/editsetdetails", {
                  setdetails,
                  iseditornew,
                })
                .then((res) => {
                  axios
                    .post(myModule.servername + "/api/editforedit", {
                      foredit,
                      iseditornew,
                    })
                    .then((res) => {
                      alert("Product updated");
                    });
                });
            });
        });
    }
  };

  const handleChange = (e) => {
    isChecked = e.target.checked;
    setcheckservice(isChecked);
  };

  return (
    <div>
      {loder == true ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <br />
          <Container>
            <br />
            <Card className={classes.root}>
              <CardContent>
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Title</div>
                    <Input
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      className={classes.input1}
                      placeholder=""
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />

                <br />
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Description</div>

                    <form class="ui form">
                      <textarea
                        placeholder="Tell us more"
                        style={{ minHeight: "100px" }}
                        rows="3"
                      ></textarea>
                    </form>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">MOQ (Min. Order Quantity)</div>
                    <Input
                      value={moqprice}
                      onChange={(e) => setmoqprice(e.target.value)}
                      className={classes.input1}
                      placeholder=""
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="10" md="10" sm="10" xs="10">
                    <div className="blackbold">Price to display on Card</div>
                    <Input
                      value={pricetodisplay}
                      onChange={(e) => setpricetodisplay(e.target.value)}
                      className={classes.input1}
                      placeholder=""
                      inputProps={{ "aria-label": "description" }}
                    />
                  </Col>
                </Row>

                <br />

                <Row>
                  <Col lg="5" md="5" sm="10" xs="10">
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

                  <Col lg="5" md="5" sm="10" xs="10">
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

                <br />
              </CardContent>
            </Card>

            <Row>
              <Col lg="10" md="10" sm="10" xs="10">
                <Checkbox
                  onChange={(e) => handleChange(e)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />

                <span className="blackbold">
                  Are you providing customize services
                </span>
              </Col>
            </Row>

            {checkservice === true ? (
              <>
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
                                onChange={(e) =>
                                  setcustomizelogo(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setcustomizepkg(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setdeliveytime1(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setdeliveytime2(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setdeliveytime3(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setdeliveytime4(e.target.value)
                                }
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
              </>
            ) : null}
            <Row>
              <Col lg="10" md="10" sm="10" xs="10">
                <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />

                <span className="blackbold">
                  I agree company term and policy & Above given data is correct{" "}
                </span>
              </Col>
            </Row>

            <br />
            <Row>
              <Col lg="2" md="2" sm="2" xs="2">
                <Button
                  className={classes.backButton}
                  variant="contained"
                  color="secondary"
                >
                  Back
                </Button>
              </Col>
              <Col lg="6" md="6" sm="6" xs="6"></Col>
              <Col lg="2" md="2" sm="2" xs="2">
                <Button onClick={saveme} variant="contained" color="primary">
                  Save
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <br />
      <br />
    </div>
  );
}

export default Additional;
