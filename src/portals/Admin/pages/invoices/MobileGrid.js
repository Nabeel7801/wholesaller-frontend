// in src/comments.js
import * as React from 'react';
import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { DateField, EditButton, NumberField, TextField, useListContext, RecordContextProvider } from 'react-admin';

import CustomerReferenceField from '../../components/CustomerReferenceField';
import StatusField from './StatusField';


const MobileGrid = () => {
    const { data, isLoading } = useListContext();
    if (isLoading || data.length === 0) {
        return null;
    }
    return (
        <Box margin="0.5em">
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <Card sx={{ margin: '0.5rem 0' }}>
                        
                        <CardHeader
                            title={
                                <CustomerReferenceField />
                            }
                            titleTypographyProps={{ variant: 'body1' }}
                            action={<EditButton />}
                        />

                        <CardContent sx={{ pt: 0 }}>
                            <TextField
                                source="reference"
                                variant="span"
                            />
                            <span> | </span>
                            <Typography variant="span" gutterBottom>
                                <DateField source="date" />
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                                Total:&nbsp;
                                <NumberField
                                    source="amount"
                                    options={{
                                        style: 'currency',
                                        currency: 'INR',
                                    }}
                                />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Status:&nbsp;
                                <StatusField source="status" variant='span'/>
                            </Typography>
                            
                        </CardContent>
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
