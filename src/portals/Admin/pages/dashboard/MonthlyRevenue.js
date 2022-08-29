import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';

import CardWithIcon from './CardWithIcon';

const MonthlyRevenue = props => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/orders"
            icon={DollarIcon}
            title="Monthly Revenue"
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;
