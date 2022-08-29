import * as React from 'react';
import StoreIcon from '@mui/icons-material/Store';

import CardWithIcon from './CardWithIcon';

const TotalStores = props => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/orders"
            icon={StoreIcon}
            title="Total Stores"
            subtitle={value}
        />
    );
};

export default TotalStores;
