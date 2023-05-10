import React, {useState} from "react";
import TextField from "@mui/material/TextField";

import {useDispatch, useSelector} from "react-redux";
import {fetchRegistration, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import axios from "../../axios";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [wasBorn, setWasBorn] = useState("");
    const [university, setUniversity] = useState("");
    const [city, setCity] = useState("");
    const [imageLoading, setImageLoading] = React.useState(false);

    const inputFileRef = React.useRef(null);

    const onSubmit = async () => {
        try {
            const fields = {
                userName,
                email,
                password,
                avatarUrl,
                wasBorn,
                university,
                city,
            };

            const data = await dispatch(fetchRegistration(fields));

            if ('token' in data.payload) {
                window.localStorage.setItem('token', data.payload.token);
            } else {
                setEmail("");
                setUserName("");
                setPassword("");
                setAvatarUrl("");
                setUniversity("");
                setCity("");
                setWasBorn("");
                alert("Не удалось зарегистрироваться");
            }

        } catch (err) {
            setEmail("");
            setUserName("");
            setPassword("");
            setAvatarUrl("");
            setUniversity("");
            setCity("");
            setWasBorn("");
            alert("Ошибка регистрации");
            console.warn("Ошибка регистрации");
        }
    };


    if (isAuth) {
        return <Navigate to={"/"}/>;
    }

    const handleChangeFile = async (event) => {
        try {
            const savePath = "users/avatar/";
            const formData = new FormData();
            const file = event.target.files[0];
            setImageLoading(true);
            formData.append("image", file);
            formData.append("savePath", savePath); // добавляем путь сохранения в форму
            const {data} = await axios.post("/upload", formData);
            setAvatarUrl(data.url);
            setImageLoading(false);
        } catch (err) {
            console.warn(err);
            alert("Ошибка загрузки фотографии профиля");
        }
    };

    const onClickRemoveImage = () => {
        setAvatarUrl("");
    };

    return (
        <>
            <div className={"mx-auto h-auto w-80 rounded bg-white p-4 m-4"}>
                <div className={"flex justify-center text-2xl"}>
                    Создание аккаунта
                </div>
                <div className={"flex flex-shrink-0 justify-center py-4 h-52"}>
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                    <img className={"object-cover w-44 h-44 rounded-full overflow-hidden"}
                        src={avatarUrl || "/ui/profile/noAvatar.png"}
                        alt="Аватар"/>
                </div>
                <div className={"flex justify-center py-4"}>
                    <button
                        className={`mx-auto focus:outline-none border rounded px-3.5 py-1.5 ${avatarUrl ? "bg-red-600" : " bg-blue-600"} bg-opacity-75 text-white`}
                        onClick={() => {
                            if (avatarUrl) {
                                onClickRemoveImage()
                            } else {
                                inputFileRef.current.click()
                            }
                        }}
                    >
                        {
                            avatarUrl ? "Удалить" : "Загрузить аватар"
                        }
                    </button>
                </div>
                <div className={"h-px bg-gray-500 mt-1"} />
                <TextField
                    label="E-Mail"
                    auto-complete="email"
                    onChange={e => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Имя пользователя"
                    auto-complete="nickname"
                    onChange={e => setUserName(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <div className={"h-px bg-gray-500 mt-1"} />
                <TextField
                    label="Город"
                    type="text"
                    onChange={e => setCity(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    type="date"
                    onChange={e => setWasBorn(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="ВУЗ"
                    type="text"
                    onChange={e => setUniversity(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <div className={"h-px bg-gray-500 mt-1"} />
                <TextField
                    label="Пароль"
                    type="password"
                    auto-complete="current-password"
                    onChange={e => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                />

                <div className={"h-px bg-gray-500 mt-1"} />
                <div className={"flex pt-2"}>
                    <button
                        className={`mx-auto focus:outline-none border rounded px-3.5 py-1.5 bg-blue-600 bg-opacity-75 text-white`}
                        onClick={onSubmit}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </>
    )
};
