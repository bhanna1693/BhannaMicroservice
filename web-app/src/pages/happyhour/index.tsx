import React from "react";
import {Outlet} from "react-router-dom";
import {HappyHourStateProvider} from "../../context/HappyHourContext";
import PageLayout from "../../layouts/PageLayout";

export const HappyHourPage = () => {
    return (
        <PageLayout>
            <HappyHourStateProvider>
                <Outlet/>
            </HappyHourStateProvider>
        </PageLayout>
    )
}
