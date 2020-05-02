import React, { forwardRef, ComponentProps, useState } from "react";
import {
  Input,
  Form,
  Label,
  Button,
  Box,
  useTranslation,
  PrimaryButton,
} from "@cabezonidas/shop-ui";
import {
  useLoginMutation,
  MeQuery,
  MeDocument,
  useGraphqlClient,
} from "@cabezonidas/shop-admin-graphql";

export const LoginForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onRegister: () => void }
>((props, ref) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("seba1@mailinator.com");
  const [password, setPassword] = useState("12345");
  const [login, { error }] = useLoginMutation();
  const { setAccessToken } = useGraphqlClient();
  const { onRegister, ...formProps } = props;
  return (
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
      {...formProps}
      ref={ref}
    >
      <Label htmlFor="user">{t("login.email")}</Label>
      <Input
        id="user"
        placeholder={t("login.email")}
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
      />
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
        <Box>
          {error.graphQLErrors.map(({ message }) => (
            <Box key={message}>{message}</Box>
          ))}
        </Box>
      )}
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
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
        <PrimaryButton type="submit">{t("login.login")}</PrimaryButton>
      </Box>
    </Form>
  );
});
