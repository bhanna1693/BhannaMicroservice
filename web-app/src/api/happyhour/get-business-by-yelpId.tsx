import {useQuery} from "@tanstack/react-query";
import {Business} from "../../models/business";
import apiService from "../../lib/api/api";

const fetchBusinessByYelpId = async (yelpId: string, includeSpecials: boolean): Promise<Business> => {
    return await apiService.get<Business>(`/business/${yelpId}`, {includeSpecials});
}

const useGetBusinessByYelpIdQuery = (yelpId: string, includeSpecials: boolean = true) => {
    const queryKey: string[] = ['business', yelpId]
    return useQuery({
        queryKey: queryKey,
        queryFn: () => fetchBusinessByYelpId(yelpId, includeSpecials),
    })
}

export default useGetBusinessByYelpIdQuery
