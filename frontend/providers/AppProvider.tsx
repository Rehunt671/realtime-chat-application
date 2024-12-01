import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import store from "stores/store";

const client = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
