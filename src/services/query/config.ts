import { QueryClientConfig } from '@tanstack/react-query';

export const QueryConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Infinity,
        },
    },
};
