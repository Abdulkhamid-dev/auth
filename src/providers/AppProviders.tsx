import { Suspense } from "react";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spin } from "antd";

const queryClient = new QueryClient();

type ProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <Spin size="large" />
            </div>
          }
        >
          {children}
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
