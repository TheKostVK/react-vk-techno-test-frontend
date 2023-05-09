import React, {useEffect, useState} from "react";

import {selectIsAuth} from "../../redux/slices/auth";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import "./Profile.module.scss";
import {AddPost, Post} from "../../components";
import axios from "../../axios";


export const Profile = () => {
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(state => state.auth.data);
    const [hiddenUserList, setHiddenUserList] = useState(true);
    const [buttonHiddenText, setButtonHiddenText] = useState("Показать подробную информацию");

    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [isPostsFetching, setIsPostsFetching] = useState(false);
    const [fetching, setFetching] = useState(false);

    const [search, setSearch] = useState('');

    const searchHeader = (value) => {
        setSearch(value);
    }

    const formattedDate = (userDataTime) => {
        const date = new Date(userDataTime);
        const dateFormat = new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        return dateFormat.format(date);
    }

    const onClickHiddenUserList = () => {
        if (hiddenUserList) {
            setButtonHiddenText("Скрыть подробную информацию");
            setHiddenUserList(false);
        } else {
            setButtonHiddenText("Показать подробную информацию");
            setHiddenUserList(true);
        }
    }


    useEffect(() => {
        fetchDataPosts();
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && !isPostsFetching) {
            setFetching(true);
        }
    }

    const filteredItems = posts.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()),
    );

    async function fetchDataPosts() {
        try {
            if (currentPage !== totalPages + 1) {
                setIsPostsFetching(false);
                axios.get(`/posts/user/${userData._id}/p?page=${currentPage}&perPage=6`).then(
                    response => {
                        setPosts([...posts, ...response.data.posts]);
                        setTotalPages(response.data.pageInfo.totalPages);
                        setCurrentPage((prevState) => prevState + 1);
                    }
                ).finally(() => {
                    setFetching(false);
                    setIsPostsFetching(false);
                    setIsPostsLoading(false);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <div className={"w-56 mr-2 flex-shrink-0"}>
                {/*UserAvatar*/}
                <div className={"bg-white rounded border p-3 pb-1.5 mb-4"}>

                    <div className={"position-relative mb-2 group"}>
                        <img
                            src={userData.avatarUrl || "%PUBLIC_URL%//ui/profile/noAvatar.png"}
                            alt={userData.userName}
                            className={"rounded-sm"}
                            style={{
                                width: "auto",
                                height: "210px",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                        <div className={"position-absolute top-0 right-0"}>
                            <button className={"bg-black text-white rounded-tr rounded-bl focus:outline-none"}>
                                <svg className={"w-6"}
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <button type="button"
                                className={"focus:outline-none  bg-gray-200 rounded-sm w-full mb-2 py-1 text-gray-500 hover:text-gray-400"}>
                            Редактировать
                        </button>
                    </div>
                    <div>
                        <button type="button"
                                className={"focus:outline-none rounded-sm w-full py-1 bg-blue-600 bg-opacity-75 text-white"}>
                            Добавить в друзья
                        </button>
                    </div>
                </div>

                {/*Friends*/}
                <div className={"bg-white rounded border mb-4"}>
                    <div className={"flex justify-content-between align-items-center"}>
                        <div className={"px-3 pt-2"}>
                            Друзья
                            <span className={"text-gray-500 pl-2"}>
                                52
                            </span>
                        </div>
                    </div>
                    <div className={"grid grid-cols-3 gap-3 p-3"}>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noAvatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name1
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noAvatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name2
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noAvatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name3
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noAvatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name4
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={"px-1"}>
                                <img className={"rounded-full"} src={"/ui/profile/noAvatar.png"} alt={"Аватар"}/>
                            </div>
                            <div className={"text-center text-truncate"}>
                                <div className={"text-blue-900 hover:underline"}>
                                    Name5
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={"flex-1 w-full"}>
                {/*UserInfo*/}
                <div className={"bg-white w-full rounded border pb-1.5 mb-4"}>
                    <div className={"px-3 pt-3"}>
                       <div className={"flex justify-content-between align-items-center"}>
                           <div className={"text-xl"}>
                               {userData.userName}
                           </div>
                           <div className={"text-gray-500"}>
                               online
                           </div>
                       </div>
                        <div className={"px-3 h-px bg-gray-200 my-2"}/>
                    </div>
                    <div className={"px-3 pb-3 space-y-2"}>
                        <div className={"grid grid-cols-3 gap-2"}>
                            <div>
                                <div className={"text-gray-500"}>
                                    День рождения:
                                </div>
                            </div>
                            <div className={"col-span-2"}>
                                <div>
                                    30 июня 2003 г.
                                </div>
                            </div>

                        </div>

                        <button onClick={() => onClickHiddenUserList()} className={"grid grid-cols-3 gap-2 hover:bg-gray-100 w-full py-2 rounded focus:outline-none text-blue-900 text-left"}>
                            <div>

                            </div>
                            <div className={"col-span-2"}>
                                {buttonHiddenText}
                            </div>
                        </button>

                        <div className={`${!hiddenUserList ? 'show' : 'hidden'}`}>

                            <div className={`flex my-2 align-items-center mt-3`}>
                                <div>
                                    Контактная информация
                                </div>
                                <div className={"flex-1"}>
                                    <div className={"h-px ml-3 bg-gray-200"}></div>
                                </div>
                            </div>

                            <div className={"grid grid-cols-3 gap-2"}>
                                <div>
                                    <div className={"text-gray-500"}>
                                        Электронная почта
                                    </div>
                                    <div className={"text-gray-500"}>
                                        Дата регистрации
                                    </div>
                                </div>
                                <div className={"col-span-2"}>
                                    <div>
                                        {userData.email}
                                    </div>
                                    <div>
                                        {formattedDate(userData.createdAt)}
                                    </div>
                                </div>
                            </div>

                            <div className={`flex my-2 align-items-center mt-3`}>
                                <div>
                                    Образование
                                </div>
                                <div className={"flex-1"}>
                                    <div className={"h-px ml-3 bg-gray-200"}></div>
                                </div>
                            </div>
                            <div className={"grid grid-cols-3 gap-2"}>
                                <div>
                                    <div className={"text-gray-500"}>
                                        ВУЗ
                                    </div>
                                    <div className={"text-gray-500"}>
                                        Школа
                                    </div>
                                </div>
                                <div className={"col-span-2"}>
                                    <div>
                                        .....
                                    </div>
                                    <div>
                                        .....
                                    </div>
                                    <div className={"text-gray-500"}>
                                        Информация отсутствует
                                    </div>
                                </div>
                            </div>


                            <div className={`flex my-2 align-items-center mt-3`}>
                                <div>
                                    Информация об аккаунте
                                </div>
                                <div className={"flex-1"}>
                                    <div className={"h-px ml-3 bg-gray-200"}></div>
                                </div>
                            </div>
                            <div className={"grid grid-cols-3 gap-2"}>
                                <div>
                                    <div className={"text-gray-500"}>
                                        Дата регистрации
                                    </div>
                                    <div className={"text-gray-500"}>
                                        Дата обновления
                                    </div>
                                </div>
                                <div className={"col-span-2"}>
                                    <div>
                                        {formattedDate(userData.createdAt)}
                                    </div>
                                    <div>
                                        {formattedDate(userData.updatedAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*AllInfo*/}
                    <div className={"flex justify-content-center align-items-center border-t"}>
                        <div className={"block p-3 text-center"}>
                            <div className={"text-blue-900 text-xl"}>
                                56
                            </div>
                            <div className={"text-gray-500"}>
                                Друга
                            </div>
                        </div>
                        <div className={"block p-3 text-center"}>
                            <div className={"text-blue-900 text-xl"}>
                                10
                            </div>
                            <div className={"text-gray-500"}>
                                Постов
                            </div>
                        </div>
                    </div>
                </div>
                {/*AddPost*/}
                <AddPost sizeBlock={560} posts={posts} setPosts={setPosts}/>
                {/*Feed*/}
                <div className={"bg-white w-full rounded border mb-4 flex"}>
                    <div className={"p-3 w-full"}>
                        <div className={"position-relative w-full hidden md:grid"}>
                            <input
                                className={"w-full h-8 pr-4 pl-8 rounded-lg bg-gray-100 focus:outline-none placeholder-gray-500"}
                                value={search} onChange={(e) => searchHeader(e.target.value)}
                                type={"text"} placeholder={"Поиск по записям"}/>
                            <div className={"absolute top-0 left-0 h-full w-8 flex justify-content-center align-items-center"}>
                                <svg className={"w-4 h-4 text-gray-400"} xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {(isPostsLoading ? [...Array(1)] : filteredItems).map((obj, index) =>
                    isPostsLoading ? (
                        <Post key={index} isLoading={true}/>
                    ) : (
                        <Post
                            key={obj._id}
                            id={obj._id}
                            title={obj.title}
                            text={obj.text}
                            imageUrl={obj.imageUrl}
                            user={obj.user}
                            createdAt={obj.createdAt}
                            viewsCount={obj.viewsCount}
                            commentsCount={3}
                            tags={obj.tags}
                            isLoading={isPostsLoading}
                            posts={posts}
                            setPosts={setPosts}
                            isEditable={obj.user._id === userData?._id}
                        />
                    ))}
            </div>
        </>
    );
};
