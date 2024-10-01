import NextAuth from "next-auth"
import Apple from "next-auth/providers/apple"
import GitHub from "next-auth/providers/github"

export const { handlers, auth } = NextAuth({
    providers: [GitHub, Apple],
})