import React from "react";
import { BrowserRouter, Switch, Route, NavLink as NavLinkRouter } from "react-router-dom";
import {
  useTranslation,
  Box,
  ResponsiveLayout,
  NavLink as StyledNavLink,
} from "@cabezonidas/shop-ui";
import { MediaApp } from "@cabezonidas/shop-admin-media";
import { Login, Home, Users, PrivateRoute } from "./components";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { PostsRoutes } from "./blog/posts-routes";
import { useMeQuery } from "@cabezonidas/shop-admin-graphql";
import { Sandpit } from "./components/sandpit";

const enUsRoutes = {
  routes: {
    me: "Me",
    home: "Home",
    users: "Users",
    pictures: "Images",
    posts: "Posts",
    sandpit: "Sandpit",
  },
};
const esArRoutes = {
  routes: {
    me: "Yo",
    home: "Inicio",
    users: "Usuarios",
    pictures: "Imágenes",
    posts: "Entradas",
    sandpit: "Arenero",
  },
};

export const FrontEnd: React.FC = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsRoutes }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArRoutes }, true, true);
  const { data } = useMeQuery();
  return (
    <BrowserRouter basename="/">
      <ResponsiveLayout
        nav={
          <>
            <Link to="/" exact={true}>
              {t("main.routes.home")}
            </Link>
            <Link to="/me">{t("main.routes.me")}</Link>
            <Link to="/users">{t("main.routes.users")}</Link>
            <Link to="/sandpit">{t("main.routes.sandpit")}</Link>
            {!!data?.me && (
              <>
                <Link to="/pictures">{t("main.routes.pictures")}</Link>
                <Link to="/posts">{t("main.routes.posts")}</Link>
              </>
            )}
          </>
        }
      >
        <Box width="100%" maxWidth="600px" mx="auto" mt="6" px="4">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/me" exact={true} component={Login} />
            <Route path="/pictures" component={MediaApp} />
            <PrivateRoute path="/posts" component={PostsRoutes} />
            <PrivateRoute path="/users" component={Users} />
          </Switch>
        </Box>
        <Switch>
          <Route path="/sandpit" component={Sandpit} />
        </Switch>
      </ResponsiveLayout>
    </BrowserRouter>
  );
};

export default FrontEnd;

const Link = styled(StyledNavLink.withComponent(NavLinkRouter))<{}>(() => ({
  "&.active": {
    fontWeight: "bold",
  },
}));
Link.displayName = "NavLink";
Link.defaultProps = {
  activeClassName: "active",
};
