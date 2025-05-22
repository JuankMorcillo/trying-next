import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { API_BASE_URL } from "@/lib/api/config"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            // credentials: {
            //     username: { label: "Username", type: "text" },
            //     password: { label: "Password", type: "password" }
            // },
            async authorize(credentials) {
                try {
                    const res = await fetch(API_BASE_URL + '/auth/login', {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    const user = await res.json()

                    if (res.ok && user) {
                        return user
                    }
                    return null
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/',
    },
    callbacks: {
        async jwt({ token, user }) {                    
            if (user) {
                token.id = user.access_token
                token.firstname = user.firstname
                token.lastname = user.lastname
                token.rol = 'admin'
                token.photo = user.photo_url
                // Puedes agregar más datos al token si es necesario
            }
            return token
        },
        async session({ session, token }) {
            // console.log(token);
            if (token) {
                session.user.id = token.id
                session.user.firstname = token.firstname
                session.user.lastname = token.lastname
                session.photo = token.photo_url
                // Sincroniza datos adicionales con la sesión
            }
            return session
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60, // 24 horas
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }