import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./Post.module.scss"

import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./Skeleton";
import {fetchRemovePost} from "../../redux/slices/posts";
import axios from "../../axios";

export const Post = ({
                         id,
                         createdAt,
                         text,
                         imageUrl,
                         user,
                         viewsCount = 0,
                         likesCount = 0,
                         likes = [],
                         tags,
                         isLoading,
                         posts,
                         setPosts,
                     }) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const [isLike, setIsLike] = useState(likes.includes(userData?._id));
    const [countLike, setCountLike] = useState(likesCount);
    const [selectedImage, setSelectedImage] = useState("");
    const [hiddenUserList, setHiddenUserList] = useState(true);
    const [fullText, setFullText] = useState(false);

    if (isLoading) {
        return <PostSkeleton/>;
    }

    const onClickHiddenUserList = () => {
        if (hiddenUserList) {
            setHiddenUserList(false);
        } else {
            setHiddenUserList(true);
        }
    }

    const onClickRemove = (id) => {
        if (window.confirm("Вы действительно хотите удалить запись?")) {
            const updatedPosts = posts.filter(post => post._id !== id);
            setPosts(updatedPosts);
            dispatch(fetchRemovePost(id));
        }
    };

    const onClickLike = async (id) => {
        try {
            if (isLike) {
                await axios.post(`/posts/${id}/removeLike/${userData._id}`);
                setCountLike((prevState) => prevState - 1);
                setIsLike(false);
            } else {
                await axios.post(`/posts/${id}/addLike/${userData._id}`);
                setCountLike((prevState) => prevState + 1);
                setIsLike(true);
            }
        } catch (err) {
            console.warn(err);
            alert("Ошибка likePost");
        }
    };


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
    };


    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        // При открытии модального окна
        document.documentElement.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        setSelectedImage("");
        // При закрытии модального окна
        document.documentElement.style.overflow = '';
    };

    return (
        <div className={"bg-white rounded border mb-4"}>
            <div className={"p-3"}>
                {/*UserInfo*/}
                <UserInfo {...user} additionalText={formattedDate(createdAt)}>
                    <div className={"position-relative"}>
                        <button onClick={() => onClickHiddenUserList()} className={"pr-2"}>
                            <svg className={"w-6 h-6 text-gray-500"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </button>
                        <div className={`position-absolute top-full -left-28 ${!hiddenUserList ? 'show' : 'hidden'}`}>
                            <div className={"position-relative"}>

                                <div className={"bg-white border border-gray-300 w-36 py-1 rounded shadow-sm"}>
                                    {user?._id === userData?._id &&
                                        <>
                                            <button onClick={() => onClickRemove(id)}
                                                    className={"w-full text-center py-1 text-blue-900"}>
                                                Удалить
                                            </button>
                                            <div className={"h-px bg-gray-200"}/>
                                            <Link to={`/posts/${id}/edit`} className={"w-full"}>
                                                <div className={"py-1 text-center text-blue-900 text-truncate"}>
                                                    Редактировать
                                                </div>
                                            </Link>
                                            <div className={"h-px bg-gray-200"}/>
                                        </>
                                    }
                                    <Link to={`/profile/${user?._id}`} className={"w-full"}>
                                        <div className={"py-1 text-center text-blue-900 text-truncate"}>
                                            Автор поста
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </UserInfo>
                {/*PostsBody*/}
                <div className={"py-2 pt-4"}>
                    <div>
                        <ul className={"flex"}>
                            {tags && tags.length > 0 && tags[0] !== "" && tags.map((name, index) => (
                                <li key={`tags${id}${index}`}
                                    className={"py-2 pr-2 text-center text-truncate text-blue-900"}>#{name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {text.length > 1000 && !fullText ? (
                            <>
                                {text.slice(0, 1000)}
                                <button onClick={() => setFullText(true)} className={"text-center text-blue-900"}>
                                    ... Показать полностью
                                </button>
                            </>
                        ) : (
                            text
                        )}
                    </div>
                    <div className={`flex flex-shrink-0 my-4 flex-wrap`}>
                        {
                            Array.isArray(imageUrl) && imageUrl[0] !== "" ? (
                                imageUrl.length === 1 ? (
                                    imageUrl.map((obj, index) => (
                                        <img
                                            key={`imgPostId${id}${index}`}
                                            src={obj}
                                            alt="img"
                                            className="w-auto h-auto rounded mx-auto my-1"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            onClick={() => openImageModal(obj)}
                                        />
                                    ))
                                ) : (
                                    imageUrl.length > 1 && imageUrl[0] !== "" && imageUrl.map((obj, index) => (
                                        <img
                                            key={`imgPostId${id}${index}`}
                                            src={obj}
                                            alt="img"
                                            className="w-64 h-36 rounded mx-auto my-1"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            onClick={() => openImageModal(obj)}
                                        />
                                    ))
                                )
                            ) : null
                        }

                    </div>
                    {/* Модальное окно для просмотра картинки */}
                    {selectedImage && (
                        <div
                            className="fixed px-3 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
                            style={{zIndex: 2}}>
                            <div className="max-w-6xl max-h-full">
                                <img
                                    src={selectedImage}
                                    alt="img"
                                    className="image-modal__image"
                                    style={{maxHeight: '80vh'}}
                                />
                            </div>
                            <button
                                onClick={closeImageModal}
                                className="absolute top-12 right-4 text-white text-3xl"
                            >
                                &times;
                            </button>
                        </div>
                    )}
                </div>
                {/*FooterPost*/}
                <div className={"h-px bg-gray-200 pb-0"}/>
                <div className={"flex align-items-center justify-content-between bottom-0"}>
                    <button className={"px-2 pt-2"} onClick={() => onClickLike(id)}>
                        <div className={`flex align-items-center ${isLike ? "text-red-400" : "text-gray-400"}`}>
                            <svg className={"w-6 h-6"}
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                            </svg>
                            <div>
                                {countLike}
                            </div>
                        </div>
                    </button>
                    <div className={"flex align-items-center px-2 pt-2 text-gray-400"}>
                        <svg className={"w-6 h-6 mr-1.5"}
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
                            <path fillRule="evenodd"
                                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                  clipRule="evenodd"/>
                        </svg>
                        <div>
                            {viewsCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
