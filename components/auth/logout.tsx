'use client';
import { logout } from '@actions/logout';

interface LogoutbtnProp {
    children?: React.ReactNode;
}

const LogoutBtn = ({ children }: LogoutbtnProp) => {
    const handleClick = () => {
        logout();
    };
    return <span onClick={handleClick} className='cursor-pointer'>{children}</span>;
};

export default LogoutBtn;
