import envConfig from "@/config";
import {
    ObjectCannedACL,
    PutObjectCommandInput,
    S3Client,
} from "@aws-sdk/client-s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { defaultTo } from "lodash";
import moment from "moment";
import internal from "stream";

export interface S3Object {
    LastModified?: Date;
    Key?: string;
    Size?: number;
}
export class S3Helper {
    bucketName: string;
    region: string;
    s3: S3Client;

    constructor(bucketName: string, region: string) {
        this.bucketName = bucketName;
        this.region = region;

        this.s3 = new S3Client({
            region: region,
            credentials: {
                accessKeyId: envConfig.aws.accessKey,
                secretAccessKey: envConfig.aws.secret,
            }
        });
    }

    static getName(path: string) {
        const splitted = path.split("/");

        if (splitted[splitted.length - 1].length == 0 && splitted.length >= 2) {
            //directory
            return splitted[splitted.length - 2];
        } else {
            return splitted[splitted.length - 1];
        }
    }

    async UploadObject(
        obj:
            | string
            | internal.Readable
            | Buffer
            | Uint8Array
            | ReadableStream<any>
            | Blob,
        path: string,
        onProgress?: (progress: any) => void,
    ) {
        const parallelUploads3 = new Upload({
            client: this.s3,
            queueSize: 4, // optional concurrency configuration
            partSize: 5 * 1024 * 1024, // optional size of each part
            leavePartsOnError: false, // optional manually handle dropped parts
            params: {
                Bucket: this.bucketName,
                Key: path,
                Body: obj,
                ACL: "public-read",
            },
        });

        parallelUploads3.on("httpUploadProgress", (progress: any) => {
            if (onProgress) {
                onProgress(Math.ceil((progress.loaded / progress.total) * 100));
            }
        });
        await parallelUploads3.done();

        return {
            Key: path,
            LastModified: moment().toDate(),
            Location: path,
        } as S3Object;
    }

    getPublicUrl(key: any) {
        const hostnamePrefix =
            this.region !== "us-east-1" ? "s3." + this.region : "s3";
        return `https://${this.bucketName}.${hostnamePrefix}.amazonaws.com/${key}`;
    }

    getSingedUrl(
        key: string,
        operation: "put" | "get" = "get",
        expiry = 60 * 60 * 24 * 7,
    ) {
        const bucketParams = {
            Bucket: this.bucketName,
            Key: key,
            ACL: ObjectCannedACL.public_read,
        };
        const command =
            operation === "put"
                ? new PutObjectCommand(bucketParams as PutObjectCommandInput)
                : new GetObjectCommand(bucketParams);
        const signedUrlExpireSeconds = expiry;

        const url = getSignedUrl(this.s3, command, {
            expiresIn: signedUrlExpireSeconds,
        });
        return url;
    }
}

export const s3Helper = new S3Helper(
    envConfig.aws.bucket,
    envConfig.aws.region
);