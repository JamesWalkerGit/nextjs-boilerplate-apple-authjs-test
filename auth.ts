import NextAuth from "next-auth"
import Apple from "next-auth/providers/apple"
import GitHub from "next-auth/providers/github"
const cookiePrefix = "__Secure-"

export const { handlers, auth } = NextAuth({
    cookies: {
        // default cookie options
        sessionToken: {
          name: `${cookiePrefix}authjs.session-token`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
          },
        },
        callbackUrl: {
          name: `${cookiePrefix}authjs.callback-url`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
          },
        },
        csrfToken: {
          // Default to __Host- for CSRF token for additional protection if using true
          // NB: The `__Host-` prefix is stricter than the `__Secure-` prefix.
          name: `${true ? "__Host-" : ""}authjs.csrf-token`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
          },
        },
        pkceCodeVerifier: {
          name: `${cookiePrefix}authjs.pkce.code_verifier`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
            maxAge: 60 * 15, // 15 minutes in seconds
          },
        },
        state: {
          name: `${cookiePrefix}authjs.state`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
            maxAge: 60 * 15, // 15 minutes in seconds
          },
        },
        nonce: {
          name: `${cookiePrefix}authjs.nonce`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
          },
        },
        webauthnChallenge: {
          name: `${cookiePrefix}authjs.challenge`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: true,
            maxAge: 60 * 15, // 15 minutes in seconds
          },
        },
      },
    secret: process.env.AUTH_SECRET,
    providers: [GitHub, Apple({
        clientId: process.env.AUTH_APPLE_ID,
        // @ts-ignore
        clientSecret: process.env.AUTH_APPLE_SECRET,
        wellKnown: "https://appleid.apple.com/.well-known/openid-configuration",
        checks: ["pkce"],
        token: {
            url: `https://appleid.apple.com/auth/token`,
        },
        authorization: {
            url: 'https://appleid.apple.com/auth/authorize',
            params: {
                scope: '',
                response_type: 'code',
                response_mode: 'query',
                state: crypto.randomUUID()
            },
        },
        client: {
            token_endpoint_auth_method: "client_secret_post",
        },
    })],
})