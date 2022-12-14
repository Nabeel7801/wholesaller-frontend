import React from 'react';
import inflection from 'inflection';
import { Card, CardContent } from '@mui/material';
import { LocalOfferOutlined, CategoryOutlined } from '@mui/icons-material';
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
                    label="Tags"
                    icon={<LocalOfferOutlined />}
                >
                    <FilterListItem
                        label={inflection.humanize("Best Sellers")}
                        value={{ tags: "TopBestSellers" }}
                    />

                    <FilterListItem
                        label={inflection.humanize("New Arrivals")}
                        value={{ tags: "NewArrivals" }}
                    />

                    <FilterListItem
                        label={inflection.humanize("Top Rated Products")}
                        value={{ tags: "TopRatedProducts" }}
                    />
                </FilterList>

                <FilterList
                    label="Categories"
                    icon={<CategoryOutlined />}
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
