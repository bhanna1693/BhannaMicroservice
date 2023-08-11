export const environment: {
    isProd: boolean;
    BASE_URL: string,
    MY_COOKIE: string
} = {
    isProd: process.env.NODE_ENV! === "production",
    BASE_URL: process.env.REACT_APP_BASE_URL!,
    MY_COOKIE: process.env.REACT_APP_MY_COOKIE!,
}
