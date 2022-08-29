import React from 'react';
import styles from './Hero.module.css';
import { Container, Box, Button, Grid } from '@material-ui/core';
import roundBlue from '../../img/fs-round-blue.svg';
import roundWhite from '../../img/fs-round-white.svg';

import home from '../../img/hero icons/home.webp';
import electronics from '../../img/hero icons/electronics.webp';
import food from '../../img/hero icons/food.webp';
import clothing from '../../img/hero icons/clothing.webp';
import footwear from '../../img/hero icons/footwear.webp';
import history from '../../../../../src/views/history';
import HeroSub from './HeroSub';

// animation library\
import Fade from 'react-reveal/Fade';

const Hero = () => {
  const heroData = [
    {
      img: clothing,
      title: 'Clothings',
    },
    {
      img: food,
      title: 'Food & fmcg',
    },
    {
      img: electronics,
      title: 'Electronics',
    },
    {
      img: home,
      title: 'Home & Kitchen',
    },
    {
      img: footwear,
      title: 'footwear',
    },
  ];

  return (
    <Box>
      <Box id='hero' className={styles.hero + ' widthOnMobile'}>
        <Container maxWidth='md'>
          <Box className={styles.heroContent}>
            <Box>
              <Fade bottom>
                <Box>
                  <h3 className={styles.title + ' text-primary_LP h3 bold_LP'}>
                    India's leading B2B Marketplace
                    <span className={styles.titleSub + ' h3 thin_LP'}>
                      Enabling small businesses via technology
                    </span>
                  </h3>
                </Box>
                <Box mt={8} mb={2}>
                  <Grid
                    container
                    spacing={8}
                    alignItems='baseline'
                    justifyContent='center'
                  >
                    {heroData.map((hero) => (
                      <Grid item key={hero.img}>
                        <Box className={styles.categories + ' column_LP'}>
                          <Box className={styles.categoryImage}>
                            <img
                              className={styles.image}
                              src={hero.img}
                              alt={hero.title + ' logo'}
                            />
                          </Box>
                          <p
                            className={
                              styles.categoryName + ' text-secondary_LP medium_LP'
                            }
                          >
                            {hero.title}
                          </p>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box className={styles.btnsContainer}>
                  <Grid container justifyContent='center' spacing={4}>
                    <Grid item xs={12} lg={4}>
                      <Box className={styles.btnPrimaryContainer}>
                        <Button
                          variant='contained'
                          size='large'
                          className={styles.btnPrimary}
                          fullWidth={true}
                          onClick={() => history.push('/signin')}
                        >
                          Start buying
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Box className={styles.btnSecondaryContainer}>
                        <Button
                          variant='contained'
                          size='large'
                          className={styles.btnSecondary}
                          fullWidth={true}
                          onClick={() => history.push('/signin')}
                        >
                          Start Selling
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            </Box>
          </Box>
        </Container>
        {/* round shapes on hero left side */}
        <Box className={styles.rounds}>
          <Box>
            <Box className={styles.roundBlue}>
              <img src={roundBlue} alt='round shaped blue' />
            </Box>
            <Box className={styles.roundWhite}>
              <img src={roundWhite} alt='round shaped white' />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* sub sectrion of hero  */}
      <Box>
        <HeroSub />
      </Box>
    </Box>
  );
};

export default Hero;
