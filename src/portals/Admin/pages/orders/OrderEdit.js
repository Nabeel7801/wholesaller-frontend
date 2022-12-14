import React from 'react';
import { BooleanInput, DateField, Edit, Form, Labeled, ReferenceField, 
    TextField, Toolbar, SaveButton, useRecordContext, useNotify, useUpdate, useCreate } from 'react-admin';

import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Box, Grid, Typography, Link, Button } from '@mui/material';

import Basket from './Basket';
import Totals from './Totals';

import { Send, GppBad, AssignmentReturned } from '@mui/icons-material';

const OrderEdit = () => (
    <Edit title={<OrderTitle />} component="div">
        <OrderForm />
    </Edit>
);

const OrderTitle = () => {
    const record = useRecordContext();
    return record ? (
        <span>
            Order {record.reference}
        </span>
    ) : null;
};

const CustomerDetails = () => {
    const record = useRecordContext();
    return (
        <div>
            <Typography
                component={RouterLink}
                color="primary"
                to={`/customers/${record?.id}`}
                style={{ textDecoration: 'none' }}
            >
                {record?.first_name} {record?.last_name}
            </Typography>
            <br />
            <Typography
                component={Link}
                color="primary"
                href={`mailto:${record?.email}`}
                style={{ textDecoration: 'none' }}
            >
                {record?.email}
            </Typography>
        </div>
    );
};

const CustomerAddress = () => {
    const record = useRecordContext();
    return (
        <div>
            <Typography>
                {record?.first_name} {record?.last_name}
            </Typography>
            <Typography>{record?.address}</Typography>
            <Typography>
                {record?.city}, {record?.stateAbbr} {record?.pincode}
            </Typography>
        </div>
    );
};

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = () => {
    
    const record = useRecordContext();
    const notify = useNotify();
    
    const [createInvoiceAndDeliver, { isLoading: loadingInvoice }] = useCreate(
        'invoices',
        { data: { order: record } },
        {
            mutationMode: 'optimistic',
            onSuccess: () => {
                // Now Deliver
                deliver();

            },
            onError: () => {
                notify('Error: Order not delivered', {
                    type: 'warning',
                });
            },
        }
    );

    const [dispatch, { isLoading: loadingDispatch }] = useUpdate(
        'orders',
        { id: record.id, data: { status: 'dispatched' }, previousData: record },
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('Order Dispatched!', {
                    type: 'info',
                    undoable: true,
                });
            },
            onError: () => {
                notify('Error: Order not dispatched', {
                    type: 'warning',
                });
            },
        }
    );

    const [deliver, { isLoading: loadingDeliver }] = useUpdate(
        'orders',
        { id: record.id, data: { status: 'delivered' }, previousData: record },
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('Order Delivered!', {
                    type: 'info',
                    undoable: true,
                });
            },
            onError: () => {
                notify('Error: Order not delivered', {
                    type: 'warning',
                });
            },
        }
    );

    const [cancel, { isLoading: loadingCancel }] = useUpdate(
        'orders',
        { id: record.id, data: { status: 'cancelled' }, previousData: record },
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('Order cancelled successfully', {
                    type: 'info',
                    undoable: true,
                });
            },
            onError: () => {
                notify('Order not cancelled', {
                    type: 'warning',
                });
            },
        }
    );
    
    return (
        <Form>
            <Box maxWidth="50em">
                <Card>
                    <CardContent>
                        <Grid container spacing={1}>

                            <Grid item xs={12} sm={12} md={8}>
                                <Typography variant="h6" gutterBottom>
                                    Order
                                </Typography>

                                <Grid container>
                                    <Grid item xs={6}>
                                        <Labeled source="date">
                                            <DateField source="date" />
                                        </Labeled>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Labeled source="reference">
                                            <TextField source="reference" />
                                        </Labeled>
                                    </Grid>
                                </Grid>

                                <Grid container>

                                    <Grid item xs={6}>
                                        <Labeled source="status">
                                            <TextField source="status" />
                                        </Labeled>
                                    </Grid>

                                    <Grid item xs={6}>
                                        {record?.status === 'delivered' && 
                                            <Box mt={2}>
                                                <BooleanInput
                                                    row={true}
                                                    source="returned"
                                                />
                                            </Box>
                                        }
                                    </Grid>

                                </Grid>

                                {record?.status === 'pending' && 
                                    <>
                                        <Spacer />
                                        <Grid container>
                                            <Grid item xs={6} sm={6} md={6}>
                                                <Button 
                                                    variant="outlined"
                                                    startIcon={<GppBad />}
                                                    disabled={loadingDispatch || loadingCancel}
                                                    onClick={() => cancel()}
                                                >Cancel</Button>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6}>
                                                <Button 
                                                    variant="contained"
                                                    startIcon={<Send />}
                                                    disabled={loadingDispatch || loadingCancel}
                                                    onClick={() => dispatch()}
                                                >Dispatch</Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                }

                                {record?.status === 'dispatched' && 
                                    <>
                                        <Spacer />
                                        <Grid container>
                                            <Grid item xs={6} sm={6} md={6}>
                                                <Button 
                                                    variant="outlined"
                                                    startIcon={<AssignmentReturned />}
                                                    disabled={loadingDeliver || loadingCancel || loadingInvoice}
                                                    onClick={() => cancel()}
                                                >Returned</Button>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6}>
                                                <Button 
                                                    variant="contained"
                                                    endIcon={<Send />}
                                                    disabled={loadingDeliver || loadingCancel || loadingInvoice}
                                                    onClick={() => createInvoiceAndDeliver()}
                                                >Deliver</Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                }

                            </Grid>

                            <Grid item xs={12} sm={12} md={4}>
                                <Typography variant="h6" gutterBottom>
                                    Customer
                                </Typography>

                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                >
                                    <CustomerDetails />
                                </ReferenceField>
                                <Spacer />

                                <Typography variant="h6" gutterBottom>
                                    Shipping Address
                                </Typography>
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                >
                                    <CustomerAddress />
                                </ReferenceField>
                            </Grid>

                        </Grid>

                        <Spacer />

                        <Typography variant="h6" gutterBottom>
                            Items
                        </Typography>

                        <div>
                            <Basket />
                        </div>

                        <Spacer />

                        <Typography variant="h6" gutterBottom>
                            Totals
                        </Typography>

                        <div>
                            <Totals />
                        </div>

                    </CardContent>

                    <Toolbar>
                        <SaveButton label="Save" />
                    </Toolbar>

                </Card>
            </Box>
        </Form>
    );
};

export default React.memo(OrderEdit);
