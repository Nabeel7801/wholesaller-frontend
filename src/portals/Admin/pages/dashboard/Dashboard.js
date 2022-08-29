import React, { useMemo } from 'react';
import { useGetList } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import { subDays, startOfDay } from 'date-fns';

import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import OrderChart from './OrderChart';
import TotalCustomers from './TotalCustomers';
import TotalStores from './TotalStores';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('lg')
    );
    const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

    const { data: orders } = useGetList('orders', {
        filter: { date_gte: aMonthAgo.toISOString() },
        sort: { field: 'date', order: 'DESC' },
        pagination: { page: 1, perPage: 50 },
    });

    const aggregation = useMemo(() => {
        if (!orders) return {};
        const aggregations = orders
            .filter(order => order.status !== 'cancelled')
            .reduce(
                (stats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += order.total;
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'pending') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        return {
            recentOrders: orders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
            totalStores: 1,
            totalCustomers: 25
        };
    }, [orders]);

    const { nbNewOrders, revenue, totalCustomers, totalStores, pendingOrders, recentOrders } = aggregation;

    return isXSmall ? (
        <div>
            <div style={{ ...styles.flexColumn, ...styles.singleCol }}>
                <MonthlyRevenue value={revenue} />
                <VerticalSpacer />
                <NbNewOrders value={nbNewOrders} />
                <VerticalSpacer />
                <TotalCustomers value={totalCustomers} />
                <VerticalSpacer />
                <TotalStores value={totalStores} />
                <VerticalSpacer />
                <PendingOrders orders={pendingOrders} />
            </div>
        </div>

    ) : isSmall ? (
        <div style={{ ...styles.flexColumn, ...styles.singleCol }}>

            <div style={styles.flex}>
                <MonthlyRevenue value={revenue} />
                <Spacer />
                <NbNewOrders value={nbNewOrders} />
            </div>

            <VerticalSpacer />

            <div style={styles.flex}>
                <TotalCustomers value={totalCustomers} />
                <Spacer />
                <TotalStores value={totalStores} />
            </div>

            <div style={styles.singleCol}>
                <OrderChart orders={recentOrders} />
            </div>

            <div style={styles.singleCol}>
                <PendingOrders orders={pendingOrders} />
            </div>
        </div>

    ) : (
        <>
            <div style={{ ...styles.flexColumn, ...styles.singleCol }}>

                <div style={styles.flex}>
                    <MonthlyRevenue value={revenue} />
                    <Spacer />
                    <NbNewOrders value={nbNewOrders} />
                    <Spacer />
                    <TotalCustomers value={totalCustomers} />
                    <Spacer />
                    <TotalStores value={totalStores} />
                </div>

                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.singleCol}>
                            <OrderChart orders={recentOrders} />
                        </div>
                    </div>

                    <div style={styles.rightCol}>
                        <div style={styles.singleCol}>
                            <PendingOrders orders={pendingOrders} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;
