import React, {FunctionComponent, useEffect, useState} from "react";
import {CompositeBusinessDto} from "../../models/composite-business-dto";
import {Link} from "react-router-dom";
import {CheckForSpecialsButtonAction} from "./[yelpId]/CheckForSpecialsButtonAction";
import {Business, SpecialCheckStatus} from "../../models/business";
import useCreateBusiness from "../../api/happyhour/create-business";
import useUpdateBusiness, {updateBusinessesQueryCache} from "../../api/happyhour/update-business";
import useGetBusinessByYelpIdQuery from "../../api/happyhour/get-business-by-yelpId";
import {useQueryClient} from "@tanstack/react-query";

const HappyHourCardActions: FunctionComponent<{ b: CompositeBusinessDto }> = ({b}) => {
    const {mutateAsync: createBusiness, isLoading: isCreating} = useCreateBusiness()
    const {mutateAsync: updateBusiness, error: updateBusinessError, isLoading: isUpdating, isError: isUpdatingError} = useUpdateBusiness()
    const [isPending, setIsPending] = useState(false)
    const {data} = useGetBusinessByYelpIdQuery(b.yelpBusiness.id, false, isPending)
    const client = useQueryClient()

    useEffect(() => {
        setIsPending(data?.specialCheckStatus === SpecialCheckStatus.PENDING)
    }, [data?.specialCheckStatus]);

    useEffect(() => {
        if (data) {
            updateBusinessesQueryCache(client, data)
        }
    }, [client, data]);

    const handleUpdateBusiness = async (businessUrl: string, business: Business) => {
        updateBusiness({
            businessUrl: businessUrl,
            businessId: business.id
        }).then(() => setIsPending(true))
            .catch(() => setIsPending(false))
    };

    const createAndUpdateBusiness = async (businessUrl: string, b: CompositeBusinessDto) => {
        createBusiness({
            businessUrl: businessUrl,
            businessName: b.yelpBusiness.name!,
            yelpId: b.yelpBusiness.id
        }).then(b => handleUpdateBusiness(businessUrl, b))
            .catch(() => null)
    };

    if (b.business) {
        switch (b.business.specialCheckStatus) {
            case SpecialCheckStatus.FAILED:
                return <div className={"text-center"}>
                    <h3 className={"text-error"}>We failed to get specials for <br/> {b.business.name}</h3>

                    {isUpdatingError ? (
                        // @ts-ignore
                        <p>{updateBusinessError.message}</p>
                    ) : (
                        <p>Try again?</p>
                    )}

                    <CheckForSpecialsButtonAction isLoading={isUpdating}
                                                  businessUrl={b.business.website}
                                                  onClick={(businessUrl) => handleUpdateBusiness(businessUrl, b.business!)}/>
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
                    <CheckForSpecialsButtonAction isLoading={isUpdating}
                                                  businessUrl={b.business.website}
                                                  onClick={(businessUrl) => handleUpdateBusiness(businessUrl, b.business!)}/>
                </div>
        }
    }

    return <CheckForSpecialsButtonAction isLoading={isCreating}
                                         businessUrl={""}
                                         onClick={(businessUrl) => createAndUpdateBusiness(businessUrl, b)}/>
}

export default HappyHourCardActions
