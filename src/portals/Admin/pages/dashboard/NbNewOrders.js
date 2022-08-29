import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CardWithIcon from './CardWithIcon';

const NbNewOrders = props => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/orders"
            icon={ShoppingCartIcon}
            title="Monthly Orders"
            subtitle={value}
        />
    );
};

export default NbNewOrders;
