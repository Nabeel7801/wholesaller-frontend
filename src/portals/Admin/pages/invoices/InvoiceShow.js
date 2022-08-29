import * as React from 'react';

import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { ReferenceField, TextField, useRecordContext } from 'react-admin';

import Basket from './Basket';
import WholeSallerLogo from '../../../assets/img/wholesaller.jpg'
import Totals from './Totals';
import StatusField from './StatusField'

const InvoiceShow = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
            <CardContent>

                <Grid container spacing={2}>
                    <Grid container item xs={8}>
                        
                        <Grid item>
                            <img 
                                width={120}
                                src={WholeSallerLogo} 
                                alt="WholeSaller" 
                            />
                        </Grid>

                        <Grid item 
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                paddingLeft: '20px'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                <ReferenceField
                                    reference="customers"
                                    source="customer_id"
                                    link={false}
                                >
                                    <CustomerField />
                                </ReferenceField>
                            </Typography>
                        </Grid>
                        
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom align="right">
                            {record.reference}
                        </Typography>
                        <Button />
                    </Grid>
                </Grid>

                <Box height={20}>&nbsp;</Box>
                
                <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom align="center">
                            Order
                        </Typography>

                        <ReferenceField source="order_id" reference="orders">
                            <TextField
                                source="reference"
                                align="center"
                                component="p"
                                gutterBottom
                                sx={{fontSize: '1em', fontWeight: '500'}}
                            />
                        </ReferenceField>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom align="center">
                            Date
                        </Typography>
                        <Typography gutterBottom align="center">
                            {new Date(record.date).toLocaleDateString()}
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom align="center">
                            Status
                        </Typography>

                        <StatusField gutterBottom source="status" align="center" />

                    </Grid>

                </Grid>

                <Box margin="10px 0">
                    <ReferenceField
                        reference="orders"
                        source="order_id"
                        link={false}
                    >
                        <Basket />
                        
                    </ReferenceField>
                    
                    <Totals />
                </Box>


            </CardContent>
        </Card>
    );
};

const CustomerField = () => {
    const record = useRecordContext();
    return record ? (
        <Typography sx={{display: 'inline'}}>
            <b>{record.first_name} {record.last_name}</b>
            <br />
            {record.address}
            <br />
            {record.city}, {record.zipcode}
        </Typography>
    ) : null;
};

export default InvoiceShow;
