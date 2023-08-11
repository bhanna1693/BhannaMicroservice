import {useQuery} from "@tanstack/react-query";
import {Business, SpecialCheckStatus} from "../../models/business";
import apiService from "../../lib/api/api";

const fetchBusinessByYelpId = async (yelpId: string, includeSpecials: boolean): Promise<Business> => {
    return await apiService.get<Business>(`/business/${yelpId}`, {queryParams: {includeSpecials}});
}

const useGetBusinessByYelpIdQuery = (yelpId: string, includeSpecials: boolean, enabled: boolean) => {
    const queryKey: string[] = ['business', yelpId]
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchBusinessByYelpId(yelpId, includeSpecials),
        enabled: enabled,
        refetchInterval: (data, query) => {
            return data?.specialCheckStatus !== SpecialCheckStatus.PENDING ? false : 5000
        }
    })
}

export default useGetBusinessByYelpIdQuery
