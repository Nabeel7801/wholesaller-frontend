import * as React from 'react';
import { Datagrid, TextField , List } from 'react-admin';
import { useMediaQuery } from '@mui/material';

import MobileGrid from './MobileGrid';
import StatusField from './StatusField'
import FullNameField from '../../components/FullNameField'
import CompanyField from '../../components/CompanyField'

const UserList = () => {
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );
    
    return (
        <List
            filters={[]}
            sort={{ field: '_id', order: 'ASC' }}
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
                    <CompanyField label="Company" />

                    <FullNameField label="Name"/>

                    <TextField label="Email" source="email"/>

                    <TextField label="Phone" source="phone"/>

                    <StatusField label="Status" source="status" />
                </Datagrid>
            )}
        </List>
    );
};

export default UserList;
