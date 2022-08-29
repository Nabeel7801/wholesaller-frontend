import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import { Container } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";

import { useDispatch } from "react-redux";
import { updatelisting } from "views/action/updatelisting";
import history from "views/history";
import Viewcard from "../components/Card/Viewcard";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    marginTop: 10,
    paddingTop: "60.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function ViewListing() {
  const dispatch = useDispatch();

  const { TabPane } = Tabs;
  const classes = useStyles();

  function callback(key) {
    ////console.log(key);
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [listingofseller, setlistingofseller] = useState([]);

  async function fetchsellerproduct() {
    var myModule = require("views/config");
    const response = await fetch(
      myModule.servername + "/api/fetchsellerproduct",
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
        // body: JSON.stringify({
        //   fabric: fabric,

        // })
      }
    );
    const json = await response.json();

    setlistingofseller(json);
  }

  useEffect(() => {
    fetchsellerproduct();
  }, []);

  function editlisting(id) {
    dispatch(
      updatelisting(
        "listingcolorformap",
        listingofseller[id].foredit.foredit.colorformap
      )
    );
    dispatch(
      updatelisting("listingallsets", listingofseller[id].foredit.allsets)
    );

    dispatch(
      updatelisting(
        "listingfinalarr",
        listingofseller[id].foredit.foredit.finalarr
      )
    );
    dispatch(
      updatelisting(
        "listingallattribute",
        listingofseller[id].foredit.foredit.allattribute
      )
    );
    dispatch(
      updatelisting(
        "listingmapsize",
        listingofseller[id].foredit.foredit.mapsize
      )
    );

    dispatch(
      updatelisting(
        "listingminsetorder",
        listingofseller[id].foredit.foredit.minsetorder
      )
    );
    dispatch(
      updatelisting(
        "listingpriceperpiece",
        listingofseller[id].foredit.foredit.priceperpiece
      )
    );
    dispatch(
      updatelisting(
        "listingmrpperpiece",
        listingofseller[id].foredit.foredit.mrpperpiece
      )
    );
    dispatch(
      updatelisting(
        "listingavailablesetquantity",
        listingofseller[id].foredit.foredit.availablesetquantity
      )
    );
    dispatch(
      updatelisting("listingsquid", listingofseller[id].foredit.foredit.squid)
    );

    dispatch(
      updatelisting(
        "listingsetinstock",
        listingofseller[id].foredit.foredit.setinstock
      )
    );

    dispatch(updatelisting("iseditornew", listingofseller[id]._id));

    history.push("/saller/previewset");
  }

  return (
    <div>
      <br />
      <br />

      <Container>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Active" key="1">
            <Viewcard
              setlistingofseller={setlistingofseller}
              listingofseller={listingofseller}
              fetchsellerproduct={fetchsellerproduct}
            />

            <br />
          </TabPane>
          <TabPane tab="Expire Soon" key="2">
            {/* <Viewcard/> */}
          </TabPane>
          <TabPane tab="Inactive" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
}

export default ViewListing;
