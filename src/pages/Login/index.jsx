import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";

import styles from "./Login.module.scss";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            return (alert('Не удалось авторизоваться'))
        }

        if ('token' in data.payload) {
          window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('Не удалось авторизоваться')
        }
    };

    if (window.localStorage.getItem("token") && isAuth) {
        return <Navigate to={"/"}/>;
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    auto-complete="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите почту'})}
                    fullWidth
                />
                <TextField className={styles.field}
                           label="Пароль"
                           type="password"
                           auto-complete="current-password"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           {...register('password', {required: 'Укажите пароль'})}
                           fullWidth/>
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
            <div className={"flex pt-2"}>
                <div>
                    Нет аккаунта?
                </div>
                <Link to={"/registration"} className={"text-blue-500 mx-2"}>
                    Создать
                </Link>
            </div>
        </Paper>
    );
};
