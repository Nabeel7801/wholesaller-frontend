// in src/comments.js
import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { EmailField, EditButton, NumberField, RecordContextProvider, useListContext } from 'react-admin';

import AvatarField from '../../components/AvatarField';
import ColoredNumberField from './ColoredNumberField';

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
                            title={`${record.first_name} ${record.last_name}`}
                            subheader={
                                <>
                                    Email: 
                                    &nbsp;
                                    <EmailField source="email" />
                                </>
                            }
                            avatar={<AvatarField size="45" />}
                            action={<EditButton />}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <Typography variant="body2">
                                No of Orders
                                :&nbsp;
                                <NumberField source="no_of_orders" />
                            </Typography>
                            <Typography variant="body2">
                                Total spent
                                :&nbsp;
                                <ColoredNumberField
                                    source="total_spent"
                                    options={{
                                        style: 'currency',
                                        currency: 'INR',
                                    }}
                                />
                            </Typography>
                        </CardContent>
                        
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileGrid;
