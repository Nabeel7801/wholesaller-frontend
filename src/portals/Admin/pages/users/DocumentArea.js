import React, { useContext } from 'react';
import { useRecordContext } from 'react-admin';
import { Typography, Box } from '@mui/material';
import { AppContext } from '../../../context';
import DocumentActions from './DocumentActions'

const DocumentArea = props => {
    const record = useRecordContext(props);
    
    const { appState } = useContext(AppContext);
    const url = appState.ATLAS_URI;
    
    return (
        
        <>
                                
            <Box mt="2em" />

            <Typography variant="h6" gutterBottom>
                Uploaded Document {record?.type ? <span style={{fontSize: '0.9rem'}}> ( {record?.type} )</span> : ""}
            </Typography>

            <DocumentActions />

            <Box mt="2em" />
            
            <iframe 
                src={`${url}/readfiles/${record?.filename}`}
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
