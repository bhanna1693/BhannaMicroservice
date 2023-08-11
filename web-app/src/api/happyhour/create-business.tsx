import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Business} from "../../models/business";
import apiService from "../../lib/api/api";
import {CreateBusinessRequest} from "../../schemas/create-business-request-schema";
import {updateBusinessesQueryCache, updateBusinessQueryCache} from "./update-business";

const createBusiness = async (req: CreateBusinessRequest): Promise<Business> => {
    return await apiService.post<CreateBusinessRequest, Business>("/business", req);
}

const useCreateBusiness = () => {
    const client = useQueryClient()

    return useMutation({
        mutationFn: (req: CreateBusinessRequest) => createBusiness(req),

        onSuccess: (result) => {
            updateBusinessQueryCache(client, result)
            updateBusinessesQueryCache(client, result)
        }
    })
}

export default useCreateBusiness
