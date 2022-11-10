import React from "react";
import { useSelector } from "react-redux";

import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";

function Returns() {

  const user = useSelector((state) => state.auth.user)

  return (
    <div>
      {" "}
      <div>
        { user ? <MainNavbar /> : <IndexNavbar /> }

        <br />
        
        <h2 className="text-2xl font-medium text-center mt-20">
          Work in progress contact for return 9583195831
        </h2>
      </div>
    </div>
  );
};

export default Returns;
