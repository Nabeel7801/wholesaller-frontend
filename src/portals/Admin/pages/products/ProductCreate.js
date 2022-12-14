import * as React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'

import { Create, FormTab, TabbedForm, useDataProvider, CheckboxGroupInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

import { ProductEditDetails } from './ProductEditDetails';
import ImageComponent from './ImageComponent';

const ProductCreate = () => {
    const dataProvider = useDataProvider();
    const navigate = useNavigate();

    const handleSubmit = (data) => {

        dataProvider.create('products', { data: data }, {mutationMode: 'optimistic'})
        .then(res => navigate('/products'))
        .catch(err => console.log(err))

    }

    return (
        <Create>
            <TabbedForm defaultValues={{ sales: 0 }} onSubmit={handleSubmit}>
                <FormTab
                    label="Image"
                    sx={{ maxWidth: '40em' }}
                >
                    <ImageComponent source="image" />
                </FormTab>

                <FormTab
                    label="Details"
                    path="details"
                    sx={{ maxWidth: '40em' }}
                >
                    <ProductEditDetails />
                </FormTab>
    
                <FormTab
                    label="Tags"
                    path="tags"
                    sx={{ maxWidth: '40em' }}
                >
                    <Typography variant="h6" gutterBottom>Tags</Typography>

                    <CheckboxGroupInput 
                        label=""
                        row={false} 
                        source="tags"
                        sx={{ 
                            padding: '10px', 
                            '& .MuiFormControlLabel-root': { marginBottom: '15px' }, 
                            '& .MuiFormControlLabel-label': { fontSize: '1.2rem' } 
                        }} 
                        choices={[
                            { id: 'TopBestSellers', name: 'Top Best Sellers' },
                            { id: 'NewArrivals', name: 'New Arrivals' },
                            { id: 'TopRatedProducts', name: 'Top Rated Products' }
                        ]} 
                    />
                </FormTab>

                <FormTab
                    label="Description"
                    path="description"
                >
                    <RichTextInput source="description" label="" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductCreate;
