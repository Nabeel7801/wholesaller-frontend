// in src/comments.js
import * as React from 'react';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { EditButton, TextField, RecordContextProvider, useListContext } from 'react-admin';
import FullNameField from '../../components/FullNameField'
import StatusField from './StatusField'

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
                            title={record.outlet_name}
                            action={<EditButton />}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <FullNameField />
                            <TextField source="email" sx={{ margin: '10px 0'}}/>
                            <StatusField source="status" />
                        </CardContent>
                        
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileGrid;
