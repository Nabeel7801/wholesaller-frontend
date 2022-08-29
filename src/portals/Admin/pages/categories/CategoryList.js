import React, { useCallback } from 'react';
import { TopToolbar, CreateButton, ExportButton, List } from 'react-admin';
import { Box, Drawer } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
 
import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate'
import CategoryGrid from './CategoryGrid'

const CategoryList = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        navigate('/categories');
    }, [navigate]);

    const createMatch = matchPath('/categories/create', location.pathname);
    const editMatch = !createMatch && matchPath('/categories/:id', location.pathname);

    return (
        <Box display="flex">

            <List
                title="Main Categories"
                resource="categories"
                sort={{ field: 'name', order: 'ASC' }}
                perPage={25}
                component="div"
                filter={{parent: "none"}}
                sx={{
                    flexGrow: 1,
                    transition: (theme) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                }}
                actions={false}
            >
                <>
                    <ListActions />
                    <CategoryGrid currPage="main"/>
                </>
            </List>

            <Drawer
                variant="persistent"
                open={!!editMatch || !!createMatch}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
            >
                {editMatch ? 
                    <CategoryEdit
                        id={editMatch.params.id}
                        onCancel={handleClose}
                        type="Main"
                    />
                    :
                    <CategoryCreate
                        onCancel={handleClose}
                        type="Main"
                        parent="none"
                    />
                }
            </Drawer>

        </Box>
    );
}

const ListActions = () => (
    <TopToolbar sx={{ minHeight: { sm: 56 } }}>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export default CategoryList;
