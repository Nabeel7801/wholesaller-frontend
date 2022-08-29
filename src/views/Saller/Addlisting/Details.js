import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { TabContent, TabPane, Container, Row, Col } from 'reactstrap';
import { Tab, Segment, Label, Table, Image } from 'semantic-ui-react';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { useDispatch, useSelector } from 'react-redux';
import { updatelisting } from 'views/action/updatelisting';
import axios from 'axios';
import history from 'views/history';
import { SignalCellularConnectedNoInternet1BarTwoTone } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { useMutation } from 'react-query';
import userService from 'views/services/httpService/userAuth/userServices';
function Details() {
  const [genricArray, setgenricArray] = useState([]);

  const [desciption, setdesciption] = useState([]);
  const [finaldesciption, setfinaldesciption] = useState([]);
  const dispatch = useDispatch();
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

  var storeallsets = useSelector((state) => state.addlisting.allsets);

  var category = useSelector((state) => state.addlisting.category);

  const stormainimages = useSelector((state) => state.addlisting.mainimages);
  const storproductypes = useSelector((state) => state.addlisting.productype);

  console.log('---------------------');
  console.log(storproductypes);
  console.log('---------------------');
  var storeminsetorderr = useSelector((state) => state.addlisting.minsetorder);
  var storepriceperpiece = useSelector(
    (state) => state.addlisting.priceperpiece
  );
  var storemrpperpiecer = useSelector((state) => state.addlisting.mrpperpiece);
  var storeavailablesetquantity = useSelector(
    (state) => state.addlisting.availablesetquantity
  );
  var storesquid = useSelector((state) => state.addlisting.squid);

  const options = [
    { value: 'chocolate' },
    { value: 'strawberry' },
    { value: 'vanilla' },
  ];

  const [displaycategory, setdisplaycategory] = useState([]);

  const fetchAllCategories = useMutation(
    (callApi) => userService.commonPostService('api/displaycategory', callApi),
    {
      onError: (error) => {
        ////  toast.error('Error');
      },
      onSuccess: (data) => {
        console.log(data.data.result);
        setdisplaycategory(data.data.result);
      },
    }
  );
  useEffect(() => {
    fetchAllCategories.mutate();
  }, []);

  const fetchdesciption = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/fetchalltags', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: ``,
      // body: JSON.stringify({
      //   fabric: fabric,

      // })
    });
    const json = await response.json();

    setdesciption(json);

    const response1 = await fetch(myModule.servername + '/api/fetchdesp', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: ``,
      // body: JSON.stringify({
      //   fabric: fabric,

      // })
    });
    const json1 = await response1.json();
    console.log('----------------------------------');
    console.log(json1);

    setfinaldesciption(json1);

    // setitemssize(json.itemssize)
  };

  function isalreadyExistMainTag(maintag) {
    for (var i = 0; i < genricArray.length; i++) {
      if (genricArray[i].maintag == maintag) {
        return true;
      }
    }

    return false;
  }

  function isalreadyExistsubtag(maintag, subtag) {
    for (var i = 0; i < genricArray.length; i++) {
      if (genricArray[i].maintag == maintag) {
        for (var j = 0; j < genricArray[i].subtag.length; j++) {
          if (genricArray[i].subtag[j] == subtag) {
            return true;
          }
        }
      }
    }

    return false;
  }

  function removesubItem(maintag, subtag) {
    for (var i = 0; i < genricArray.length; i++) {
      if (genricArray[i].maintag == maintag) {
        for (var j = 0; j < genricArray[i].subtag.length; j++) {
          if (genricArray[i].subtag[j] == subtag) {
            const index = genricArray[i].subtag.indexOf(subtag);
            //// alert(index)
            if (index > -1) {
              genricArray[i].subtag.splice(index, 1);
            }
          }
        }
      }
    }
  }

  function appendToList(maintag, subtag) {
    for (var i = 0; i < genricArray.length; i++) {
      if (genricArray[i].maintag == maintag) {
        genricArray[i].subtag.push(subtag);
      }
    }
  }
  const changeGenricTags = async (ischecked, maintag, subtag) => {
    if (isalreadyExistMainTag(maintag) == true) {
      if (ischecked == true) {
        appendToList(maintag, subtag);
      } else {
        removesubItem(maintag, subtag);
      }
    } else {
      let obj = {
        maintag: maintag,
        subtag: [subtag],
      };

      setgenricArray([...genricArray, obj]);
    }
    console.log(genricArray);
  };

  const changeideal = async (e) => {
    /// alert(e.target.value)
    if (foridealarray.includes(e.target.value)) {
      const index = foridealarray.indexOf(e.target.value);
      //// alert(index)
      if (index > -1) {
        foridealarray.splice(index, 1);
      }
      ///alert("work")
    } else {
      foridealarray.push(e.target.value);
    }
  };

  ////    let occasion=[];
  const changeoccasion = async (e) => {
    if (occasion.includes(e.target.value)) {
      const index = occasion.indexOf(e.target.value);
      //// alert(index)
      if (index > -1) {
        occasion.splice(index, 1);
      }
      ///alert("work")
    } else {
      occasion.push(e.target.value);
    }

    /// alert(temp)
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

  useEffect(() => {
    fetchdesciption();
  }, []);

  const saveme = async (e) => {
    var tags = genricArray;
    dispatch(updatelisting('tags', tags));

    //       for (var i = 0; i < storeallsets.length; i++) {

    // /////alert(storeallsets[i].length)

    // for (var j = 0; j < storeallsets[i].length; j++) {

    // var temp=storeallsets[i];
    // /////alert(storeminsetorderr[i])

    // storeallsets[i][j]["minsettoorder"]=storeminsetorderr[i];

    //   storeallsets[i][j]["priceperpiece"]=storepriceperpiece[i];

    //   storeallsets[i][j]["mrpperpiece"]=storemrpperpiecer[i];
    //   storeallsets[i][j]["availablesetquantity"]=storeavailablesetquantity[i];
    //   storeallsets[i][j]["squid"]=storesquid[i];

    //         }

    //       }

    //      var uploderid= JSON.parse(localStorage.getItem('wholesaller'))._id;
    // var maindetails={
    // mainimage:stormainimages,

    // producttype:storproductypes,
    // uploderid:uploderid,
    // idealfor:foridealarray,
    // }

    //       var myModule = require('views/config');
    //     axios.post(myModule.servername+"/api/addsets", { storeallsets,maindetails})
    //       .then(res => {
    //         ////console.log(res);
    //         ////console.log(res.data);
    //       })

    history.push('/saller/additional');
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChangeradio = (event) => {
    setSelectedValue(event.target.value);
  };

  const panes = [
    {
      menuItem: { key: 'Age Group', icon: 'green check', content: 'Age Group' },

      render: () => (
        <Tab.Pane>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name='checkedB'
                color='primary'
              />
            }
            label='0-8'
          />
        </Tab.Pane>
      ),
    },
  ];
  const [viewAll, setViewAll] = useState([])

  const handleViewAll = (id) => {
    if (viewAll.includes(id)) {
      const newArr = viewAll.filter(item => item !== id)
      setViewAll(newArr)
    }
    else {
      setViewAll([...viewAll, id])
    }
  }

  return (
    <div>
      <br />
      <br />
      <Container>
        {/* <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='left'
    panes={panes}
  /> */}

        <div className='tags'>
          {displaycategory
            .filter(
              (item) =>
                item.ancestors.length == 3 &&
                item.ancestors[0].name == storproductypes.childname
            )
            .map((o, i) => {

              console.log("o", o)
              return <div style={{ marginTop: "30px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className='blackbold'> {o.name}</div>
                  <div className=''>Pick atleast one</div>
                </div>
                <Row style={{ height: viewAll.includes(o._id) ? "auto" : "105px" , overflowY: "hidden" }} >
                  <Col lg='12' md='12' sm='12' xs='12'>
                    <ul className='ks-cboxtags'>
                      {displaycategory
                        .filter(
                          (item) =>
                            item.ancestors.length == 4 &&
                            item.ancestors[0].name == o.name
                        )
                        .map((o1, i1) => (
                          <>
                            <>
                              <li>
                                <input
                                  type='checkbox'
                                  onChange={(e) =>
                                    changeGenricTags(
                                      e.target.checked,
                                      o.name,
                                      e.target.value
                                    )
                                  }
                                  value={o1.name}
                                  id={'checkbox' + i + i1 + 1 + o1.name}
                                  defaultChecked={foridealarray.includes(
                                    o1.name
                                  )}
                                />
                                <label
                                  htmlFor={'checkbox' + i + i1 + 1 + o1.name}
                                >
                                  {o1.name}
                                </label>
                              </li>
                              &nbsp;&nbsp;
                            </>
                          </>
                        ))}
                    </ul>
                  </Col>
                </Row>
                {viewAll.includes(o._id) ?
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px", cursor: "pointer" }} onClick={() => handleViewAll(o._id)}>
                    View Few <span className="color-primary_LP"></span>{`>`}
                  </div>
                  :
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px", cursor: "pointer" }} onClick={() => handleViewAll(o._id)}>
                    View All <span className="color-primary_LP"></span>{`>`}
                  </div>

                }
              </div>
            })}

        </div>

        <Grid container spacing={10}>
          <Grid item xs={3}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => history.push('/saller/previewset')}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Button variant='contained' color='primary' onClick={saveme}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Details;