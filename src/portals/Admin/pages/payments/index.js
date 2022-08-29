import InvoiceIcon from '@mui/icons-material/LibraryBooks';
import PaymentList from './PaymentList';
import PaymentEdit from './PaymentEdit';
import PaymentCreate from './PaymentCreate';

const invoices = {
    list: PaymentList,
    edit: PaymentEdit,
    create: PaymentCreate,
    icon: InvoiceIcon,
};

export default invoices;
