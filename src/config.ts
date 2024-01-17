export const envConfig = {
    aws: {
        region: process.env.AWS_REGION as string,
        accessKey: process.env.AWS_ACCESS_KEY_ID as string,
        secret: process.env.AWS_SECRET_ACCESS_KEY as string,
        bucket: process.env.AWS_BUCKET_NAME as string,
    },
    database: {
        url: process.env.DATABASE_URL as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT as string,
        name: process.env.DB_NAME as string,
    },
    nextAuthSecretKey: process.env.AUTH_SECRET as string,
    projectRoot: process.env.PROJECT_ROOT as string,
}

export default envConfig;