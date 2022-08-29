import React, { useContext, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CircularProgress } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { Form, required, TextInput, useNotify } from 'react-admin';

import Box from '@mui/material/Box';
import { AppContext } from '../../context';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const notify = useNotify();
    const navigate = useNavigate();
    const { appState, setAppState } = useContext(AppContext);
    const url = appState.ATLAS_URI;

    const showError = (error) => {
        setLoading(false);
        notify(
            typeof error === 'string'
                ? error
                : typeof error === 'undefined' || !error.message ? 'ra.auth.sign_in_error' : error.message,
            {
                type: 'warning',
                messageArgs: {
                    _:
                        typeof error === 'string'
                            ? error
                            : error && error.message ? error.message : undefined,
                },
            }
        );
    }

    const handleSubmit = auth => {
        setLoading(true);
        const { username, password } = auth;

        axios.post(`${url}/admin/authenticateUser/${username}/${password}`)
        .then(res => {
            if (res.data && res.data.length > 0) {
                const user = res.data[0];
                localStorage.setItem('admin_user', JSON.stringify(user))

                setAppState(prevState => ({ ...prevState, user }))
                navigate("/")

            }else {
                showError("Wrong Username or Password")
            }
        }).catch(error => showError(error));

    };

    return (

        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%'
                }}
            >
                <Box sx={{ 
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)'
                }}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', transform: 'translateY(1px)'}}>
                        <span style={{
                            backgroundColor: '#515adb', color: '#fff', padding: '0.5rem 0.7rem', fontSize: '1.0rem', 
                            borderRadius: '5px 5px 0 0', display: 'inline-flex', alignItems: 'center', fontFamily: 'Poppins-Medium'
                        }}>
                            <PersonOutlineIcon sx={{fontSize: '1.5rem', paddingRight: '5px'}}/> Admin Login
                        </span>
                    </Box>

                    <Card sx={{ 
                        minWidth: 300, maxWidth: 400, borderRadius: '5px 0 5px 5px',
                        boxShadow: '2px 3px 5px #888888', borderTop: '5px solid #515adb'
                    }}>
                        
                        <Box sx={{ padding: '2.5em 1em 1em 1em' }}>
                            
                            <TextInput
                                autoFocus
                                source="username"
                                label="Username"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                variant="standard"
                                margin="none"
                                size= 'medium'
                                InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                            />
                        
                            <TextInput
                                source="password"
                                label="Password"
                                type="password"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                variant="standard"
                                margin="none"
                                size= 'medium'
                                InputLabelProps={{ style: { fontSize: '0.9rem' } }}
                            />

                        </Box>

                        <CardActions sx={{ padding: '0 1em 1em 1em', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                disabled={loading}
                                sx={{backgroundColor: '#515adb', borderRadius: '5px'}}
                            >
                                {loading && (
                                    <CircularProgress size={25} thickness={2} />
                                )}
                                Sign In
                            </Button>
                        </CardActions>

                    </Card>
                </Box>
            </Box>
        </Form>
    );
};

export default Login;

