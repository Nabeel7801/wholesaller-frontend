import CustomerIcon from '@mui/icons-material/People';

import CustomerList from './CustomerList';
import CustomerCreate from './CustomerCreate';
import CustomerEdit from './CustomerEdit';

const customers = {
    list: CustomerList,
    edit: CustomerEdit,
    icon: CustomerIcon,
};

export default customers;
