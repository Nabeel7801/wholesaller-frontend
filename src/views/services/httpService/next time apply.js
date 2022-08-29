import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Select, Divider } from 'antd';
import history from 'views/history';
import { PlusOutlined } from '@ant-design/icons';

import { Tabs, Popconfirm, message } from 'antd';
import { ItemDescription } from 'semantic-ui-react';

const useStyles = makeStyles({
  table: {
    Width: 50,
  },
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const { TabPane } = Tabs;

function callback(key) {
  ////console.log(key);
}

export default function Addvariant() {
  const { Option } = Select;
  var myModule = require('views/config');
  let indexcolor = 0;
  let indexsize = 0;
  let indexcategory = 0;
  let indexmaincategory = 0;
  let indexsubcategory = 0;
  let indexdescription = 0;

  let tagscounter = 0;

  const [midcategoty, setmidcategoty] = useState('');
  const [maincategory, setmaincategory] = useState('');
  const [foraddmaincategory, setforaddmaincategory] = useState('');

  const [foraddsubcategory, setforaddsubcategory] = useState('');

  const [maindesp, setmaindesp] = useState('Ideal for');

  const [itemscolor, setitemscolor] = useState([]);

  const [tagsList, settagsList] = useState([]);

  const [namecolor, setnamecolor] = useState('');
  const [color, setcolor] = useState('');

  const [itemssize, setitemssize] = useState([]);
  const [namesize, setnamesize] = useState('');
  const [size, setsize] = useState('');

  const [itemscategory, setitemscategory] = useState([]);
  const [category, setcategory] = useState('');

  const [itemssubcategory, setitemssubcategory] = useState([]);
  const [subcategory, setsubcategory] = useState('');

  const [itemsdescription, setitemsdescription] = useState([]);

  const [mainitemsdescription, setmainitemsdescription] = useState([]);

  const [description, setdescription] = useState('');
  const [allcategory, setallcategory] = useState([]);
  const [allmaincategory, setallmaincategory] = useState([]);

  const [fetchalltagsDatabase, setfetchalltagsDatabase] = useState([]);

  const fetchcolors = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/fetchcolors', {
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

    if (json != null) {
      setitemscolor(json.itemscolor);
    } else {
      setitemscolor([]);
    }
  };

  const fetchcategory = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/fetchcategory', {
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

    setallcategory(json);
  };

  const fetchalltags = async () => {
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

    setfetchalltagsDatabase(json);
  };

  const fetchmaincategory = async () => {
    const response = await fetch(
      myModule.servername + '/api/fetchmaincategory',
      {
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: ``,
        // body: JSON.stringify({
        //   fabric: fabric,

        // })
      }
    );
    const json = await response.json();
    if (json != null && json.length == 1) {
      setallmaincategory(json[0].maincategory);
    }
  };

  const fetchsizes = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/fetchsizes', {
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
    if (json != null) {
      setitemssize(json.itemssize);
    } else {
      setitemssize([]);
    }

    //// setitemssize(json.itemssize)
  };

  useEffect(() => {
    fetchcolors();
    fetchcategory();
    fetchsizes();
    fetchdesp();
    fetchmaincategory();
    fetchalltags();
  }, []);

  const fetchdesp = async () => {
    var myModule = require('views/config');
    const response = await fetch(myModule.servername + '/api/fetchdesp', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      //// body: `maindesp=${maindesp}`,
      // body: JSON.stringify({
      //   fabric: fabric,

      // })
    });
    const json = await response.json();
    if (json == null) {
      setmainitemsdescription([]);
    } else {
      setmainitemsdescription(json);
    }
  };

  //////////////////////databse category//////////
  const addcategorytodatabase = () => {
    // alert(midcategoty)
    // alert(itemscategory)
    // alert(itemssubcategory)

    var myobj = {
      midcategoty: midcategoty,
      itemscategory: itemscategory,
      itemssubcategory: itemssubcategory,
    };
    var myModule = require('views/config');
    axios.post(myModule.servername + '/api/addcategory', myobj).then((res) => {
      ////console.log(res);
      ////console.log(res.data);
    });
    alert(' Uploded');
    history.push('/admin/dashboard');
  };

  const addTagsToDatabase = () => {
    var myobj = {
      maincategory: maincategory,
      tagsList: tagsList,
      tagsItem: [],
    };

    console.log(myobj);
    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/addtagstoDatabase', myobj)
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
      });
    alert(' Uploded');
    history.push('/admin/dashboard');
  };

  //////////////////////main databse category//////////
  const addmaincategorytodatabase = () => {
    var myobj = {
      maincategory: allmaincategory,
      searchTag: 'maincategory',
    };
    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/addmaincategory', myobj)
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
      });
    alert(' Uploded');
    history.push('/admin/dashboard');
  };

  //////////////////////databse Desciption//////////
  const adddesciptiontodatabase = () => {
    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/adddesciption', {
        maindesp: maincategory,
        itemsdescription: itemsdescription,
        uniquevalue: midcategoty,
      })
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
      });
    alert(' Uploded');
    history.push('/admin/dashboard');
  };

  //////////////////////databse colors//////////
  const addcolorstodatabase = () => {
    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/addcolors', { itemscolor: itemscolor })
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
      });
    alert('Uploded');
    history.push('/admin/dashboard');
  };

  //////////////////////databse sizes//////////
  const addsizestodatabase = () => {
    var myModule = require('views/config');
    axios
      .post(myModule.servername + '/api/addsizes', { itemssize: itemssize })
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
      });
    alert(' Uploded');
    history.push('/admin/dashboard');
  };

  const addcolor = () => {
    setitemscolor([...itemscolor, namecolor || `New item ${indexcolor++}`]);
    setnamecolor('');
  };

  const onColorChange = (e) => {
    setnamecolor(e.target.value);
  };

  // ----------------------------------------------------------------------------
  const addsize = () => {
    setitemssize([...itemssize, namesize || `New item ${indexsize++}`]);
    setnamesize('');
  };
  const onSizeChange = (e) => {
    setnamesize(e.target.value);
  };

  // ----------------------------------------------------------------------------

  const onCateogoryChange = (e) => {
    setcategory(e.target.value);
  };

  const addcategory = () => {
    setitemscategory([
      ...itemscategory,
      category || `New item ${indexcategory++}`,
    ]);
    setcategory('');
  };

  const addMaincategory = () => {
    setallmaincategory([
      ...allmaincategory,
      maincategory || `New item ${indexmaincategory++}`,
    ]);
    setmaincategory('');
  };

  const addTags = () => {
    settagsList([...tagsList, category || `New item ${tagscounter++}`]);
    /////setcategory('');
  };

  // ----------------------------------------------------------------------------

  const onDescriptionChange = (e) => {
    setdescription(e.target.value);
  };

  const adddescription = () => {
    setitemsdescription([
      ...itemsdescription,
      description || `New item ${indexdescription++}`,
    ]);
    setdescription('');
  };

  const changedesp = (e) => {
    setmaindesp(e.target.value);

    fetchdesp(e.target.value);
  };

  const onsubCateogoryChange = (e) => {
    setsubcategory(e.target.value);
  };

  const addsubcategory = () => {
    setitemssubcategory([
      ...itemssubcategory,
      subcategory || `New item ${indexsubcategory++}`,
    ]);
    setsubcategory('');
  };

  const funsetmidcategoty = (e) => {
    setmidcategoty(e.target.value);
    console.log(allcategory);
    var temp = allcategory.filter(
      (book) => book.midcategoty === e.target.value
    );
    if (temp != '') {
      setitemscategory(temp[0].itemscategory);
    } else {
      setitemscategory([]);
    }
    ///alert(temp[0].itemscategory);
  };

  const fetchcategoryRelatedToTag = (e) => {
    setmaincategory(e.target.value);

    var temp = fetchalltagsDatabase.filter(
      (book) => book.maincategory === e.target.value
    );

    if (temp != '') {
      settagsList(temp[0].tagsList);
    } else {
      settagsList([]);
    }
    ///alert(temp[0].itemscategory);
  };

  const filterNestedTags = (e) => {
    setmidcategoty(e.target.value);

    var temp = mainitemsdescription.filter(
      (book) =>
        book.maindesp === maincategory && book.uniquevalue === e.target.value
    );

    if (temp != '') {
      setitemsdescription(temp[0].itemsdescription);
    } else {
      setitemsdescription([]);
    }

    // if (temp != '') {
    //   for (let i = 0; i < temp[0].tagsList.length; i++) {
    //     if (temp[0].tagsList[i] == e.target.value) {
    //       if (temp[0].tagsItem[i] != undefined) {
    //         setitemsdescription(temp[0].tagsItem[i]);
    //       } else {
    //         setitemsdescription([]);
    //       }
    //     }
    //   }
    // } else {
    // }
    //   ///alert(temp[0].itemscategory);
  };

  async function deletecolor(e) {
    var arr = itemscolor.filter((item) => item !== e);
    setitemscolor(arr);

    message.success({
      content: 'Deleted successfully',
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  }

  async function deletedesp(e) {
    var arr = itemsdescription.filter((item) => item !== e);
    setitemsdescription(arr);

    message.success({
      content: 'Deleted successfully',
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  }

  async function deletecategory(e) {
    var arr = itemscategory.filter((item) => item !== e);
    setitemscategory(arr);

    message.success({
      content: 'Deleted successfully',
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  }

  async function deletetags(e) {
    var arr = tagsList.filter((item) => item !== e);
    settagsList(arr);

    message.success({
      content: 'Deleted successfully',
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  }

  async function deletemaincategory(e) {
    var arr = allmaincategory.filter((item) => item !== e);
    setallmaincategory(arr);

    message.success({
      content: 'Deleted successfully',
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  }

  async function deletesizes(e) {
    var arr = itemssize.filter((item) => item !== e);
    setitemssize(arr);

    message.success({
      content: 'Deleted successfully',
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  }

  function cancel(e) {
    ////console.log(e);
  }

  const classes = useStyles();

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='lg'>
          {/* <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='Desciption' key='1'>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <FormGroup>
                    <Label for='exampleSelect'>Main Category</Label>
                    <Input
                      type='select'
                      name='select'
                      id='exampleSelect'
                      onChange={fetchcategoryRelatedToTag}
                    >
                      {' '}
                      <option>--select option--</option>
                      {allmaincategory.map((item) => (
                        <option>{item}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <FormGroup>
                    <Label for='exampleSelect'>Desciption</Label>
                    {/* <Input
                      type='select'
                      name='select'
                      onChange={(e) => {
                        changedesp(e);
                      }}
                      id='exampleSelect'
                    >
                      <option>Ideal for</option>
                      <option>Occasion</option>
                      <option>Clothing Design/ Style</option>
                      <option>Fabric</option>
                      <option>Catalog Type</option>
                      <option>Style Code</option>
                      <option>Size</option>
                      <option>Color</option>
                      <option>Sleeve</option>
                      <option>Neck</option>
                      <option>Packaging Type</option>
                    </Input> */}

                    <Input
                      type='select'
                      name='select'
                      id='exampleSelect'
                      onChange={filterNestedTags}
                    >
                      {' '}
                      <option>---- select---</option>
                      {tagsList.map((item) => (
                        <option>{item}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Input
                    placeholder='Desciption'
                    value={description}
                    onChange={onDescriptionChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='primary' onClick={adddescription}>
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableBody>
                        {itemsdescription.map((item) => (
                          <TableRow key='color'>
                            <TableCell component='th' scope='row'>
                              {item}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deletedesp(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <Button type='primary' onClick={adddesciptiontodatabase}>
                Add to database
              </Button>
            </TabPane> */}

            {/* --------------------------------------------------------------- colors-------------------------------------------------- */}

            <TabPane tab='Colors' key='2'>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Input
                    style={{ flex: 'auto' }}
                    value={namecolor}
                    onChange={onColorChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='primary' onClick={addcolor}>
                    Add
                  </Button>
                </Grid>
              </Grid>

              <br />

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableBody>
                        {itemscolor.map((item) => (
                          <TableRow key='color'>
                            <TableCell component='th' scope='row'>
                              {item}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deletecolor(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <Button type='primary' onClick={addcolorstodatabase}>
                Add to database
              </Button>
            </TabPane>

            {/* ----------------------------------------------------------------------size------------------------------------------------------ */}

            <TabPane tab='Sizes' key='3'>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Input
                    style={{ flex: 'auto' }}
                    value={namesize}
                    onChange={onSizeChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='primary' onClick={addsize}>
                    Add
                  </Button>
                </Grid>
              </Grid>

              <br />

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableBody>
                        {itemssize.map((item) => (
                          <TableRow key='color'>
                            <TableCell component='th' scope='row'>
                              {item}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deletesizes(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button type='primary' onClick={addsizestodatabase}>
                    Add to database
                  </Button>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </TabPane>
            {/* ----------------------------------sub-------category---------------------------------------------- */}
            <TabPane tab='Sub-Category' key='4'>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <FormGroup>
                    <Label for='exampleSelect'>Main Category</Label>
                    <Input
                      type='select'
                      name='select'
                      id='exampleSelect'
                      onChange={funsetmidcategoty}
                    >
                      {' '}
                      <option>--select option--</option>
                      {allmaincategory.map((item) => (
                        <option>{item}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  Category
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Input
                    style={{ flex: 'auto' }}
                    value={category}
                    onChange={onCateogoryChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='primary' onClick={addcategory}>
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableBody>
                        {itemscategory.map((item) => (
                          <TableRow key='color'>
                            <TableCell component='th' scope='row'>
                              {item}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deletecategory(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <br />

              <Button type='primary' onClick={addcategorytodatabase}>
                Add to database
              </Button>
            </TabPane>

            {/* -------------------------------category---------------------------------------------- */}
            <TabPane tab='Category' key='5'>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  Category
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Input
                    style={{ flex: 'auto' }}
                    value={maincategory}
                    onChange={(e) => setmaincategory(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='primary' onClick={addMaincategory}>
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableBody>
                        {allmaincategory.map((item) => (
                          <TableRow key='color'>
                            <TableCell component='th' scope='row'>
                              {item}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deletemaincategory(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <br />

              <Button type='primary' onClick={addmaincategorytodatabase}>
                Add to database
              </Button>
            </TabPane>
            {/* ////////////// add deception */}

            <TabPane tab='add deception' key='6'>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <FormGroup>
                    <Label for='exampleSelect'>Main Category</Label>
                    <Input
                      type='select'
                      name='select'
                      id='exampleSelect'
                      onChange={fetchcategoryRelatedToTag}
                    >
                      {' '}
                      <option>--select option--</option>
                      {allmaincategory.map((item) => (
                        <option>{item}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  add main deception tag
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Input
                    style={{ flex: 'auto' }}
                    value={category}
                    onChange={onCateogoryChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='primary' onClick={addTags}>
                    Add
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                      <TableBody>
                        {tagsList.map((item) => (
                          <TableRow key='color'>
                            <TableCell component='th' scope='row'>
                              {item}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deletetags(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <br />

              <Button type='primary' onClick={addTagsToDatabase}>
                Add to database
              </Button>
            </TabPane>
          </Tabs>
        </Container>
      </React.Fragment>
    </div>
  );
}
