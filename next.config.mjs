/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/auth/error',
                destination: '/api/auth/error-handler',
            },
        ];
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
        ]
    }
};

export default nextConfig;
