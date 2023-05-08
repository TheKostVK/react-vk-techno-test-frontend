import React, {useMemo, useState} from "react";

import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";

import axios from "../../axios";
import {useNavigate, useParams} from "react-router-dom";


export const AddPost = ({sizeBlock = 560, posts, setPosts}) => {

    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(state => state.auth.data);

    const [text, setText] = React.useState("");
    const [tags, setTags] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const inputFileRef = React.useRef(null);
    const [hiddenBlock, setHiddenBlock] = useState(true);

    const isEditing = false//;


    const handleChangeFile = async (event) => {
        try {
            const savePath = "posts/preview/"
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("image", file);
            formData.append("savePath", savePath); // добавляем путь сохранения в форму
            const {data} = await axios.post("/upload", formData);
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert("Ошибка загрузки превью");
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl("");
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
            setTags("");
            setImageUrl("");


        } catch (err) {
            alert("Ошибка при создании статьи");
            console.warn("Ошибка при создании статьи");
        }
    };

    return (
        <>
            <div className={"bg-white w-full rounded border mb-4"}>
                    <div className={"flex"}>
                        <div className={"flex-shrink-0 py-3 px-3"}>
                            <img
                                className={"object-cover w-7 h-7 rounded-full overflow-hidden"}
                                src={userData && userData.avatarUrl ? userData.avatarUrl : "/ui/profile/noAvatar.png"}
                                alt="User avatar"
                            />
                        </div>
                        {/*<TextField className={"p-3 w-full h-full"}*/}
                        {/*           value={tags}*/}
                        {/*           onChange={e => setTags(e.target.value)}*/}
                        {/*           variant="standard"*/}
                        {/*           placeholder="Тэги"*/}
                        {/*           rows={1} // Указываем начальное количество строк*/}
                        {/*           minRows={4} // Задаем минимальное количество строк*/}
                        {/*           fullWidth*/}
                        {/*/>*/}
                        {/*<TextField className={"p-3 w-full h-full"}*/}
                        {/*           value={text}*/}
                        {/*           onChange={e => setText(e.target.value)}*/}
                        {/*           variant="standard"*/}
                        {/*           placeholder="Что у вас нового?"*/}
                        {/*           multiline={true} // Создаем многострочное поле ввода*/}
                        {/*           rows={1} // Указываем начальное количество строк*/}
                        {/*           minRows={4} // Задаем минимальное количество строк*/}
                        {/*           style={{*/}
                        {/*               height: "auto",*/}
                        {/*               maxHeight: "none"*/}
                        {/*           }} // Указываем автоматически определить высоту и не ограничивать ее*/}
                        {/*           fullWidth*/}
                        {/*/>*/}
                        <div className={"flex-1"}>
                            <div className={"position-relative w-full h-full"}>
                                <div className={`position-absolute top-4 top-4 text-gray-500 ${hiddenBlock ? 'show' : 'hidden'}`}
                                style={{zIndex: 1, pointerEvents: "none"}}>
                                    Что у вас нового?
                                </div>
                                <div className={"w-full h-full py-3 focus:outline-none"}
                                     style={{zIndex: 2, maxWidth: `${sizeBlock}px`}}
                                     contentEditable={true}
                                     value={text}
                                     onFocus={() => setHiddenBlock(false)}
                                     onBlur={(e) => {
                                         setText(e.target.innerText)
                                     }}
                                />
                            </div>
                        </div>
                        <div className={"flex align-items-center py-3 px-3"}>
                            <button className={`focus:outline-none ${hiddenBlock ? 'show' : 'hidden'}`} aria-label={"Фотография"} data-balloon-pos={"up-right"}>
                                <svg className={"w-6 h-6 text-gray-400 hover:text-gray-500"}
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                <div className={`pt-2 ${!hiddenBlock ? 'show' : 'hidden'}`}>
                    <div className={"h-px mx-3 bg-gray-200 pb-0"}/>
                    <div className={"flex p-3 justify-content-between"}>
                        <button className={`focus:outline-none`} aria-label={"Фотография"} data-balloon-pos={"up-right"}>
                            <svg className={"w-6 h-6 text-gray-400 hover:text-gray-500"}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                            </svg>
                        </button>
                        <button className={`focus:outline-none border rounded px-3.5 py-1.5 bg-blue-600 bg-opacity-75 text-white`}
                            onClick={onSubmit}
                        >
                            {isEditing ? "Сохранить" : "Опубликовать"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
