import * as React from 'react';
import { Edit, FormTab, required, TabbedForm, TextInput, useRecordContext } from 'react-admin';
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
