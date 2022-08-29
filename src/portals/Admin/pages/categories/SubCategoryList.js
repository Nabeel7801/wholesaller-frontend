import React, { useCallback } from 'react';
import { TopToolbar, CreateButton, ExportButton, List } from 'react-admin';
import { Box, Drawer, Breadcrumbs, Link, Typography } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
 
import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate'
import CategoryGrid from './CategoryGrid'

const CategoryTitle = props => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin/categories">
                {props.main}
            </Link>

            <Typography color="text.primary">Sub Categories</Typography>

        </Breadcrumbs>
    )
};

const SubCategoryList = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const parent = JSON.parse(localStorage.getItem('main'));

    const handleClose = useCallback(() => {
        navigate('/subcategories');
    }, [navigate]);
    
    const createMatch = matchPath('/subcategories/create', location.pathname);
    const editMatch = !createMatch && matchPath('/subcategories/:id', location.pathname);
    return (
        <Box display="flex">

            <List
                title={<CategoryTitle main={parent.title}/>}
                sort={{ field: 'name', order: 'ASC' }}
                perPage={25}
                empty={false}
                component="div"
                filter={{parent: parent.id}}
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
                    <CategoryGrid currPage="sub"/>
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
                        type="Sub"
                    />
                    :
                    <CategoryCreate
                        onCancel={handleClose}
                        type="Sub"
                        parent={parent.id}
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

export default SubCategoryList;
