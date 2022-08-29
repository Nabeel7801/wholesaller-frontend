import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { Create, SimpleForm, DateInput, TextInput, NumberInput, AutocompleteInput, ReferenceInput, useDataProvider } from 'react-admin';
import { InputAdornment, Box, Grid, Typography } from '@mui/material';
import { useWatch, useFormContext } from 'react-hook-form';

const PaymentCreate = () => {
    const invoice_id = new URLSearchParams(useLocation().search).get('invoice_id');
    const dataProvider = useDataProvider();
    const navigate = useNavigate();

    const [invoiceData, setInvoiceData] = useState(undefined)

    useEffect(() => {
        if (invoice_id) {
            dataProvider.getOne('invoices', { id: invoice_id })
            .then(({ data }) => setInvoiceData(data))
            .catch(error => console.log(error))
        }
    }, [invoice_id, dataProvider])

    const handleSubmit = (data) => {
        dataProvider.create('payments', { data: data })
        .then(() => {
            const diff = data.payable_amount - data.amount;

            const updatedObj = {
                balance_due: diff,
                status: diff === 0 ? "paid" : "unpaid",
            }

            dataProvider.update('invoices', { id: data.invoice_id, data: updatedObj })
            .then(() => navigate('/payments'))
            .catch(error => console.log(error))

        })
        .catch(error => console.log(error))
    }

    return (
        <Create 
            title={
                <Typography variant='body1'>
                    {invoiceData ? `Payment for ${invoiceData.reference}` : "Add Payment"}
                </Typography>
            }
        >
            <SimpleForm
                sx={{ maxWidth: 500 }}
                defaultValues={{
                    date: getCurrentDate(),
                    bank_charges: 0,
                    payment_mode: "Cash",
                    deposited_to: "Axis Bank Ltd",
                }}
                onSubmit={handleSubmit}
            >   

                <FormComponent 
                    invoiceData = {invoiceData}
                />
                
            </SimpleForm>
        </Create>
    );
}

const FormComponent = ({ invoiceData }) => {

    const dataProvider = useDataProvider();
    const { setValue } = useFormContext();

    useEffect(() => {
        if (invoiceData) {
            setValue('invoice_id', invoiceData.id);
        }
    }, [invoiceData, setValue])

    let invoice_id = useWatch({ name: 'invoice_id' });
    useEffect(() => {
        if (invoice_id) {

            dataProvider.getOne('invoices', { id: invoice_id })
            .then(({ data }) => {
                if (data) {
                    setValue('customer_id', data.customer_id);
                    setValue('payable_amount', data.balance_due);
                    setValue('amount', data.balance_due);
                }  
            })
            .catch(error => console.log(error))
        }
    }, [invoice_id, dataProvider, setValue])

    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={8}>
                    <ReferenceInput label="Select Customer" source="customer_id" reference="customers" >
                        <AutocompleteInput 
                            optionText = {cust => cust.first_name + " " + cust.last_name} 
                            isRequired 
                            fullWidth 
                            disabled = {typeof invoiceData !== "undefined"}
                        />
                    </ReferenceInput>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InvoiceInput 
                        disabled={typeof invoiceData !== "undefined"} 
                    />
                </Grid>

            </Grid>

            <DateInput source="date" isRequired fullWidth />

            <Box 
                sx={{
                    padding: '10px 5%',
                    width: '90%',
                    borderLeft: '2px solid green',
                    margin: 'auto',
                    marginBottom: '10px'
                }}
            >
                <Typography variant="h6" sx={{paddingBottom: '10px'}}>
                    Receive Payment
                </Typography>
                
                <NumberInput
                    source="amount"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                        ),
                    }}
                    isRequired fullWidth
                />
                <NumberInput
                    source="bank_charges"
                    label="Bank charges (if any)"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                        ),
                    }}
                    fullWidth
                />
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <AutocompleteInput 
                            fullWidth 
                            choices={paymentModes}
                            source="payment_mode"
                            label="Payment Mode"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AutocompleteInput 
                            isRequired fullWidth 
                            choices={depositTo}
                            source="deposited_to"
                        />
                    </Grid>
                </Grid>

            </Box>

            <TextInput type="text" source="reference_number" fullWidth />

            <TextInput type="text" source="notes" multiline fullWidth />
        </>
    )
}

const InvoiceInput = (props) => {

    let customer_id = useWatch({ name: 'customer_id' });
    if (!customer_id) {
        customer_id = "none"
    }
    return (
        <ReferenceInput 
            source="invoice_id"
            reference="invoices" 
            label="Invoice"
            filter={{customer_id: customer_id, status: 'unpaid'}}
        >
            <AutocompleteInput isRequired optionText="reference" fullWidth {... props}/>
        </ReferenceInput>
    )
}

const getCurrentDate = () => {
    const date = new Date();
    const dd = ("00" + date.getDate()).slice(-2);
    const mm = ("00" + String(parseInt(date.getMonth())+1)).slice(-2);
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

const paymentModes = [
    {id: "Bank Remittance", name: "Bank Remittance"},
    {id: "Bank Transfer", name: "Bank Transfer"},
    {id: "Bharatpay QR", name: "Bharatpay QR"},
    {id: "Bharatpay QR + Cash", name: "Bharatpay QR + Cash"},
    {id: "Cash", name: "Cash"},
    {id: "Check", name: "Check"},
    {id: "Credit Card", name: "Credit Card"},
    {id: "Paysharp", name: "Paysharp"},
    {id: "Paytm QR", name: "Paytm QR"},
]

const depositTo = [
    {id: "Petty Cash", name: "Petty Cash"},
    {id: "Undeposited Funds", name: "Undeposited Funds"},
    {id: "Axis Bank Ltd", name: "Axis Bank Ltd"},
    {id: "Bharat Pay", name: "Bharat Pay"},
    {id: "Employee Reimbrusement", name: "Employee Reimbrusement"},
    {id: "Opening Balance Adjustments", name: "Opening Balance Adjustments"},
    {id: "TCS Payable", name: "TCS Payable"},
    {id: "Razorpay Clearing", name: "Razorpay Clearing"},
]

export default React.memo(PaymentCreate);
