import React from 'react';
import { CreateBase, TextInput, AutocompleteArrayInput, ReferenceInput, SimpleForm, required, useGetList, useRedirect, useNotify, SaveButton, useRefresh, useCreate } from 'react-admin';
import { Box, Stack, IconButton, Typography, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageComponent from './ImageComponent';

const BannerCreate = ({ onCancel, ...props }) => {

    const req = required();
    const redirect = useRedirect();
    const notify = useNotify();
    const refresh = useRefresh()
    const [create] = useCreate();
    
    const { data: categories } = useGetList('categories', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'title', order: 'ASC' },
        filter: {},
    });

    const saveBanner = (data) => {
        create('banners', { data }, { 
            mutationMode: 'optimistic',
            onSuccess: () => {
                // Now Deliver
                redirect("/banners");
                notify("Banner Added Successfully")
                refresh()

            },
            onError: () => {
                notify('Error: Banner not added', {
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
                        {`Create Banner`}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={
                        <Toolbar sx={{ backgroundColor: 'background.paper', minHeight: { sm: 0 } }}>
                            <SaveButton />
                        </Toolbar>
                    }
                    record={{}}
                    defaultValues={{ title: "", categories: [] }}
                    sanitizeEmptyValues
                    onSubmit={saveBanner}
                >
                    <TextInput
                        source="title"
                        fullWidth
                        validate={req}
                    />
                
                    <AutocompleteArrayInput 
                        fullWidth 
                        label="Filter Categories" 
                        source="categories"
                        optionText="title" 
                        optionVal="id"
                        choices={categories || []}
                    />

                    <ImageComponent source="image" />

                </SimpleForm>
            </Box>
        </CreateBase>
    );
};

export default BannerCreate;
