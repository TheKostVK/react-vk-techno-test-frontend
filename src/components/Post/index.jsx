import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";


import styles from "./Post.module.scss";
import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./Skeleton";

export const Post = ({
                         id,
                         title,
                         createdAt,
                         imageUrl,
                         user,
                         viewsCount,
                         commentsCount,
                         tags,
                         children,
                         isFullPost,
                         isLoading,
                         isEditable
                     }) => {
    const dispatch = useDispatch();

    if (isLoading) {
        return <PostSkeleton/>;
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


    return (
        <div className={"bg-white rounded border mb-4"} style={{height:500}}>
            <UserInfo {...user} additionalText={formattedDate(createdAt)}>
                <div className={"pr-2"}>
                    <svg className={"w-6 h-6 text-gray-500"}
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                </div>
            </UserInfo>
        </div>



        // <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
        //   {imageUrl && (
        //     <img
        //       className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        //       src={imageUrl}
        //       alt={title}
        //     />
        //   )}
        //   <div className={styles.wrapper}>
        //     <UserInfo {...user} additionalText={formattedDate} />
        //
        //     <div className={styles.indention}>
        //       <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
        //         {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
        //       </h2>
        //       <ul className={styles.tags}>
        //         {tags && tags.length > 0 && tags[0] !== "" && tags.map((name) => (
        //           <li key={name}>
        //             <Link to={`/tag/${name}`}>#{name}</Link>
        //           </li>
        //         ))}
        //       </ul>
        //       {children && <div className={styles.content}>{children}</div>}
        //       <ul className={styles.postDetails}>
        //         <li>
        //           <EyeIcon />
        //           <span>{viewsCount}</span>
        //         </li>
        //         <li>
        //           <CommentIcon />
        //           <span>{commentsCount}</span>
        //         </li>
        //       </ul>
        //     </div>
        //   </div>
        // </div>
    );
};
