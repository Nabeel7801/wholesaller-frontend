import React from 'react';
import styles from './HowItWorks.module.css';
import { Container, Box, Grid, IconButton } from '@material-ui/core';
import icon1 from '../../img/services-icon-1.svg';
import icon2 from '../../img/pr-icon-2.svg';
import icon3 from '../../img/pr-icon-3.svg';
import icon4 from '../../img/pr-icon-4.svg';
import arrow from '../../img/arr-right.svg';

import cx from 'classnames';

// animation library
import Fade from 'react-reveal/Fade';

const HIW_Data = [
  {
    img: icon1,
    title: 'Create an account',
    subtitle: 'Enter your mobile number & email  & update your profile',
    order: 1,
    stylesIcon: styles.firstIcon,
    stylesIconContainer: styles.firstIconContainer,
  },
  {
    img: icon2,
    title: 'Upload kyc',
    subtitle: 'Upload any of one document to start buy and sell',
    order: 2,
    stylesIcon: styles.secondIcon,
    stylesIconContainer: styles.secondIconContainer,
  },
  {
    img: icon3,
    title: 'Start trading',
    subtitle:
      'Get verify, if you are a seller apply for selling if you are a buyer start buying',
    order: 3,
    stylesIcon: styles.thirdIcon,
    stylesIconContainer: styles.thirdIconContainer,
  },
  {
    img: icon4,
    title: 'Apply credit',
    subtitle: 'Apply for credit and avail credit buying',
    order: 4,
    stylesIcon: styles.forthIcon,
    stylesIconContainer: styles.forthIconContainer,
  },
];
const HowItWorks = () => {
  return (
    <Box id='HIW' className={styles.howItWorks}>
      <Box className={styles.bgContainer}>
        <Box className={styles.bg}></Box>
      </Box>
      <Box className={'container-spacing'}>
        <Container maxWidth='lg'>
          <Box>
            <Box className='text-center'>
              <Box>
                <p className='color-primary_LP small_LP semi-bold_LP uppercase'>
                  Awesome services
                </p>
              </Box>
              <Box mt={2}>
                <h4 className='h4 bold_LP text-primary_LP'>How it Works</h4>
              </Box>
            </Box>
            <Box mt={{ xs: 2 }}>
              <Fade bottom>
                <Grid container justifyContent='center'>
                  {HIW_Data.map((HIW) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={Math.random() * 99999999999999999}
                    >
                      <Box
                        mt={{ xs: 4, md: 10 }}
                        className={styles.contentContainer}
                      >
                        <Box
                          className={cx(
                            styles.iconContainer,
                            HIW.stylesIconContainer
                          )}
                        >
                          <Box className={cx(styles.icon, HIW.stylesIcon)}>
                            <IconButton
                              style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: '#fff',
                                boxShadow:
                                  '0px 1px 16px 10px rgba(40,121,255,0.1)',
                              }}
                            >
                              <img src={HIW.img} alt='icon' style={{width: "50px", height: "50px"}}/>
                            </IconButton>
                          </Box>
                          <Box className={styles.arrow}>
                            <img src={arrow} alt='arrow' />
                          </Box>
                        </Box>
                        <Box
                          className={styles.textContainer}
                          mt={{ xs: 3, sm: 4, md: 6 }}
                        >
                          <Box mb={1}>
                            <h6 className='text-primary_LP h6 bold_LP'>
                              {HIW.title}
                            </h6>
                          </Box>
                          <Box>
                            <p className='text-secondary_LP '>{HIW.subtitle}</p>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Fade>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorks;
