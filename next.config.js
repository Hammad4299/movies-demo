/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "movies-demo-dev.s3.us-east-2.amazonaws.com",
            },
        ],
    },

    // async redirects() {
    //     return [
    //         {
    //             source: "/",
    //             destination: "/login",
    //             permanent: true,
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
