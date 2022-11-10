import React from 'react';
import styles from './MobileApp.module.css';
import { Box, Container, Grid } from '@material-ui/core';
import mobile from '../../img/mobile app/iphone-3.webp';

import as from '../../img/mobile app/as.webp';
import gp from '../../img/mobile app/gp.webp';

import roundWhiteSmall from '../../img/white-round-sm.svg';

// animation library
import Fade from 'react-reveal/Fade';

const MobileApp = () => {
  return (
    <Box id='mobileApp' className={styles.mobileApp}>
      <Box className={styles.bg}>
        <Container maxWidth='lg'>
          <Box className={styles.content}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Fade left>
                  <Box
                    className={styles.textContainer + ' container-spacing'}
                    justifyContent='center'
                  >
                    <Box>
                      <Box className={styles.headingContainer}>
                        <Box
                          mr={1}
                          className={styles.line + ' smallLine bg-color-prmary_LP'}
                        />
                        <p className='color-primary_LP small_LP semi-bold_LP uppercase'>
                          mobile app
                        </p>
                      </Box>
                      <Box mt={1}>
                        <h4 className={styles.title + ' text-primary_LP h4 bold_LP'}>
                          Now you can start your business on mobile
                        </h4>
                      </Box>
                      <Box mt={2} mb={4}>
                        <p className='text-secondary_LP'>
                          Wholesaller mobile app is very dynamic and powerfull
                          app having Smart listing, Order management & Accounts
                        </p>
                      </Box>
                      <Box className={styles.icons}>
                        <Box mr={1}>
                          <img src={as} alt='apple store icon' />
                        </Box>
                        <Box>
                          <img src={gp} alt='google play icon' />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
              <Grid item xs={false} md={4}>
                <Box className={styles.mobilePictureContainer}>
                  <img
                    className={styles.mobilePicture}
                    src={mobile}
                    alt='mobile'
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Box className={styles.roundWhiteSmall}>
          <img src={roundWhiteSmall} alt='round shaped white small' />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileApp;
