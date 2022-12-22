import React from 'react';
import { Edit, TextInput, SimpleForm, useRecordContext } from 'react-admin';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Launch } from '@mui/icons-material';
import DocumentArea from './DocumentArea';

const OpenAccount = (props) => {
    const record = useRecordContext(props);
    if (!record) return null;
    const { email, password } = record;

    return (
        <Button 
            variant="contained"
            size="large"
            endIcon={<Launch />}
            sx={{ height: '48px', mt: '8px', ml: '4px' }}
            onClick={() => window.open(`${window.location.protocal || "http"}://${window.location.host}/signin?email=${email}&password=${password}`)}
        >
            <Typography component="span" sx={{ display: {xs: 'none', sm: 'block'},  }}>Account </Typography>
        </Button>
    )
}

const UserEdit = () => {

    return (
        <Edit title={<SellerTitle />}>
            <Grid container width={{ xs: '100%' }} spacing={2}>
                <Grid item xs={12} lg={6}>
                    <SimpleForm width={{ xs: '100%', xl: 800 }}>
                        <div>
                            <Typography variant="h6" gutterBottom>
                                Identity
                            </Typography>

                            <TextInput
                                type="text"
                                source="outlet_name"
                                isRequired
                                fullWidth
                            />

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
                            
                            <Box display={{ xs: 'block', sm: 'flex' }}>
                                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="email"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="phone"
                                        isRequired
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Delivery Address
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
                                <Box flex={1.5} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="state"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                                <Box flex={1.5}>
                                    <TextInput
                                        source="pincode"
                                        fullWidth
                                        helperText={false}
                                    />
                                </Box>
                            </Box>

                            <Box mt="1em" />

                            <Typography variant="h6" gutterBottom>
                                Password
                            </Typography>
                            <Box sx={{ display: 'flex' }}>
                                <Box flex={3} mr={{ xs: 0, sm: '0.5em' }}>
                                    <TextInput
                                        source="password"
                                        disabled
                                        fullWidth
                                    />
                                </Box>
                                <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                    <OpenAccount />
                                </Box>
                            </Box>

                            <Box mt="1em" />

                        </div>
                    </SimpleForm>
                </Grid>
                
                <Grid item xs={12} lg={6}>
                    <DocumentArea />
                </Grid>
            </Grid>
        </Edit>
    );
};

const SellerTitle = () => {
    const record = useRecordContext();
    return <span>{record ? record.identity : "Seller"}</span>
}

export default UserEdit;
