import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useTranslation, Box, useTheme, Shell } from "@cabezonidas/shop-ui";
import { MediaApp } from "@cabezonidas/shop-admin-media";
import { Login, Home, Users, PrivateRoute } from "./components";

const enUsRoutes = {
  routes: {
    me: "Me",
    home: "Home",
    users: "Users",
    pictures: "Images",
  },
};
const esArRoutes = {
  routes: {
    me: "Yo",
    home: "Inicio",
    users: "Usuarios",
    pictures: "Imágenes",
  },
};

export const FrontEnd: React.FC = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsRoutes }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArRoutes }, true, true);
  const theme = useTheme();
  return (
    <BrowserRouter basename="/">
      <Shell>
        <Box height="100%" display="flex" flexDirection="row" overflow="hidden">
          <Box
            width="300px"
            bg={theme.colors.neutral.mediumLight}
            textAlign="right"
            padding="3"
            fontSize="5"
            justifyContent="space-around"
          >
            <Box>
              <Link to="/">{t("main.routes.home")}</Link>
            </Box>
            <Box>
              <Link to="/me">{t("main.routes.me")}</Link>
            </Box>
            <Box>
              <Link to="/users">{t("main.routes.users")}</Link>
            </Box>
            <Box>
              <Link to="/pictures">{t("main.routes.pictures")}</Link>
            </Box>
          </Box>
          <Box
            width="calc(100% - 300px)"
            margin="2"
            overflow="auto"
            display="flex"
            flexDirection="column"
          >
            <Box width="100%" maxWidth="600px" alignSelf="center">
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/me" exact={true} component={Login} />
                <Route path="/pictures" component={MediaApp} />
                <PrivateRoute path="/users" component={Users} />
              </Switch>
            </Box>
          </Box>
        </Box>
      </Shell>
    </BrowserRouter>
  );
};

export default FrontEnd;
