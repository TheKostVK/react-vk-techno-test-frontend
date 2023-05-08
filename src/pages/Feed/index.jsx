import React, {useEffect, useState, useRef} from "react";
import {useSelector} from "react-redux";

import {Post} from "../../components/Post";
import {Navigate} from "react-router-dom";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";
import {AddPost} from "../../components";

export const Feed = () => {
    const userData = useSelector(state => state.auth.data);

    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    async function fetchDataPosts() {
        try {
            if (currentPage !== totalPages + 1) {
                setIsPostsFetching(false);
                axios.get(`/posts/p?page=${currentPage}&perPage=6`).then(
                    response => {
                        setPosts([...posts, ...response.data.posts]);
                        setTotalPages(response.data.pageInfo.totalPages);
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
            {(isPostsLoadingStart ? [...Array(1)] : posts).map((obj, index) =>
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
