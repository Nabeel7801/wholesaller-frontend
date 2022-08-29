import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import history from "views/history";
import { useMutation } from "react-query";
import userService from "views/services/httpService/userAuth/userServices";

import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { updatelisting } from "views/action/updatelisting";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ProductType() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const selecttype = async (
    mainid,
    mainname,
    subid,
    subname,
    childid,
    childname
  ) => {
    ///alert(type+type1);
    var category = {
      maincategory: mainname,
      subcategory: subname,
      mainid: mainid,
      subid: subid,
      childid: childid,
      childname: childname,
    };

    console.log(category);
    dispatch(updatelisting("productype", category));
    history.push("/saller/newlisting");
  };

  const [categoryoptions, setcategoryoptions] = useState([]);

  const [displaycategory, setdisplaycategory] = useState([]);

  const fetchAllCategories = useMutation(
    (callApi) => userService.commonPostService("api/displaycategory", callApi),
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

  const fetchcategory = async () => {
    var myModule = require("views/config");
    const response = await fetch(myModule.servername + "/api/fetchcategory", {
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
    setcategoryoptions(json);
    // if(json!=null){
    //   alert(json)
    //   setcategoryoptions(json)
    //   ////console.log(categoryoptions)
    //   alert(categoryoptions)

    // }
    // else{
    //   setcategoryoptions([])
    // }

    //// setitemssize(json.itemssize)
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  const datafromstore = useSelector((state) => state.addlisting.productype);

  return (
    <div>
      <br />
      <Container>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {displaycategory
            .filter((item) => item.ancestors == "")
            .map((s, i) => (
              <>
                <TreeItem nodeId={s._id} label={s.name}>
                  {displaycategory
                    .filter(
                      (item) =>
                        item.ancestors.length == 1 &&
                        item.ancestors[0].name == s.name
                    )
                    .map((s1, i1) => (
                      <>
                        <TreeItem nodeId={s1._id} label={s1.name}>
                          {displaycategory
                            .filter(
                              (item) =>
                                item.ancestors.length == 2 &&
                                item.ancestors[0].name == s1.name
                            )
                            .map((s2, i2) => (
                              <>
                                <TreeItem
                                  onClick={() =>
                                    selecttype(
                                      s._id,
                                      s.name,
                                      s1._id,
                                      s1.name,
                                      s2._id,
                                      s2.name
                                    )
                                  }
                                  nodeId={s2._id}
                                  label={s2.name}
                                ></TreeItem>
                              </>
                            ))}
                        </TreeItem>
                      </>
                    ))}
                </TreeItem>
              </>
            ))}
        </TreeView>
        {/* 
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              Prodyct type
            </ListSubheader>
          }
          className={classes.root}
        >
          {displaycategory
            .filter((item) => item.ancestors == '')
            .map((s, i) => (
              <>
                <ListItem button onClick={handleClick}>
                  <ListItemText primary={s.name} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                  {displaycategory
                    .filter(
                      (item) =>
                        item.ancestors.length == 1 &&
                        item.ancestors[0].name == s.name
                    )
                    .map((s1, i1) => (
                      <>
                        <List component='div' disablePadding>
                          <ListItem
                            button
                            className={classes.nested}
                            onClick={handleClick1}
                          >
                            <ListItemText
                              onClick={() =>
                                selecttype(s._id, s.name, s1._id, s1.name)
                              }
                              primary={s1.name}
                            />
                          </ListItem>
                        </List>
                      </>
                    ))}
                </Collapse>
              </>
            ))}
        </List> */}
      </Container>
    </div>
  );
}

export default ProductType;
