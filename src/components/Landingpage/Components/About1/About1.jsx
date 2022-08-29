import React from 'react';
import styles from './About1.module.css';
import { Container, Box, Grid } from '@material-ui/core';

// animation library
import Fade from 'react-reveal/Fade';

const About1 = () => {
  return (
    <Box id='about'>
      <Box className='container-spacing'>
        <Container maxWidth='lg'>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            spacing={5}
          >
            <Grid item xs={12} sm={6}>
              <Fade left>
                <div className={styles.image} />
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Fade right>
                <Box className='widthOnMobile'>
                  <Box className={styles.headingContainer}>
                    <Box mr={1} className='smallLine bg-color-prmary_LP' />
                    <p className='color-primary_LP small_LP semi-bold_LP uppercase'>
                      empowering small businesses
                    </p>
                  </Box>
                  <Box my={4}>
                    <h4 className={styles.title + ' text-primary_LP h4 bold_LP'}>
                      What is Wholesaller?
                    </h4>
                  </Box>
                  <Box my={2}>
                    <p className='text-secondary_LP'>
                      Wholesaller is a India’s leading full-stack B2B commerce
                      platform for small businesses. Our goal is to use
                      technology to supercharge businesses with easy access to
                      B2B sourcing and last-mile logistics.
                    </p>
                  </Box>
                  <Box>
                    <p className='text-secondary_LP'>
                      <span className='bold_LP'>Our B2B e-commerce platform</span>
                      serves 500,000 neighbourhood shops, providing access to
                      10,000+ products - all available at the tap of a button.
                    </p>
                  </Box>
                  <Box my={2}>
                    <p className='text-secondary_LP'>
                      <span className='bold_LP'>Our logistics service</span>
                      supercharges SMEs and large enterprises alike with the
                      widest last-mile logistics network Across india
                    </p>
                  </Box>
                  <Box>
                    <p className='text-secondary_LP'>
                      
                      <span className='bold_LP'>Our digital embedded</span>
                      financing product provides supplies on credit, empowering
                      thousands of small traders with an easy alternative to the
                      complexities of traditional financing.
                    </p>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About1;
