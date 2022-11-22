import * as React from 'react';
import { EditBase, TextInput, SimpleForm, AutocompleteArrayInput, useGetList } from 'react-admin';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BannerEditToolbar from './BannerEditToolbar';
import ImageComponent from './ImageComponent';

const BannerEdit = ({ onCancel, ...props }) => {
        
    const { data: categories } = useGetList('categories', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'title', order: 'ASC' },
        filter: {},
    });

    return (
        <EditBase {...props}>
            <Box pt={5} width={{ xs: '100vw', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {`Edit Banner`}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<BannerEditToolbar />}
                    defaultValues={{title: "", image: "default.png"}}
                >
                    <TextInput
                        source="title"
                        fullWidth
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
        </EditBase>
    );
};

export default BannerEdit;
