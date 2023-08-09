import {useQuery} from "@tanstack/react-query";
import {Business} from "../../models/Business";
import apiService from "../../lib/api/api";

const fetchBusiness = async (yelpId: string, includeSpecials: boolean): Promise<Business> => {
    return await apiService.get<Business>(`/business/${yelpId}`, {includeSpecials});
}

const useBusinessQuery = (yelpId: string, includeSpecials: boolean = true) => {
    const queryKey: string[] = ['business', yelpId]
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchBusiness(yelpId, includeSpecials),
    })
}

export default useBusinessQuery
