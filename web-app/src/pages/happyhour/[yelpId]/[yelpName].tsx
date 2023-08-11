import React from "react";
import {useParams} from "react-router-dom";
import useGetBusinessByYelpIdQuery from "../../../api/happyhour/get-business-by-yelpId";
import ErrorComponent from "../../../components/ErrorComponent";
import SpecialDetailsList from "./SpecialDetailsList";

export const HappyHourDetailsPage = () => {
    const {yelpId} = useParams()

    const {data: business, isLoading: isGettingBusiness, isError: errorGettingBusiness} = useGetBusinessByYelpIdQuery(yelpId!, true, true)

    if (isGettingBusiness) {
        return <div className="flex align-center justify-center py-5">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (errorGettingBusiness) {
        return <ErrorComponent errorMessage={"Failed to get business details"}/>
    }

    return <SpecialDetailsList business={business} />
}
