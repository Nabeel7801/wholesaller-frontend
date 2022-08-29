import * as React from 'react';
import { ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useReference } from 'react-admin';

export const PendingOrder = props => {
    const { order } = props;
    
    const { referenceRecord: customer } = useReference({
        reference: 'customers',
        id: order.customer_id,
    });

    return (
        <ListItem button component={Link} to={`/orders/${order.id}`}>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>

            <ListItemText
                primary={new Date(order.date).toLocaleString('en-GB')}
                secondary= {customer && `by ${customer.first_name} ${customer.last_name}, ${order.basket.length}
                        ${order.basket.length === 1 ? " item" : " items"} `}
            />
            
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    ₹ {order.total}
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
