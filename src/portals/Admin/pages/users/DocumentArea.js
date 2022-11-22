import React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography, Box } from '@mui/material';
import DocumentActions from './DocumentActions'

const DocumentArea = props => {
    const record = useRecordContext(props);
    
    return (
        
        <>
                                
            <Box mt="2em" />

            <Typography variant="h6" gutterBottom>
                Uploaded Document {record?.type ? <span style={{fontSize: '0.9rem'}}> ( {record?.type} )</span> : ""}
            </Typography>

            <DocumentActions />

            <Box mt="2em" />
            
            <iframe 
                src={`${window["apiLocation"]}/readfiles/${record?.filename}`}
                title="Document"
                style={{
                    width: '100%',
                    height: '600px'
                }}
            />
        </>
    )

};

export default React.memo(DocumentArea);
