import * as React from 'react';
import { Card, CardHeader, Typography, List } from '@mui/material';

import { PendingOrder } from './PendingOrder';

const PendingOrders = props => {
    const { orders = [] } = props;

    return (
        <Card sx={{ flex: 1 }}>
            <CardHeader title="Pending Orders (Last 30 Days)" sx={{borderBottom: '1px solid #ddd'}} />
            {orders.length > 0 ? 
                <List dense={true}>
                    {orders.map(record => (
                        <PendingOrder key={record.id} order={record} />
                    ))}
                </List>
                :
                <List dense={true}>
                    <Typography 
                        color="textSecondary"
                        sx = {{padding: "10px 16px"}}
                    >
                        No Pending Orders
                    </Typography>
                </List>
            }
            
        </Card>
    );
};

export default PendingOrders;
