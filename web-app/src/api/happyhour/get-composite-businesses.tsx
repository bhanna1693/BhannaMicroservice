import {useQuery} from "@tanstack/react-query";
import apiService from "../../lib/api/api";
import {HappyHourSearch} from "../../schemas/happy-hour-search-schema";
import {CompositeBusinessDto} from "../../models/composite-business-dto";

const fetchCompositeBusinesses = async (search: HappyHourSearch): Promise<CompositeBusinessDto[]> => {
    return await apiService.get<CompositeBusinessDto[]>("/yelp/businesses/search", {queryParams: search});
}

const useGetCompositeBusinessesQuery = (search: HappyHourSearch, enabled: boolean = true) => {
    const queryKey: string[] = ['businesses', ...Object.values(search)]
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchCompositeBusinesses(search),
        enabled: enabled,
        refetchOnMount: query => query.isStale()
    })
}

export default useGetCompositeBusinessesQuery
