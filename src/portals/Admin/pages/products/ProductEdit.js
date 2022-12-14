import * as React from 'react';
import { Typography } from '@mui/material';
import { Edit, FormTab, required, TabbedForm, CheckboxGroupInput, useRecordContext } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

import { ProductEditDetails } from './ProductEditDetails';
import ImageComponent from './ImageComponent';

const ProductTitle = () => {
    const record = useRecordContext();
    return record ? <span>{record.reference}</span> : null;
};

const ProductEdit = () => (
    <Edit title={<ProductTitle />}>
        <TabbedForm>
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
                sx={{ maxWidth: '40em' }}
            >
                <RichTextInput source="description" label="" />
            </FormTab>
            
        </TabbedForm>
    </Edit>
);

const req = [required()];

export default ProductEdit;
