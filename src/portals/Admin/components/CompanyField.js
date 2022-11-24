import * as React from 'react';
import { Typography } from '@mui/material';
import { memo } from 'react';

import { useRecordContext } from 'react-admin';

const CompanyField = props => {
    const record = useRecordContext();
    return record ? (
        <Typography
            variant="body2"
            component="div"
            sx={{fontWeight: 'bold', color: '#555'}}
            {...props}
        >
            {record.outlet_name}
        </Typography>
    ) : null;
};

export default memo(CompanyField);
