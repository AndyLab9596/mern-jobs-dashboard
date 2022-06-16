import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from './SmallSideBar.style';
import { FaTimes } from 'react-icons/fa';
import Logo from '../Logo';
import NavLinks from '../NavLinks';
const SmallSideBar = () => {
    const { showSidebar, toggleSidebar } = useAppContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>

                <div className='content'>
                    <button type='button' className='close-btn' onClick={() => toggleSidebar()}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar} />
                </div>

            </div>
        </Wrapper>
    )
}

export default SmallSideBar