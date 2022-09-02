import * as React from 'react';
import PeopleIcon from '@mui/icons-material/People';

import CardWithIcon from './CardWithIcon';

const TotalCustomers = props => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/orders"
            icon={PeopleIcon}
            title="Total Customers"
            subtitle={value === 0 ? "0" : value}
        />
    );
};

export default TotalCustomers;
