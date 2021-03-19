import React from 'react';
import MediaQuery from 'react-responsive';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { breakpoints } from '../../mediaQueries/deviceSizes';

class Header extends React.Component {
    render() {
        return (
            <header>
                <MediaQuery minWidth={breakpoints.tablet.minWidth}>
                    <DesktopNav />
                </MediaQuery>
                <MediaQuery maxWidth={breakpoints.phone.maxWidth}>
                    <MobileNav />
                </MediaQuery>
            </header>
        );
    };
};

export default Header;