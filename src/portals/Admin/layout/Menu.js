import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';

import { DashboardMenuItem, MenuItemLink, useSidebarState, Authenticated } from 'react-admin';

import InventoryIcon from '@mui/icons-material/Inventory';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AddchartIcon from '@mui/icons-material/Addchart';
import OrderIcon from '@mui/icons-material/AttachMoney'
import InvoiceIcon from '@mui/icons-material/LibraryBooks'
import ProductIcon from '@mui/icons-material/Collections'
import StoreIcon from '@mui/icons-material/Store';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import SubMenu from './SubMenu';

const Menu = ({ dense = false }) => {
    const [state, setState] = useState({
        menuCatalog: true,
        menuOrders: true,
        menuPayments: true,
        menuAccounts: true
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
                    icon={<ContentPasteIcon />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/products"
                        state={{ _scrollToTop: true }}
                        primaryText="Products"
                        leftIcon={<InventoryIcon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/categories"
                        state={{ _scrollToTop: true }}
                        primaryText="Categories"
                        leftIcon={<AddchartIcon />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuOrders')}
                    isOpen={state.menuOrders}
                    name="Orders"
                    icon={<OrderIcon />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/orders"
                        state={{ _scrollToTop: true }}
                        primaryText="Orders"
                        leftIcon={<OrderIcon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/invoices"
                        state={{ _scrollToTop: true }}
                        primaryText="Invoices"
                        leftIcon={<InvoiceIcon />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuPayments')}
                    isOpen={state.menuPayments}
                    name="Payments"
                    icon={<OrderIcon />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/payments"
                        state={{ _scrollToTop: true }}
                        primaryText="Payments"
                        leftIcon={<OrderIcon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/receivables"
                        state={{ _scrollToTop: true }}
                        primaryText="Receivables"
                        leftIcon={<StoreIcon />}
                        dense={dense}
                    />
                </SubMenu>

                <SubMenu
                    handleToggle={() => handleToggle('menuAccounts')}
                    isOpen={state.menuAccounts}
                    name="Accounts"
                    icon={<ProductIcon />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/users"
                        state={{ _scrollToTop: true }}
                        primaryText="Users"
                        leftIcon={<PersonPinIcon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/customers"
                        state={{ _scrollToTop: true }}
                        primaryText="Customers"
                        leftIcon={<PersonPinIcon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/warehouses"
                        state={{ _scrollToTop: true }}
                        primaryText="Warehouses"
                        leftIcon={<StoreIcon />}
                        dense={dense}
                    />
                </SubMenu>

            </Box>
        </Authenticated>
    );
};

export default Menu;
