// in src/comments.js
import * as React from 'react';
import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { DateField, EditButton, NumberField, TextField, BooleanField, useListContext, RecordContextProvider } from 'react-admin';

import CustomerReferenceField from '../../components/CustomerReferenceField';


const MobileGrid = props => {
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
                                <>
                                    Orders #
                                    <TextField
                                        source="reference"
                                        variant="body1"
                                    />
                                </>
                            }
                            titleTypographyProps={{ variant: 'body1' }}
                            action={<EditButton />}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <CustomerReferenceField
                                sx={{ display: 'block', mb: 1 }}
                            />
                            <Typography variant="body2" gutterBottom>
                                Date:&nbsp;
                                <DateField source="date" showTime />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Total:&nbsp;
                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'INR',
                                    }}
                                />
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Status:&nbsp;
                                <TextField source="status" />
                            </Typography>
                            {record?.status !== 'pending' && 
                                <Typography variant="body2">
                                    Returned:&nbsp;
                                    <BooleanField source="returned" />
                                </Typography>
                            }
                            
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
