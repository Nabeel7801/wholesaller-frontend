import Media from 'react-media';
import { DateTime } from 'luxon';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid, Button, Chip as ChipMUI } from "@material-ui/core";
import { LocalMall } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    flagBox: {
        position: "relative",
        width: "100%"
    },
    flag: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '5px 20px',
        backgroundColor: 'green',
        color: '#fff',
    },
    delivered: {
    },
    cancelled: {
        backgroundColor: 'red',
        color: '#fff',
    }
}));
  
function Chip({label}) {
    const text = label.length > 0 ? label[0].toUpperCase() + label.slice(1) : "";
    const deliveredStyle = { backgroundColor: 'green', color: '#fff' };
    return (
        <ChipMUI 
            style={{ ...label === 'delivered' ? deliveredStyle : {}, padding: "3px 7px", marginTop: "20px" }}
            label={text}
        />
    )
}

function OrderCard(props) {
    const { card, reorderHandler } = props;
    const maxItems = 2;
  
    const classes = useStyles();  

    return (    
        <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
        }}>
            {matches => (
                <Box key={card._id} p={2} sx={{ marginTop: '20px', boxShadow: "0px 3px 8px 0px rgba(150,150,150,0.5)" }}>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography variant={matches.small ? 'h6' : 'h5'} style={{textTransform: 'none'}}>
                                Order Id: {card.reference}
                            </Typography>

                            <Typography variant="body2">
                                {DateTime.fromISO(card.date).toFormat('MMMM dd, yyyy  hh:mma')}
                            </Typography>
                        
                            <Typography style={{marginTop: '10px'}} variant="body2" color="textSecondary">
                                {card.basket
                                    ?.slice(0, maxItems)
                                    .map((item, key) => <div key={key}>{item.reference}</div>)
                                }
                                {card.basket.length > maxItems && <b>{card.basket.length - maxItems} more item{card.basket.length - maxItems > 1 ? "s" : ""}...</b>}
                            </Typography>

                            <Button onClick={() => reorderHandler(card.basket)} color="primary" style={{ padding: '5px 2em', marginTop: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                <LocalMall /> &nbsp;&nbsp;Reorder
                            </Button>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="body1" className="text-bold" color="primary">
                                <NumericFormat value={(card.total || 0).toFixed(2)} displayType="text" thousandSeparator prefix="₹" />
                            </Typography>

                            <Chip label={card.status} />
                        </Grid>
                    </Grid>

                </Box>
            )}
        </Media>
    );
}
  
OrderCard.propTypes = {
    card: PropTypes.object.isRequired,
    reorderHandler: PropTypes.func.isRequired
};
  
export default OrderCard;