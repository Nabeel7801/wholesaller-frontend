import * as React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRecordContext } from 'react-admin';

import { TableCellRight } from '../../components/TableCellRight';

const Totals = () => {
    const record = useRecordContext();
    const total_ex_delivery = record.basket.reduce((sum, product) => sum + product.buy_price * product.quantity, 0);
    
    return (
        <Table sx={{ minWidth: '35em' }}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Sum <span style={{fontSize: '0.8em'}}>(Inclusive of Tax)</span>
                    </TableCell>
                    <TableCellRight>
                        {total_ex_delivery.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </TableCellRight>
                </TableRow>
                
                <TableRow>
                    <TableCell>
                        CGST2.5 (2.5%)
                    </TableCell>
                    <TableCellRight>
                        {record && (record.total*2.5/100).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </TableCellRight>
                </TableRow>

                <TableRow>
                    <TableCell>
                        SGST2.5 (2.5%)
                    </TableCell>
                    <TableCellRight>
                        {record && (record.total*2.5/100).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </TableCellRight>
                </TableRow>

                <TableRow>
                    <TableCell>
                        Delivery
                    </TableCell>
                    <TableCellRight>
                        {record?.delivery_fees?.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </TableCellRight>
                </TableRow>

                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        Total
                    </TableCell>
                    <TableCellRight sx={{ fontWeight: 'bold' }}>
                        {record?.total?.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </TableCellRight>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default Totals;
