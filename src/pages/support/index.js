import React from "react";
import { useSelector } from "react-redux";

import { ChevronRight, Phone, WhatsApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1100,
    margin: "auto",
  },
  whatsappIcon: {
    fill: "green",
  },
}));

const Support = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="bg-gray-50 min-h-screen">
      { user ? <MainNavbar /> : <IndexNavbar /> }

      {/* <Container maxWidth="lg"> */}
      <div className={classes.container}>
        <div className="text-base uppercase font-semibold py-8 px-4 text-gray-800">
          Help on other issues
        </div>
        <div className="border-b border-gray-200 bg-white text-base flex items-center font-semibold py-8 px-4 text-gray-800">
          <span>Email: support@wholeseller.com</span>
          <div className="flex-1" />

          <ChevronRight />
        </div>
        <div className="bg-white border-b border-gray-200 text-base flex items-center font-semibold py-8 px-4 text-blue-600">
          <span className="mr-2">
            <Phone />
          </span>
          <span>9583195831</span>
          <div className="flex-1" />

          <ChevronRight />
        </div>
        <div className="bg-white  text-base flex items-center font-semibold py-8  px-4 text-gray-800">
          <span className="mr-2">
            <WhatsApp className={classes.whatsappIcon} />
          </span>
          <span>WhatsApp</span>
          <div className="flex-1" />

          <ChevronRight />
        </div>
      </div>

    </div>
  );
};

export default Support;
