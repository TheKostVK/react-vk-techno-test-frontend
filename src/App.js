import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Header, MobMenu} from "./components";
import {Home, Feed, SideMenu, Registration, Login, Profile, Friends} from "./pages";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(state => state.auth.data);

    const [search, setSearch] = useState('');

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <>
            <Header search={search} setSearch={setSearch}/>
            <MobMenu/>
            <section className={"container"}>
                <div className={"flex align-items-start pt-20 mx-auto"} style={{maxWidth: 1082}}>
                    <SideMenu/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/feed" element={<Feed search={search} setSearch={setSearch}/>}/>
                        <Route path="/profile/:id" element={<Profile search={search} setSearch={setSearch}/>}/>
                        <Route path="/friends" element={<Friends search={search} setSearch={setSearch}/>}/>
                        {/*<Route path="/add-post" element={<AddPost/>}/>*/}
                        {/*<Route path="/posts/:id/edit" element={<AddPost/>}/>*/}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    </Routes>
                </div>
            </section>
        </>
    );
}

export default App;
