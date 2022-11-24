import * as React from 'react';
import { ReferenceField } from 'react-admin';

import FullNameField from './FullNameField';
import CompanyField from './CompanyField';

const CustomerReferenceField = ({outlet, ...props}) => (
    <ReferenceField source="customer_id" reference="customers" {...props}>
        {outlet ? <CompanyField /> : <FullNameField />}
    </ReferenceField>
);

CustomerReferenceField.defaultProps = {
    source: 'customer_id',
};

export default CustomerReferenceField;
