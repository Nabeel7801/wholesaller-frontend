import React from 'react';
import styles from './Media.module.css';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import logo1 from '../../img/media/1.jpeg';
import logo2 from '../../img/media/2.png';
import logo3 from '../../img/media/3.png';
import logo4 from '../../img/media/4.jpg';
import logo5 from '../../img/media/5.jpeg';
import logo6 from '../../img/media/6.png';

// animation library
import Flip from 'react-reveal/Flip';


const mediaData = [
  {
    img: logo6,
    link: 'https://yourstory.com/mystory/noida-based-wholesallercom-transforming-b2b2-indian-retail-ecommerce/amp',
  },
  {
    img: logo2,
    link: 'https://m.dailyhunt.in/news/nepal/english/yourstory-epaper-yourstory/how+noida+based+wholesaller+com+is+transforming+b2b+indian+retail+ecommerce-newsid-n187940218',
  },
  {
    img: logo3,
    link: 'https://saastras.com/wholesaller-a-b2b-marketplace/',
  },
  {
    img: logo4,
    link: 'https://www.youtube.com/watch?v=uVxEj8KSho0⦁	&⦁	t=13s ',
  },
  {
    img: logo5,
    link: 'https://www.youtube.com/watch?v=zvO3_8oss7Y⦁	&⦁	t=239s',
  },
  {
    img: logo1,
    link: 'https://pitchbook.com/profiles/company/366539-05#overview',
  },
];
const Media = () => {
  return (
    <Box className={styles.media}>
      <Box className='container-spacing'>
        <Container maxWidth='lg'>
          <p className='color-primary_LP small_LP semi-bold_LP uppercase text-center'>
            press
          </p>
          <Box mt={2}mb={{ xs: 4, sm: 8 }}>
            <h4 className={'text-primary_LP h4 bold_LP'}>Company in media</h4>
          </Box>
          <Grid container justifyContent='center' spacing={4}>
            {mediaData.map((media) => (
              <Grid item xs={12} sm={6} md={4} key={media.link}>
                <Flip left>
                  <Paper className={styles.mediaData} elevation={2}>
                    <a href={media.link} target='_blank' rel='noreferrer'>
                      <img className={styles.logo} src={media.img} alt='logo' />
                    </a>
                  </Paper>
                </Flip>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Media;
