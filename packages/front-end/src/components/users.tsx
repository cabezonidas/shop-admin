import React, { ComponentProps } from "react";
import { forwardRef } from "react";
import { Box, useTranslation } from "@cabezonidas/shop-ui";
import { useUsersQuery } from "@cabezonidas/shop-admin-graphql";

const enUsUsers = {
  users: {
    loading: "Loading users...",
  },
};
const esArUsers = {
  users: {
    loading: "Cargando usuarios...",
  },
};

export const Users = forwardRef<HTMLDivElement, ComponentProps<typeof Box>>((props, ref) => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsUsers }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArUsers }, true, true);

  const { data, loading } = useUsersQuery();

  let result = <></>;

  if (loading || !data) {
    result = t("main.users.loading");
  }

  if (data) {
    result = (
      <>
        {data.users.map(u => (
          <Box key={u._id}>{u.email}</Box>
        ))}
      </>
    );
  }

  return (
    <Box {...props} ref={ref}>
      {result}
    </Box>
  );
});
