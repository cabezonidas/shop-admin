import React, { forwardRef, ComponentProps, useState } from "react";
import { Input, Form, Label, Button, Box, useTranslation, Alert } from "@cabezonidas/shop-ui";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
  useGraphqlClient,
} from "@cabezonidas/shop-admin-graphql";

interface ILogin extends ComponentProps<typeof Box> {
  onRegister: () => void;
}
const enUsLogin = {
  login: "Login",
  loading: "Loading...",
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
  email: "Email",
  dont_have_account: "No tienes una cuenta?",
  register_now: "Regístrate ahora!",
  got_an_account: "Tienes una cuenta?",
  register: "Registrar",
  password: "Contraseña",
};
export const Login = forwardRef<HTMLDivElement, ILogin>((props, ref) => {
  const [email, setEmail] = useState("seba1@mailinator.com");
  const [password, setPassword] = useState("12345");
  const [login, { error, loading }] = useLoginMutation();
  const { setAccessToken } = useGraphqlClient();
  const { onRegister, ...boxProps } = props;
  const { i18n, t } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { login: enUsLogin }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { login: esArLogin }, true, true);
  return (
    <Box {...boxProps} ref={ref}>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          const response = await login({
            variables: {
              email,
              password,
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user,
                },
              });
            },
          });

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }
        }}
      >
        <Box>
          <Label htmlFor="user">{t("login.email")}</Label>
          <Input
            id="user"
            placeholder={t("login.email")}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Label htmlFor="password">{t("login.password")}</Label>
          <Input
            type="password"
            id="password"
            placeholder={t("login.password")}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          {error && (
            <Alert variant="danger">
              {error.graphQLErrors.map(({ message }) => (
                <Box key={message}>{message}</Box>
              ))}
            </Alert>
          )}
        </Box>
        <Button ml="auto" type="submit" variant="primary" disabled={loading}>
          {loading ? t("login.loading") : t("login.login")}
        </Button>
      </Form>
      <Box display="grid" mt="2" gridGap="1" width="max-content" mx="auto">
        <Box>{t("login.dont_have_account")}</Box>
        <Button
          onClick={e => {
            e.preventDefault();
            onRegister();
          }}
        >
          {t("login.register_now")}
        </Button>
      </Box>
    </Box>
  );
});
