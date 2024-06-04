"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/elements/card";
import { Button } from "@/components/elements/button";
import { Preview } from "@/components/mdx/preview";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

const InfiniteScrollExample = () => {
  const fetchMore = async (page: number) => {
    const PAGE_SIZE = 10;

    const response: any = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * PAGE_SIZE}&limit=${PAGE_SIZE}`,
    );
    const data = await response.json();
    data["nextPage"] = data.length < PAGE_SIZE ? null : page + 1;
    return data;
  };

  const { data, isFetchingNextPage, hasNextPage, observerRef } =
    useInfiniteScroll({
      queryKey: ["infinite-sample"],
      fetchMore: fetchMore,
    });

  return (
    <div>
      <Preview className="h-[400px] overflow-y-scroll ">
        {data?.pages?.map((group, index_group) => {
          return (
            <div className="grid grid-cols-2 gap-5 mb-5" key={index_group}>
              {group?.map((data: any, index: number) => {
                return (
                  <div key={`${index}-${data?.id || 0}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">
                          {data.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {data.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>{data.creationAt.slice(0, 10)}</CardContent>
                      <CardFooter className="flex justify-end">
                        <Button>Deploy</Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className={"loader"} ref={observerRef}>
          {isFetchingNextPage && hasNextPage ? (
            <div className="flex items-center justify-center mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="56"
                height="56"
              >
                <g>
                  <path
                    stroke="none"
                    fill="#000000"
                    d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                  >
                    <animateTransform
                      values="0 50 51;360 50 51"
                      keyTimes="0;1"
                      repeatCount="indefinite"
                      dur="1s"
                      type="rotate"
                      attributeName="transform"
                    />
                  </path>
                  <g />
                </g>
              </svg>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Preview>
    </div>
  );
};

export default InfiniteScrollExample;
