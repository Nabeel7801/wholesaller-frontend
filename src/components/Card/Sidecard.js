import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 380,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
  }));

function Sidecard() {
    const classes = useStyles();
    const tileData = [
        {
          img: 'https://image.freepik.com/free-vector/3d-elegant-promotion-banner-promote-your-business-offer_127609-95.jpg',
          title: 'Super',
          author: 'jill111',
          cols: 2,
          featured: true,
        },
        {
          img: 'https://image.freepik.com/free-photo/curious-well-dressed-woman-thinking-about-something-with-smile_197531-12635.jpg',
          title: 'Deal',
          author: 'jill111',
          cols: 2,
          featured: true,
        },
        {
          img: 'https://image.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg',
          title: 'New',
          author: 'jill111',
          cols: 2,
          featured: true,
        },
      ];
      

    return (
        <div>
            <div className={classes.root}>
      <GridList cellHeight={120} spacing={1} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
        </div>
    )
}

export default Sidecard
