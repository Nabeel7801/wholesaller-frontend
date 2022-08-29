import * as React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';

const StatusField = props => {
    const record = useRecordContext(props);
    console.log(record)
    if (!record || !props.source) {
        return null;
    }

    const styles = { 
        textTransform: 'uppercase',
        fontWeight: 'bold', 
        fontSize: '0.9em',
        color: 'orange',
        padding: '0.2em 0.5em',
        borderRadius: '0.2em',
        backgroundColor: 'transparent'
    };

    let status = record[props.source];
    if (status === 'verified') {
        styles.color = 'green';
        
    }else if (!status) {
        status = "unverified"
        styles.color = 'white';
        styles.fontWeight = '600';
        styles.backgroundColor = 'red'
        styles.fontSize = '0.8em'
        styles.letterSpacing = '1px'
    }

    return <Typography {...props}><span style={styles}>{status}</span></Typography>

};

export default React.memo(StatusField);
