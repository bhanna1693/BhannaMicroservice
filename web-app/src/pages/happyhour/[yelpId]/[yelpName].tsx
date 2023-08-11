import React from "react";
import {useParams} from "react-router-dom";
import useGetBusinessByYelpIdQuery from "../../../api/happyhour/get-business-by-yelpId";
import useCreateBusiness from "../../../api/happyhour/create-business";
import useUpdateBusiness from "../../../api/happyhour/update-business";
import ErrorComponent from "../../../components/ErrorComponent";
import {NewBusiness} from "./NewBusiness";
import {CheckForSpecialsButtonAction} from "./CheckForSpecialsButtonAction";
import ExistingBusiness from "./ExistingBusiness";

export const HappyHourDetailsPage = () => {
    const {yelpId, yelpName} = useParams()
    // const [business, setBusiness] = useState<Business>()

    const {data: business, isLoading: isGettingBusiness, isError: errorGettingBusiness} = useGetBusinessByYelpIdQuery(yelpId!!, true)
    const {mutateAsync: createBusiness, isLoading: isCreatingBusiness, isError: errorCreatingBusiness} = useCreateBusiness()
    const {mutate: updateBusiness, isLoading: isUpdatingBusiness, isError: errorUpdatingBusiness} = useUpdateBusiness()

    // useEffect(() => {
    //     setBusiness(getBusinessResp)
    // }, [getBusinessResp])

    const handleUpdateBusiness = (businessUrl: string) => {
        updateBusiness({
            businessUrl: businessUrl,
            businessId: business?.id!!
        })
    };

    const handleCreateNewBusiness = async (businessUrl: string) => {
        await createBusiness({
            businessUrl: businessUrl,
            businessName: yelpName!!,
            yelpId: yelpId!!
        })

        handleUpdateBusiness(businessUrl)
    };

    if (isGettingBusiness) {
        return <div className="flex align-center justify-center py-5">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (errorGettingBusiness) {
        return <ErrorComponent errorMessage={"Failed to get business details"}/>
    }

    if (!business) {
        // New business
        return <NewBusiness businessName={yelpName!!}>
            <CheckForSpecialsButtonAction businessUrl={""}
                                          onClick={handleCreateNewBusiness}/>
        </NewBusiness>
    }

    return <ExistingBusiness business={business}>
        <CheckForSpecialsButtonAction businessUrl={business.website}
                                      onClick={handleUpdateBusiness}/>
    </ExistingBusiness>
}
