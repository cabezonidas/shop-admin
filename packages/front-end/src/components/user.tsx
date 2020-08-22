import * as React from "react";
import { forwardRef } from "react";
import { Box, useTranslation, H1, Alert, Markdown } from "@cabezonidas/shop-ui";
import {
  useGraphqlClient,
  UsersQuery,
  UsersDocument,
  useFindUserQuery,
} from "@cabezonidas/shop-admin-graphql";
import { useParams } from "react-router-dom";

const enUsUser = {
  user: {
    loading: "Loading",
    user: "User",
  },
};
const esArUser = {
  user: {
    loading: "Cargando",
    user: "Usuario",
  },
};

export const User = forwardRef<HTMLDivElement, React.ComponentProps<typeof Box>>((props, ref) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const userId = id ?? "";
  i18n.addResourceBundle("en-US", "translation", { main: enUsUser }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArUser }, true, true);

  const { data, loading, error } = useFindUserQuery({ variables: { userId } });

  let result: JSX.Element | string = <></>;

  if (loading || !data) {
    result = t("main.user.loading");
  }

  if (error) {
    result = (
      <Alert variant="danger">
        {error.graphQLErrors.map(e => (
          <Box key={e.message} children={e.message} />
        ))}
      </Alert>
    );
  }

  if (data) {
    const json = JSON.stringify(removeEmpty(data.findUser), undefined, 2);
    result = <Markdown body={json ? `${"```\n"}${json}${"\n```"}` : ""} />;
  }

  return (
    <Box {...props} ref={ref}>
      <H1>{data?.findUser.name ?? t("main.user.user")}</H1>
      {result}
    </Box>
  );
});

function removeEmpty(obj: object) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === "object") {
      removeEmpty(obj[key]);
    } else if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return { ...obj };
}
