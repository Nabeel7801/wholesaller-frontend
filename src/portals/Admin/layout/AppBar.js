import * as React from 'react';
import { AppBar as ReactAppBar, Logout, UserMenu, ToggleThemeButton } from 'react-admin';
import { Link } from 'react-router-dom';
import { Box, MenuItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from "@material-ui/core/styles";

import Logo from './Logo';
import { darkTheme, lightTheme } from './themes';

const useStyles = makeStyles(() => ({
    button: {
        outline: '0',
        border: 'none',
        '&:focus': {
            outline: '0',
            border: 'none'
        }
    },
}))  

const Spacer = () => <span style={{ width: '1em', color: '#aaa'}} >|</span>;

const ConfigurationMenu = React.forwardRef((props, ref) => {
    return (
        <MenuItem
            component={Link}
            ref={ref}
            {...props}
            to="/settings"
            sx={{width: '200px'}}
        >
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
        </MenuItem>
    );
});

const CustomUserMenu = () => (
    <>
        <Spacer />
        <UserMenu sx={{borderLeft: '1px solid #ddd'}}>
            <ConfigurationMenu style={{paddingRight: '1.5em'}}/>
            <Logout style={{paddingRight: '1.5em'}}/>
        </UserMenu>
    </>
);

const AppBar = props => {
    const isLargeEnough = useMediaQuery(theme =>
        theme.breakpoints.up('sm')
    );
    const classes = useStyles();
    return (
        <ReactAppBar
            {...props}
            color="secondary"
            elevation={1}
            userMenu={<CustomUserMenu />}
        >
            <Typography
                variant="h6"
                color="inherit"
                sx={{
                    flex: 1,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
                id="react-admin-title"
            />
            {isLargeEnough && <Logo />}
            
            {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}

            <ToggleThemeButton
                lightTheme={lightTheme}
                darkTheme={darkTheme}
                className={classes.button}
            />
            
        </ReactAppBar>
    );
};

export default AppBar;
