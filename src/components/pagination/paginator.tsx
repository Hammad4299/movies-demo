import React from "react";
import AppButton from "../form/button";
interface Props {
    maxPages: number;
    pageNumber: number;
    setPages: (page: number) => unknown;
}

export const PaginationHandler: React.FC<Props> = ({
    pageNumber,
    maxPages,
    setPages,
}) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-8 mx-auto  [&_button]:!px-0 [&_button]:!py-0 [&_button]:!w-[32px] [&_button]:!h-[32px] [&_button:not(.default-color)]:!bg-[#092C39] [&_button]:!rounded-[4px]">
            {pageNumber > 1 && (
                <span
                    onClick={() => setPages(pageNumber - 1)}
                    className="text-regular font-bold cursor-pointer">
                    Prev
                </span>
            )}
            {pageNumber - 2 >= 1 && (
                <AppButton onClick={() => setPages(pageNumber - 2)}>
                    {pageNumber - 2}
                </AppButton>
            )}
            {pageNumber - 1 >= 1 && (
                <AppButton onClick={() => setPages(pageNumber - 1)}>
                    {pageNumber - 1}
                </AppButton>
            )}
            <AppButton className="default-color">{pageNumber}</AppButton>
            {pageNumber + 1 <= maxPages && (
                <AppButton onClick={() => setPages(pageNumber + 1)}>
                    {pageNumber + 1}
                </AppButton>
            )}
            {pageNumber + 2 <= maxPages && (
                <AppButton onClick={() => setPages(pageNumber + 2)}>
                    {pageNumber + 2}
                </AppButton>
            )}
            {pageNumber < maxPages && (
                <span
                    onClick={() => setPages(pageNumber + 1)}
                    className="text-regular font-bold cursor-pointer">
                    Next
                </span>
            )}
        </div>
    );
};
