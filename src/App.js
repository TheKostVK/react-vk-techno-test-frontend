import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {Footer, Header} from "./components";
import {Home, Feed, SideMenu, FullPost, Registration, AddPost, Login, Profile} from "./pages";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);


    return (
        <>
            <Header/>
            <section className={"container"}>
                <div className={"flex align-items-start pt-20 mx-auto"} style={{maxWidth: 1082}}>
                    {isAuth ? <SideMenu/> : ""}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/profile" element={<Profile/>}/>
                        {/*<Route path="/add-post" element={<AddPost/>}/>*/}
                        {/*<Route path="/posts/:id/edit" element={<AddPost/>}/>*/}
                        {/*<Route path="/posts/:id" element={<FullPost/>}/>*/}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                    </Routes>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default App;
