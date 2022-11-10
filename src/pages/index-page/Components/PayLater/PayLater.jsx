import React from 'react';
import styles from './PayLater.module.css';
import { Container, Box, Button, Grid, Icon } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';

import roundWhiteSmall from '../../img/white-round-sm.svg';

// animation library\
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles(() => ({
  btn: {
    /* important is being used to override material ui style orders */
    backgroundColor: 'rgb(250, 251, 255)',
    padding: '1rem 0',
    transition: 'all .5s',
    borderRadius: '5px',
    width: '200px',
    color: 'rgb(119, 119, 119)',
    '&:hover': {
      backgroundColor: 'rgb(46, 192, 221)',
      color: 'rgb(250, 251, 255)',
    },
  },
}));

const PayLater = () => {
  const classes = useStyles();

  return (
    <Box className='container-spacing'>
      <Box id='payLater' className={styles.payLater + ' container-spacing'}>
        <Box className={styles.payLaterContent + ' widthOnMobile'}>
          <Container maxWidth='lg'>
            <Grid container alignItems='center' spacing={8}>
              <Grid item xs={12} md={6}>
                <Fade left>
                  <Box className={styles.image} />
                </Fade>
              </Grid>
              <Grid item xs={12} md={6}>
                <Fade right>
                  <Box>
                    <Box>
                      <Box mb={4} className={styles.headingContainer}>
                        <Box mr={1} className={styles.line + ' smallLine'} />
                        <p className='small_LP semi-bold_LP uppercase text-white_LP'>get credits</p>
                      </Box>
                      <Box >
                        <p className='h4 bold_LP'>Buy now and pay later</p>
                      </Box>
                    </Box>
                    <Box my={2}>
                      <p>
                        Get credit access buy now & pay later is a short term,
                        revolving credit option available to buyers on the
                        wholesaller B2B marketplace.Buyers can avail the buy
                        now, pay later credit line available to them across
                        multiple invoices and take advantage of flexible payment
                        schedules.Credit is available for 15 or 30 days.Don’t
                        let liquidity challenges hold you back from growing your
                        business.
                      </p>
                    </Box>
                    <Box>
                      <Box className={styles.facilities}>
                        <Box mr={1}>
                          <Icon>
                            <CheckIcon className={styles.check} />
                          </Icon>
                        </Box>
                        <p>Collateral Free</p>
                      </Box>
                      <Box className={styles.facilities}>
                        <Box mr={1}>
                          <CheckIcon className={styles.check} />
                        </Box>
                        <p>Credit limit up to Rs.2,00,000</p>
                      </Box>
                      <Box className={styles.facilities}>
                        <Box mr={1}>
                          <CheckIcon className={styles.check} />
                        </Box>
                        <p>No hidden fees</p>
                      </Box>
                      <Box className={styles.facilities}>
                        <Box mr={1}>
                          <CheckIcon className={styles.check} />
                        </Box>
                        <p>Easy application process</p>
                      </Box>
                      <Box className={styles.facilities}>
                        <Box mr={1}>
                          <CheckIcon className={styles.check} />
                        </Box>
                        <p>Quick sanction & disbursal</p>
                      </Box>
                      <Box mt={3}>
                        <Button
                          type='submit'
                          size='large'
                          className={classes.btn}
                        >
                          Apply Now
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            </Grid>
          </Container>
          <Box className={styles.roundWhiteSmall}>
            <img src={roundWhiteSmall} alt='round shaped white small' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PayLater;
