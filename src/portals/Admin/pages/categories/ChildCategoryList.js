import React, { useCallback } from 'react';
import { TopToolbar, CreateButton, ExportButton, List } from 'react-admin';
import { Box, Drawer, Breadcrumbs, Link, Typography } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
 
import CategoryEdit from './CategoryEdit';
import CategoryCreate from './CategoryCreate'
import CategoryGrid from './CategoryGrid'

const CategoryTitle = props => {
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{fontSize: '0.9rem', letterSpacing: '0'}}>
            <Link underline="hover" color="inherit" href="/admin/categories">
                {props.main}
            </Link>

            <Link underline="hover" color="inherit" href="/admin/subcategories">
                {props.sub}
            </Link>

            <Typography color="text.primary" sx={{fontSize: '0.9rem', letterSpacing: '0'}}>Child Categories</Typography>

        </Breadcrumbs>
    )
};

const ChildCategoryList = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const parent = JSON.parse(localStorage.getItem('sub'));
    const main = JSON.parse(localStorage.getItem('main'));

    const handleClose = useCallback(() => {
        navigate('/childcategories');
    }, [navigate]);

    const createMatch = matchPath('/childcategories/create', location.pathname);
    const editMatch = !createMatch && matchPath('/childcategories/:id', location.pathname);

    return (
        <Box display="flex">

            <List
                title={<CategoryTitle main={main.title} sub={parent.title}/>}
                empty={false}
                sort={{ field: 'name', order: 'ASC' }}
                perPage={25}
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
                    <CategoryGrid currPage="child"/>
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
                        type="Child"
                    />
                    :
                    <CategoryCreate
                        onCancel={handleClose}
                        type="Child"
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

export default ChildCategoryList;
