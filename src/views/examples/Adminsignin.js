import React, { useState } from "react";
import DemoFooter from "components/Footers/DemoFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import history from "views/history";
import { useDispatch } from "react-redux";
function AdminSignin() {
  const dispatch = useDispatch();

  const [email, setemail] = useState("");

  const [pass, setpass] = useState("");

  const handlesigin = async () => {
    var myModule = require("views/config");

    const response = await fetch(myModule.servername + "/api/verifyAdmin", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `email=${email}&pass=${pass}`,
    });
    const json = await response.json();

    if (json == "success") {
      ///// dispatch('verifyAdmin', json);
      dispatch({ type: "verifyAdmin", payload: json });
      history.push("/admin");
    } else {
      alert("wrong attempt");
    }

    //// alert(json);
  };

  return (
    <div>
      <IndexNavbar />

      <div className="container margintop-signin">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
              <div className="myform form ">
                <div className="logo mb-3">
                  <div className="col-md-12 text-center">
                    <h2 className="loginfont-styl">Login Admin</h2>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>

                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input
                    onChange={(e) => setpass(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-group">
                  <p className="text-center"></p>
                </div>
                <div className="col-md-12 text-center ">
                  <button
                    onClick={handlesigin}
                    className=" btn  btn-block mybtn tx-tfm"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoFooter />
    </div>
  );
}

export default AdminSignin;
