import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';

import { DashboardMenuItem, MenuItemLink, useSidebarState, Authenticated } from 'react-admin';
import { Inventory, ContentPaste, Addchart, AttachMoney, LibraryBooks, Collections, Store, PeopleAlt, PersonPin, PermDataSetting, ViewCarouselOutlined } from '@mui/icons-material';

import SubMenu from './SubMenu';

const Menu = ({ dense = false }) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuOrders: true,
        menuPayments: true,
        menuAccounts: true,
        menuSettings: true
    });
    const [open] = useSidebarState();

    const handleToggle = menu => {
        setState(prevState => ({ ...prevState, [menu]: !prevState[menu] }));
    };

    return (
        <Authenticated>
            <Box
                sx={{
                    width: open ? 200 : 50,
                    marginTop: 1,
                    marginBottom: 1,
                    transition: theme =>
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                }}
            >

                <DashboardMenuItem />

                <SubMenu
                    handleToggle={() => handleToggle('menuCatalog')}
                    isOpen={state.menuCatalog}
                    name="Catalog"
                    icon={<ContentPaste />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/products"
                        state={{ _scrollToTop: true }}
                        primaryText="Products"
                        leftIcon={<Inventory />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/categories"
                        state={{ _scrollToTop: true }}
                        primaryText="Categories"
                        leftIcon={<Addchart />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuOrders')}
                    isOpen={state.menuOrders}
                    name="Orders"
                    icon={<AttachMoney />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/orders"
                        state={{ _scrollToTop: true }}
                        primaryText="Orders"
                        leftIcon={<AttachMoney />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/invoices"
                        state={{ _scrollToTop: true }}
                        primaryText="Invoices"
                        leftIcon={<LibraryBooks />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuPayments')}
                    isOpen={state.menuPayments}
                    name="Payments"
                    icon={<AttachMoney />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/payments"
                        state={{ _scrollToTop: true }}
                        primaryText="Payments"
                        leftIcon={<AttachMoney />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuAccounts')}
                    isOpen={state.menuAccounts}
                    name="Accounts"
                    icon={<Collections />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/users"
                        state={{ _scrollToTop: true }}
                        primaryText="Users"
                        leftIcon={<PersonPin />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/customers"
                        state={{ _scrollToTop: true }}
                        primaryText="Customers"
                        leftIcon={<PeopleAlt />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/warehouses"
                        state={{ _scrollToTop: true }}
                        primaryText="Warehouses"
                        leftIcon={<Store />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuSettings')}
                    isOpen={state.menuSettings}
                    name="Settings"
                    icon={<PermDataSetting />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/banners"
                        state={{ _scrollToTop: true }}
                        primaryText="Banners"
                        leftIcon={<ViewCarouselOutlined />}
                        dense={dense}
                    />
                </SubMenu>
            </Box>
        </Authenticated>
    );
};

export default Menu;
