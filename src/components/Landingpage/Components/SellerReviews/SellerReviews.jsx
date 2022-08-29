import React from 'react';
import styles from './SellerReviews.module.css';
import { Box, Container, Grid } from '@material-ui/core';
// images
import review1 from '../../img/reviews/review_1.webp';
import review2 from '../../img/reviews/review_2.webp';
import review3 from '../../img/reviews/review_3.webp';
import review4 from '../../img/reviews/review_4.jpeg';
// animation library
import Fade from 'react-reveal/Fade';

const reviewsData = [
  {
    img: review1,
    reviewer: 'Brilco ,Noida',
    review:
      'We have a small manufacturing unit in Gandhi nagar, Delhi. in pendamic our shop was closed ,due to wholesaller app we never stop getting order',
  },
  {
    img: review2,
    reviewer: 'Singh creation, Delhi',
    review:
      'In every month we are getting good orders from different cities of India even we don’t know physically to any retailers but they are order from whlesaller app',
  },
  {
    img: review3,
    reviewer: 'Sri Basveswara rice trader, Bangalore',
    review:
      'Previosly we only depend on offline buyers now we double our sales due to wholesaller app',
  },
  {
    img: review4,
    reviewer: 'Smile ssg Group ,Mumbai',
    review:
      'We are running a small garment manufacturing unit with 10+ women members in Mumbai, pandemic never stopped our business due to wholesaller..offline nehi to online with wholesaller',
  },
];
const SellerReviews = () => {
  return (
    <Box id='reviews' className={styles.sellerReviews + ' container-spacing'}>
      <Container maxWidth='lg'>
        <Box className={styles.headingContainer}>
          <Box mr={1} className={styles.line + ' smallLine'} />
          <p className='color-primary_LP small_LP semi-bold_LP uppercase'>
            Seller Reviews
          </p>
        </Box>
        <Box mt={2}>
          <h4 className={styles.title + ' h4 text-primary_LP bold_LP'}>
            Hear what our seller are saying
          </h4>
        </Box>
        <Grid container justifyContent='center' spacing={4}>
          {reviewsData.map((reviews) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={Math.random() * 99999999999999999999}
            >
              <Fade bottom>
                <Box mt={{ xs: 6, md: 12 }} className={styles.reviews}>
                  <Box
                    className={styles.bg}
                    style={{ backgroundImage: `url(${reviews.img})` }}
                  />
                  <Box mt={3} className={styles.textContainer}>
                    <p className='text-secondary_LP'>
                      {reviews.review}
                      <br />- <span className='bold_LP'>{reviews.reviewer}</span>
                    </p>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SellerReviews;
