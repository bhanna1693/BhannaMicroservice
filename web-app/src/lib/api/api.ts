import Cookies from "js-cookie";
import {environment} from "../../environment";

// Generic function to make a GET request
async function get<T = any>(url: string, queryParams?: { [k: string]: any }): Promise<T> {
    try {
        const token = Cookies.get(environment.MY_COOKIE)
        const headers: { [k: string]: string } = {
            'Content-Type': 'application/json',
        }
        if (token) {
            headers["Authorization"] = "Bearer " + token
        }

        url = url.includes("mock") ? url : environment.BASE_URL + url
        if (queryParams) {
            const qp = new URLSearchParams();
            Object.keys(queryParams).forEach(key => qp.append(key, queryParams[key]))
            url = `${url}?${qp.toString()}`
        }

        const response = await fetch(url, {
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Fetch error " + response.status)
        }

        return response.json();
    } catch (error) {
        console.error("Fetch error:", error)
        throw error
    }
}

// Generic function to make a POST request
async function post<T = any, R = any>(url: string, body: T): Promise<R> {
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

        if (!response.ok) {
            throw new Error("Fetch error " + response.status)
        }

        return await response.json();
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
