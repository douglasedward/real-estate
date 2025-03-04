"use client";

import StoreProvider from "@/state/redux";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
