import { Grid, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Carousel } from "antd";

import Sidecard from "./Sidecard"

const useStyles = makeStyles(() => ({
  carousel: {
    height: "100%",
    maxHeight: "360px",
    color: "#fff",
    lineHeight: "500px",
    textAlign: "center",
    background: "#364d79",
  }
}));

function CarouselSection() {

  const classes = useStyles();

  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
        <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>

                <Carousel autoplay >
                    <div>
                        <h3 className={classes.carousel}>
                            <img
                                class="ui fluid image"
                                src={require("assets/img/slide-01.jpg")}
                            />
                        </h3>
                    </div>
                    <div>
                        <h3 className={classes.carousel}>
                            <img src={require("assets/img/slide-02.jpg")} />
                        </h3>
                    </div>
                    <div>
                        <h3 className={classes.carousel}>
                            <img src={require("assets/img/slide-03.jpg")} />
                        </h3>
                    </div>
                    <div>
                        <h3 className={classes.carousel}>
                            <img src={require("assets/img/slide-04.jpg")} />
                        </h3>
                    </div>

                </Carousel>


            </Grid>

            <Grid item lg={4} md={4} sm={0} xs={0}>
                <div className="hidden md:block">
                    <Sidecard />
                </div>
            </Grid>
        </Grid>
    </Collapse>
  );
}

export default CarouselSection;
