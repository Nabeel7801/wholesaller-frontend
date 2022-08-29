import * as React from 'react';
import { EditBase, TextInput, SimpleForm } from 'react-admin';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CategoryEditToolbar from './CategoryEditToolbar';
import ImageComponent from './ImageComponent';

const CategoryEdit = ({ onCancel, ...props }) => {
    
    return (
        <EditBase {...props}>
            <Box pt={5} width={{ xs: '100vw', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {`Edit ${props.type}-Category`}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<CategoryEditToolbar />}
                    defaultValues={{title: "", image: "default.png"}}
                >
                    <TextInput
                        source="title"
                        fullWidth
                    />
                    <ImageComponent source="image" />

                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default CategoryEdit;
