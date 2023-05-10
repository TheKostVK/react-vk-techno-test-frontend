import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "../../axios";

export const UserInfo = ({userId, _id, avatarUrl, userName, additionalText, children}) => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        fetchUserProfile(userId);
    }, [userId]);

    const fetchUserProfile = async (userId) => {
        try {
            if (userId) {
                const {data} = await axios.get(`/profile/${userId}`);
                setUserProfile(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className={"flex justify-content-between"}>
                <div className={"flex align-items-center"}>
                    <div className={"mx-2 flex align-items-center"}>
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                className="object-cover w-full h-full"
                                src={avatarUrl || userProfile.avatarUrl  || "/ui/profile/noAvatar.png"}
                                alt="User avatar"
                            />
                        </div>
                    </div>

                    <div className={"pl-2"}>

                        <Link to={`/profile/${_id || userProfile._id}`} className={"text-blue-900 hover:underline text-truncate overflow-hidden"}>

                            {userName || userProfile.userName}

                        </Link>

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
