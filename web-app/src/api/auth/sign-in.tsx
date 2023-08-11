import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiService from "../../lib/api/api";
import {LoginRequest} from "../../schemas/login-schema";
import {LoginResponseDto} from "../../models/login-response-dto";
import Cookies from "js-cookie";
import {environment} from "../../environment";
import {globalActions, useGlobalState} from "../../context/GlobalStateContext";

const signIn = async (req: LoginRequest): Promise<LoginResponseDto> => {
    return await apiService.post<LoginRequest, LoginResponseDto>("/auth/login", req);
}

const useSignIn = () => {
    const client = useQueryClient()
    const {dispatch} = useGlobalState()
    const mutationKey = "signIn"

    return useMutation({
        mutationFn: (req: LoginRequest) => signIn(req),
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

export default useSignIn
