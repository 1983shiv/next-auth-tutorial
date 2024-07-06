import UserInfo from '@components/user-info';
import { currentUser } from '@lib/currentUser';
const ServerPage = async() => {
    const user = await currentUser();
    return (
        <div className='mt-10'>
        <UserInfo user={user} label="🖥️ Server Components 🖱️"/>
        </div>
    )
}

export default ServerPage