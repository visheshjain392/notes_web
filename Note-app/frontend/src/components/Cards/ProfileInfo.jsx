import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ onLogout, userInfo }) => {
    const initials = getInitials(userInfo?.username || 'User');

    return (
        <div className='flex items-center gap-3 max-sm:gap-2 max-sm:text-xs'>
            <div
                className='w-12 h-12 flex items-center justify-center rounded-full
                text-sky-950 font-semibold bg-slate-100 text-lg'
                title={userInfo?.username || 'User'}
            >
                {initials}
            </div>

            <div className='truncate max-w-[100px]'>
                <p className='text-sm font-medium truncate'>{userInfo?.username || 'Guest'}</p>
            </div>

            <button
                className='text-sm bg-red-500 px-2 py-1 rounded-md text-white hover:opacity-80'
                onClick={onLogout}
                aria-label='Logout'
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileInfo;