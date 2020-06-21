import React, { ComponentProps } from "react";
import { forwardRef } from "react";
import { Box, useTranslation, ProfileCard, H1 } from "@cabezonidas/shop-ui";
import { useUsersQuery, User } from "@cabezonidas/shop-admin-graphql";

const enUsUsers = {
  users: {
    loading: "Loading users...",
    users: "User",
  },
};
const esArUsers = {
  users: {
    loading: "Cargando usuarios...",
    users: "Usuarios",
  },
};

const parseAuthor = (user: User) => ({
  name: user.name ?? "",
  dob: user.dob ?? undefined,
  email: user.email ?? "",
  imageUrl: user.imageUrl ?? "",
  linkedin: user.linkedin ?? "",
  whatsapp: user.whatsapp ?? "",
  instagram: user.instagram ?? "",
  facebook: user.facebook ?? "",
  messenger: user.messenger ?? "",
  github: user.github ?? "",
  description: user.description?.map(({ localeId, text }) => ({ localeId, text })) ?? [],
});

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
      <Box display="grid" gridGap="4">
        {data.users.map(u => (
          <ProfileCard border="1px solid" borderRadius={4} key={u._id} author={parseAuthor(u)} />
        ))}
      </Box>
    );
  }

  return (
    <Box {...props} ref={ref}>
      <H1>{t("main.users.users")}</H1>
      <Box pt="4">{result}</Box>
    </Box>
  );
});
