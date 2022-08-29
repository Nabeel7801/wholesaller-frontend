import React from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { FilterList, FilterListItem, FilterLiveSearch, useGetList } from 'react-admin';

const Aside = () => {

    const { data: categories } = useGetList('categories', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' },
        filter: {parent: "none"}
    });

    return (
        <Card
            sx={{
                display: { xs: 'none', md: 'block' },
                order: -1,
                width: '15em',
                mr: 2,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{ pt: 1 }}>
                <FilterLiveSearch />

                <FilterList
                    label="Sales"
                    icon={<AttachMoneyIcon />}
                >
                    <FilterListItem
                        label="Best sellers"
                        value={{
                            sales_lte: undefined,
                            sales_gt: 25,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Average"
                        value={{
                            sales_lte: 25,
                            sales_gt: 10,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Low"
                        value={{
                            sales_lte: 10,
                            sales_gt: 0,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Never sold"
                        value={{
                            sales_lte: undefined,
                            sales_gt: undefined,
                            sales: 0,
                        }}
                    />
                </FilterList>

                <FilterList
                    label="Categories"
                    icon={<LocalOfferIcon />}
                >
                    {categories?.map(record => (
                        <FilterListItem
                            label={inflection.humanize(record.title)}
                            key={record.id}
                            value={{ main_category: record.id }}
                        />
                    ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
