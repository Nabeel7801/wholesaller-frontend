import * as React from 'react';

import { NumberInput, ReferenceInput, required, SelectInput, TextInput } from 'react-admin';
import { InputAdornment, Grid, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';

export const ProductEditDetails = () => {

    return (
        <Grid container columnSpacing={2}>
            
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Identity
                </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextInput source="hsn_code" fullWidth validate={req} label="HSN Code"/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextInput source="reference" fullWidth validate={req} label="Name"/>
            </Grid>
            
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Category
                </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
                <ReferenceInput source="main_category" reference="categories" filter={{parent: "none"}}>
                    <SelectInput optionText="title" validate={req} fullWidth label="Main Category" />
                </ReferenceInput>
            </Grid>
            
            <Grid item xs={12} sm={4}>
                <ReferenceInput source="sub_category" reference="categories" filter={{parent: useWatch({name: "main_category"})}}>
                    <SelectInput optionText="title" fullWidth label="Sub Category" />
                </ReferenceInput>
            </Grid>
            
            <Grid item xs={12} sm={4}>
                <ReferenceInput source="child_category" reference="categories" filter={{parent: useWatch({name: "sub_category"})}}>
                    <SelectInput optionText="title" fullWidth label="Child Category" />
                </ReferenceInput>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Price
                </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <SelectInput 
                    choices={[
                        {id: '0', name: 'GST0 [0%]'},
                        {id: '5', name: 'GST5 [5%]'},
                        {id: '12', name: 'GST12 [12%]'},
                        {id: '18', name: 'GST18 [18%]'},
                        {id: '28', name: 'GST28 [28%]'},
                    ]}
                    source="tax_rate"
                    fullWidth
                    validate={req}
                />
            </Grid>
            <Grid item xs={0} sm={6} />

            <Grid item xs={12} sm={6}>
                <NumberInput
                    source="price"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                        ),
                    }}
                    validate={req}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <NumberInput
                    source="cost_price"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">₹</InputAdornment>
                        ),
                    }}
                    validate={req}
                    fullWidth
                />
            </Grid>
            
        </Grid>
    )

};

const req = [required()];
