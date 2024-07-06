'use client';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import { usePathname } from 'next/navigation';
import UserBtn from '@components/auth/user-btn';

const NavBar = () => {
    const pathname = usePathname();
    return (
        <nav className="bg-secondary flex p-4 justify-between rounded-xl w-[600px] items-center shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname === '/server' ? 'default' : 'outline'}
                >
                    <Link href="/server">Server</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === '/client' ? 'default' : 'outline'}
                >
                    <Link href="/client">Client</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === '/admin' ? 'default' : 'outline'}
                >
                    <Link href="/admin">Admin</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === '/settings' ? 'default' : 'outline'}
                >
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <UserBtn />
        </nav>
    );
};

export default NavBar;
