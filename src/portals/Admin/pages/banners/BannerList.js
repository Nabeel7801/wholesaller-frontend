import React, { useCallback } from 'react';
import { TopToolbar, CreateButton, ExportButton, List } from 'react-admin';
import { Box, Drawer } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
 
import BannerEdit from './BannerEdit';
import BannerCreate from './BannerCreate'
import BannerGrid from './BannerGrid'

const BannerList = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        navigate('/banners');
    }, [navigate]);

    const createMatch = matchPath('/banners/create', location.pathname);
    const editMatch = !createMatch && matchPath('/banners/:id', location.pathname);

    return (
        <Box display="flex">

            <List
                title="Banners"
                resource="banners"
                sort={{ field: 'title', order: 'ASC' }}
                perPage={25}
                component="div"
                sx={{
                    flexGrow: 1,
                    transition: (theme) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                }}
                empty={false}
                actions={false}
            >
                <>
                    <ListActions />
                    <BannerGrid />
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
                    <BannerEdit
                        id={editMatch.params.id}
                        onCancel={handleClose}
                    />
                    :
                    <BannerCreate
                        onCancel={handleClose}
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

export default BannerList;
