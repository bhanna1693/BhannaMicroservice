// apiService.ts

// Define base URL for your API
import Cookies from "js-cookie";
import {environment} from "../environment";

type ApiResponse<T> = {
    data: T;
    status: number;
};

// Generic function to make a GET request
async function get<T = any>(url: string): Promise<ApiResponse<T>> {
    try {
        const token = Cookies.get(environment.MY_COOKIE)
        const headers: { [k: string]: string } = {
            'Content-Type': 'application/json',
        }
        if (token) {
            headers["Authorization"] = "Bearer " + token
        }

        const response = await fetch(`${environment.BASE_URL}${url}`, {
            headers: headers
        });

        const data = await response.json();
        return { data, status: response.status };
    } catch (error) {
        console.error("Fetch error:", error)
        throw error
    }
}

// Generic function to make a POST request
async function post<T = any, R = any>(url: string, body: T): Promise<ApiResponse<R>> {
    try {
        const token = Cookies.get(environment.MY_COOKIE)
        const headers: { [k: string]: string } = {
            'Content-Type': 'application/json',
        }
        if (token) {
            headers["Authorization"] = "Bearer " + token
        }

        const response = await fetch(`${environment.BASE_URL}${url}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return { data, status: response.status };
    } catch (error) {
        console.error("Fetch error:", error)
        throw error
    }
}

// Other HTTP methods can be added similarly (PUT, DELETE, etc.)

// Export the API service functions
const apiService = {
    get,
    post,
    // Add other methods here
};

export default apiService;
