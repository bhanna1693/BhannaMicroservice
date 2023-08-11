import React from "react";
import {Outlet} from "react-router-dom";
import {HappyHourStateProvider} from "../../context/HappyHourContext";
import PageLayout from "../../layouts/PageLayout";
import {LoadingProvider} from "../../context/LoadingContext";

export const HappyHourPage = () => {
    return (
        <PageLayout>
            <LoadingProvider>
                <HappyHourStateProvider>
                    <Outlet/>
                </HappyHourStateProvider>
            </LoadingProvider>
        </PageLayout>
    )
}
