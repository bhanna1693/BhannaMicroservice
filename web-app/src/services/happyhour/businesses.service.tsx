import {useQuery} from "@tanstack/react-query";
import {Business} from "../../models/Business";
import apiService from "../../lib/api/api";
import {HappyHourSearch} from "../../schema/happy-hour-search-schema";

const fetchBusinesses = async (search: HappyHourSearch): Promise<Business[]> => {
    return await apiService.get<Business[]>("/business/yelp-business-search", search);
}

const useBusinessesQuery = (search: HappyHourSearch, enabled: boolean = true) => {
    const queryKey: string[] = ['businesses', ...Object.values(search)]
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchBusinesses(search),
        enabled: enabled,
    })
}

export default useBusinessesQuery
