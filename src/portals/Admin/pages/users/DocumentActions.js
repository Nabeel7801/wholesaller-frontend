import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNotify, useRecordContext } from 'react-admin';
import { Button, Box } from '@mui/material';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import { AppContext } from '../../../context';

const DocumentActions = () => {
    const notify = useNotify();
    const record = useRecordContext();
    const [isLoading, setLoading] = useState(false);
    const [status, setStatus] = useState(record.status);
    
    const { appState } = useContext(AppContext);
    const url = appState.ATLAS_URI;

    const approve = () => {
        setLoading(true);
        axios.put(`${url}/updateStatus/${record.document}`, { status: 'verified' })
        .then(() => {
            setLoading(false);
            notify('Document Approved!', {
                type: 'info'
            });
            setStatus("verified")

        }).catch(err => {
            setLoading(false);
            console.log(err);
        })

    }

    const reject = () => {
        setLoading(true);
        axios.put(`${url}/updateStatus/${record.document}`, { status: 'unverified' })
        .then(() => {
            setLoading(false);
            notify('Document Rejected!', {
                type: 'info'
            });
            
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })

    }

    return status === 'pending' ? (
        <Box sx ={{
            display: 'flex',
            justifyContent: 'flex-end',
            '& button': {
                margin: '0 10px'
            }
        }}>
            <Button
                variant="contained"
                sx= {{ backgroundColor: '#5CB85C' }}
                onClick={() => approve()}
                startIcon={<ThumbUp sx={{ color: 'white' }} />}
                disabled={isLoading}
            >
                Approve
            </Button>

            <Button
                variant="contained"
                sx= {{ backgroundColor: '#D9534F' }}
                onClick={() => reject()}
                startIcon={<ThumbDown sx={{ color: 'white' }} />}
                disabled={isLoading}
            >
                Reject
            </Button>
        </Box>
    ) : (
        <span />
    );
};

export default DocumentActions;
