// const gcTime = 5 * 60 * 1000; // disable cache
const gcTime = 0; // disable cache
const staleTime = 0; // always stale

export default {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false, // refetch on mount to get fresh data
      retry: false,
      gcTime,
      staleTime,
    },
  },
};
