import {Navigate} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "../../redux/slices/auth";
import {UserInfo} from "../../components";
import axios from "../../axios";


export const Friends = () => {

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.data);

    if (!userData) {
        // Если данные пользователя еще не загрузились, можно вернуть заглушку или отобразить загрузчик
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    const onClickRemoveFriend = async (userId, friendId) => {
        try {
            if (window.confirm("Вы действительно хотите удалить друга?")) {
                await axios.post(`/profile/${userId}/removeFriend/${friendId}`);
                dispatch(fetchAuthMe());
            }
        } catch (err) {
            alert("Не удалось удалить из друзей")
        }
    }

    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <div className={"bg-white h-full w-full rounded border mb-4"}>
            <div className={"p-4"}>
                <div className={"flex text-xl px-2"}>
                    <div>
                        Друзья
                    </div>
                    <div className={"mx-2 text-blue-600"}>
                        {userData?.friends?.length}
                    </div>
                </div>
                <div className={"h-px bg-gray-200 pb-0 my-2 mx-7"}/>
                <div>
                    {
                        userData?.friends.map((friend, index) => (
                            <div key={`friendListItem${index}`}>
                                <div className={"py-2"}>
                                    <UserInfo userId={friend}>
                                        <button onClick={() => onClickRemoveFriend(userData?._id, friend)} className={"pr-2"} aria-label={`Удалить из друзей`} data-balloon-pos={`up`}>
                                            <svg className={"w-6 h-6 text-gray-500 hover:text-red-500"}
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </UserInfo>
                                </div>
                                <div className={"h-px bg-gray-200 pb-0 my-2 mx-7"}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}