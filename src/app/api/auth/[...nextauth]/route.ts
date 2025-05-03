
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"// Referring to the auth.ts we just created



const authOptions: AuthOptions = {
    secret: process.env.AUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRECT!
        })
    ],


}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }