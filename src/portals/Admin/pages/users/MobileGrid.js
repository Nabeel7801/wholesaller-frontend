// in src/comments.js
import * as React from 'react';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { EditButton, TextField, RecordContextProvider, useListContext } from 'react-admin';

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
                            title={record.identity}
                            subheader={
                                <>
                                    {record.name}
                                    &nbsp;
                                    (<TextField source="username" />)
                                </>
                            }
                            action={<EditButton />}
                        />
                        <CardContent sx={{ pt: 0 }}>
                            <TextField source="business_type" />
                        
                        </CardContent>
                        
                    </Card>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default MobileGrid;
