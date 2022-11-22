import * as React from 'react';
import { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';

import { SaveButton, DeleteButton, useRecordContext } from 'react-admin';

const BannerEditToolbar = props => {
    const { resource } = props;

    const record = useRecordContext(props);

    if (!record) return null;

    return (
        <Toolbar
            sx={{
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: { sm: 0 },
            }}
        >

            <Fragment>
                <SaveButton type="button" record={record} resource={resource} />
                <DeleteButton record={record} resource={resource} />
            </Fragment>

        </Toolbar>
    );
};

export default BannerEditToolbar;
