import * as React from 'react';
import StoreIcon from '@mui/icons-material/Store';

import CardWithIcon from './CardWithIcon';

const TotalWarehouses = props => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/orders"
            icon={StoreIcon}
            title="Total Warehouses"
            subtitle={value === 0 ? "0" : value}
        />
    );
};

export default TotalWarehouses;
