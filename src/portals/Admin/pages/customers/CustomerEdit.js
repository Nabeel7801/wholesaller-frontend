import * as React from 'react';
import { Edit, TextInput, PasswordInput, SimpleForm } from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

import FullNameField from '../../components/FullNameField';
import { validateForm } from './CustomerCreate';
import Aside from './Aside'

const CustomerEdit = () => {
    return (
        <Edit title={<CustomerTitle />} aside={<Aside />}>
            <SimpleForm validate={validateForm}>
                <div>
                    <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                            Identity
                            </Typography>
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="first_name"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="last_name"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                            <TextInput
                                type="email"
                                source="email"
                                isRequired
                                fullWidth
                            />

                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Address
                            </Typography>
                            <TextInput
                                source="address"
                                multiline
                                fullWidth
                                helperText={false}
                            />
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={2} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="city"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="state"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                                <Box flex={2}>
                                    <TextInput
                                        source="zipcode"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                            </Box>

                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Change Password
                            </Typography>
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <PasswordInput
                                        source="password"
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <PasswordInput
                                        source="confirm_password"
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

const CustomerTitle = () => <FullNameField size="32" sx={{ margin: '5px 0' }} />;

export default CustomerEdit;
