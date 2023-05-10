import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";

export const Home = () => {
    const isAuth = useSelector(selectIsAuth);
    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={"/login"}/>;
    }
    return <Navigate to={"/feed"}/>;
}
