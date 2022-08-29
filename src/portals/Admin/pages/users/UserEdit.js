import * as React from 'react';
import { Edit, TextInput, PasswordInput, SimpleForm, AutocompleteArrayInput, useRecordContext } from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

const UserEdit = () => {
    return (
        <Edit title={<SellerTitle />}>
            <SimpleForm>
                <div>
                    <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                        <Grid item xs={12} md={12}>
                            
                            <Typography variant="h6" gutterBottom>
                                Identity
                            </Typography>

                            <TextInput
                                type="text"
                                source="identity"
                                isRequired
                                fullWidth
                            />

                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="name"
                                        label="Manager"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="username"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                            
                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Delivery Area
                            </Typography>

                            <AutocompleteArrayInput 
                                source="zipcodes"
                                optionValue="name"
                                optionText="name"
                                createLabel="ra.action.create"
                                choices={[
                                    { id: '0001', name: '45000' },
                                    { id: '0002', name: '29000' },
                                    { id: '0003', name: '36009' },
                                ]}
                            />

                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Change Password
                            </Typography>

                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <PasswordInput
                                        source=""
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <PasswordInput
                                        source=""
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                        </Grid>
                        
                    </Grid>
                </div>
            </SimpleForm>
        </Edit>
    );
};

const SellerTitle = () => {
    const record = useRecordContext();
    return <span>{record ? record.identity : "Seller"}</span>
}

export default UserEdit;
