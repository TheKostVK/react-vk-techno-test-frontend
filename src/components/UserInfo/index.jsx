import React from 'react';

export const UserInfo = ({avatarUrl, userName, additionalText, children}) => {

    return (
        <>
            <div className={"flex justify-content-between"}>
                <div className={"flex align-items-center"}>
                    <div className={"mx-2 flex align-items-center"}>
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                className="object-cover w-full h-full"
                                src={avatarUrl || "/ui/profile/noAvatar.png"}
                                alt="User avatar"
                            />
                        </div>
                    </div>

                    <div className={"pl-2"}>

                        <div className={"text-blue-900 hover:underline text-truncate overflow-hidden"}>

                            {userName}

                        </div>

                        <div className={"text-gray-500 text-sm"}>

                            {additionalText}

                        </div>

                    </div>
                </div>
                {children}
            </div>
        </>
    );
};
