import React, { ReactElement } from 'react';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { NavLink } from 'react-router-dom';

interface ILinks {
    id: number;
    text: string;
    path: string;
    icon: ReactElement
}

const links: ILinks[] = [
    { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
    { id: 2, text: 'all jobs', path: 'all-jobs', icon: <MdQueryStats /> },
    { id: 3, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
    { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> }
]

interface INavLinks {
    toggleSidebar?: () => void;
}

const NavLinks: React.FC<INavLinks> = ({ toggleSidebar }) => {
    const handleToggleSidebar = () => {
        if (toggleSidebar) {
            toggleSidebar()
        } else {
            // do nothing;
            return;
        }
    }
    return (
        <div className='nav-links'>
            {links.map((link) => {
                const { id, text, path, icon } = link;
                return (
                    <NavLink
                        key={id}
                        to={path}
                        className={({ isActive }) => {
                            return isActive ? 'nav-link active' : 'nav-link'
                        }}
                        onClick={() => handleToggleSidebar()}
                    >
                        <span className='icon'>
                            {icon}
                        </span>
                        {text}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavLinks