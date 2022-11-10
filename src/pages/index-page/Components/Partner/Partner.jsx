import React from "react";
import styles from "./Partner.module.css";
import { Box, Container, Grid } from "@material-ui/core";
import partner1 from "../../img/partner/partner-1.webp";
import partner2 from "../../img/partner/partner-2.webp";
import partner3 from "../../img/partner/partner-3.webp";
import partner4 from "../../img/partner/partner-4.webp";
import partner5 from "../../img/partner/partner-5.webp";

const partnerData = [
  {
    img: partner1,
  },
  {
    img: partner2,
  },
  {
    img: partner3,
  },
  {
    img: partner4,
  },
  {
    img: partner5,
  },
];
const Partner = () => {
  return (
    <Box id="partners">
      <Box className="container-spacing">
        <Container maxWidth="lg">
          <Box className={styles.headingContainer}>
            <Box mr={1} className="smallLine bg-color-prmary_LP" />
            <p className="color-primary_LP small_LP semi-bold_LP uppercase">
              our friends
            </p>
          </Box>
          <Box my={2}>
            <h4 className={"text-primary_LP h4 bold_LP"}>Partners</h4>
          </Box>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            {partnerData.map((partner) => (
              <Grid item key={partner.img}>
                <Box>
                  <img
                    className={styles.partner}
                    src={partner.img}
                    alt="logo"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Partner;
