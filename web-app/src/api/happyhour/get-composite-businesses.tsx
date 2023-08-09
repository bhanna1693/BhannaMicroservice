import {useQuery} from "@tanstack/react-query";
import {Business} from "../../models/business";
import apiService from "../../lib/api/api";
import {HappyHourSearch} from "../../schemas/happy-hour-search-schema";

const fetchCompositeBusinesses = async (search: HappyHourSearch): Promise<Business[]> => {
    return await apiService.get<Business[]>("/yelp/businesses/search", search);
}

const useGetCompositeBusinessesQuery = (search: HappyHourSearch, enabled: boolean = true) => {
    const queryKey: string[] = ['businesses', ...Object.values(search)]
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchCompositeBusinesses(search),
        enabled: enabled,
    })
}

export default useGetCompositeBusinessesQuery
