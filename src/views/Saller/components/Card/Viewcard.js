import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import history from "views/history";
import { useDispatch } from "react-redux";
import { updatelisting } from "views/action/updatelisting";
import axios from "axios";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 700,
  },
  buttonContainer: {
    display: "flex",
  },
  button: {
    padding: "12px",
  },
  [theme.breakpoints.down("md")]: {
    button: {
      padding: "6px",
      fontSize: "1rem",
    },
  },
}));

function Viewcard(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const config = require("views/config");

  //     const [listingofseller, setlistingofseller] = useState([]);

  // async function fetchsellerproduct(){

  //   var myModule = require('views/config');
  //   const response= await fetch(myModule.servername+"/api/fetchsellerproduct", {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/x-www-form-urlencoded; charset=utf-8",
  //     },
  //     body: `id=${JSON.parse(localStorage.getItem('wholesaller'))._id}`,
  //     // body: JSON.stringify({
  //     //   fabric: fabric,

  //     // })
  //   });
  //   const json=await response.json();

  //   setlistingofseller(json)
  // }

  //     useEffect(() => {

  //       fetchsellerproduct();

  //     },[]);

  const delettelisting = async (id, counter) => {
    let res = await axios.post(config.servername + "/api/deleteproduct", {
      id: id,
    });

    props.fetchsellerproduct();
  };

  function editlisting(id) {
    alert(props.listingofseller[id].foredit.foredit.allsets);
    dispatch(
      updatelisting(
        "listingcolorformap",
        props.listingofseller[id].foredit.foredit.colorformap
      )
    );
    dispatch(
      updatelisting(
        "listingallsets",
        props.listingofseller[id].foredit.foredit.allsets
      )
    );

    dispatch(
      updatelisting(
        "listingfinalarr",
        props.listingofseller[id].foredit.foredit.finalarr
      )
    );
    // dispatch(
    //   updatelisting(
    //     "listingallattribute",
    //     props.listingofseller[id].foredit.foredit.allattribute
    //   )
    // );
    dispatch(
      updatelisting(
        "listingmapsize",
        props.listingofseller[id].foredit.foredit.mapsize
      )
    );

    dispatch(
      updatelisting(
        "listingminsetorder",
        props.listingofseller[id].foredit.foredit.minsetorder
      )
    );
    dispatch(
      updatelisting(
        "listingpriceperpiece",
        props.listingofseller[id].foredit.foredit.priceperpiece
      )
    );
    dispatch(
      updatelisting(
        "listingmrpperpiece",
        props.listingofseller[id].foredit.foredit.mrpperpiece
      )
    );
    dispatch(
      updatelisting(
        "listingavailablesetquantity",
        props.listingofseller[id].foredit.foredit.availablesetquantity
      )
    );
    dispatch(
      updatelisting(
        "listingsquid",
        props.listingofseller[id].foredit.foredit.squid
      )
    );

    dispatch(
      updatelisting(
        "listingsetinstock",
        props.listingofseller[id].foredit.foredit.setinstock
      )
    );

    dispatch(updatelisting("iseditornew", props.listingofseller[id]._id));

    history.push("/saller/previewset");
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label=" table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>ID</StyledTableCell> */}
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="">Name</StyledTableCell>
              <StyledTableCell align="">Category</StyledTableCell>
              <StyledTableCell align="">Status</StyledTableCell>
              <StyledTableCell align="">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listingofseller.map((s, i) => (
              <>
                <StyledTableRow key="name">
                  {/* <StyledTableCell align="">12</StyledTableCell> */}
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={config.picserver + s.maindetails.mainimage}
                      class="ui tiny image"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="">
                    {" "}
                    {s.maindetails.title}
                  </StyledTableCell>
                  <StyledTableCell align="">category</StyledTableCell>

                  <StyledTableCell align="">status</StyledTableCell>
                  <StyledTableCell align="" className={classes.buttonContainer}>
                    <IconButton aria-label="delete" className={classes.button}>
                      <DeleteIcon onClick={() => delettelisting(s._id, i)} />
                    </IconButton>
                    &nbsp;
                    <IconButton
                      aria-label="edit"
                      onClick={() => editlisting(i)}
                      className={classes.button}
                    >
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Viewcard;
