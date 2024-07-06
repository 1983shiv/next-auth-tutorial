"use client"

import { useCurrentUser } from '@hooks/use-current-user';
import UserInfo from '@components/user-info';

const ClientPage = () => {
  const user = useCurrentUser();
    return (
        <div className='mt-10'>
        <UserInfo user={user} label="💻 Client Components"/>
        </div>
    )
}

export default ClientPage