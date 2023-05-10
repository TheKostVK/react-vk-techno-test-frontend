import React from "react";
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";

import store from './redux/store.js';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <BrowserRouter>
            <Provider store={store}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </Provider>
        </BrowserRouter>
    </>
);
