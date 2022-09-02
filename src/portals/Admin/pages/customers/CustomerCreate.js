import * as React from 'react';
import { Create, SimpleForm, TextInput, email } from 'react-admin';
import { Box, Typography } from '@mui/material';

export const validateForm = (values) => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'ra.validation.required';
    }
    if (!values.last_name) {
        errors.last_name = 'ra.validation.required';
    }
    if (!values.email) {
        errors.email = 'ra.validation.required';
    } else {
        const error = email()(values.email);
        if (error) {
            errors.email = error;
        }
    }
    return errors;
};

const CustomerCreate = () => (
    <Create>
        <SimpleForm
            sx={{ maxWidth: 500 }}
            defaultValues={{
                total_spent: 0,
            }}
            validate={validateForm}
        >
            <SectionTitle label="Identity" />
            
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="first_name" isRequired fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="last_name" isRequired fullWidth />
                </Box>
            </Box>

            <TextInput type="email" source="email" isRequired fullWidth />
            
            <Separator />
            
            <SectionTitle label="Address" />
            
            <TextInput
                source="address"
                multiline
                fullWidth
                helperText={false}
            />
            <Box display={{ xs: 'block', sm: 'flex' }}>
                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput source="city" fullWidth helperText={false} />
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <TextInput
                        source="state"
                        fullWidth
                        helperText={false}
                    />
                </Box>
                <Box flex={2}>
                    <TextInput source="pincode" fullWidth helperText={false} />
                </Box>
            </Box>
            
        </SimpleForm>
    </Create>
);

const SectionTitle = ({ label }) => {

    return (
        <Typography variant="h6" gutterBottom>
            {label}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default CustomerCreate;
