import * as React from 'react';
import { FunctionField } from 'react-admin';

const render = record => record && record.basket.length;

const NbItemsField = () => <FunctionField render={render} />;

NbItemsField.defaultProps = {
    label: 'Total Items',
    textAlign: 'right',
};

export default NbItemsField;
