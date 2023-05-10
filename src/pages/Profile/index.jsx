import React, {useEffect, useState} from "react";

import {fetchAuthMe, selectIsAuth} from "../../redux/slices/auth";
import {useSelector, useDispatch} from "react-redux";
import {Navigate, useParams, Link} from "react-router-dom";

import "./Profile.module.scss";
import {AddPost, Post, UserInfo} from "../../components";
import axios from "../../axios";


export const Profile = ({search, setSearch}) => {
    const {id} = useParams();
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const [userProfile, setUserProfile] = useState([]);

    const [isFriend, setIsFriend] = useState(false);
    const [countFriend, setCountFriend] = useState(0);

    const [hiddenUserList, setHiddenUserList] = useState(true);
    const [buttonHiddenText, setButtonHiddenText] = useState("Показать подробную информацию");

    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postCountServer, setPostCountServer] = useState(0);

    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [isPostsFetching, setIsPostsFetching] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        dispatch(fetchAuthMe());
        setLoad(true);
    }, [dispatch]);

    useEffect(() => {
        setPosts([]);
        setCurrentPage(1);
        setPostCountServer(1);
        setFetching(true);
        fetchUserProfile(id, userData?.friends);
    }, [id, load]);

    useEffect(() => {
        fetchDataPosts(id);
    }, [fetching]);

    useEffect(() => {
        if (userData && userProfile) {
            setCountFriend(userProfile?.friends?.length);
            setIsFriend(userData.friends && userData.friends.includes(userProfile._id));
        }
    }, [userData, userProfile]);


    const fetchUserProfile = async (id, friends) => {
        try {
            setIsFriend(friends && friends.includes(id));
            const {data} = await axios.get(`/profile/${id}`);
            setUserProfile(data);
        } catch (error) {
            console.log(error);
        }
    }

    const searchHeader = (value) => {
        setSearch(value);
    }

    const filteredItems = posts.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()) ||
        item.user.userName.toLowerCase().includes(search.toLowerCase())
    );

    const onClickAddFriend = async (userId, friendId) => {
        try {
            await axios.post(`/profile/${userId}/addFriend/${friendId}`);
            setIsFriend(true);
        } catch (err) {
            alert("Не удалось добавить в друзья")
        }
    }

    const onClickRemoveFriend = async (userId, friendId) => {
        try {
            await axios.post(`/profile/${userId}/removeFriend/${friendId}`);
            setIsFriend(false);
        } catch (err) {
            alert("Не удалось удалить из друзей")
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
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

    if (!userData && !userProfile) {
        // Если данные пользователя еще не загрузились, можно вернуть заглушку или отобразить загрузчик
        return (
            <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    async function fetchDataPosts(id) {
        try {
            if (postCountServer !== posts.length) {
                setFetching(false);
                axios.get(`/posts/user/${id}/p?page=${currentPage}&perPage=6`).then(
                    response => {
                        setPosts([...posts, ...response.data.posts]);
                        setPostCountServer(response.data.pageInfo.totalPosts);
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
                            src={userProfile?.avatarUrl || "/ui/profile/noAvatarBig.png"}
                            alt={userProfile?.userName}
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
                        {
                            userData?._id === userProfile?._id && (
                                <button
                                    type="button"
                                    className={"focus:outline-none  bg-gray-200 rounded-sm w-full mb-2 py-1 text-gray-500 hover:text-gray-400"}>
                                    Редактировать
                                </button>
                            )
                        }
                        {userData?._id !== userProfile?._id &&
                            (isFriend ?

                                    (
                                        <button onClick={() => onClickRemoveFriend(userData?._id, userProfile?._id)}
                                                type="button"
                                                className={"focus:outline-none rounded-sm w-full py-1 bg-blue-600 bg-opacity-75 text-white"}>
                                            Удалить из друзей
                                        </button>
                                    ) : (
                                        <button onClick={() => onClickAddFriend(userData?._id, userProfile?._id)}
                                                type="button"
                                                className={"focus:outline-none rounded-sm w-full py-1 bg-blue-600 bg-opacity-75 text-white"}>
                                            Добавить в друзья
                                        </button>
                                    )
                            )
                        }
                    </div>
                </div>

                {/*Friends*/}
                <div className={"bg-white rounded border mb-4"}>
                    <div className={"flex justify-content-between align-items-center"}>
                        {userData && userProfile && userData?._id === userProfile?._id ?
                            (
                                <Link to={"/friends"} className={"px-3 py-2"}>
                                    Друзья
                                    <span className={"text-gray-500 pl-2"}>
                                        {countFriend}
                                    </span>
                                </Link>
                            ) : (
                                <div className={"px-3 py-2"}>
                                    Друзья
                                    <span className={"text-gray-500 pl-2"}>
                                {countFriend}
                            </span>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            userData && userProfile.friends && userProfile?.friends.map((friend, index) => (
                                <div key={`friendListItem${index}`} className={"p-2"}>
                                    <UserInfo userId={friend}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className={"flex-1 w-full"}>
                {/*UserInfo*/}
                <div className={"bg-white w-full rounded border pb-1.5 mb-4"}>
                    <div className={"px-3 pt-3"}>
                        <div className={"flex justify-content-between align-items-center"}>
                            <div className={"text-xl"}>
                                {userProfile?.userName}
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
                                    {formatDate(userProfile.wasBorn)}
                                </div>
                            </div>

                        </div>

                        <button onClick={() => onClickHiddenUserList()}
                                className={"grid grid-cols-3 gap-2 hover:bg-gray-100 w-full py-2 rounded focus:outline-none text-blue-900 text-left"}>
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
                                </div>
                                <div className={"col-span-2"}>
                                    <div>
                                        {userProfile?.email}
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
                                        {userProfile.university || "Информация отсутствует"}
                                    </div>
                                    <div>
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
                                </div>
                                <div className={"col-span-2"}>
                                    <div>
                                        {formatDate(userProfile?.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*AllInfo*/}
                    <div className={"flex justify-content-center align-items-center border-t"}>
                        <div className={"block p-3 text-center"}>
                            <div className={"text-blue-900 text-xl"}>
                                {countFriend}
                            </div>
                            <div className={"text-gray-500"}>
                                Друзья
                            </div>
                        </div>
                        <div className={"block p-3 text-center"}>
                            <div className={"text-blue-900 text-xl"}>
                                {postCountServer}
                            </div>
                            <div className={"text-gray-500"}>
                                Постов
                            </div>
                        </div>
                    </div>
                </div>
                {/*AddPost*/}
                {
                    userData?._id === userProfile?._id && <AddPost sizeBlock={560} posts={posts} setPosts={setPosts}/>
                }
                {/*Feed*/}
                <div className={"bg-white w-full rounded border mb-4 flex"}>
                    <div className={"p-3 w-full"}>
                        <div className={"position-relative w-full hidden md:grid"}>
                            <input
                                className={"w-full h-8 pr-4 pl-8 rounded-lg bg-gray-100 focus:outline-none placeholder-gray-500"}
                                value={search} onChange={(e) => searchHeader(e.target.value)}
                                type={"text"} placeholder={"Поиск по записям"}/>
                            <div
                                className={"absolute top-0 left-0 h-full w-8 flex justify-content-center align-items-center"}>
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
                            text={obj.text}
                            imageUrl={obj.imageUrl}
                            user={obj.user}
                            createdAt={obj.createdAt}
                            viewsCount={obj.viewsCount}
                            likesCount={obj.likesCount}
                            likes={obj.likes}
                            commentsCount={3}
                            tags={obj.tags}
                            posts={posts}
                            setPosts={setPosts}
                            isEditable={obj.user._id === id}
                        />
                    ))}
            </div>
        </>
    );
};
