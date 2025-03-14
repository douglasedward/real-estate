"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import StoreProvider from "@/state/redux";
import Auth from "./(auth)/authProvider";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <Authenticator.Provider>
        <Auth>{children}</Auth>
      </Authenticator.Provider>
    </StoreProvider>
  );
};

export default Providers;
