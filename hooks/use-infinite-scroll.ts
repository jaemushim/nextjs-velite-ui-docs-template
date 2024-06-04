import { useInfiniteQuery } from "react-query";
import { useCallback, useEffect, useRef } from "react";

export interface fetchMoreProps {
  pageParam: number;
  nextPage?: number;
}

interface useInfiniteScrollProps {
  queryKey: string[];
  fetchMore: (props: any) => any;
}

const useInfiniteScroll = ({ queryKey, fetchMore }: useInfiniteScrollProps) => {
  const observerRef = useRef(null);

  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => fetchMore(pageParam),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      getNextPageParam: (lastpage, allPages) => {
        if (!lastpage?.nextPage) return undefined;

        return allPages.length + 1;
      },
    },
  );
  const { fetchNextPage, hasNextPage } = query;

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting) {
        query.fetchNextPage();
      }
    },
    [fetchNextPage],
  );
  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return { observerRef, ...query };
};

export default useInfiniteScroll;
