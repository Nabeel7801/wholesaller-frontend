import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useGetMany, useRecordContext } from 'react-admin';

import { TableCellRight } from '../../components/TableCellRight';

const Basket = () => {
    const record = useRecordContext();
    const productIds = record ? record.basket.map(item => item.product_id) : [];

    const { isLoading, data: products } = useGetMany(
        'products',
        { ids: productIds },
        { enabled: !!record }
    );

    const productsById = products
        ? products.reduce((acc, product) => {
              acc[product.id] = product;
              return acc;
          }, {})
        : {};

    if (isLoading || !record || !products) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>HSN Code</TableCell>
                    <TableCellRight>Unit Price</TableCellRight>
                    <TableCellRight>Quantity</TableCellRight>
                    <TableCellRight>Total</TableCellRight>
                </TableRow>
            </TableHead>
            <TableBody>
                {record.basket.map(item => (
                    <TableRow key={item.product_id}>
                        <TableCell>
                            <Link to={`/products/${item.product_id}`}>
                                {productsById[item.product_id].reference}
                            </Link>
                        </TableCell>

                        <TableCellRight>{productsById[item.product_id].hsn_code}</TableCellRight>

                        <TableCellRight>
                            {item.buy_price.toLocaleString(
                                undefined,
                                {
                                    style: 'currency',
                                    currency: 'INR',
                                }
                            )}
                        </TableCellRight>
                        <TableCellRight>{item.quantity}</TableCellRight>

                        <TableCellRight>
                            {( item.buy_price * item.quantity ).toLocaleString(undefined, 
                                {
                                    style: 'currency',
                                    currency: 'INR',
                                }
                            )}
                        </TableCellRight>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default React.memo(Basket);
