import React from "react";
import { BrowserRouter, Switch, Route, NavLink as NavLinkRouter, Redirect } from "react-router-dom";
import {
  useTranslation,
  Box,
  ResponsiveLayout,
  NavLink as StyledNavLink,
  Toggle,
  useTheme,
  Select,
  Option,
} from "@cabezonidas/shop-ui";
import { MediaApp } from "@cabezonidas/shop-admin-media";
import { Login, Users } from "./components";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { PostsRoutes } from "./blog/posts-routes";
import { useMeQuery } from "@cabezonidas/shop-admin-graphql";
import { AuthorRoute } from "./components/author-route";
import { AdminRoute } from "./components/admin-route";

const publicSite = (() => {
  switch (process.env.REACT_APP_ENV) {
    case "test":
      return "https://javascript.kiwi";
    case "production":
      return "https://lataminvestingclub.com";
    default:
      return "http://localhost:3000";
  }
})();

const enUsRoutes = {
  routes: {
    home: "Home",
    me: "Me",
    users: "Users",
    pictures: "Images",
    posts: "Posts",
    language: "Language",
    darkMode: "Dark Mode",
    documentTitle: "Administration",
  },
};
const esArRoutes = {
  routes: {
    home: "Inicio",
    me: "Yo",
    users: "Usuarios",
    pictures: "Imágenes",
    posts: "Entradas",
    language: "Idioma",
    darkMode: "Modo oscuro",
    documentTitle: "Administración",
  },
};

export const FrontEnd: React.FC = () => {
  const { t, i18n, languages } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { main: enUsRoutes }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { main: esArRoutes }, true, true);
  const { data } = useMeQuery();
  const isAuthor = !!data?.me?.roles?.includes("author");
  const isAdmin = !!data?.me?.roles?.includes("admin");

  document.title = t("main.routes.documentTitle");

  const layoutMode = React.useMemo(
    () => window?.localStorage?.getItem("nav-state") ?? undefined,
    []
  );

  return (
    <BrowserRouter basename="/">
      <ResponsiveLayout
        mode={layoutMode}
        onModeChange={newMode => window?.localStorage?.setItem("nav-state", newMode)}
        nav={
          <>
            <StyledNavLink href={publicSite} children={t("main.routes.home")} />
            <Link to="/me">{t("main.routes.me")}</Link>
            {isAdmin && <Link to="/users">{t("main.routes.users")}</Link>}
            {isAuthor && (
              <>
                <Link to="/pictures">{t("main.routes.pictures")}</Link>
                <Link to="/posts">{t("main.routes.posts")}</Link>
              </>
            )}
          </>
        }
        header={
          <Box
            display="grid"
            gridGap="1"
            gridTemplateColumns="auto auto"
            width="max-content"
            ml="auto"
            mr="1"
          >
            <Select
              id="language"
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              color="white !important"
              aria-label={t("main.routes.language")}
            >
              {languages.map(l => (
                <Option key={l.localeId} value={l.localeId}>
                  {(() => {
                    const flag = l.localeId
                      .split("-")[1]
                      ?.toUpperCase()
                      .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
                    return flag ? flag + " " : null;
                  })()}
                  {l.name.split(" ")[0]}
                </Option>
              ))}
            </Select>
            <DarkModeToggle aria-label={t("main.routes.darkMode")} />
          </Box>
        }
      >
        <Box width="100%" maxWidth="600px" mx="auto" mt="6" mb="4" px="4">
          <Switch>
            <Route path="/me" exact={true} component={Login} />
            <AuthorRoute path="/pictures" component={MediaApp} />
            <AuthorRoute path="/posts" component={PostsRoutes} />
            <AdminRoute path="/users" component={Users} />
            <Route path="/">
              <Redirect to="/me" />
            </Route>
          </Switch>
        </Box>
      </ResponsiveLayout>
    </BrowserRouter>
  );
};

type DarkModeToggle = Omit<React.ComponentProps<typeof Toggle>, "checked" | "onChange">;
const DarkModeToggle = React.forwardRef<HTMLInputElement, DarkModeToggle>((props, ref) => {
  const { mode, setThemeMode } = useTheme();
  return (
    <Toggle
      variant="dark-mode"
      checked={mode === "dark"}
      onChange={() => {
        const newMode = mode === "dark" ? "light" : "dark";
        setThemeMode(newMode);
      }}
      {...props}
      ref={ref}
    />
  );
});

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
