import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { queryClient, QueryClientProvider } from "@/services/query";
import { useEffect } from "react";
import { initiateAmplify } from "@/services/amplify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  useEffect(() => {
    initiateAmplify();
  }, []);
  return (
    <QueryClientProvider client={queryClient}> 
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> 
  );
};

export default App;
