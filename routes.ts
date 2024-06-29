/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {String[]}
 */
export const publicRoutes = [
    "/",
]

/**
 * An Array of routes that require authentication
 * @type {String[]}
 */
export const authRoutes = [
    "/login",
    "/register"
]

/**
 * The prefix for API authentication routes
 * @type {String}
 */
export const apiAuthPrefix = "/api/auth"


/**
 * The default redirect path after loggin in
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"