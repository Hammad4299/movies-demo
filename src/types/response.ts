import type { PaginationInfoDetail } from "./pagination";

export type ValidityState = FieldState[];

export interface ErrorInfo {
    message: string;
    code: string;
}

export interface FieldState {
    children?: ValidityState;
    identifier: string;
    errors: ErrorInfo[];
}

export interface ResponseMeta {
    paginationInfo?: PaginationInfoDetail | null;
    error?: any;
}

export interface AppResponse<T> {
    status: boolean;
    errorDetail?: ValidityState | null;
    statusCode: string;
    data: T;
    meta?: ResponseMeta;
}

export const formatResponse = <T>(
    data: T,
    statusCode: string = 'SUCCESS',
    other?: Omit<AppResponse<T>, "data" | "statusCode" | "status">,
): AppResponse<T> => {
    const resp: AppResponse<T> = {
        data: data,
        statusCode: statusCode,
        status: statusCode === 'SUCCESS' ? true : false,
        meta: {
            paginationInfo: null,
        },
        errorDetail: null,
    };
    if (other) {
        if (other.meta && other.meta.paginationInfo) {
            resp.meta = { paginationInfo: other.meta.paginationInfo };
        }
        if (other.errorDetail && other.errorDetail.length > 0) {
            resp.errorDetail = other.errorDetail;
            resp.status = false;
            resp.statusCode = statusCode;
        }
    }
    return resp;
};
