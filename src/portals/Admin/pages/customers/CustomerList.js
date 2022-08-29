import * as React from 'react';
import { Datagrid, DateField, DateInput, EmailField, List, NullableBooleanInput, NumberField, SearchInput } from 'react-admin';
import { useMediaQuery } from '@mui/material';

import FullNameField from '../../components/FullNameField';
import ColoredNumberField from './ColoredNumberField';
import MobileGrid from './MobileGrid';

const visitorFilters = [
    <SearchInput source="q" alwaysOn />,
    <DateInput source="last_seen_gte" />,
    <NullableBooleanInput source="has_ordered" />,
    <NullableBooleanInput source="has_newsletter" defaultValue />
];

const CustomerList = () => {
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
    return (
        <List
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={25}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <Datagrid
                    optimized
                    rowClick="edit"
                    sx={{
                        '& .column-groups': {
                            md: { display: 'none' },
                            lg: { display: 'table-cell' },
                        },
                    }}
                >
                    <FullNameField label="Customer"/>

                    <EmailField source="email" />
                    
                    <NumberField
                        source="no_of_orders"
                        label="Orders"
                        sx={{ color: 'purple' }}
                    />
                    
                    <ColoredNumberField
                        source="total_spent"
                        options={{ style: 'currency', currency: 'INR' }}
                    />

                    <DateField source="latest_purchase" showTime />
                    
                </Datagrid>
            )}
        </List>
    );
};

export default CustomerList;
