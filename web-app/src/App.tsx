import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {GlobalStateProvider} from "./context/GlobalStateContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStateProvider>
                <Navbar/>
                <Outlet/>
            </GlobalStateProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
