/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "movies-demo-dev.us-east-2.s3.amazonaws.com",
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
