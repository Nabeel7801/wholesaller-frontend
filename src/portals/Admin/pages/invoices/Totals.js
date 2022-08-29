import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRecordContext } from 'react-admin';

import { TableCellRight } from '../../components/TableCellRight';

const Totals = () => {
    const record = useRecordContext();
    
    const styles = {
        cells: {
            padding: '5px 16px'
        }
    }

    return (
        <>
            <Grid container spacing={2} sx={{ marginTop: '10px' }} >
            
                <Grid item xs={6}>

                    <Table>
                        <TableBody>

                            <TableRow>
                                <TableCell sx={{...styles.cells, fontWeight: '600'}} >
                                    Payment Made
                                </TableCell>
                                <TableCellRight sx={styles.cells} >
                                    {record && (record.amount-record.balance_due)?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{...styles.cells, fontWeight: '600'}} >
                                    Balance Due
                                </TableCell>
                                <TableCellRight sx={styles.cells} >
                                    {record?.balance_due?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Grid>
            
                <Grid item xs={6} >
                    
                    <Table>
                        <TableBody>
                                    
                            <TableRow>
                                <TableCell sx={styles.cells}>
                                    Sum
                                </TableCell>
                                <TableCellRight sx={styles.cells}>
                                    {record?.amount?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={styles.cells}>
                                    CGST2.5 (2.5%)
                                </TableCell>
                                <TableCellRight sx={styles.cells}>
                                    {record && (record.amount*2.5/100)?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={styles.cells}>
                                    SGST2.5 (2.5%)
                                </TableCell>
                                <TableCellRight sx={styles.cells}>
                                    {record && (record.amount*2.5/100)?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={styles.cells}>
                                    Delivery
                                </TableCell>
                                <TableCellRight sx={styles.cells}>
                                    {record?.delivery_fees?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{...styles.cells, fontWeight: '600'}} >
                                    Total
                                </TableCell>
                                <TableCellRight sx={{...styles.cells, fontWeight: '600'}} >
                                    {record?.amount?.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'INR',
                                    })}
                                </TableCellRight>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Grid>
            
            </Grid>
        </>
    );
};

export default Totals;
