import * as React from 'react';
import { List, Datagrid, TextField, DateField, ReferenceField, NumberField, DateInput } from 'react-admin';
import { useMediaQuery } from '@mui/material';

import FullNameField from '../../components/FullNameField';
import MobileGrid from './MobileGrid';

const listFilters = [
    <DateInput source="date_gte" label="Passed Since" alwaysOn />,
    <DateInput source="date_lte" label="Passed Before" alwaysOn />,
];

const PaymentList = () => {
    
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );

    return (
        <List
            filters={listFilters}
            perPage={25}
            sort={{ field: 'date', order: 'desc' }}
        >

            {isXSmall ? 
                
                <MobileGrid />
                
                :
                <Datagrid optimized rowClick="edit" >
                    <DateField source="date" locales="fr-FR" />
                    <TextField source="reference" label="Payment #"/>

                    <ReferenceField 
                        source="customer_id" 
                        reference="customers"
                        link={false}
                    >
                        <FullNameField />
                    </ReferenceField>

                    <TextField source="reference_number" label="Reference"/>
                    
                    <ReferenceField 
                        source="invoice_id" 
                        reference="invoices"
                        label="Invoice"
                        link={false}
                    >
                        <TextField source="reference"/>
                    </ReferenceField>

                    <TextField source="payment_mode" />

                    <NumberField
                        source="amount"
                        options={{
                            style: 'currency',
                            currency: 'INR',
                        }}
                        sx={{ fontWeight: 'bold' }}
                    />

                </Datagrid>
            }
        </List>
    );
};

export default PaymentList;
