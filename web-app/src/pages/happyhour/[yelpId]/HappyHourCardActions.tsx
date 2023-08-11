import React, {FunctionComponent} from "react";
import {CompositeBusinessDto} from "../../../models/composite-business-dto";
import {Link} from "react-router-dom";
import {CheckForSpecialsButtonAction} from "./CheckForSpecialsButtonAction";
import {Business, SpecialCheckStatus} from "../../../models/business";
import useCreateBusiness from "../../../api/happyhour/create-business";
import useUpdateBusiness from "../../../api/happyhour/update-business";

const HappyHourCardActions: FunctionComponent<{ b: CompositeBusinessDto }> = ({b}) => {
    const {mutateAsync: createBusiness, isLoading: isCreatingBusiness, isError: errorCreatingBusiness} = useCreateBusiness()
    const {mutate: updateBusiness, isLoading: isUpdatingBusiness, isError: errorUpdatingBusiness} = useUpdateBusiness()

    const handleUpdateBusiness = (businessUrl: string, business: Business) => {
        updateBusiness({
            businessUrl: businessUrl,
            businessId: business.id
        })
    };

    const createAndUpdateBusiness = async (businessUrl: string, b: CompositeBusinessDto) => {
        const business = await createBusiness({
            businessUrl: businessUrl,
            businessName: b.yelpBusiness.name!!,
            yelpId: b.yelpBusiness.id
        })

        handleUpdateBusiness(businessUrl, business)
    };

    if (b.business) {
        switch (b.business.specialCheckStatus) {
            case SpecialCheckStatus.FAILED:
                return <div className={"text-center"}>
                    <h1>We failed to get specials for <br/> {b.business.name}</h1>
                    <p>Try again?</p>
                    <CheckForSpecialsButtonAction businessUrl={b.business.website}
                                                  onClick={(businessUrl) => handleUpdateBusiness(businessUrl, b.business!!)}/>
                </div>
            case SpecialCheckStatus.COMPLETED:
                return <Link className={"btn btn-primary"}
                             to={`/happyhour/${b.yelpBusiness.id}/${b.yelpBusiness.name}`}>
                    See Specials
                </Link>
            case SpecialCheckStatus.PENDING:
                return <button className={"btn btn-primary"} disabled={true}>
                    <span className="loading loading-bars loading-xs"></span>
                </button>
            case SpecialCheckStatus.INITIAL:
                return <div>
                    <h1>We are aware of this business but have not checked for specials.</h1>
                    <CheckForSpecialsButtonAction businessUrl={b.business.website}
                                                  onClick={(businessUrl) => handleUpdateBusiness(businessUrl, b.business!!)}/>
                </div>
        }
    }

    return <CheckForSpecialsButtonAction businessUrl={""}
                                         onClick={(businessUrl) => createAndUpdateBusiness(businessUrl, b)}/>
}

export default HappyHourCardActions
