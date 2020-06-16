import * as React from "react";
import { Box, useTranslation, Button } from "@cabezonidas/shop-ui";
import { useLogoutMutation, useGraphqlClient, MeQuery } from "@cabezonidas/shop-admin-graphql";

const enUsProfile = {
  profile: {
    choose_language: "Choose your language",
    language: "Language",
    loggedInAs: "Logged in as {{email}}",
    logout: "Logout",
  },
};
const esArProfile = {
  profile: {
    choose_language: "Elige tu idioma",
    language: "Idioma",
    loggedInAs: "Conectado como {{email}}",
    logout: "Salir",
  },
};

interface IProfile extends React.ComponentProps<typeof Box> {
  meQuery: MeQuery;
}

export const Profile = React.forwardRef<HTMLDivElement, IProfile>((props, ref) => {
  const { meQuery, ...boxProps } = props;
  const { i18n, t } = useTranslation();
  const [logout, { client }] = useLogoutMutation();
  const { setAccessToken } = useGraphqlClient();
  i18n.addResourceBundle("en-US", "translation", { login: enUsProfile }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { login: esArProfile }, true, true);

  return (
    <Box {...boxProps} ref={ref}>
      {meQuery.me && (
        <Box display="grid" mt="2" gridGap="1" width="max-content" mx="auto">
          <Box>{t("login.profile.loggedInAs", { email: meQuery.me.email })}</Box>
          <Button
            width="min-content"
            mx="auto"
            onClick={async () => {
              await logout();
              setAccessToken("");
              if (client) {
                await client.resetStore();
              }
            }}
          >
            {t("login.profile.logout")}
          </Button>
        </Box>
      )}
    </Box>
  );
});
