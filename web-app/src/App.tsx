import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import {GlobalStateProvider} from "./context/GlobalStateContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStateProvider>
                <Navbar/>
                <Outlet/>
            </GlobalStateProvider>
        </QueryClientProvider>
    );
}

export default App;
