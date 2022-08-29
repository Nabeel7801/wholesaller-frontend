import * as React from 'react';
import { NumberField, TextField, useGetList, RecordContextProvider, useLocaleState, useRecordContext } from 'react-admin';
import { Typography, Card, CardContent, Box, Link, Stepper, Step, StepLabel, StepContent, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import order from '../orders';
import ColoredNumberField from './ColoredNumberField'

const Aside = () => {
    const record = useRecordContext();
    return (
        <Box width={400} display={{ xs: 'none', md: 'block' }}>
            {record && <EventList />}
        </Box>
    );
};

const EventList = () => {
    const record = useRecordContext();
    const [locale] = useLocaleState();

    let { data: orders } = useGetList('orders', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'date', order: 'DESC' },
        filter: { customer_id: record.id },
    });

    orders = orders ? orders.map(obj => ({ date: obj.date, data: obj })) : [];
    orders.sort((e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime());

    record["total_spent"] = orders.reduce((total, obj) => total + obj.data.total, 0);

    return (
        <Box ml={2}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        History
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        
                        {orders && (
                            <>
                                <Grid item xs={12} display="flex" gap={1}>
                                    <order.icon fontSize="small" color="disabled" />
                                    <Typography variant="body2" flexGrow={1}>
                                        No of Orders: <b>{orders.length}</b>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} display="flex" gap={1}>
                                    <order.icon fontSize="small" color="disabled" />
                                    <Typography variant="body2" flexGrow={1}>
                                        Total Spent: &nbsp;
                                        <ColoredNumberField
                                            source="total_spent"
                                            record={record}
                                            options={{ style: 'currency', currency: 'INR' }}
                                        />
                                    </Typography>
                                    
                                    
                                </Grid>
                            </>
                        )}

                    </Grid>
                </CardContent>
            </Card>

            <Stepper orientation="vertical" sx={{ mt: 1 }}>
                {orders.map(event => (
                    <Step
                        key={event.data.id}
                        expanded
                        active
                        completed
                    >
                        <StepLabel
                            icon={
                                <order.icon
                                    color="disabled"
                                    sx={{ pl: 0.5, fontSize: '1.25rem' }}
                                />
                            }
                        >
                            <span style={{ fontWeight: '600', color: '#444' }}>
                                {new Date(event.date).toLocaleString(locale, {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </span>
                        </StepLabel>
                        <StepContent>
                            <RecordContextProvider value={event.data}>
                                <Order />
                            </RecordContextProvider>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

const Order = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <>
            <Typography variant="body2" gutterBottom>
                <Link to={`/orders/${record.id}`} component={RouterLink}>
                    Order
                    &nbsp;#{record.reference}
                </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {record.basket.length} Items
                &nbsp;-&nbsp;
                <NumberField
                    source="total"
                    options={{ style: 'currency', currency: 'USD' }}
                />
                &nbsp;-&nbsp;
                <TextField source="status" />
            </Typography>
        </>
    );
};

export default Aside;
