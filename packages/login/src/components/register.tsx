import React, { forwardRef, ComponentProps, useState } from "react";
import { Input, Form, Label, Button, Box, useTranslation, Alert } from "@cabezonidas/shop-ui";
import { useRegisterMutation, MeQuery, MeDocument } from "@cabezonidas/shop-admin-graphql";

interface IRegister extends ComponentProps<typeof Box> {
  onLogin: () => void;
}
export const Register = forwardRef<HTMLDivElement, IRegister>((props, ref) => {
  const { t } = useTranslation();
  const { onLogin, ...boxProps } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { loading, error }] = useRegisterMutation();

  return (
    <Box {...boxProps} ref={ref}>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          await register({
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
                  me: data.register.user,
                },
              });
            },
          });
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
        </Box>
        {!!error?.graphQLErrors?.length && (
          <Alert variant="danger">
            {error?.graphQLErrors.map(e => (
              <React.Fragment key={e.message}>{e.message}</React.Fragment>
            ))}
          </Alert>
        )}
        <Button type="submit" ml="auto" variant="primary" disabled={loading}>
          {loading ? t("login.loading") : t("login.register")}
        </Button>
      </Form>
      <Box display="grid" mt="2" gridGap="1" width="max-content" mx="auto">
        <Box>{t("login.got_an_account")}</Box>
        <Button
          onClick={e => {
            e.preventDefault();
            onLogin();
          }}
        >
          {t("login.login")}
        </Button>
      </Box>
    </Box>
  );
});

Register.displayName = "Register";

export default Register;
