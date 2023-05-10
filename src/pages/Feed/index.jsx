import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {Post} from "../../components/Post";
import {Link, Navigate} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";
import {AddPost} from "../../components";

export const Feed = ({search, setSearch}) => {
    const userData = useSelector(state => state.auth.data);

    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postCountServer, setPostCountServer] = useState(1);

    const isAuth = useSelector(selectIsAuth);

    const [isPostsLoadingStart, setIsPostsLoadingStart] = useState(true);
    const [isPostsFetching, setIsPostsFetching] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchDataPosts();
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const searchHeader = (value) => {
        setSearch(value);
    }

    const filteredItems = posts.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()) ||
        item.user.userName.toLowerCase().includes(search.toLowerCase())
    );


    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }

    async function fetchDataPosts() {
        try {
            if (postCountServer !== posts.length) {
                setIsPostsFetching(false);
                axios.get(`/posts/p?page=${currentPage}&perPage=6`).then(
                    response => {
                        setPosts([...posts, ...response.data.posts]);
                        setPostCountServer(response.data.pageInfo.totalPosts);
                        setCurrentPage((prevState) => prevState + 1);
                    }
                ).finally(() => {
                    setFetching(false);
                    setIsPostsFetching(false);
                    setIsPostsLoadingStart(false);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && !isPostsFetching) {
            setFetching(true);
        }
    }

    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }


    return (
        <div className={"w-full"}>
            {/*<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">*/}
            {/*  <Tab label="Новые посты" />*/}
            {/*  <Tab label="Популярные посты" />*/}
            {/*</Tabs>*/}
            {/*{isAuth && (*/}
            {/*  <div className={styles.buttons} style={{ minHeight: 50 }} align="right">*/}
            {/*    <Link to="/add-post" align="center">*/}
            {/*      <Button variant="contained">Написать статью</Button>*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*<div>*/}
            {/*  <TagsBlock items={tags.items} isLoading={isTagsLoading} />*/}
            {/*  <Index />*/}
            {/*</div>*/}
            <AddPost sizeBlock={792} posts={posts} setPosts={setPosts}/>
            {/*<div className={"bg-white w-full rounded border mb-4 flex"}>*/}
            {/*    <div className={"p-3 w-full"}>*/}
            {/*        <div className={"position-relative w-full hidden md:grid"}>*/}
            {/*            <input*/}
            {/*                className={"w-full h-8 pr-4 pl-8 rounded-lg bg-gray-100 focus:outline-none placeholder-gray-500"}*/}
            {/*                value={search} onChange={(e) => searchHeader(e.target.value)}*/}
            {/*                type={"text"} placeholder={"Поиск по записям"}/>*/}
            {/*            <div*/}
            {/*                className={"absolute top-0 left-0 h-full w-8 flex justify-content-center align-items-center"}>*/}
            {/*                <svg className={"w-4 h-4 text-gray-400"} xmlns="http://www.w3.org/2000/svg"*/}
            {/*                     fill="none" viewBox="0 0 24 24"*/}
            {/*                     strokeWidth="1.5" stroke="currentColor">*/}
            {/*                    <path strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>*/}
            {/*                </svg>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {(isPostsLoadingStart ? [...Array(1)] : filteredItems).map((obj, index) =>
                isPostsLoadingStart ? (
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
                        likesCount={obj.likesCount}
                        likes={obj.likes}
                        commentsCount={3}
                        tags={obj.tags}
                        isLoading={isPostsLoadingStart}
                        posts={posts}
                        setPosts={setPosts}
                        isEditable={obj.user._id === userData?._id}
                    />
                ))}
        </div>
    );
};
