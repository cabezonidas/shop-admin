import React, { useState, ComponentProps, forwardRef } from "react";
import { Login } from "./components/login";
import { useMeQuery, useGraphqlClient } from "@cabezonidas/shop-admin-graphql";
import { Register } from "./components/register";
import { Box, useTranslation, ErrorBoundary, Loading } from "@cabezonidas/shop-ui";
import { Profile } from "./components/profile";

export const LoginApp = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { i18n, t } = useTranslation();
  return (
    <ErrorBoundary {...{ i18n, t }}>
      <App {...props} ref={ref} />
    </ErrorBoundary>
  );
});

const App = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const [mode, setMode] = useState<"register" | "login">("login");
  const { data, loading } = useMeQuery();
  const { loadingUser } = useGraphqlClient();

  let body = <></>;

  if (loading || loadingUser) {
    body = (
      <Box width="min-content">
        <Loading />
      </Box>
    );
  } else {
    if (data && data.me) {
      body = <Profile meQuery={data} />;
    } else {
      if (mode === "login") {
        body = <Login onRegister={() => setMode("register")} />;
      } else {
        body = <Register onLogin={() => setMode("login")} />;
      }
    }
  }

  return (
    <Box {...props} ref={ref}>
      {body}
    </Box>
  );
});

export default LoginApp;
