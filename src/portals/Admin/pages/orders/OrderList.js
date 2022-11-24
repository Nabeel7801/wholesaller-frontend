import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { AutocompleteInput, BooleanField, Datagrid, DateField, DateInput, List, ListContextProvider, 
    NullableBooleanInput, NumberField, ReferenceInput, ReferenceField, TextField, TextInput, 
    useGetList, useListContext } from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab } from '@mui/material';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../../components/CustomerReferenceField';
import AddressField from '../../components/AddressField';
import MobileGrid from './MobileGrid';

const OrderList = () => (
    <List
        filterDefaultValues={{ status: 'pending' }}
        sort={{ field: 'date', order: 'DESC' }}
        perPage={10}
        filters={orderFilters}
    >
        <TabbedDatagrid />
    </List>
);

const orderFilters = [
    <TextInput source="reference" label="Search by Reference" alwaysOn />,

    <ReferenceInput source="customer_id" reference="customers">
        <AutocompleteInput
            optionText={choice =>
                choice?.id // the empty choice is { id: '' }
                    ? `${choice.first_name} ${choice.last_name}`
                    : ''
            }
        />
    </ReferenceInput>,

    <DateInput source="date_gte" label="Passed Since" />,

    <DateInput source="date_lte" label="Passed Before" />,

    <TextInput source="total_gte" label="Min Amount" />,

    <NullableBooleanInput source="returned" />,
];

const tabs = [
    { id: 'pending', name: 'pending' },
    { id: 'delivered', name: 'delivered' },
    { id: 'cancelled', name: 'cancelled' },
];

const useGetTotals = filterValues => {

    const { total: totalPending } = useGetList('orders', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'pending' },
    });

    const { total: totalDelivered } = useGetList('orders', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'delivered' },
    });

    const { total: totalCancelled } = useGetList('orders', {
        pagination: { perPage: 1, page: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: { ...filterValues, status: 'cancelled' },
    });

    return {
        pending: totalPending,
        delivered: totalDelivered,
        cancelled: totalCancelled,
    };
};

const TabbedDatagrid = () => {
    const listContext = useListContext();
    const {
        data,
        filterValues,
        setFilters,
        displayedFilters,
        isLoading,
    } = listContext;

    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );
    const [pending, setPending] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const totals = useGetTotals(filterValues);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        switch (filterValues.status) {
            case 'pending':
                setPending(data);
                break;
            case 'delivered':
                setDelivered(data);
                break;
            case 'cancelled':
                setCancelled(data);
                break;
            default:
                setPending(data);
                break;
        }
    }, [data, isLoading, filterValues.status]);

    const handleChange = useCallback(
        (event, value) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters,
                    false // no debounce, we want the filter to fire immediately
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedData =
        filterValues.status === 'pending'
            ? pending
            : filterValues.status === 'delivered'
                ? delivered
                : cancelled;

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                        sx= {{fontFamily: 'Poppins-Medium'}}
                    />
                ))}
            </Tabs>

            <Divider />
            
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, data: selectedData }}
                >
                    <MobileGrid data={selectedData} />
                </ListContextProvider>
            ) : (
                <>
                    {filterValues.status === 'pending' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: pending }}
                        >
                            <Datagrid optimized rowClick="edit">
                                
                                <DateField source="date" showTime />
                                
                                <TextField source="reference" />
                                
                                <CustomerReferenceField 
                                    label="Company" 
                                    outlet={true}
                                    link={false}
                                />
                                
                                <CustomerReferenceField />
                                
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                    label="Address"
                                >
                                    <AddressField />
                                </ReferenceField>

                                <NbItemsField />

                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'INR',
                                    }}
                                    sx={{ fontWeight: 'bold' }}
                                />

                            </Datagrid>
                        </ListContextProvider>
                    )}

                    {filterValues.status === 'delivered' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: delivered }}
                        >
                            <Datagrid rowClick="edit">
                                <DateField source="date" showTime />

                                <TextField source="reference" />
                                
                                <CustomerReferenceField />
                                
                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                    label="Address"
                                >
                                    <AddressField />
                                </ReferenceField>

                                <NbItemsField />

                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'INR',
                                    }}
                                    sx={{ fontWeight: 'bold' }}
                                />

                                <BooleanField
                                    source="returned"
                                    sx={{ mt: -0.5, mb: -0.5 }}
                                />
                            </Datagrid>
                        </ListContextProvider>
                    )}

                    {filterValues.status === 'cancelled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid rowClick="edit">
                                <DateField source="date" showTime />

                                <TextField source="reference" />

                                <CustomerReferenceField />

                                <ReferenceField
                                    source="customer_id"
                                    reference="customers"
                                    link={false}
                                    label="Address"
                                >
                                    <AddressField />
                                </ReferenceField>

                                <NbItemsField />

                                <NumberField
                                    source="total"
                                    options={{
                                        style: 'currency',
                                        currency: 'INR',
                                    }}
                                    sx={{ fontWeight: 'bold' }}
                                />
                                
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </>
            )}
        </Fragment>
    );
};

export default OrderList;
