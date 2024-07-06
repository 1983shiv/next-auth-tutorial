'use client';
import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar';
import { useCurrentUser } from '@hooks/use-current-user';
import LogoutBtn from '@components/auth/logout';

const UserBtn = () => {
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ''} />
                    <AvatarFallback className="bg-gray-300">
                        <FaUser className="text-blue-500" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-40' align='end'>
                <LogoutBtn>
                    <DropdownMenuItem><ExitIcon className='h-4 w-4 mr-2'/> Log Out</DropdownMenuItem>
                </LogoutBtn>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserBtn;
