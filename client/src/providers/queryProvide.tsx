import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import type React from 'react';

type Props = {
    children: React.ReactNode
}

export default function QueryProdiver({ children }: Props) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}