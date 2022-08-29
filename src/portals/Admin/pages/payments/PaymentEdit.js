import React from 'react';

import { Box, Card, CardContent, Grid, Typography, Button } from '@mui/material';
import { EditBase, ReferenceField, NumberField, useRecordContext } from 'react-admin';

import WholeSallerLogo from '../../../assets/img/wholesaller.jpg'

const InvoiceTitle = () => {
    const record = useRecordContext();
    console.log(record)
    return record ? (
        <span>
            {record.reference}
        </span>
    ) : null;
};

const PaymentEdit = () => {

    return (
        <EditBase title={<InvoiceTitle />}>
            <br />
            <PaymentShow />
            <br />
        </EditBase>
    )
};

const PaymentShow = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Card sx={{ padding: '0 10px', maxWidth: 500, width: '90%', margin: 'auto' }}>
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
                <hr />
                <Box height={20}>&nbsp;</Box>

                <Typography variant="h6" gutterBottom align="center">
                    Payment Receipt
                </Typography>

                <Box margin="30px 0 10px 0">
                    <Grid container spacing={2}>
                        <Grid item xs={5} sm={4} sx={{
                            '& .MuiTypography-root': {
                                padding: '10px 0'
                            }
                        }}>
                            <Typography variant="body1">Payment Date</Typography>
                            <Typography variant="body1">Reference Number</Typography>
                            <Typography variant="body1">Payment Mode</Typography>
                            <Typography variant="body1">Payment Type</Typography>
                        </Grid>

                        <Grid item xs={7} sm={8} sx={{
                            '& .MuiTypography-root': {
                                padding: '10px 0',
                                fontWeight: '600'
                            }
                        }}>
                            <Typography variant="body1">{record.date}</Typography>
                            <Typography variant="body1">{record.reference_number}</Typography>
                            <Typography variant="body1">{record.payment_mode}</Typography>
                            <Typography variant="body1">{record.type}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{
                                backgroundColor: '#78AE54',
                                color: '#fff',
                                padding: '40px'
                            }}>
                                <Typography variant="body1" align="center">Amount Received</Typography>
                                <Typography variant="h6" align="center">
                                    <NumberField
                                        source="amount"
                                        options={{
                                            style: 'currency',
                                            currency: 'INR',
                                        }}
                                        sx={{fontSize: '1.0em', fontWeight: '600'}}
                                    />
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
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


export default React.memo(PaymentEdit);
