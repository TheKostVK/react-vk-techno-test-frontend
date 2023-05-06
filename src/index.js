import React from "react";
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

import store from './redux/store.js';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </>
);
