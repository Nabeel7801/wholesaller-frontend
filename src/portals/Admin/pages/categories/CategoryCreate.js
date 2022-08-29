import React, { useContext } from 'react';
import { CreateBase, TextInput, SimpleForm, required, useRedirect, useNotify, SaveButton, useRefresh } from 'react-admin';
import { Box, Stack, IconButton, Typography, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios'
import { AppContext } from '../../../context';

import ImageComponent from './ImageComponent';

const CategoryCreate = ({ onCancel, ...props }) => {

    const req = required();
    const redirect = useRedirect();
    const notify = useNotify();
    const refresh = useRefresh()

    const redirectTo = "/" + (props.type === 'Main' ? "categories" : `${props.type?.toLowerCase()}categories`);
    
    const { appState } = useContext(AppContext);
    const url = appState.ATLAS_URI;
 
    const saveCategory = (data) => {

        let dataBody;
        if (data && data.image) {
            dataBody = new FormData();  
            for (let key in data) {
                dataBody.append(key, key === "image" ? data[key].rawFile : data[key]);
            }
        }else {
            dataBody = JSON.stringify(data);
        }

        axios.post(`${url}/admin/categories`, dataBody)
        .then(res => {
            if (res.data) {
                redirect(redirectTo);
                notify("Category Added Successfully")
                refresh()
            }

        }).catch(err => console.log(err))
        
    }
    return (
        <CreateBase 
            {...props}
        >
            <Box pt={5} width={{ xs: '100vw', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {`Create ${props.type}-Category`}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    record={{parent: props.parent}}
                    toolbar={
                        <Toolbar sx={{ backgroundColor: 'background.paper', minHeight: { sm: 0 } }}>
                            <SaveButton />
                        </Toolbar>
                    }
                    onSubmit={saveCategory}
                >
                    <TextInput
                        source="title"
                        fullWidth
                        validate={req}
                    />

                    <ImageComponent source="image" />

                </SimpleForm>
            </Box>
        </CreateBase>
    );
};

export default CategoryCreate;
