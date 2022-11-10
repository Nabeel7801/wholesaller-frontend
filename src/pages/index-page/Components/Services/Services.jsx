import React from 'react'
import styles from "./Services.module.css"
import { Container, Box, Grid, IconButton } from "@material-ui/core"
import service1 from "../../img/services-icon-1.svg"
import service2 from "../../img/services-icon-2.svg"
import service3 from "../../img/services-icon-3.svg"
import service4 from "../../img/services-icon-4.svg"
import service5 from "../../img/services-icon-5.svg"
import service6 from "../../img/services-icon-6.svg"

// animation library
import Fade from 'react-reveal/Fade';

const serviceData = [
    {
        img: service1,
        title: "Wholesale price",
        subtitle: "Most of the sellers are manufacturer you will get maximum products at manufacturing price"
    },
    {
        img: service2,
        title: "Fast delivery to your doorstep",
        subtitle: "Get orders at your doorstep"
    },
    {
        img: service3,
        title: "5000+ brands and more than 1 lakh products",
        subtitle: "Direct purchase from factories"
    },
    {
        img: service4,
        title: "Credit facility",
        subtitle: "Access our credit facilities"
    },
    {
        img: service5,
        title: "Flexible return",
        subtitle: "Hassle free return process"
    },
    {
        img: service6,
        title: "Customized buying option",
        subtitle: "Our sellers are giving option to design and packaging with your own style and brands "
    },

]
const Services = () => {
    return (
        <Box id="services" className="container-spacing" >
            <Container maxWidth="lg">
                <Box>
                    <Box className="text-center">
                        <Box>
                            <p className="color-primary_LP small_LP semi-bold_LP uppercase">services</p>
                        </Box>
                        <Box mt={2}>
                            <h4 className="h4 bold_LP text-primary_LP">Save your time, Time is money</h4>
                        </Box>
                    </Box>
                    <Box mt={{ xs: 2 }} className="widthOnMobile">
                        <Grid container justifyContent="center" spacing={0}>
                            {
                                serviceData.map(service => (
                                    <Grid item xs={12} sm={6} key={service.img} >
                                        <Fade right>
                                            <Box mt={{xs: 4,md: 10}}className={styles.contentContainer}>
                                                <Box>
                                                    <IconButton style={{ width: "100px", height: "100px", backgroundColor: "#fff", boxShadow: "0px 1px 16px 10px rgba(40,121,255,0.1)" }}>
                                                        <img src={service.img} alt="service " style={{width: "50px",height: "50px"}}/>
                                                    </IconButton>
                                                </Box>
                                                <Box ml={{xs: 0, md: 4}} mt={{xs: 3,md: 0}} className={styles.textContainer}>
                                                    <Box  mb={1} >
                                                        <h6 className="text-primary_LP h6 bold_LP">{service.title}</h6>
                                                    </Box>
                                                    <Box>
                                                        <p className="text-secondary_LP ">{service.subtitle}</p>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Services
