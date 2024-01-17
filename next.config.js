/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dev510.s3.amazonaws.com",
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
