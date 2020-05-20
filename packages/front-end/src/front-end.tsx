import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useTranslation, Box, useTheme, ResponsiveLayout } from "@cabezonidas/shop-ui";
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
      <ResponsiveLayout
        nav={
          <Box display="grid" fontSize="3" gridGap="4" height="max-content" minWidth="200px" p="6">
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
        }
      >
        <Box width="100%" maxWidth="600px" mx="auto" mt="6">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/me" exact={true} component={Login} />
            <Route path="/pictures" component={MediaApp} />
            <PrivateRoute path="/users" component={Users} />
          </Switch>
        </Box>
      </ResponsiveLayout>
    </BrowserRouter>
  );
};

export default FrontEnd;
