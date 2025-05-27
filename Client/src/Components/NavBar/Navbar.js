import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';

import './Styles/navbar.css';

const Navbar = ({ active, setActive }) => {
    const [click, setClick] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext()

    const handleClick = () => {
        setClick(!click);
    }

    return (
        <div className="nav">

            <div className="logo" onClick={() => (setActive('home'))}>
                <Link to="/" className='link' style={{ marginLeft: '0px' }}>Foodipes</Link>
            </div>
            <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
            </div>
            <div className={click ? "ul-container" : "ul-container hide"}>
                <ul>
                    <Link to="/shop" className="link">
                        <li className={active === 'shop' ? 'active' : ''} onClick={() => { setActive('shop'); setClick(!click); }}>Shop</li>
                    </Link>
                    <Link to="/featured" className="link">
                        <li className={active === 'featured' ? 'active' : ''} onClick={() => { setActive('featured'); setClick(!click); }}>Featured</li>
                    </Link>
                    <Link to="/recipes" className="link">
                        <li className={active === 'recipes' ? 'active' : ''} onClick={() => { setActive('recipes'); setClick(!click); }}>Recipes</li>
                    </Link>
                    <Link to="/hotline" className="link">
                        <li className={active === 'hotline' ? 'active' : ''} onClick={() => { setActive('hotline'); setClick(!click); }}>Hotline</li>
                    </Link>
                </ul>
            </div>
            <div className={click ? "btn-container" : "btn-container hide"} >
                {user && (
                    <>
                        <span style={{marginRight: 10}}>Hi, {user.name} !</span>
                        <Link to="/"><button className="signup-btn" onClick={() => logout()}>Logout</button></Link>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login"><button className="login-btn" onClick={() => { setActive('login'); setClick(!click) }}>Login</button></Link>
                        <Link to="/signup"><button className="signup-btn" onClick={() => { setActive('signup'); setClick(!click) }}>Sign Up</button></Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;