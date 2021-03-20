import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../NavLinks';
import { StateContext } from '../../../Context';
import './styles.css';

function MobileNav() {
    const { title } = useContext(StateContext);

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(prevState => !prevState);
    }

    const showLinks = (clicked) => {
        if (clicked) {
            return 'show-nav--mobile'
        }
    }

    const renderLinks = (links) => {
        return links.map(link => {
            return <li key={link.title}><Link onClick={handleClick} className="menu-link--mobile" to={link.url}>{link.title}</Link></li>  
        });
    }

    const showIcon = (clicked) => {
        if (clicked) {
            return 'fa-times'
        } else {
            return 'fa-bars'
        }
    }

    return(
        <div>
            <div className="nav__logo"><Link to="/">{title}</Link></div>
            <i className={`fa icon--mobile ${showIcon(clicked)}`} onClick={handleClick}></i>
            <nav className={`navbar--mobile ${showLinks(clicked)}`}>
                <ul>
                    {renderLinks(navLinks)}
                </ul>
            </nav>
        </div>
    )
}

export default MobileNav;