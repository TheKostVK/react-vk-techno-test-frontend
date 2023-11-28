import {Link} from "react-router-dom";
import React from "react";

import "./MobMenu.module.scss";
import {useSelector} from "react-redux";

export const MobMenu = () => {

    const userData = useSelector(state => state.auth.data);

    return (
        <div className={"bg-white border-bottom block md:hidden headerMob"}>
            <div className={"container"} style={{maxWidth: 1106}}>
                <div className={"flex align-items-center justify-content-between mt-1"} style={{height: 50}}>
                    {/*Profile*/}
                    <Link to={`/profile/${userData?._id}`}
                          className={"hover:bg-gray-100 justify-content-center align-items-center"}
                          style={{height: 49, maxWidth: 88}}>
                        <svg className={"w-6 text-gray-400 mx-8"}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <div className={"text-sm text-center truncate"}>
                            Профиль
                        </div>
                    </Link>
                    {/*Feed*/}
                    <Link to="/feed"
                          className={"hover:bg-gray-100 justify-content-center align-items-center"}
                          style={{height: 49}}>
                        <svg className={"w-6 text-gray-400 mx-8"}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"/>
                        </svg>
                        <div className={"text-sm text-center"}>
                            Новости
                        </div>
                    </Link>
                    {/*Friends*/}
                    <Link to="/friends"
                          className={"hover:bg-gray-100 justify-content-center align-items-center"}
                          style={{height: 49}}>
                        <svg className={"w-6 text-gray-400 mx-8"}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                        </svg>
                        <div className={"text-sm text-center"}>
                            Друзья
                        </div>
                    </Link>
                    {/*Message*/}
                    <Link aria-label={"В разработке!"} data-balloon-pos={"up"}
                          className={"hover:bg-gray-100 justify-content-center align-items-center"}
                          style={{height: 49}}>
                        <svg className={"w-6 text-gray-400 mx-8"}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                        </svg>
                        <div className={"text-sm text-center"}>
                            Сообщения
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )

}