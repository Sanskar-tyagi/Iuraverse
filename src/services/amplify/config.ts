export const AmplifyAuthConfig: any = {
    region: import.meta.env.VITE_AMPLIFY_AUTH_REGION,
    userPoolId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID,
    signUpVerificationMethod: "code",
    loginWith: {
        oauth: {
            domain: import.meta.env.VITE_AMPLIFY_AUTH_COGNITO_DOMAIN,
            scope: [
                "phone", 
            ],
            redirectSignIn: import.meta.env.VITE_BASE_URL,
            redirectSignOut: import.meta.env.VITE_BASE_URL,
            clientId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID,
            responseType: "code",
        },
    },
};


