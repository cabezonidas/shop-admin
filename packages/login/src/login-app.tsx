import React, { useState, ComponentProps, forwardRef } from "react";
import { LoginForm } from "./components/login-form";
import { useMeQuery, useLogoutMutation, useGraphqlClient } from "@cabezonidas/shop-admin-graphql";
import RegisterForm from "./components/register-form";
import { Box, Button, useTranslation, ErrorBoundary } from "@cabezonidas/shop-ui";

const enUsLogin = {
  login: "Login",
  loading: "Loading...",
  logout: "Log out",
  email: "Email",
  dont_have_account: "Don't have an account?",
  register_now: "Register now!",
  got_an_account: "Got an account?",
  register: "Register",
  password: "Password",
};
const esArLogin = {
  login: "Ingresar",
  loading: "Cargando...",
  logout: "Salir",
  email: "Email",
  dont_have_account: "No tienes una cuenta?",
  register_now: "Regístrate ahora!",
  got_an_account: "Tienes una cuenta?",
  register: "Registrar",
  password: "Contraseña",
};

export const LoginApp = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { i18n, t } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { login: enUsLogin }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { login: esArLogin }, true, true);
  return (
    <ErrorBoundary {...{ i18n, t }}>
      <App {...props} ref={ref} />
    </ErrorBoundary>
  );
});

const App = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"register" | "login">("login");
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const { loadingUser, setAccessToken } = useGraphqlClient();

  let body = <></>;

  if (loading || loadingUser) {
    body = t("login.loading");
  } else {
    if (data && data.me) {
      body = (
        <>
          {data.me.email}
          <Button
            onClick={async () => {
              await logout();
              setAccessToken("");
              if (client) {
                await client.resetStore();
              }
            }}
          >
            {t("login.logout")}
          </Button>
        </>
      );
    } else {
      if (mode === "login") {
        body = <LoginForm onRegister={() => setMode("register")} />;
      } else {
        body = <RegisterForm onLogin={() => setMode("login")} />;
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
