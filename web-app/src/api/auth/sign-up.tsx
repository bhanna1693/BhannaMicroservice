import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiService from "../../lib/api/api";
import {SignUpResponseDto} from "../../models/login-response-dto";
import Cookies from "js-cookie";
import {environment} from "../../environment";
import {globalActions, useGlobalState} from "../../context/GlobalStateContext";
import {RegisterRequest} from "../../schemas/register-schema";

const signUp = async (req: RegisterRequest): Promise<SignUpResponseDto> => {
    return await apiService.post<RegisterRequest, SignUpResponseDto>("/auth/register", req);
}

const useSignUp = () => {
    const client = useQueryClient()
    const {dispatch} = useGlobalState()
    const mutationKey = "signUp"

    return useMutation({
        mutationFn: (req: RegisterRequest) => signUp(req),
        mutationKey: [mutationKey],
        onMutate: () => {
            dispatch(globalActions.removeUser())
        },
        onSuccess: (result) => {
            const jwtToken = result.result.token; // Extract the JWT token from the response
            // Store the JWT token in a secure cookie
            Cookies.set(environment.MY_COOKIE!, jwtToken, {secure: true, httpOnly: true});
            dispatch(globalActions.setUser(result.result.user))
        },
        onError: () => {
            // do I need to do anything here?
        },
        onSettled: () => {
            client.setQueryData([mutationKey], () => null)
        }
    })
}

export default useSignUp
