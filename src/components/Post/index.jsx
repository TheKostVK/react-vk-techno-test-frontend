import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./Skeleton";
import {fetchRemovePost} from "../../redux/slices/posts";
import ReactMarkdown from "react-markdown";

export const Post = ({
                         id,
                         title,
                         createdAt,
                         text,
                         imageUrl,
                         user,
                         viewsCount = 0,
                         isLike = false,
                         commentsCount,
                         tags,
                         children,
                         isFullPost,
                         isLoading,
                         posts,
                         setPosts,
                         isEditable
                     }) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const [hiddenUserList, setHiddenUserList] = useState(true);

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
    return (
        <div className={"bg-white rounded border mb-4"}>
            <div className={"p-4"}>
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
                                    {user._id === userData._id &&
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
                                    <Link className={"w-full"}>
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
                        <ReactMarkdown children={text}/>
                    </div>
                    <div className={"py-2 w-full"}>
                        {imageUrl && imageUrl.length > 0 && imageUrl[0] !== "" && imageUrl.map((obj, index) => (
                            <img
                                src={imageUrl}
                                alt={"img"}
                                key={`img${id}${index}`}
                                className={"rounded-sm mx-auto rounded"}
                                style={{
                                    width: "auto",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        ))}
                        {/*<div className={"py-2 grid grid-cols-3 flex"}>*/}
                        {/*    <div className={"col-span-2"}>*/}
                        {/*        <img*/}
                        {/*            src={imageUrl}*/}
                        {/*            alt={id}*/}
                        {/*            className={"rounded-sm"}*/}
                        {/*            style={{*/}
                        {/*                width: "auto",*/}
                        {/*                objectFit: "cover",*/}
                        {/*                objectPosition: "center",*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <img*/}
                        {/*            src={imageUrl}*/}
                        {/*            alt={id}*/}
                        {/*            className={"rounded-sm"}*/}
                        {/*            style={{*/}
                        {/*                width: "auto",*/}
                        {/*                objectFit: "cover",*/}
                        {/*                objectPosition: "center",*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*        <img*/}
                        {/*            src={imageUrl}*/}
                        {/*            alt={id}*/}
                        {/*            className={"rounded-sm"}*/}
                        {/*            style={{*/}
                        {/*                width: "auto",*/}
                        {/*                objectFit: "cover",*/}
                        {/*                objectPosition: "center",*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                {/*FooterPost*/}
                <div className={"h-px bg-gray-200 pb-0"}/>
                <div className={"flex align-items-center justify-content-between bottom-0"}>
                    <button className={"px-2 pt-2"}>
                        {isLike ? (
                            <div className={"flex align-items-center text-red-400"}>
                                <svg className={"w-6 h-6"}
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                </svg>
                                <div>
                                    12
                                </div>
                            </div>
                        ) : (
                            <div className={"flex align-items-center text-gray-400"}>
                                <svg className={"w-6 h-6 mr-1.5"}
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                                </svg>
                                <div>
                                    12
                                </div>
                            </div>
                        )}
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
