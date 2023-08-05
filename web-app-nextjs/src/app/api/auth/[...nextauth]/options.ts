import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userName: {
                    label: "Username:",
                    type: "text",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                try {
                    // Authenticate user with credentials
                    const res = await fetch(process.env.AUTH_API + '/api/auth/login', {
                        method: "POST",
                        body: JSON.stringify({
                            userName: credentials?.userName,
                            password: credentials?.password,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    const response = await res.json();
                    console.log(response)

                    if (response.result.token) {
                        return response.result.user;
                    }

                    return null;
                } catch (e) {
                    console.error(e)
                    throw new Error(e);
                }
            }
        })
    ],
}
