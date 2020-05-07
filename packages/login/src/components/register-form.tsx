import React, { forwardRef, ComponentProps, useState } from "react";
import { Input, Form, Label, Button, Box, useTranslation } from "@cabezonidas/shop-ui";
import { useRegisterMutation } from "@cabezonidas/shop-admin-graphql";

export const RegisterForm = forwardRef<
  HTMLFormElement,
  ComponentProps<typeof Form> & { onLogin: () => void }
>((props, ref) => {
  const { t } = useTranslation();
  const { onLogin, ...formProps } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        await register({
          variables: {
            email,
            password,
          },
        });
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
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
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
        <Button type="submit">{t("login.register")}</Button>
      </Box>
    </Form>
  );
});

export default RegisterForm;
