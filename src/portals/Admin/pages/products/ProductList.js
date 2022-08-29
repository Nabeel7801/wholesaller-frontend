import * as React from 'react';
import { Box, Chip, useMediaQuery } from '@mui/material';
import { CreateButton, ExportButton, FilterButton, FilterForm, FilterContext, ListBase, NumberInput, Pagination, 
    ReferenceInput, SearchInput, SelectInput, SortButton, Title, TopToolbar, useGetResourceLabel } from 'react-admin';

import ImageList from './GridList';
import Aside from './Aside';

const ProductList = () => {
    
    const getResourceLabel = useGetResourceLabel();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <ListBase perPage={24} sort={{ field: 'reference', order: 'ASC' }}>
            
            <Title defaultTitle={getResourceLabel('products', 2)} />
            
            <FilterContext.Provider value={productFilters}>
                <ListActions isSmall={isSmall} />
                {isSmall && (
                    <Box m={1}>
                        <FilterForm />
                    </Box>
                )}
            </FilterContext.Provider>
            
            <Box display="flex">
                <Aside />
                <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
                    <ImageList />
                    <Pagination rowsPerPageOptions={[12, 24, 48, 72]} />
                </Box>
            </Box>

        </ListBase>
    );
};

const QuickFilter = ({ label }) => {;
    return <Chip sx={{ mb: 1 }} label={label} />;
};

export const productFilters = [
    <SearchInput source="reference" alwaysOn />,
    <ReferenceInput
        source="category_id"
        reference="categories"
        sort={{ field: 'id', order: 'ASC' }}
    >
        <SelectInput source="name" />
    </ReferenceInput>,
    <NumberInput source="width_gte" />,
    <NumberInput source="width_lte" />,
    <NumberInput source="height_gte" />,
    <NumberInput source="height_lte" />,
    <QuickFilter
        label="Low Stock"
        source="stock_lte"
        defaultValue={10}
    />,
];

const ListActions = ({ isSmall }) => (
    <TopToolbar sx={{ minHeight: { sm: 56 } }}>
        {isSmall && <FilterButton />}
        <SortButton fields={['reference', 'sales', 'stock']} />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export default ProductList;
