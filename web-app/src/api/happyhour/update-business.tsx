import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import {Business} from "../../models/business";
import apiService from "../../lib/api/api";
import {CompositeBusinessDto} from "../../models/composite-business-dto";
import {UpdateBusinessRequest} from "../../schemas/update-business-request-schema";

const updateBusiness = async (req: UpdateBusinessRequest): Promise<Business> => {
    return await apiService.post<UpdateBusinessRequest, Business>(`/business/${req.businessId}`, req);
}

const useUpdateBusiness = () => {
    const client = useQueryClient()

    return useMutation({
        mutationFn: (req: UpdateBusinessRequest) => updateBusiness(req),
        onSuccess: (result) => {
            updateBusinessQueryCache(client, result)
            updateBusinessesQueryCache(client, result)
        }
    })
}

export const updateBusinessQueryCache = (client: QueryClient, business: Business): void => {
    const businessQueryKey: string[] = ['business', business.yelpId]
    client.setQueryData<Business>(businessQueryKey, business)
}

export const updateBusinessesQueryCache = (client: QueryClient, business: Business): void => {
    const businessesQueryKey = client.getQueryCache().getAll()
        .map(query => query.queryKey)
        .find(queryKey => queryKey[0] === "businesses")

    if (businessesQueryKey) {
        client.setQueryData<CompositeBusinessDto[]>(businessesQueryKey, (old) => {
            return old?.map((b) => {
                if (b.yelpBusiness.id === business.yelpId) {
                    b.business = business
                }
                return b
            })
        })
    }
}

export default useUpdateBusiness
