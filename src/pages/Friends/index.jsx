import {Navigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {UserInfo} from "../../components";


export const Friends = () => {

    const isAuth = useSelector(selectIsAuth);

    const userData = useSelector(state => state.auth.data);

    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <div className={"bg-white h-full w-full rounded border mb-4"}>
            <div className={"p-4"}>
                <div className={"text-xl px-2"}>
                    Друзья
                </div>
                <div className={"h-px bg-gray-200 pb-0 my-2 mx-7"}/>
                <div className={"py-2"}>
                    <UserInfo userName={"Test User"}>
                        <button className={"pr-2"} aria-label={`Удалить из друзей`} data-balloon-pos={`up`}>
                            <svg className={"w-6 h-6 text-gray-500 hover:text-red-500"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </UserInfo>
                </div>
                <div className={"h-px bg-gray-200 pb-0 my-2 mx-7"}/>
                <div className={"py-2"}>
                    <UserInfo userName={"Test User"}>
                        <button className={"pr-2"} aria-label={`Удалить из друзей`} data-balloon-pos={`up`}>
                            <svg className={"w-6 h-6 text-gray-500 hover:text-red-500"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </UserInfo>
                </div>
                <div className={"h-px bg-gray-200 pb-0 my-2 mx-7"}/>
                <div className={"py-2"}>
                    <UserInfo userName={"Test User"}>
                        <button className={"pr-2"} aria-label={`Удалить из друзей`} data-balloon-pos={`up`}>
                            <svg className={"w-6 h-6 text-gray-500 hover:text-red-500"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </UserInfo>
                </div>
            </div>
        </div>
    )

}