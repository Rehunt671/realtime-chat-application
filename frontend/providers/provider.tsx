import React from "react";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "stores/store";

const queryClient = new QueryClient();

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
