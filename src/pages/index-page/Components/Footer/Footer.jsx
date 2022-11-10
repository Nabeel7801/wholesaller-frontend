import React from 'react'
import styles from './Footer.module.css'
import { Box, Container, Grid } from "@material-ui/core"
import Address from './Address'
import Form from './Form'

import roundWhiteSmall from '../../img/white-round-sm.svg'

const Footer = () => {

    return (
        < Box className={styles.footer} >
            <Container maxWidth="lg" style={{ position: "relative" }}>
                <Box className={styles.roundWhiteSmall}  >
                    <img src={roundWhiteSmall} alt="round shaped white small" />
                </Box>
                <Box mb={4} className={styles.headingContainer} >
                    <Box mr={1} className={styles.contactUsLine + " smallLine"} />
                    <p className={styles.contactUs + " small_LP semi-bold_LP uppercase"}>contact us</p>
                </Box>
                <Grid container alignItems="flex-start" spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Address />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Form />
                    </Grid>
                </Grid>
            </Container>
            <Box mt={5}>
                <p className="light_LP text-center">version 4.0/1112 wholesaller.com @ 2017-2021 </p>
            </Box>
        </Box >
    )
}

export default Footer
