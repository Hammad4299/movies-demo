export interface PaginationInfoDetail {
    totalItems: number;
    start: number;
    end: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
}

export function getDefaultPaginationInfo(): PaginationInfoDetail {
    return {
        currentPage: 0,
        end: 0,
        start: 0,
        totalItems: 0,
        totalPages: 0,
        perPage: 25,
    };
}

export interface PaginatedResponse<T> {
    items: T[];
    paginationMeta: PaginationInfoDetail;
}

export interface PaginationParam {
    pageNumber: number;
    perPage: number;
}

export function getOffsetFromPagination(pagination: PaginationParam) {
    if (!pagination || !pagination.perPage || pagination.perPage == null) {
        return 0;
    }
    return (Math.max(pagination.pageNumber, 1) - 1) * pagination.perPage;
}

export async function paginator(
    options: {
        initialPage: number;
        perPage: number;
    },
    runner: (
        paginationParams: PaginationParam,
    ) => Promise<PaginationInfoDetail>,
) {
    const params: PaginationParam = {
        pageNumber: options.initialPage,
        perPage: options.perPage,
    };

    let detail: PaginationInfoDetail;
    do {
        const meta = await runner(params);
        params.pageNumber++;
        detail = meta;
    } while (detail.currentPage < detail.totalPages);
}

export function getPaginationMeta<T>(
    params: PaginationParam,
    result: {
        items: T[];
        total: number;
    },
): PaginationInfoDetail {
    const start = getOffsetFromPagination(params);

    return {
        start: start,
        end: Math.max(result.total - 1, 0),
        perPage: params.perPage,
        totalItems: result.total,
        currentPage: Math.floor(start / params.perPage) + 1,
        totalPages: parseInt(
            Math.ceil(result.total / params.perPage).toString(),
        ),
    };
}

export function paginate<T>(
    data: T[],
    paginationDef: PaginationParam,
): Omit<PaginatedResponse<T>, "status" | "errors"> {
    const start = getPaginationMeta(paginationDef, {
        items: data,
        total: data.length,
    });

    const items = data.slice(start.start, start.end);
    return {
        items: items,
        paginationMeta: start,
    };
}
