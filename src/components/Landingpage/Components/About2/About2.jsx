import React from 'react';
import styles from './About2.module.css';
import { Container, Box, Grid } from '@material-ui/core';

// animation library
import Fade from 'react-reveal/Fade';

const About2 = () => {
  return (
    <Box className='container-spacing'>
      <Container maxWidth='lg'>
        <Grid container alignItems='center' justifyContent='center' spacing={8}>
          <Grid item xs={12} sm={6}>
            <Fade left>
              <Box className='widthOnMobile'>
                <Box className={styles.headingContainer}>
                  <Box mr={1} className='smallLine' />
                  <p className='color-primary_LP small_LP semi-bold_LP uppercase'>
                    Love to talk
                  </p>
                </Box>
                <Box my={4}>
                  <h4 className={styles.title + ' text-primary_LP h4 bold_LP'}>
                    Wholesaller saved my business
                  </h4>
                </Box>
                <Box my={3}>
                  <p className='text-secondary_LP'>
                    I earn my livelihood by running a small garment factory in
                    Delhi. When the lockdown started last year, all the delivery
                    services stopped their services. As a result, my business
                    was suffering badly. Thankfully I got to know about
                    wholesaller - they were the only logistics company
                    supporting small businesses like mine. Their service not
                    only helped my business stay afloat through a critical
                    period, but also helped me expand the scope of my business
                    with nationwide coverage.
                  </p>
                </Box>
                <Box>
                  <p className='text-secondary_LP'>
                    <span className='bold_LP'>Anil Biswas</span>, Delhi
                  </p>
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} className={styles.imageGrid}>
            <Fade right>
              <Box className={styles.image} />
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About2;
