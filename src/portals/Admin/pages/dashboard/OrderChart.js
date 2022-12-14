import * as React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format, subDays, addDays } from 'date-fns';

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = date =>
    new Date(date).toLocaleDateString();

const shortDateFormatter = date => {
    const d = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return d.getDate() + " " + months[parseInt(d.getMonth())];
}
    
const currencyFormatter = value => {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'INR',
    }).format(value).replace(/(\.|,)00$/g, '');
}

const aggregateOrdersByDay = orders =>
    orders
        .filter(order => order.status !== 'cancelled')
        .reduce((acc, curr) => {
            const day = format(new Date(curr.date), 'yyyy-MM-dd');
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += curr.total;
            return acc;
        }, {});

const getRevenuePerDay = orders => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map(date => ({
        date: date.getTime(),
        total: daysWithRevenue[format(new Date(date), 'yyyy-MM-dd')] || 0,
    }));
};

const OrderChart = props => {
    const { orders } = props;
    if (!orders) return null;

    return (
        <Card>
            <CardHeader title="30 Day Revenue History" sx={{borderBottom: '1px solid #ddd'}} />
            <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getRevenuePerDay(orders)}>
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                name="Date"
                                type="number"
                                scale="time"
                                domain={[
                                    addDays(aMonthAgo, 1).getTime(),
                                    new Date().getTime(),
                                ]}
                                tickFormatter={shortDateFormatter}
                            />
                            <YAxis 
                                dataKey="total" 
                                name="Revenue" 
                                tickFormatter={currencyFormatter}
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                formatter={currencyFormatter}
                                labelFormatter={label =>
                                    dateFormatter(label)
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderChart;
