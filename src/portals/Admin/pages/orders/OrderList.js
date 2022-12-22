import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { AutocompleteInput, Datagrid, DateField, DateInput, List, ListContextProvider, 
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
        perPage={25}
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
    { id: 'dispatched', name: 'dispatched' },
    { id: 'delivered', name: 'delivered' },
    { id: 'cancelled', name: 'cancelled' },
];

const useGetTotals = filterValues => {

    const { total: totalPending } = useGetList('orders', { filter: { ...filterValues, status: 'pending' } });
    const { total: totalDispatched } = useGetList('orders', { filter: { ...filterValues, status: 'dispatched' } });
    const { total: totalDelivered } = useGetList('orders', { filter: { ...filterValues, status: 'delivered' } });
    const { total: totalCancelled } = useGetList('orders', { filter: { ...filterValues, status: 'cancelled' } });

    return {
        pending: totalPending,
        dispatched: totalDispatched,
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
    const [dispatched, setDispatched] = useState([]);
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
            case 'dispatched':
                setDispatched(data);
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
            : filterValues.status === 'dispatched'
                ? dispatched
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
            
            <ListContextProvider
                value={{ ...listContext, ids: selectedData }}
            >
                {isXSmall ? 
                    <MobileGrid data={selectedData} />
                    :
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
                }

            </ListContextProvider>
            
        </Fragment>
    );
};

export default OrderList;
