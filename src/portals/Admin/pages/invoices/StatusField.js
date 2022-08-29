import * as React from 'react';
import { useRecordContext } from 'react-admin';
import { Typography } from '@mui/material';

const getCurrentDate = () => {
    const date = new Date();
    const dd = ("00" + date.getDate()).slice(-2);
    const mm = ("00" + String(parseInt(date.getMonth())+1)).slice(-2);
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

const StatusField = props => {
    const record = useRecordContext(props);
    
    if (!record || !props.source) {
        return null;
    }

    const styles = { 
        textTransform: 'uppercase',
        fontWeight: 'bold', 
        fontSize: '0.9em',
        color: 'orange' 
    };

    const currentDate = getCurrentDate();

    let status = record[props.source];
    if (status === 'paid') {
        styles.color = 'green';
        
    }else if (status === 'unpaid') {
        if (currentDate > record.due_date) {
            const diffTime = Math.abs(new Date(currentDate) - new Date(record.due_date));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
            status = `overdue by ${diffDays} Day${diffDays > 1 ? 's' : ''}`
            styles.color = 'red';
        }
    }

    return <Typography sx={styles} {...props}>{status}</Typography>

};

export default React.memo(StatusField);
