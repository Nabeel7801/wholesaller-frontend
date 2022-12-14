import React from 'react';
import { CreateBase, TextInput, SimpleForm, required, useRedirect, useNotify, SaveButton, useRefresh, useCreate } from 'react-admin';
import { Box, Stack, IconButton, Typography, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageComponent from './ImageComponent';

const CategoryCreate = ({ onCancel, ...props }) => {

    const req = required();
    const redirect = useRedirect();
    const notify = useNotify();
    const refresh = useRefresh()
    const [create] = useCreate();

    const redirectTo = "/" + (props.type === 'Main' ? "categories" : `${props.type?.toLowerCase()}categories`);
 
    const saveCategory = (data) => {
        create('categories', { data }, { 
            mutationMode: 'optimistic',
            onSuccess: () => {
                // Now Deliver
                redirect(redirectTo);
                notify("Category Added Successfully")
                refresh()

            },
            onError: () => {
                notify('Error: Category not added', {
                    type: 'warning',
                });
            },
        })
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
                    onSubmit={saveCategory}
                    toolbar={
                        <Toolbar sx={{ backgroundColor: 'background.paper', minHeight: { sm: 0 } }}>
                            <SaveButton />
                        </Toolbar>
                    }
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
