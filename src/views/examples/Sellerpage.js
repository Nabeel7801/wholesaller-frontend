import React, { useState, useEffect } from 'react';

import MainNavbar from 'components/Navbars/MainNavbar';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SellerCard from 'components/Card/SellerCard';

import { useParams } from 'react-router-dom';

import { useQuery } from 'react-query';

import userServices from '../services/httpService/userAuth/userServices';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),

    maxWidth: '100%',
  },
}));

function Sellerpage() {
  const params = useParams();
  const classes = useStyles();

  const [profieldata, setprofieldata] = useState([]);

  const { isLoading, error, data } = useQuery(
    'ordersData',
    () => userServices.commonGetService(`/api/fetchsellerimage/${params.id}`),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        /////seterrorMsg(ErrorService.uniformError(error));
      },
      onSuccess: (data) => {
        //////  setorderList(data.data);
        /////   console.log(data);
        setprofieldata(data.data);
      },
    }
  );

  return (
    <div>
      {localStorage.getItem('wholesaller') != null ? (
        <>
          <MainNavbar />
        </>
      ) : (
        <IndexNavbar />
      )}
      <br />

      {profieldata != '' ? (
        <>
          <Container maxWidth='lg'>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item lg={4} md={4} xs={12} sm={12}>
                  <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item lg={12} md={12} xs={12} sm={12}>
                        <div className='flex grid justify-items-center items-center justify-center'>
                          <img
                            src={profieldata[0].users.profileImg}
                            class='w-40 h-40 rounded-full'
                          />

                          <div className='text-styl mt-2 '>
                            {profieldata[0].seller.businessname}
                          </div>
                          <div className='text-sm text-black font-semibold my-2'>
                            {profieldata[0].seller.businesstype}
                          </div>
                          {/* <Typography
                        variant='caption'
                        display='block'
                        gutterBottom
                      >
                        City
                      </Typography> */}
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item lg={8} md={8} xs={12} sm={12}>
                  <SellerCard allproduct={profieldata} />
                </Grid>
              </Grid>
              <br />
            </div>
          </Container>
        </>
      ) : null}
    </div>
  );
}

export default Sellerpage;
