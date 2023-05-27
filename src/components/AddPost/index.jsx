import React, {useState} from "react";

import {useSelector} from "react-redux";

import axios from "../../axios";
import TextField from "@mui/material/TextField";


export const AddPost = ({sizeBlock = 560, posts, setPosts}) => {

    const userData = useSelector(state => state.auth.data);

    const [textToScreen, setTextToScreen] = React.useState("");
    const [text, setText] = React.useState("");
    const [tags, setTags] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState([]);
    const [imageLoading, setImageLoading] = React.useState(false);
    const inputFileRef = React.useRef(null);
    const [hiddenBlock, setHiddenBlock] = useState(true);

    const isEditing = false//

    function filterInput(input) {
        // Заменяем теги скриптов на символы-заместители
        input = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 'REMOVED_SCRIPTS');
        // Удаляем все теги кроме p, br
        input = input.replace(/<(?!\/?(p|br))\/?.*?>/gi, '');
        return setText(input);
    }

    const handleChangeFile = async (event) => {
        try {
            const savePath = "posts/img/"
            const formData = new FormData();
            const file = event.target.files[0];
            setImageLoading(true);
            formData.append("image", file);
            formData.append("savePath", savePath); // добавляем путь сохранения в форму
            const {data} = await axios.post("/upload", formData);
            setImageUrl([data.url, ...imageUrl]);
            setImageLoading(false);
        } catch (err) {
            console.warn(err);
            alert("Ошибка загрузки изображения");
            setImageLoading(false);
        }
    };

    const onClickClearForm = () => {
        if (window.confirm("Вы действительно хотите очистить форму записи?")) {
            setText("");
            setTextToScreen("");
            setTags([]);
            setImageLoading(false);
            setImageUrl([]);
        }
    }

    const onClickRemoveImage = (imgURLDel) => {
        if (window.confirm("Вы действительно хотите удалить картинку?")) {
            const updatedPostsImg = imageUrl.filter(imgURL => imgURL !== imgURLDel);
            setImageUrl(updatedPostsImg);
        }
    };

    const onSubmit = async () => {
        try {

            const fields = {
                imageUrl,
                text,
                tags: tags.split(",")
            };

            const {data} = await axios.post("/posts", fields);

            setPosts([data, ...posts]);

            setHiddenBlock(true);
            setText("");
            setTextToScreen("");
            setTags("");
            setImageUrl("");


        } catch (err) {
            alert("Ошибка при создании статьи");
            console.warn("Ошибка при создании статьи");
        }
    };

    function getFileNameFromURL(url) {
        const path = new URL(url).pathname;
        return path.substring(path.lastIndexOf("/") + 1);
    };

    return (
        <>
            <div className={"bg-white w-full rounded border mb-4"} >
                <div className={"flex"}>
                    <div className={"flex-shrink-0 py-3 px-3"}>
                        <img
                            className={"object-cover w-7 h-7 rounded-full overflow-hidden"}
                            src={userData && userData.avatarUrl ? userData.avatarUrl : "/ui/profile/noAvatar.png"}
                            alt="User avatar"
                        />
                    </div>
                    <div className={"flex-1"}>
                        <div className={"position-relative w-full h-full"}>
                            <TextField
                                className={"w-full h-full py-3 focus:outline-none"}
                                style={{zIndex: 2, maxWidth: `${sizeBlock}px`}}
                                onFocus={() => setHiddenBlock(false)}
                                variant="standard"
                                multiline={true}
                                placeholder="Что у вас нового?"
                                value={textToScreen}
                                onChange={(e) => {
                                    setTextToScreen(e.target.value);
                                    filterInput(e.target.value);
                                }}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className={"flex-shrink-0 py-3 px-3"}>
                        <button className={`focus:outline-none ${hiddenBlock ? 'show' : 'hidden'}`}
                                onClick={() => {
                                    setHiddenBlock(false);
                                    inputFileRef.current.click();

                                }}
                                aria-label={"Фотография"} data-balloon-pos={"up-right"}>
                            <svg className={"w-6 h-6 text-gray-400 hover:text-gray-500"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                            </svg>
                        </button>
                        <button
                            className={`focus:outline-none ${!hiddenBlock ? 'show' : 'hidden'}`}
                            onClick={() => {
                                setHiddenBlock(true);
                            }}
                            aria-label={"Свернуть"} data-balloon-pos={"up-right"}
                        >
                            <svg className={"w-6 h-6"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`pt-2 ${!hiddenBlock ? 'show' : 'hidden'}`}>
                    {/*<div className={"flex"}>*/}
                    {/*    <TextField className={"pb-3 px-3 mx-auto"}*/}
                    {/*               style={{zIndex: 2, maxWidth: `${sizeBlock}px`}}*/}
                    {/*               value={tags}*/}
                    {/*               onChange={e => setTags(e.target.value)}*/}
                    {/*               variant="standard"*/}
                    {/*               size="small"*/}
                    {/*               placeholder="#"*/}
                    {/*               fullWidth*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={"h-px mx-3 bg-gray-200 pb-0"}/>
                    <div className={`flex flex-shrink-0 mx-3 my-4 flex-wrap ${Array.isArray(imageUrl) && imageUrl.length > 0 && imageUrl[0] !== "" ? 'show' : 'hidden'}`}>
                        {
                            Array.isArray(imageUrl) && imageUrl.length > 0 && imageUrl[0] !== "" &&
                            imageUrl.map((obj, index) => (
                                <div key={`imgCreate${index}`} className="w-44 h-40 mx-auto border my-2 pt-2 px-2 rounded">
                                    <img
                                        src={obj}
                                        alt="img"
                                        className="w-44 h-28 rounded"
                                        style={{
                                            objectFit: "contain",
                                            objectPosition: "center",
                                        }}
                                    />
                                    <div className={"flex justify-content-between align-items-center"}>
                                        <button onClick={() => onClickRemoveImage(obj)} className="pt-1 mr-4">
                                            <svg className="w-6 h-6 text-gray-500 hover:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                        </button>
                                        <div className={"text-truncate pt-1.5"}>
                                            {getFileNameFromURL(obj)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`h-px mx-3 bg-gray-200 pb-0 ${Array.isArray(imageUrl) && imageUrl.length > 0 && imageUrl[0] !== "" ? 'show' : 'hidden'}`}/>
                    <div className={"flex p-3 justify-content-between"}>
                        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                        <button className={`focus:outline-none`} onClick={() => inputFileRef.current.click()} aria-label={imageLoading ? `Идет выгрузка, пожалуйста подождите` : `Фотография`} data-balloon-pos={imageLoading ? `up-left` : `up`}>
                            <svg className={`w-6 h-6 text-gray-400 hover:text-gray-500 ${!imageLoading ? 'show' : 'hidden'}`}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                            </svg>
                            <svg className={`w-6 h-6 text-gray-400 hover:text-gray-500 animate-spin ${imageLoading ? 'show' : 'hidden'}`}
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        <div>
                            <button className={`focus:outline-none mr-2 border rounded px-3.5 py-1.5 bg-red-500 text-white hover:bg-red-600`}
                                    onClick={onClickClearForm}
                            >
                                Очистить
                            </button>
                            <button className={`focus:outline-none border rounded px-3.5 py-1.5 bg-blue-600 bg-opacity-75 text-white`}
                                    onClick={onSubmit}
                            >
                                {isEditing ? "Сохранить" : "Опубликовать"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
