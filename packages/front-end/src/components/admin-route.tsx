import { Route, Redirect } from "react-router-dom";
import React, { FC, ComponentProps } from "react";
import { useMeQuery, useGraphqlClient } from "@cabezonidas/shop-admin-graphql";

export const AdminRoute: FC<ComponentProps<typeof Route>> = props => {
  const { data, loading } = useMeQuery();
  const { loadingUser } = useGraphqlClient();
  const isAuthor = !!data?.me?.roles?.includes("admin");

  if (loadingUser || loading) {
    return <></>;
  }

  if (!isAuthor) {
    return (
      <Route
        render={({ location }) => <Redirect to={{ pathname: "/me", state: { from: location } }} />}
      />
    );
  } else {
    return <Route {...props} />;
  }
};
