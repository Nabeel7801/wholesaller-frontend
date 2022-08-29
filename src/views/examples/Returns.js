import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";
import React from "react";

const Returns = () => {
  return (
    <div>
      {" "}
      <div>
        {localStorage.getItem("wholesaller") != null ? (
          <>
            <MainNavbar />
          </>
        ) : (
          <IndexNavbar />
        )}
        <br />
        <h2 className="text-2xl font-medium text-center mt-20">
          Work in progress contact for return 9583195831
        </h2>
      </div>
    </div>
  );
};

export default Returns;
