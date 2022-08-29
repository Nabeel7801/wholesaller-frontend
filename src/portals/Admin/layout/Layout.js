import * as React from 'react';
import { Layout as ReactLayout } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';

const Layout = props => {
    return <ReactLayout {...props} appBar={AppBar} menu={Menu} />;
};

export default Layout;