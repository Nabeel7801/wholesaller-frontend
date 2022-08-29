import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRecordContext, EditBase, useDataProvider, ReferenceField, NumberField, DateField, TextField, RecordContextProvider } from 'react-admin';
import { Typography, Card, CardContent, Box, Button, Grid, Badge, Collapse } from '@mui/material';

import InvoiceShow from './InvoiceShow';
import CustomerReferenceField from '../../components/CustomerReferenceField'


const InvoiceTitle = () => {
    const record = useRecordContext();
    return record ? (
        <span>
            {record.reference}
        </span>
    ) : null;
};

const InvoiceEdit = () => {

    return (
        <EditBase title={<InvoiceTitle />}>

            <Grid container sx={{padding: '10px 0'}} spacing={1}>

                <Grid item xs={12} md={4} lg={5}>
                    <Aside />
                </Grid>

                <Grid item xs={12} md={8} lg={7}>
                    <InvoiceShow />
                </Grid>

            </Grid>
        </EditBase>
    )
};

const Aside = () => {

    const record = useRecordContext();
    return (
        record &&
            <Box sx={{ maxWidth: 600, margin: 'auto' }}>
                {record.status !== 'paid' && <><MakePayment /><br/></> }
                <ShowPayments />
            </Box>
    )

}

const MakePayment = () => {
    const record = useRecordContext();
    const navigate = useNavigate();

    return (
        <Card>

            <CardContent >
                
                <Typography 
                    sx={{ fontSize: '1.0em', fontWeight: '600', display: 'flex', alignItems: 'center' }}
                    gutterBottom
                >
                    <MonetizationOnIcon sx={{ fontSize: '1.5em', marginTop: '-2px' }}/> 
                    &nbsp;Record payment for the invoice
                </Typography>
                
                <Typography variant="p" sx={{ fontSize: '0.8em'}}>
                    If you’ve received a partial or full payment from your customer towards this invoice,you can record it.
                </Typography>
                
                <Box sx={{ margin: '20px 0 auto auto', display: 'flex', justifyContent: 'flex-end'}}>
                    <Button 
                        size="small" 
                        variant="contained"
                        onClick={() => navigate({
                            pathname: '/payments/create',
                            search: `?invoice_id=${record.id}`
                        })}
                    >
                        Record Payment
                    </Button>
                </Box>

            </CardContent>

        </Card>
    )
}

const ShowPayments = () => {
    const dataProvider = useDataProvider();
    const record = useRecordContext();

    const [expanded, setExpanded] = useState(false)
    const [payments, setPayments] = useState([])
    
    useEffect(() => {
        dataProvider.getList('payments', { 
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'reference', order: 'DESC' },
            filter: { invoice_id: record.id}
        })
        .then(({ data }) => setPayments(data))
        .catch(error => console.log(error))
    }, [dataProvider, record.id])

    if (payments.length === 0) return

    return (
        <Card sx={{ borderRadius: '5px' }}>
            <Box 
                sx={{ 
                    padding: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                }}
                onClick={() => setExpanded(prev => !prev)}
            >
                <Typography variant="h6" sx={{fontSize: '1em'}}>
                    Payments Received 
                    <Badge badgeContent={payments.length} color="primary" 
                        sx = {{
                            '& .MuiBadge-badge': {
                                left: '0px',
                                top: '-1px',
                                borderRadius: '5px',
                                backgroundColor: 'rgba(40, 53, 147, 0.8);',
                                fontWeight: 'bold'
                            },
                        }}
                    />
                </Typography>
                {expanded ? <ExpandMoreIcon sx={{fontSize: '1.3em'}} /> : <ChevronRightIcon sx={{fontSize: '1.3em'}} />}
            </Box>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent >
                    {payments.map((payment, key) => 
                        <RecordContextProvider key={key} value={payment}>
                            <Card sx={{ margin: '0.5rem 0' }}>
        
                                <CardContent sx={{ maxWidth: '400px', margin: 'auto' }}>
                                    <Grid container>
                                        <Grid item xs={8}>
                                            <CustomerReferenceField link={false} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Typography variant="body1" gutterBottom align="right">
                                                <NumberField
                                                    source="amount"
                                                    options={{
                                                        style: 'currency',
                                                        currency: 'INR',
                                                    }}
                                                    sx={{ fontWeight: 'bold' }}
                                                />
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={8} sm={6}>
                                            <Typography variant="caption" gutterBottom>
                                                <DateField source="date" /> | <TextField source="reference" />
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4} sm={6}>
                                            <Typography variant="body1" gutterBottom align="right">
                                                <TextField source="payment_mode" />
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={5}>
                                            <Typography variant="body1" gutterBottom>
                                                <ReferenceField source="invoice_id" reference="invoices" link={false}>
                                                    <TextField source="reference" />
                                                </ReferenceField>
                                                    
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <Typography variant="body1" gutterBottom align="right">
                                                <TextField source="type" />
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </RecordContextProvider>
                    )}
                </CardContent>
            </Collapse>

        </Card>
    )
}

export default React.memo(InvoiceEdit);
