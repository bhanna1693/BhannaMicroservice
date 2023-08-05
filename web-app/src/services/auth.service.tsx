import Cookies from 'js-cookie';
import apiService from "../utils/api";
import {LoginResponseDto} from "../models/LoginResponseDto";
import {globalActions, useGlobalState} from "../context/GlobalStateContext";
import {useState} from "react";
import {LoginRequest} from "../utils/validators/login-schema";
import {environment} from "../environment";

const getErrorMsg = (statusCode: number): string => {
    switch (statusCode) {
        case 400:
            return "Username or password is incorrect"
        case 401:
            return "Unauthorized"
        case 403:
            return "Forbidden"
        default:
            return "Http Status Code: " + statusCode
    }
}

export const useAuth = () => {
    const {dispatch} = useGlobalState();
    const [errorMsg, setErrorMsg] = useState("")

    async function login(loginRequest: LoginRequest) {
        // Perform login API request and obtain JWT token
        setErrorMsg("")
        try {
            const response = await apiService.post<LoginRequest, LoginResponseDto>("/auth/login", loginRequest)

            if (response.status === 200) {
                const jwtToken = response.data.result.token; // Extract the JWT token from the response
                // Store the JWT token in a secure cookie
                Cookies.set(environment.MY_COOKIE!!, jwtToken, {secure: true, httpOnly: true});
                dispatch(globalActions.setUser(response.data.result.user))
            } else {
                setErrorMsg(getErrorMsg(response.status))
            }
        } catch (error) {
            // Handle network or API error
            setErrorMsg("Network error")
        }
    }

    return {errorMsg, login}
}
