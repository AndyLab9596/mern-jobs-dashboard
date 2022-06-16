import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from './Navbar.style'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from '../Logo';

const Navbar = () => {
    const { toggleSidebar, user, logoutUser } = useAppContext();
    const [showLogOut, setShowLogOut] = useState<boolean>(false);
    return (
        <Wrapper>
            <div className='nav-center'>
                {/* Button icon */}
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                {/* Logo */}
                <div>
                    <Logo />
                    <h3 className='logo-text'>
                        Dashboard
                    </h3>
                </div>
                {/* user name and logout */}
                <div className='btn-container'>
                    <button type='button' className='btn'
                        onClick={() => setShowLogOut(prevState => !prevState)}
                    >
                        <FaUserCircle />
                        {!!user && user.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogOut ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn'
                            onClick={() => logoutUser()}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar