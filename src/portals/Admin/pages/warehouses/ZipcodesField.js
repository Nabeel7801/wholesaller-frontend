import * as React from 'react';
import { Stack, Chip } from '@mui/material';
import { useRecordContext } from 'react-admin';

const ZipcodesField = () => {
    const record = useRecordContext();
    if (!record || !record.zipcodes) {
        return null;
    }
    return (
        <Stack direction="row" gap={1} flexWrap="wrap">
            {record.zipcodes.map(zipcode => (
                <Chip
                    size="small"
                    key={zipcode}
                    label={zipcode}
                />
            ))}
        </Stack>
    );
};

export default ZipcodesField;
