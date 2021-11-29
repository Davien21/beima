import React, { createContext, useContext } from "react";
import { AppProvider } from "./appContext";
import { LoadingProvider } from "./loadingContext";
import { ToastProvider } from "./toastContext";

export const CombineContext = createContext();

export default function CombineProvider({ children }) {
  return (
    <AppProvider>
      <LoadingProvider>
        <ToastProvider>{children}</ToastProvider>
      </LoadingProvider>
    </AppProvider>
  );
}

export function useCombineContext() {
  const context = useContext(CombineContext);

  if (!context)
    throw new Error("CombineContext must be used inside a `CombineProvider`");

  return context;
}
