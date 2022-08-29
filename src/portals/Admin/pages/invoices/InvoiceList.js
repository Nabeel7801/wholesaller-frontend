import * as React from 'react';
import { List, Datagrid, TextField, DateField, ReferenceField, NumberField, DateInput, SelectInput } from 'react-admin';
import { useMediaQuery } from '@mui/material';

import FullNameField from '../../components/FullNameField';
import MobileGrid from './MobileGrid';
import StatusField from './StatusField'

const listFilters = [
    <SelectInput 
        source="status" 
        choices={[
            { id: 'paid', name: 'paid' },
            { id: 'unpaid', name: 'unpaid' },
            { id: 'overdue', name: 'overdue' },
        ]}
    />,
    <DateInput source="date_gte" label="Passed Since" alwaysOn />,
    <DateInput source="date_lte" label="Passed Before" alwaysOn />,
];

const InvoiceList = () => {
    
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
                    <TextField source="reference" />

                    <ReferenceField 
                        source="customer_id" 
                        reference="customers"
                        link={false}
                    >
                        <FullNameField />
                    </ReferenceField>

                    <StatusField source="status" />
                    <DateField source="due_date" locales="fr-FR" />

                    <NumberField
                        source="amount"
                        options={{
                            style: 'currency',
                            currency: 'INR',
                        }}
                        sx={{ fontWeight: 'bold' }}
                    />

                    <NumberField
                        source="balance_due"
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

export default InvoiceList;
