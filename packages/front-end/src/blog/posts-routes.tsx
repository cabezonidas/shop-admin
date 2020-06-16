import * as React from "react";
import { Switch, Route, NavLink as NavLinkRouter, useHistory, useLocation } from "react-router-dom";
import { Posts } from "./posts";
import { Drafts } from "./drafts";
import { Box, Anchor, Button, useToast, Loading, useTranslation } from "@cabezonidas/shop-ui";
import styled from "@cabezonidas/shop-ui/lib/theme/styled";
import { useCreatePostDraftMutation } from "@cabezonidas/shop-admin-graphql";
import { DraftPost } from "./draft-post";
import { PostState } from "./post-context";

const enUsRoutes = {
  posts: "Posts",
  drafts: "Drafts",
  create: "Create",
  draftCreated: "Draft created",
};
const esArRoutes = {
  posts: "Entradas",
  drafts: "Borradores",
  create: "Crear",
  draftCreated: "Borrador creado",
};

export const PostsRoutes = () => {
  const [createDraft, { loading }] = useCreatePostDraftMutation({
    onError: err => console.log(err),
  });
  const { notify } = useToast();
  const history = useHistory();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { posts: { routes: enUsRoutes } }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { posts: { routes: esArRoutes } }, true, true);

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(3, auto)" gridGap="2" width="max-content">
        <Link to="/posts" exact={true}>
          {t("posts.routes.posts")}
        </Link>
        <Link to="/posts/drafts" exact={true}>
          {t("posts.routes.drafts")}
        </Link>
        {!pathname.startsWith("/posts/drafts/") && (
          <Button
            variant="transparent"
            onClick={async () => {
              if (!loading) {
                const { data } = await createDraft();
                const id = data?.createDraft._id;
                if (id) {
                  notify(t("posts.routes.draftCreated"));
                  history.push(`/posts/drafts/${id}`);
                }
              }
            }}
          >
            {!loading ? t("posts.routes.create") : <Loading />}
          </Button>
        )}
      </Box>
      <Switch>
        <Route path="/posts" exact={true} component={Posts} />
        <Route path="/posts/drafts" exact={true} component={Drafts} />
        <Route path="/posts/drafts/:id" component={DraftPost} />
        <Route path="/posts/:id" component={PostState} />
      </Switch>
    </>
  );
};

const Link = styled(Anchor.withComponent(NavLinkRouter))<{}>(() => ({
  "&.active": {
    fontWeight: "bold",
  },
}));
Link.displayName = "NavLink";
Link.defaultProps = {
  activeClassName: "active",
};
