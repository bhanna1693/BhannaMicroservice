import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {GlobalStateProvider} from "./context/GlobalStateContext";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import queryClient from "./api/query-client";

function App() {
    return (
        <GlobalStateProvider>
            <QueryClientProvider client={queryClient}>
                <Navbar/>
                <Outlet/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </GlobalStateProvider>
    );
}

export default App;
