import React from 'react';
import styles from './Info.module.css';
import { Container, Box } from '@material-ui/core';
import roundWhite from '../../img/fs-round-white.svg';
import roundWhiteSmall from '../../img/white-round-sm.svg';
// animation library
import Fade from 'react-reveal/Fade';

const Info = () => {
  return (
    <Box className='container-spacing'>
      <Box id='info' className={styles.info + ' container-spacing'}>
        <Box className={styles.imgContainer}>
          {/* white circle on top and bottom */}
          <Box className={styles.roundWhiteTop}>
            <img src={roundWhiteSmall} alt='round shaped white small' />
          </Box>
          <Box className={styles.roundWhiteBottom}>
            <img src={roundWhite} alt='round shaped white' />
          </Box>
        </Box>
        <Container maxWidth='md'>
          <Box className={styles.infoContent}>
            <Box>
              <p
                className={'small_LP uppercase bold_LP'}
                style={{ color: 'rgb(164,198,250)' }}
              >
                infoblock
              </p>
            </Box>
            <Box my={{ xs: 3, sm: 6 }}>
              <h4 className='h4 bold_LP text-white_LP'> Join with us</h4>
            </Box>
            <Box>
              <Fade bottom>
                <Box className={styles.mainContent}>
                  <Box className={styles.textContainer}>
                    <Box>
                      <h6 className='h6 bold_LP text-white_LP'>Retailers</h6>
                    </Box>
                    <Box mt={{ xs: 0, sm: 1 }}>
                      <h3
                        className={styles.numbers + ' h3 bold_LP'}
                        style={{ color: 'rgb(243,214,103)' }}
                      >
                        50000+
                      </h3>
                    </Box>
                  </Box>
                  <Box className={styles.textContainer}>
                    <Box>
                      <h6 className='h6 bold_LP text-white_LP'>Sellers</h6>
                    </Box>
                    <Box mt={{ xs: 0, sm: 1 }}>
                      <h3
                        className={styles.numbers + ' h3 bold_LP'}
                        style={{ color: 'rgb(249,119,138)' }}
                      >
                        5000+
                      </h3>
                    </Box>
                  </Box>
                  <Box className={styles.textContainer}>
                    <Box>
                      <h6 className='h6 bold_LP text-white_LP'>Pincode converage</h6>
                    </Box>
                    <Box mt={{ xs: 0, sm: 1 }}>
                      <h3
                        className={styles.numbers + ' h3 bold_LP'}
                        style={{ color: 'rgb(119,192,246)' }}
                      >
                        25000+
                      </h3>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Info;
