import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../NavLinks';
import { StateContext } from '../../../Context';
import './styles.css';

function DesktopNav() {
    const { title } = useContext(StateContext);

    const renderLinks = (links) => {
        return links.map(link => {
            return <li className="nav__list__item" key={link.title}><Link className="nav__list__link" to={link.url}>{link.title}</Link></li>  
        });
    }
    return (
        <div>
            <nav className="nav__container">
                <div className="nav__logo"><Link to="/">{title}</Link></div>
                <ul className="nav__list">
                    {renderLinks(navLinks)}
                </ul>
            </nav>
        </div>
    )
}

export default DesktopNav;