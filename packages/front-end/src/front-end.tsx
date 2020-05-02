import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useTranslation, Box, useTheme } from "@cabezonidas/shop-ui";
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
      <Box height="100vh" display="flex" flexDirection="row">
        <Box
          width="40%"
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
        <Box width="60%" margin="2">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/me" exact={true} component={Login} />
            <Route path="/pictures" component={MediaApp} />
            <PrivateRoute path="/users" component={Users} />
          </Switch>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default FrontEnd;
