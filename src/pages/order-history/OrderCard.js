import Media from 'react-media';
import { DateTime } from 'luxon';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button, Chip as ChipMUI } from "@material-ui/core";
import { LocalMall, AlarmOn, QueryBuilder, CancelOutlined, CheckCircleOutlined } from '@material-ui/icons';

function Chip({ label, style={} }) {
    const text = label.length > 0 ? label[0].toUpperCase() + label.slice(1) : "";
    const deliveredStyle = { backgroundColor: 'green', color: '#fff' };
    const dispatchedStyle = { backgroundColor: '#ffae42', color: '#fff' };

    const getAvatar = () => {
        const styles = { color: "#fff" }
        switch (label) {
            case 'pending':
                return <QueryBuilder style={styles} />;

            case 'dispatched':
                return <AlarmOn style={styles} />;

            case 'delivered':
                return <CheckCircleOutlined style={styles} />;

            case 'cancelled':
                return <CancelOutlined style={styles} />;

            default:
                return <QueryBuilder style={styles} />;
        }
    }

    return (
        <ChipMUI 
            style={{ ...label === 'delivered' ? deliveredStyle : label === 'dispatched' ? dispatchedStyle : {}, padding: "3px 7px", marginBottom: "5px", fontWeight: 700, ...style }}
            label={text}
            avatar={getAvatar()}
        />
    )
}

function OrderCard(props) {
    const { card, reorderHandler, cancelOrder } = props;
    const maxItems = 2;
  
    return (    
        <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
        }}>
            {matches => (
                <Box key={card._id} p={2} sx={{ marginTop: '20px', boxShadow: "0px 3px 8px 0px rgba(150,150,150,0.5)" }}>
                    
                    
                    {matches.small && <Chip label={card.status} />}
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

                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant={matches.small ? "body1" : "h6"} style={{ fontWeight: 700 }} color="primary">
                                <NumericFormat value={(card.total || 0).toFixed(2)} displayType="text" thousandSeparator prefix="₹" />
                            </Typography>

                            {(matches.medium || matches.large) && 
                                <Chip label={card.status} style={{ marginTop: "20px" }}
                            />}
                        </Grid>
                    </Grid>

                    <Button onClick={() => reorderHandler(card.basket)} color="primary" variant="contained" style={{ marginTop: '10px', borderRadius: '4px' }}>
                        <LocalMall /> &nbsp;&nbsp;Reorder
                    </Button>

                    {cancelOrder && card.status === 'pending' &&
                        <Button onClick={() => cancelOrder(card.id)} color="secondary" variant="outlined" style={{ marginTop: '10px', marginLeft: '10px', borderRadius: '4px' }}>
                            Cancel
                        </Button>
                    }

                </Box>
            )}
        </Media>
    );
}
  
OrderCard.propTypes = {
    card: PropTypes.object.isRequired,
    reorderHandler: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func
};
  
export default OrderCard;