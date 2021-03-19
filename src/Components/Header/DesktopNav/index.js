import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../NavLinks';
import './styles.css';

function DesktopNav() {
    const renderLinks = (links) => {
        return links.map(link => {
            return <li className="nav__list__item" key={link.title}><Link className="nav__list__link" to={link.url}>{link.title}</Link></li>  
        });
    }
    return (
        <div>
            <nav className="nav__container">
                <div className="nav__logo"><Link to="/">Daily Puns</Link></div>
                <ul className="nav__list">
                    {renderLinks(navLinks)}
                </ul>
            </nav>
        </div>
    )
}

export default DesktopNav;