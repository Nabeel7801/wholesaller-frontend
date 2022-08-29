import * as React from 'react';
import { Datagrid, TextField , List } from 'react-admin';
import { useMediaQuery } from '@mui/material';

import MobileGrid from './MobileGrid';
import ZipcodesField from './ZipcodesField';


const WarehouseList = () => {
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
                    <TextField label="Warehouse" source="identity" sx={{fontWeight: 'bold', color: '#555'}}/>

                    <TextField label="Manager" source="name"/>

                    <TextField label="Username" source="username"/>

                    <ZipcodesField label="Zipcodes"/>
                    
                </Datagrid>
            )}
        </List>
    );
};

export default WarehouseList;
