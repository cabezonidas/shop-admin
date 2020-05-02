import React, { ComponentProps } from "react";
import { LoginApp } from "@cabezonidas/shop-admin-login";
import { forwardRef } from "react";
import { useLocation, Route, Redirect } from "react-router-dom";
import { useMeQuery } from "@cabezonidas/shop-admin-graphql";

export const Login = forwardRef<HTMLDivElement, ComponentProps<typeof LoginApp>>((props, ref) => {
  const location = useLocation();
  const { data } = useMeQuery();

  if (data?.me && location?.state?.from?.pathname) {
    return (
      <Route
        render={() => (
          <Redirect to={{ pathname: location.state.from.pathname, state: { from: undefined } }} />
        )}
      />
    );
  }

  return <LoginApp {...props} css={{}} ref={ref} />;
});
