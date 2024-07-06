'use client';

import { logout } from '@actions/logout';
import { useCurrentUser } from '@hooks/use-current-user';
const SettingPage = () => {
    const user = useCurrentUser();
    const signOutBtn = () => {
        logout();
    };
    return (
        <div>
            <button
                onClick={signOutBtn}
                type="submit"
                className="bg-gray-200 py-4 px-12 rounded-sm mt-10 border-none"
            >
                Sign Out
            </button>
        </div>
    );
};

export default SettingPage;
