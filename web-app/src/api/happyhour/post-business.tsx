import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Business} from "../../models/business";
import apiService from "../../lib/api/api";
import {CreateBusinessRequest} from "../../models/create-business-request";

const createOrUpdateBusiness = async (req: CreateBusinessRequest): Promise<Business> => {
    return await apiService.post<CreateBusinessRequest, Business>("/business", req);
}

const useCreateOrUpdateBusiness = (req: CreateBusinessRequest) => {
    const client = useQueryClient()
    const businessesQueryKey: string[] = ['businesses', ...Object.values({key: ""})]
    const businessQueryKey: string[] = ['business', req.yelpBusiness.id]

    return useMutation({
        mutationFn: () => createOrUpdateBusiness(req),
        onSuccess: (result) => {
            client.setQueryData<CompositeBusinessDto[]>(businessesQueryKey, (old) => {
                return old?.map((b) => {
                    if (b.yelpBusiness.id === result.yelpId) {
                        b.business = result
                    }
                    return b
                })
            })
            client.setQueryData<Business>(businessQueryKey, () => result)
        }
    })
}

export default useCreateOrUpdateBusiness
