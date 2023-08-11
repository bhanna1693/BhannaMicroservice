import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Business} from "../../models/business";
import apiService from "../../lib/api/api";
import {CreateBusinessRequest} from "../../schemas/create-business-request-schema";
import {CompositeBusinessDto} from "../../models/composite-business-dto";

const createBusiness = async (req: CreateBusinessRequest): Promise<Business> => {
    return await apiService.post<CreateBusinessRequest, Business>("/business", req);
}

const useCreateBusiness = () => {
    const client = useQueryClient()

    return useMutation({
        mutationFn: (req: CreateBusinessRequest) => createBusiness(req),

        onSuccess: (result) => {
            const businessQueryKey: string[] = ['business', result.yelpId]
            const businessesQueryKey = client.getQueryCache().getAll()
                .map(query => query.queryKey)
                .find(queryKey => queryKey[0] === "businesses")

            if (businessesQueryKey) {
                client.setQueryData<CompositeBusinessDto[]>(businessesQueryKey, (old) => {
                    return old?.map((b) => {
                        if (b.yelpBusiness.id === result.yelpId) {
                            b.business = result
                        }
                        return b
                    })
                })
            }
            client.setQueryData<Business>(businessQueryKey, result)
        }
    })
}

export default useCreateBusiness
