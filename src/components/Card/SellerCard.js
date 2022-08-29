import React, { useState, useEffect } from 'react';

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import history from 'views/history';

import Paper from '@material-ui/core/Paper';

function SellerCard(props) {
  const config = require('views/config');

  return (
    <div>
      <Paper elevation={0}>
        <Grid container>
          {props.allproduct.map((s, i) => (
            <>
              <Grid item lg={3} md={3} sm={5} xs={6}>
                <div class='rounded-md  overflow-hidden w-52'>
                  <a onClick={() => history.push('/productdetail/' + s._id)}>
                    <img
                      src={
                        config.servername +
                        '/readfiles/' +
                        s.maindetails.mainimage
                      }
                      class='flex items-end justify-end h-56 w-full  bg-cover bg-center hoverzoom'
                    />
                  </a>
                  <div class='px-3 py-3'>
                    <h5 class='text-black-700 font-semibold subpixel-antialiased truncate '>
                      {s.maindetails.title}
                    </h5>

                    {/* <a onClick={() => history.push('/sellerpage')}>
                      <Avatar
                        alt='Remy Sharp'
                        src='/static/images/avatar/1.jpg'
                        className={classes.small}
                      />
                      <span class='sellername-card subpixel-antialiased truncate text-sm'>
                        {s.users.firstName}
                      </span>
                    </a> */}
                    <span class='text-black font-semibold mt-2'>
                      ₹{s.maindetails.pricetodisplay} per pc
                    </span>
                    {/* <span class="text-red-500 font-semibold line-through float-right">{s.mrp}</span> */}
                    <div>{s.maindetails.moqprice + ' '}Piece (Min. Order)</div>
                    <br />
                  </div>
                </div>
              </Grid>
              {/* <Divider orientation="vertical" flexItem /> */}
            </>
          ))}

          <Divider />
        </Grid>
      </Paper>
    </div>
  );
}

export default SellerCard;
