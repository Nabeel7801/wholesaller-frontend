import React from "react";
import { useNavigate } from "react-router-dom"

import Footer from "components/Footers/DemoFooter.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import { Container, Row, Col } from "reactstrap";
import { Box } from "@material-ui/core";

function VerifyDocument() {
  
  const navigate = useNavigate();

  return (
    <div>
      <MainNavbar />
      <Box pb={10}>
        <Container>
          <div className="topmargin">
            <div className="text-center ">
              <h2 className="blackbold">Upload document</h2>
            </div>

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="10">
                <div className="blackbold">
                  Select any one of the following document
                </div>
              </Col>
            </Row>
            <br />

            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a
                  onClick={() =>
                    navigate("/uploaddocument/gstverification")
                  }
                >
                  <div className="ui segment blackbold">
                    GST Certification{" "}
                    <span style={{ backgroundColor: "RED", fontSize: 10 }}>
                      INSTANT VERIFICATION
                    </span>
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                    <div className="subtitle-styl">
                      Get verify in just 2 minutes
                    </div>
                  </div>
                </a>
              </Col>
            </Row>

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a
                  onClick={() =>
                    navigate("/uploaddocument/ShopEstablishmentLicense")
                  }
                >
                  <div className="ui segment blackbold">
                    Shop & Establishment License
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                  </div>
                </a>
              </Col>
            </Row>

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a
                  onClick={() => navigate("/uploaddocument/UdhyogAadhaar")}
                >
                  <div className="ui segment blackbold">
                    Udhyog Aadhaar
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                  </div>
                </a>
              </Col>
            </Row>

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a
                  onClick={() =>
                    navigate("/uploaddocument/TradeCertificateLicence")
                  }
                >
                  <div className="ui segment blackbold">
                    Trade Certificate/ Licence
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                  </div>
                </a>
              </Col>
            </Row>

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a
                  onClick={() =>
                    navigate("/uploaddocument/TradeCertificate")
                  }
                >
                  <div className="ui segment blackbold">
                    FSSAI Registration
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                  </div>
                </a>
              </Col>
            </Row>

            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a onClick={() => navigate("/uploaddocument/DrugLicence")}>
                  <div className="ui segment blackbold">
                    Drug Licence
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                  </div>
                </a>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg="10" md="10" sm="10" xs="11">
                <a
                  onClick={() =>
                    navigate("/uploaddocument/CurrentAccountLicence")
                  }
                >
                  <div className="ui segment blackbold">
                    Pancard
                    <i
                      aria-hidden="true"
                      className="angle right big icon floatright"
                    ></i>
                  </div>
                </a>
              </Col>
            </Row>
          </div>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

export default VerifyDocument;
